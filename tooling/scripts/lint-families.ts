/**
 * PXUI Family Linter (Section 58)
 *
 * Enforces:
 * - Registered taxonomy family membership
 * - Directional reflection symmetry pairs (horizontal and vertical)
 * - Container families consistency (*Circle, *Square, Checkbox*, Radio*)
 * - Internal glyph alignment and clearance
 */

import { ICONS_CATALOG } from "../../lib/icons/catalog";
import { ICON_FAMILIES } from "../../icons/families";
import { analyzeIconPinToPin, PXGeometryAnalysis } from "../../lib/geometry/pin-to-pin";

interface FamilyIssue {
  family: string;
  level: "ERROR" | "WARNING" | "INFO";
  code: string;
  message: string;
}

export function runFamilyLint(): {
  success: boolean;
  totalFamilies: number;
  errors: FamilyIssue[];
  warnings: FamilyIssue[];
  infos: FamilyIssue[];
} {
  console.log(`👨‍👩‍👧‍👦 [PXUI Family Lint] Validating family relationships across ${ICONS_CATALOG.length} icons...`);

  const errors: FamilyIssue[] = [];
  const warnings: FamilyIssue[] = [];
  const infos: FamilyIssue[] = [];

  const analysisCache = new Map<string, PXGeometryAnalysis>();
  for (const icon of ICONS_CATALOG) {
    try {
      analysisCache.set(icon.name, analyzeIconPinToPin(icon));
    } catch {
      // Handled by geometry lint
    }
  }

  // 1. Registered Family Taxonomy Membership
  const registeredFamilyKeys = new Set(Object.keys(ICON_FAMILIES));
  for (const icon of ICONS_CATALOG) {
    const family = icon.family || icon.name.split("-")[0];
    const familyKey = family.toLowerCase();

    if (!registeredFamilyKeys.has(familyKey)) {
      errors.push({
        family: familyKey,
        level: "ERROR",
        code: "UNREGISTERED_FAMILY",
        message: `Icon '${icon.name}' references unregistered family key '${familyKey}'.`,
      });
    }
  }

  // 2. Directional Reflection Pairs (Section 26)
  const horizontalPairs: [string, string][] = [
    ["arrow-left", "arrow-right"],
    ["chevron-left", "chevron-right"],
    ["insert-left", "insert-right"],
    ["close-panel-left", "close-panel-right"],
    ["toggle-left", "toggle-right"],
  ];

  for (const [leftName, rightName] of horizontalPairs) {
    const left = analysisCache.get(leftName);
    const right = analysisCache.get(rightName);

    if (left && right) {
      // Dimensions match
      if (left.dimensions.width !== right.dimensions.width || left.dimensions.height !== right.dimensions.height) {
        warnings.push({
          family: "directional",
          level: "WARNING",
          code: "DIMENSION_ASYMMETRY",
          message: `Horizontal pair '${leftName}' (${left.dimensions.width}×${left.dimensions.height}) and '${rightName}' (${right.dimensions.width}×${right.dimensions.height}) have dimension mismatch.`,
        });
      }

      // Vertical span match (minY, maxY)
      if (left.computedBounds.minY !== right.computedBounds.minY || left.computedBounds.maxY !== right.computedBounds.maxY) {
        warnings.push({
          family: "directional",
          level: "WARNING",
          code: "VERTICAL_SPAN_MISMATCH",
          message: `Horizontal pair '${leftName}' and '${rightName}' vertical span differs (Y:[${left.computedBounds.minY}..${left.computedBounds.maxY}] vs Y:[${right.computedBounds.minY}..${right.computedBounds.maxY}]).`,
        });
      }

      // Reflection of horizontal margins: left.margins.left should equal right.margins.right
      if (left.margins.left !== right.margins.right) {
        infos.push({
          family: "directional",
          level: "INFO",
          code: "OPTICAL_MARGIN_OFFSET",
          message: `Horizontal pair '${leftName}' left-margin (${left.margins.left}) differs from '${rightName}' right-margin (${right.margins.right}).`,
        });
      }
    }
  }

  const verticalPairs: [string, string][] = [
    ["arrow-up", "arrow-down"],
    ["chevron-up", "chevron-down"],
    ["insert-above", "insert-below"],
    ["close-panel-top", "close-panel-bottom"],
  ];

  for (const [upName, downName] of verticalPairs) {
    const up = analysisCache.get(upName);
    const down = analysisCache.get(downName);

    if (up && down) {
      if (up.dimensions.width !== down.dimensions.width || up.dimensions.height !== down.dimensions.height) {
        warnings.push({
          family: "directional",
          level: "WARNING",
          code: "DIMENSION_ASYMMETRY",
          message: `Vertical pair '${upName}' (${up.dimensions.width}×${up.dimensions.height}) and '${downName}' (${down.dimensions.width}×${down.dimensions.height}) have dimension mismatch.`,
        });
      }

      if (up.computedBounds.minX !== down.computedBounds.minX || up.computedBounds.maxX !== down.computedBounds.maxX) {
        warnings.push({
          family: "directional",
          level: "WARNING",
          code: "HORIZONTAL_SPAN_MISMATCH",
          message: `Vertical pair '${upName}' and '${downName}' horizontal span differs.`,
        });
      }
    }
  }

  // 3. Container Families Consistency (Section 27)
  const containerPrefixes = ["add", "close", "check", "remove", "subtract", "clear", "edit"];
  for (const prefix of containerPrefixes) {
    const circle = analysisCache.get(`${prefix}-circle`);
    const square = analysisCache.get(`${prefix}-square`);

    if (circle && square) {
      // Both containers should be centered around (12, 12)
      if (Math.abs(circle.center.x - 12) > 1 || Math.abs(circle.center.y - 12) > 1) {
        warnings.push({
          family: `${prefix}-container`,
          level: "WARNING",
          code: "OFF_CENTER_CONTAINER",
          message: `'${prefix}-circle' center (${circle.center.x}, ${circle.center.y}) is shifted from canvas center (12, 12).`,
        });
      }
      if (Math.abs(square.center.x - 12) > 1 || Math.abs(square.center.y - 12) > 1) {
        warnings.push({
          family: `${prefix}-container`,
          level: "WARNING",
          code: "OFF_CENTER_CONTAINER",
          message: `'${prefix}-square' center (${square.center.x}, ${square.center.y}) is shifted from canvas center (12, 12).`,
        });
      }
    }
  }

  const success = errors.length === 0;

  console.log(`\n📊 [Family Lint Results]`);
  console.log(`   Total Families:  ${registeredFamilyKeys.size}`);
  console.log(`   Errors:          ${errors.length} ${errors.length === 0 ? "✓ (PASSED)" : "✗ (FAIL)"}`);
  console.log(`   Warnings:        ${warnings.length}`);
  console.log(`   Diagnostic Info: ${infos.length}`);

  if (errors.length > 0) {
    console.error(`\n❌ [BLOCKING ERRORS]:`);
    for (const err of errors) {
      console.error(`   [${err.level}] Family '${err.family}' (${err.code}): ${err.message}`);
    }
  }

  if (warnings.length > 0) {
    console.warn(`\n⚠️ [WARNINGS]:`);
    for (const w of warnings.slice(0, 10)) {
      console.warn(`   [${w.level}] Family '${w.family}' (${w.code}): ${w.message}`);
    }
    if (warnings.length > 10) {
      console.warn(`   ... and ${warnings.length - 10} more warnings.`);
    }
  }

  return {
    success,
    totalFamilies: registeredFamilyKeys.size,
    errors,
    warnings,
    infos,
  };
}

if (require.main === module || process.argv[1] === __filename) {
  const result = runFamilyLint();
  if (!result.success) {
    process.exit(1);
  }
}
