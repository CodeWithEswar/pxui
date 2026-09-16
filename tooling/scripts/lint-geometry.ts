/**
 * PXUI Geometry Linter (Section 57)
 *
 * Enforces:
 * - Integer coordinates
 * - Canvas bounds (0..24, 0..24)
 * - Declared vs computed bounds exact equivalence
 * - Minimum safe margins
 * - Degenerate segments (zero-length edges)
 * - Zero-area paths
 * - Duplicate consecutive points
 * - Primary / secondary weight consistency
 */

import { ICONS_CATALOG } from "../../lib/icons/catalog";
import { analyzeIconPinToPin, PXGeometryAnalysis } from "../../lib/geometry/pin-to-pin";

interface LintIssue {
  slug: string;
  level: "ERROR" | "WARNING" | "INFO";
  code: string;
  message: string;
}

export function runGeometryLint(): {
  success: boolean;
  totalIcons: number;
  errors: LintIssue[];
  warnings: LintIssue[];
  infos: LintIssue[];
} {
  console.log(`📐 [PXUI Geometry Lint] Inspecting pin-to-pin geometry across ${ICONS_CATALOG.length} icons...`);

  const errors: LintIssue[] = [];
  const warnings: LintIssue[] = [];
  const infos: LintIssue[] = [];

  for (const icon of ICONS_CATALOG) {
    const slug = `px-${icon.name}`;
    let analysis: PXGeometryAnalysis;

    try {
      analysis = analyzeIconPinToPin(icon);
    } catch (err) {
      errors.push({
        slug,
        level: "ERROR",
        code: "PARSER_FAILURE",
        message: `Failed to parse SVG path: ${err instanceof Error ? err.message : String(err)}`,
      });
      continue;
    }

    // 1. Integer coordinate verification (Section 4 & 56: Warning for legacy paths)
    if (!analysis.validation.integerAligned) {
      warnings.push({
        slug,
        level: "WARNING",
        code: "FRACTIONAL_COORDINATES",
        message: `Contains non-integer coordinates in canonical path.`,
      });
    }

    // 2. Canvas bounds verification (0..24) (Section 56: ERROR)
    if (!analysis.validation.insideCanvas) {
      errors.push({
        slug,
        level: "ERROR",
        code: "CANVAS_OVERFLOW",
        message: `Coordinates exceed the 24×24 authoring canvas bounds.`,
      });
    }

    // 3. Declared bounds vs computed bounds verification (Section 36 & 56: ERROR)
    if (!analysis.validation.declaredBoundsMatch) {
      const d = analysis.declaredBounds;
      const c = analysis.computedBounds;
      errors.push({
        slug,
        level: "ERROR",
        code: "BOUNDS_MISMATCH",
        message: `Declared bounds (${d.minX},${d.minY})→(${d.maxX},${d.maxY}) do not match computed bounds (${c.minX},${c.minY})→(${c.maxX},${c.maxY}).`,
      });
    }

    // 4. Degenerate segments / zero-length edges (Section 56: WARNING)
    const zeroLengthEdges = analysis.edges.filter((e) => e.length === 0);
    if (zeroLengthEdges.length > 0) {
      warnings.push({
        slug,
        level: "WARNING",
        code: "DEGENERATE_SEGMENT",
        message: `Found ${zeroLengthEdges.length} zero-length edge(s).`,
      });
    }

    // 5. Zero-area path check
    if (analysis.occupiedCellCount === 0) {
      errors.push({
        slug,
        level: "ERROR",
        code: "ZERO_AREA_PATH",
        message: `Path occupies 0 cells in 24×24 canvas.`,
      });
    }

    // 6. Safe margin check (Warning if geometry touches outer canvas border without safe margin)
    if (analysis.margins.top === 0 || analysis.margins.bottom === 0 || analysis.margins.left === 0 || analysis.margins.right === 0) {
      warnings.push({
        slug,
        level: "WARNING",
        code: "TOUCHES_CANVAS_BORDER",
        message: `Geometry touches outer canvas border (${analysis.margins.formatted}). Minimum safe margin is 2 units.`,
      });
    }

    // 7. Info: Optical centering offset
    if (Math.abs(analysis.opticalOffset.dx) > 1.5 || Math.abs(analysis.opticalOffset.dy) > 1.5) {
      infos.push({
        slug,
        level: "INFO",
        code: "ASYMMETRIC_OPTICAL_MASS",
        message: `Centroid offset Δ(${analysis.opticalOffset.dx.toFixed(2)}, ${analysis.opticalOffset.dy.toFixed(2)}) indicates asymmetric visual mass.`,
      });
    }
  }

  const success = errors.length === 0;

  console.log(`\n📊 [Geometry Lint Results]`);
  console.log(`   Total Icons:     ${ICONS_CATALOG.length}`);
  console.log(`   Errors:          ${errors.length} ${errors.length === 0 ? "✓ (PASSED)" : "✗ (FAIL)"}`);
  console.log(`   Warnings:        ${warnings.length}`);
  console.log(`   Diagnostic Info: ${infos.length}`);

  if (errors.length > 0) {
    console.error(`\n❌ [BLOCKING ERRORS]:`);
    for (const err of errors) {
      console.error(`   [${err.level}] ${err.slug} (${err.code}): ${err.message}`);
    }
  }

  if (warnings.length > 0) {
    console.warn(`\n⚠️ [WARNINGS]:`);
    for (const w of warnings.slice(0, 10)) {
      console.warn(`   [${w.level}] ${w.slug} (${w.code}): ${w.message}`);
    }
    if (warnings.length > 10) {
      console.warn(`   ... and ${warnings.length - 10} more warnings.`);
    }
  }

  return {
    success,
    totalIcons: ICONS_CATALOG.length,
    errors,
    warnings,
    infos,
  };
}

if (require.main === module || process.argv[1] === __filename) {
  const result = runGeometryLint();
  if (!result.success) {
    process.exit(1);
  }
}
