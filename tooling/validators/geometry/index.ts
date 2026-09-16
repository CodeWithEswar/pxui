import { PXGeometry } from "../../../icons/schemas/geometry.schema";
import { QualityGateIssue } from "../types";
import { parseAndAnalyzePath, PathBounds } from "./path-parser";

export interface GeometryValidationOptions {
  allowOpticalException?: boolean;
  strictIntegers?: boolean;
}

export function validateGeometry(
  slug: string,
  geometry: PXGeometry,
  options: GeometryValidationOptions = {}
): QualityGateIssue[] {
  const issues: QualityGateIssue[] = [];
  const grid = geometry.grid || 24;

  // 1. Grid value validation
  if (grid !== 24 && grid !== 16 && grid !== 32) {
    issues.push({
      gate: "grid",
      severity: "BLOCKING",
      slug,
      field: "geometry.grid",
      code: "INVALID_GRID",
      message: `Grid dimension must be 16, 24, or 32. Received: ${grid}.`,
      expected: "16 | 24 | 32",
      actual: String(grid),
    });
  }

  // 2. Geometry paths existence check
  if (!geometry.paths || !Array.isArray(geometry.paths) || geometry.paths.length === 0) {
    issues.push({
      gate: "geometry",
      severity: "BLOCKING",
      slug,
      field: "geometry.paths",
      code: "EMPTY_GEOMETRY",
      message: `Geometry must contain at least one vector path definition.`,
      expected: "Non-empty array of PXVectorPath",
      actual: "0 paths",
    });
    return issues;
  }

  let totalMinX = Infinity;
  let totalMinY = Infinity;
  let totalMaxX = -Infinity;
  let totalMaxY = -Infinity;

  // 3. Analyze outline paths
  for (let i = 0; i < geometry.paths.length; i++) {
    const p = geometry.paths[i];
    const parseResult = parseAndAnalyzePath(p.d, slug, i, grid);

    // Merge issues from parser (unsupported commands, empty paths, degenerate segments)
    issues.push(...parseResult.issues);

    const b = parseResult.bounds;
    if (b.minX < totalMinX) totalMinX = b.minX;
    if (b.minY < totalMinY) totalMinY = b.minY;
    if (b.maxX > totalMaxX) totalMaxX = b.maxX;
    if (b.maxY > totalMaxY) totalMaxY = b.maxY;

    // Grid Gate: Check for floating-point precision anomalies
    for (const c of parseResult.coordinates) {
      const decimals = (String(c).split(".")[1] || "").length;
      if (decimals > 2) {
        issues.push({
          gate: "grid",
          severity: "REVIEW",
          slug,
          field: `geometry.paths[${i}]`,
          code: "OFF_GRID_PRECISION_NOISE",
          message: `Coordinate '${c}' has excessive fractional precision (${decimals} decimals). Pixel-native coordinates should be integer or clean half-pixel increments.`,
          actual: String(c),
          expected: "Integer or clean decimal (e.g. 12, 12.5)",
          primitiveIndex: i,
          suggestion: "Round coordinates to integer or 0.5 grid increment.",
        });
      }
    }
  }

  // 4. Analyze filled variant paths if present
  if (geometry.filled && geometry.filled.length > 0) {
    for (let i = 0; i < geometry.filled.length; i++) {
      const p = geometry.filled[i];
      const parseResult = parseAndAnalyzePath(p.d, slug, i, grid);
      issues.push(...parseResult.issues);

      const b = parseResult.bounds;
      if (b.minX < totalMinX) totalMinX = b.minX;
      if (b.minY < totalMinY) totalMinY = b.minY;
      if (b.maxX > totalMaxX) totalMaxX = b.maxX;
      if (b.maxY > totalMaxY) totalMaxY = b.maxY;
    }
  }

  // 5. Bounds Gate (Section 9.7): Geometry must remain within 0..grid
  const opticalTolerance = options.allowOpticalException ? 1.0 : 0.2;
  const computedBounds: PathBounds = {
    minX: totalMinX === Infinity ? 0 : totalMinX,
    minY: totalMinY === Infinity ? 0 : totalMinY,
    maxX: totalMaxX === -Infinity ? 0 : totalMaxX,
    maxY: totalMaxY === -Infinity ? 0 : totalMaxY,
    width: totalMaxX === -Infinity ? 0 : Math.round((totalMaxX - totalMinX) * 100) / 100,
    height: totalMaxY === -Infinity ? 0 : Math.round((totalMaxY - totalMinY) * 100) / 100,
  };

  if (computedBounds.minX < -opticalTolerance) {
    issues.push({
      gate: "bounds",
      severity: "BLOCKING",
      slug,
      field: "geometry.bounds.minX",
      code: "OUT_OF_BOUNDS_LEFT",
      message: `Geometry escapes left canvas boundary: minX = ${computedBounds.minX} (allowed: >= 0).`,
      expected: ">= 0",
      actual: String(computedBounds.minX),
      suggestion: "Translate geometry inwards to stay within viewBox 0..24.",
    });
  }

  if (computedBounds.minY < -opticalTolerance) {
    issues.push({
      gate: "bounds",
      severity: "BLOCKING",
      slug,
      field: "geometry.bounds.minY",
      code: "OUT_OF_BOUNDS_TOP",
      message: `Geometry escapes top canvas boundary: minY = ${computedBounds.minY} (allowed: >= 0).`,
      expected: ">= 0",
      actual: String(computedBounds.minY),
      suggestion: "Translate geometry downwards to stay within viewBox 0..24.",
    });
  }

  if (computedBounds.maxX > grid + opticalTolerance) {
    issues.push({
      gate: "bounds",
      severity: "BLOCKING",
      slug,
      field: "geometry.bounds.maxX",
      code: "OUT_OF_BOUNDS_RIGHT",
      message: `Geometry escapes right canvas boundary: maxX = ${computedBounds.maxX} (allowed: <= ${grid}).`,
      expected: `<= ${grid}`,
      actual: String(computedBounds.maxX),
      suggestion: "Scale or translate geometry to fit within viewBox.",
    });
  }

  if (computedBounds.maxY > grid + opticalTolerance) {
    issues.push({
      gate: "bounds",
      severity: "BLOCKING",
      slug,
      field: "geometry.bounds.maxY",
      code: "OUT_OF_BOUNDS_BOTTOM",
      message: `Geometry escapes bottom canvas boundary: maxY = ${computedBounds.maxY} (allowed: <= ${grid}).`,
      expected: `<= ${grid}`,
      actual: String(computedBounds.maxY),
      suggestion: "Scale or translate geometry to fit within viewBox.",
    });
  }

  // 6. Geometry Dimensions check: must have non-zero width and height
  if (computedBounds.width <= 0 || computedBounds.height <= 0) {
    issues.push({
      gate: "geometry",
      severity: "BLOCKING",
      slug,
      field: "geometry.bounds",
      code: "DEGENERATE_DIMENSIONS",
      message: `Geometry has zero visible area (${computedBounds.width}×${computedBounds.height}).`,
      expected: "width > 0 && height > 0",
      actual: `${computedBounds.width}×${computedBounds.height}`,
    });
  }

  return issues;
}
