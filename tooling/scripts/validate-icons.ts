import fs from "fs";
import path from "path";
import { CANONICAL_ICONS } from "../../icons/source";
import { validateSchema } from "../validators/schema";
import { validateGeometry } from "../validators/geometry";
import { validateNaming } from "../validators/naming";
import { validateTaxonomy } from "../validators/taxonomy";
import { validateCollisions } from "../validators/collision";
import { validateHygiene } from "../validators/hygiene";
import { QualityGateIssue, QualityReportSummary } from "../validators/types";

export function runValidationSuite(): QualityReportSummary {
  const isJson = process.argv.includes("--json");
  const isStrict = process.argv.includes("--strict");

  if (!isJson) {
    console.log(`🔍 [PXUI Quality Gates] Validating ${CANONICAL_ICONS.length} canonical icon definitions...`);
  }

  const issues: QualityGateIssue[] = [];
  const metrics = {
    exactDuplicates: 0,
    nearDuplicates: 0,
    hardcodedColors: 0,
    outOfBounds: 0,
    offGridCoordinates: 0,
    namingCollisions: 0,
    registryViolations: 0,
  };

  for (const icon of CANONICAL_ICONS) {
    const slug = icon.slug || (icon.name.startsWith("px-") ? icon.name : `px-${icon.name.replace(/^PXIcon/, "").toLowerCase()}`);

    const schemaIssues = validateSchema(icon);
    const geometryIssues = validateGeometry(slug, icon.geometry);
    const namingIssues = validateNaming(slug, icon.name);
    const taxonomyIssues = validateTaxonomy(slug, icon.category, icon.family);
    const hygieneIssues = validateHygiene(icon);

    const iconIssues = [
      ...schemaIssues,
      ...geometryIssues,
      ...namingIssues,
      ...taxonomyIssues,
      ...hygieneIssues,
    ];

    for (const issue of iconIssues) {
      issues.push(issue);
      if (issue.code.startsWith("OUT_OF_BOUNDS")) metrics.outOfBounds++;
      if (issue.code === "OFF_GRID_PRECISION_NOISE") metrics.offGridCoordinates++;
      if (issue.code === "HARDCODED_COLOR_FORBIDDEN") metrics.hardcodedColors++;
    }
  }

  // Collision & Duplicate Detection
  const collisionIssues = validateCollisions(CANONICAL_ICONS);
  for (const issue of collisionIssues) {
    issues.push(issue);
    if (issue.code === "EXACT_GEOMETRY_DUPLICATE") metrics.exactDuplicates++;
    if (issue.code.startsWith("COLLISION")) metrics.namingCollisions++;
  }

  const blockingIssues = issues.filter((i) => i.severity === "BLOCKING");
  const reviewIssues = issues.filter((i) => i.severity === "REVIEW");
  const warningIssues = issues.filter((i) => i.severity === "WARNING");
  const infoIssues = issues.filter((i) => i.severity === "INFO");

  const report: QualityReportSummary = {
    timestamp: new Date().toISOString(),
    totalIcons: CANONICAL_ICONS.length,
    gatesPassed: blockingIssues.length === 0 && (!isStrict || reviewIssues.length === 0),
    blockingCount: blockingIssues.length,
    reviewCount: reviewIssues.length,
    warningCount: warningIssues.length,
    infoCount: infoIssues.length,
    issues,
    metrics,
  };

  if (isJson) {
    console.log(JSON.stringify(report, null, 2));
    const reportDir = path.resolve(__dirname, "../reports");
    fs.mkdirSync(reportDir, { recursive: true });
    fs.writeFileSync(path.join(reportDir, "quality-report.json"), JSON.stringify(report, null, 2), "utf-8");
  } else {
    console.log("\n┌────────────────────────────────────────────────────────┐");
    console.log("│             PXUI QUALITY-GATE REPORT MATRIX            │");
    console.log("├────────────────────────────────────────────────────────┤");
    console.log(`│ Total Canonical Icons       : ${String(report.totalIcons).padStart(25)} │`);
    console.log(`│ Blocking Errors             : ${String(report.blockingCount).padStart(25)} │`);
    console.log(`│ Review Signals              : ${String(report.reviewCount).padStart(25)} │`);
    console.log(`│ Hardcoded Color Violations  : ${String(report.metrics.hardcodedColors).padStart(25)} │`);
    console.log(`│ Out-of-Bounds Violations    : ${String(report.metrics.outOfBounds).padStart(25)} │`);
    console.log(`│ Exact Duplicates            : ${String(report.metrics.exactDuplicates).padStart(25)} │`);
    console.log(`│ Naming Collisions           : ${String(report.metrics.namingCollisions).padStart(25)} │`);
    console.log("└────────────────────────────────────────────────────────┘");

    if (reviewIssues.length > 0) {
      console.log(`\n⚠️  Review Signals (${reviewIssues.length}):`);
      reviewIssues.slice(0, 5).forEach((i) => console.log(`  - [${i.slug}] ${i.code}: ${i.message}`));
      if (reviewIssues.length > 5) {
        console.log(`    ... and ${reviewIssues.length - 5} more items.`);
      }
    }

    if (blockingIssues.length > 0) {
      console.error(`\n❌ Quality Gates Failed with ${blockingIssues.length} BLOCKING errors:`);
      blockingIssues.forEach((e) => {
        console.error(`  - [${e.slug}] [${e.gate.toUpperCase()}] ${e.code}: ${e.message}`);
        if (e.expected && e.actual) {
          console.error(`      Expected: ${e.expected} | Actual: ${e.actual}`);
        }
      });
      process.exit(1);
    }

    console.log(`\n✅ All ${CANONICAL_ICONS.length} icons passed blocking quality gates successfully!`);
  }

  return report;
}

runValidationSuite();
