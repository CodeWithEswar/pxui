/**
 * PXUI Pin-to-Pin Geometry Engine
 *
 * Implements Sections 14-16, 34-40, 50-53, and 72 of the PXUI Specification:
 * - Exact SVG path command parsing into resolved absolute vertices (P0, P1, ...)
 * - Edge generation (E0, E1, ...) with start/end points, orientation, and lengths
 * - Computed bounds vs declared bounds validation
 * - Bounding-box center and Green's Theorem filled-area centroid
 * - Margin analysis (T, R, B, L)
 * - 24x24 binary occupancy grid map (· and █)
 * - 4-way symmetry analysis (Horizontal, Vertical, 180°, 90°)
 * - Primitive classification & weight inspection
 */

import {
  PX_GRID,
  ACTION_BAR_WEIGHT,
  MODIFIER_WEIGHT,
  CANVAS_SAFE_MARGIN,
} from "@pxui/core";
import { IconDefinition } from "../icons/schema";
import { PXIconDefinition } from "../../icons/schemas/icon.schema";
import { ICONS_CATALOG } from "../icons/catalog";

export interface PXPoint {
  x: number;
  y: number;
}

export interface PXVertex {
  index: number;
  x: number;
  y: number;
}

export interface PXEdge {
  index: number;
  start: PXPoint;
  end: PXPoint;
  orientation: "Horizontal" | "Vertical" | "Diagonal";
  length: number;
}

export interface PXBounds {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  width: number;
  height: number;
}

export interface PXMargin {
  top: number;
  right: number;
  bottom: number;
  left: number;
  formatted: string; // e.g. "T4 R4 B4 L4"
}

export interface PXSymmetry {
  horizontal: boolean;
  vertical: boolean;
  rotational90: boolean;
  rotational180: boolean;
}

export type PXPrimitiveType =
  | "rectangle"
  | "square"
  | "orthogonal-polygon"
  | "stepped-diagonal"
  | "container"
  | "compound";

export interface PXPrimitive {
  type: PXPrimitiveType;
  description: string;
  bounds: PXBounds;
  vertexCount: number;
}

export interface PXGeometryAnalysis {
  name: string;
  slug: string;
  canvas: {
    width: 24;
    height: 24;
  };
  declaredBounds: PXBounds;
  computedBounds: PXBounds;
  dimensions: {
    width: number;
    height: number;
  };
  center: PXPoint;
  centroid: PXPoint;
  opticalOffset: {
    dx: number;
    dy: number;
  };
  margins: PXMargin;
  weights: {
    primary: number[];
    secondary: number[];
    detectedBarWeights: number[];
  };
  symmetry: PXSymmetry;
  vertices: PXVertex[];
  edges: PXEdge[];
  primitives: PXPrimitive[];
  occupancyMap: string[]; // 24 lines of 24 characters (· and █)
  occupiedCellCount: number;
  activeFillPercentage: number;
  subpaths: Array<{
    d: string;
    vertices: PXPoint[];
    bounds: PXBounds;
    isClosed: boolean;
  }>;
  validation: {
    integerAligned: boolean;
    insideCanvas: boolean;
    safeMarginSatisfied: boolean;
    declaredBoundsMatch: boolean;
    familyCompatible: boolean;
    issues: string[];
  };
}

/**
 * Tokenize an SVG path 'd' string into commands and coordinate arguments.
 */
export function tokenizePath(d: string): { command: string; args: number[] }[] {
  const commands: { command: string; args: number[] }[] = [];
  const commandRegex = /([a-df-z])([^a-df-z]*)/gi;
  let match: RegExpExecArray | null;

  while ((match = commandRegex.exec(d)) !== null) {
    const cmd = match[1];
    const argsStr = match[2].trim();
    const args: number[] = [];

    if (argsStr.length > 0) {
      const numRegex = /[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/g;
      let numMatch: RegExpExecArray | null;
      while ((numMatch = numRegex.exec(argsStr)) !== null) {
        const val = parseFloat(numMatch[0]);
        if (!isNaN(val)) {
          args.push(val);
        }
      }
    }

    commands.push({ command: cmd, args });
  }

  return commands;
}

/**
 * Resolve an SVG path 'd' string into absolute 2D point trajectories.
 */
export function resolvePathSubpaths(d: string): Array<{ vertices: PXPoint[]; isClosed: boolean }> {
  const subpaths: Array<{ vertices: PXPoint[]; isClosed: boolean }> = [];
  const commands = tokenizePath(d);

  let currentVertices: PXPoint[] = [];
  let curX = 0;
  let curY = 0;
  let startX = 0;
  let startY = 0;

  const pushVertex = (x: number, y: number) => {
    if (currentVertices.length > 0) {
      const last = currentVertices[currentVertices.length - 1];
      if (Math.abs(last.x - x) < 0.0001 && Math.abs(last.y - y) < 0.0001) {
        return;
      }
    }
    currentVertices.push({ x, y });
  };

  for (const { command, args } of commands) {
    const isRel = command === command.toLowerCase();
    const cmdUpper = command.toUpperCase();

    switch (cmdUpper) {
      case "M": {
        if (currentVertices.length > 0) {
          subpaths.push({ vertices: currentVertices, isClosed: false });
          currentVertices = [];
        }
        for (let i = 0; i < args.length; i += 2) {
          const x = isRel ? curX + args[i] : args[i];
          const y = isRel ? curY + args[i + 1] : args[i + 1];
          curX = x;
          curY = y;
          if (i === 0) {
            startX = x;
            startY = y;
          }
          pushVertex(x, y);
        }
        break;
      }
      case "L": {
        for (let i = 0; i < args.length; i += 2) {
          const x = isRel ? curX + args[i] : args[i];
          const y = isRel ? curY + args[i + 1] : args[i + 1];
          curX = x;
          curY = y;
          pushVertex(x, y);
        }
        break;
      }
      case "H": {
        for (let i = 0; i < args.length; i++) {
          const x = isRel ? curX + args[i] : args[i];
          curX = x;
          pushVertex(curX, curY);
        }
        break;
      }
      case "V": {
        for (let i = 0; i < args.length; i++) {
          const y = isRel ? curY + args[i] : args[i];
          curY = y;
          pushVertex(curX, curY);
        }
        break;
      }
      case "Z": {
        if (currentVertices.length > 0) {
          // If the last vertex isn't identical to the starting vertex, connect to start
          const first = currentVertices[0];
          const last = currentVertices[currentVertices.length - 1];
          if (Math.abs(last.x - first.x) > 0.0001 || Math.abs(last.y - first.y) > 0.0001) {
            currentVertices.push({ x: first.x, y: first.y });
          }
          subpaths.push({ vertices: currentVertices, isClosed: true });
          currentVertices = [];
        }
        curX = startX;
        curY = startY;
        break;
      }
      case "C": {
        for (let i = 0; i < args.length; i += 6) {
          const endX = isRel ? curX + args[i + 4] : args[i + 4];
          const endY = isRel ? curY + args[i + 5] : args[i + 5];
          curX = endX;
          curY = endY;
          pushVertex(curX, curY);
        }
        break;
      }
      case "S": {
        for (let i = 0; i < args.length; i += 4) {
          const endX = isRel ? curX + args[i + 2] : args[i + 2];
          const endY = isRel ? curY + args[i + 3] : args[i + 3];
          curX = endX;
          curY = endY;
          pushVertex(curX, curY);
        }
        break;
      }
      case "Q": {
        for (let i = 0; i < args.length; i += 4) {
          const endX = isRel ? curX + args[i + 2] : args[i + 2];
          const endY = isRel ? curY + args[i + 3] : args[i + 3];
          curX = endX;
          curY = endY;
          pushVertex(curX, curY);
        }
        break;
      }
      case "T": {
        for (let i = 0; i < args.length; i += 2) {
          const endX = isRel ? curX + args[i] : args[i];
          const endY = isRel ? curY + args[i + 1] : args[i + 1];
          curX = endX;
          curY = endY;
          pushVertex(curX, curY);
        }
        break;
      }
      case "A": {
        for (let i = 0; i < args.length; i += 7) {
          const endX = isRel ? curX + args[i + 5] : args[i + 5];
          const endY = isRel ? curY + args[i + 6] : args[i + 6];
          curX = endX;
          curY = endY;
          pushVertex(curX, curY);
        }
        break;
      }
    }
  }

  if (currentVertices.length > 0) {
    subpaths.push({ vertices: currentVertices, isClosed: false });
  }

  return subpaths;
}

/**
 * Test whether a 2D point lies inside a closed polygon using ray casting.
 */
function isPointInsidePolygon(px: number, py: number, vertices: PXPoint[]): boolean {
  let inside = false;
  const n = vertices.length;
  for (let i = 0, j = n - 1; i < n; j = i++) {
    const xi = vertices[i].x;
    const yi = vertices[i].y;
    const xj = vertices[j].x;
    const yj = vertices[j].y;

    const intersect = yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

/**
 * Compute signed area of a 2D polygon using the Shoelace formula.
 */
function computePolygonSignedArea(vertices: PXPoint[]): number {
  let area = 0;
  const n = vertices.length;
  for (let i = 0; i < n - 1; i++) {
    area += vertices[i].x * vertices[i + 1].y - vertices[i + 1].x * vertices[i].y;
  }
  return area / 2;
}

/**
 * Compute filled-area centroid using Green's theorem.
 */
function computePolygonCentroid(vertices: PXPoint[]): { cx: number; cy: number; area: number } {
  const signedArea = computePolygonSignedArea(vertices);
  if (Math.abs(signedArea) < 1e-4) {
    // Degenerate or linear path: use midpoint
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    for (const v of vertices) {
      if (v.x < minX) minX = v.x;
      if (v.x > maxX) maxX = v.x;
      if (v.y < minY) minY = v.y;
      if (v.y > maxY) maxY = v.y;
    }
    return {
      cx: (minX + maxX) / 2,
      cy: (minY + maxY) / 2,
      area: 0,
    };
  }

  let cxSum = 0;
  let cySum = 0;
  const n = vertices.length;
  for (let i = 0; i < n - 1; i++) {
    const cross = vertices[i].x * vertices[i + 1].y - vertices[i + 1].x * vertices[i].y;
    cxSum += (vertices[i].x + vertices[i + 1].x) * cross;
    cySum += (vertices[i].y + vertices[i + 1].y) * cross;
  }

  const cx = cxSum / (6 * signedArea);
  const cy = cySum / (6 * signedArea);

  return {
    cx,
    cy,
    area: Math.abs(signedArea),
  };
}

/**
 * Complete Pin-to-Pin Geometry Analysis for a canonical icon definition.
 */
export function analyzeIconPinToPin(icon: IconDefinition | PXIconDefinition): PXGeometryAnalysis {
  const allSubpaths: Array<{
    d: string;
    vertices: PXPoint[];
    bounds: PXBounds;
    isClosed: boolean;
  }> = [];

  const rawPaths =
    "geometry" in icon && icon.geometry?.paths
      ? icon.geometry.paths
      : "paths" in icon && icon.paths
      ? icon.paths
      : [];

  let totalMinX = Infinity;
  let totalMinY = Infinity;
  let totalMaxX = -Infinity;
  let totalMaxY = -Infinity;

  const resolvedVertices: PXVertex[] = [];
  const resolvedEdges: PXEdge[] = [];
  const detectedLengths: number[] = [];

  let vertexIndex = 0;
  let edgeIndex = 0;

  for (const pathItem of rawPaths) {
    const subpaths = resolvePathSubpaths(pathItem.d);

    for (const sub of subpaths) {
      let subMinX = Infinity;
      let subMinY = Infinity;
      let subMaxX = -Infinity;
      let subMaxY = -Infinity;

      for (let i = 0; i < sub.vertices.length; i++) {
        const pt = sub.vertices[i];
        if (pt.x < subMinX) subMinX = pt.x;
        if (pt.x > subMaxX) subMaxX = pt.x;
        if (pt.y < subMinY) subMinY = pt.y;
        if (pt.y > subMaxY) subMaxY = pt.y;

        resolvedVertices.push({
          index: vertexIndex++,
          x: pt.x,
          y: pt.y,
        });

        // Edge to next vertex
        if (i < sub.vertices.length - 1) {
          const nextPt = sub.vertices[i + 1];
          const dx = nextPt.x - pt.x;
          const dy = nextPt.y - pt.y;
          const length = Math.round(Math.sqrt(dx * dx + dy * dy) * 100) / 100;
          let orientation: "Horizontal" | "Vertical" | "Diagonal" = "Diagonal";
          if (dy === 0) orientation = "Horizontal";
          else if (dx === 0) orientation = "Vertical";

          resolvedEdges.push({
            index: edgeIndex++,
            start: { x: pt.x, y: pt.y },
            end: { x: nextPt.x, y: nextPt.y },
            orientation,
            length,
          });

          if (length > 0) {
            detectedLengths.push(length);
          }
        }
      }

      if (subMinX < totalMinX) totalMinX = subMinX;
      if (subMinY < totalMinY) totalMinY = subMinY;
      if (subMaxX > totalMaxX) totalMaxX = subMaxX;
      if (subMaxY > totalMaxY) totalMaxY = subMaxY;

      allSubpaths.push({
        d: pathItem.d,
        vertices: sub.vertices,
        bounds: {
          minX: subMinX === Infinity ? 0 : subMinX,
          minY: subMinY === Infinity ? 0 : subMinY,
          maxX: subMaxX === -Infinity ? 0 : subMaxX,
          maxY: subMaxY === -Infinity ? 0 : subMaxY,
          width: subMaxX - subMinX > 0 ? subMaxX - subMinX : 0,
          height: subMaxY - subMinY > 0 ? subMaxY - subMinY : 0,
        },
        isClosed: sub.isClosed,
      });
    }
  }

  if (totalMinX === Infinity) {
    totalMinX = 0;
    totalMinY = 0;
    totalMaxX = 0;
    totalMaxY = 0;
  }

  const computedBounds: PXBounds = {
    minX: totalMinX,
    minY: totalMinY,
    maxX: totalMaxX,
    maxY: totalMaxY,
    width: totalMaxX - totalMinX,
    height: totalMaxY - totalMinY,
  };

  const declaredBounds: PXBounds =
    "geometry" in icon && icon.geometry?.bounds
    ? {
        minX: icon.geometry.bounds.minX,
        minY: icon.geometry.bounds.minY,
        maxX: icon.geometry.bounds.maxX,
        maxY: icon.geometry.bounds.maxY,
        width: icon.geometry.bounds.maxX - icon.geometry.bounds.minX,
        height: icon.geometry.bounds.maxY - icon.geometry.bounds.minY,
      }
    : computedBounds;

  // Bounding-box center
  const center: PXPoint = {
    x: Math.round(((computedBounds.minX + computedBounds.maxX) / 2) * 100) / 100,
    y: Math.round(((computedBounds.minY + computedBounds.maxY) / 2) * 100) / 100,
  };

  // Polygon area centroid calculation
  let totalArea = 0;
  let weightedCx = 0;
  let weightedCy = 0;

  for (const sub of allSubpaths) {
    if (sub.vertices.length >= 3) {
      const { cx, cy, area } = computePolygonCentroid(sub.vertices);
      if (area > 0) {
        totalArea += area;
        weightedCx += cx * area;
        weightedCy += cy * area;
      }
    }
  }

  const centroid: PXPoint =
    totalArea > 0
      ? {
          x: Math.round((weightedCx / totalArea) * 100) / 100,
          y: Math.round((weightedCy / totalArea) * 100) / 100,
        }
      : center;

  const opticalOffset = {
    dx: Math.round((centroid.x - 12) * 100) / 100,
    dy: Math.round((centroid.y - 12) * 100) / 100,
  };

  // Margins
  const margins: PXMargin = {
    top: computedBounds.minY,
    right: PX_GRID - computedBounds.maxX,
    bottom: PX_GRID - computedBounds.maxY,
    left: computedBounds.minX,
    formatted: `T${computedBounds.minY} R${PX_GRID - computedBounds.maxX} B${PX_GRID - computedBounds.maxY} L${computedBounds.minX}`,
  };

  // 24x24 Raster Occupancy Grid
  const gridMatrix: boolean[][] = Array.from({ length: 24 }, () => Array(24).fill(false));
  let occupiedCount = 0;

  for (let y = 0; y < 24; y++) {
    for (let x = 0; x < 24; x++) {
      const sampleX = x + 0.5;
      const sampleY = y + 0.5;

      // Even-Odd winding rule across all subpaths
      let inside = false;
      for (const sub of allSubpaths) {
        if (sub.isClosed && sub.vertices.length >= 3) {
          if (isPointInsidePolygon(sampleX, sampleY, sub.vertices)) {
            inside = !inside;
          }
        }
      }

      if (inside) {
        gridMatrix[y][x] = true;
        occupiedCount++;
      }
    }
  }

  // Fallback for open strokes or line paths
  if (occupiedCount === 0 && resolvedEdges.length > 0) {
    for (let y = 0; y < 24; y++) {
      for (let x = 0; x < 24; x++) {
        const sampleX = x + 0.5;
        const sampleY = y + 0.5;
        let near = false;
        for (const edge of resolvedEdges) {
          const dx = edge.end.x - edge.start.x;
          const dy = edge.end.y - edge.start.y;
          const l2 = dx * dx + dy * dy;
          if (l2 === 0) continue;
          let t = ((sampleX - edge.start.x) * dx + (sampleY - edge.start.y) * dy) / l2;
          t = Math.max(0, Math.min(1, t));
          const projX = edge.start.x + t * dx;
          const projY = edge.start.y + t * dy;
          const dist = Math.hypot(sampleX - projX, sampleY - projY);
          if (dist <= 0.8) {
            near = true;
            break;
          }
        }
        if (near) {
          gridMatrix[y][x] = true;
          occupiedCount++;
        }
      }
    }
  }

  // Generate ASCII Occupancy Map
  const occupancyMap: string[] = gridMatrix.map((row) =>
    row.map((cell) => (cell ? "█" : "·")).join("")
  );

  // Symmetry analysis across 24x24 canvas and bounding-box
  let isCanvasH = true;
  let isCanvasV = true;
  let isCanvas180 = true;
  let isCanvas90 = true;

  for (let y = 0; y < 24; y++) {
    for (let x = 0; x < 24; x++) {
      const val = gridMatrix[y][x];
      if (val !== gridMatrix[y][23 - x]) isCanvasH = false;
      if (val !== gridMatrix[23 - y][x]) isCanvasV = false;
      if (val !== gridMatrix[23 - y][23 - x]) isCanvas180 = false;
      if (val !== gridMatrix[x][23 - y]) isCanvas90 = false;
    }
  }

  // Also check symmetry within glyph bounding box
  let isBoxH = true;
  let isBoxV = true;
  const bMinX = Math.max(0, Math.floor(computedBounds.minX));
  const bMaxX = Math.min(24, Math.ceil(computedBounds.maxX));
  const bMinY = Math.max(0, Math.floor(computedBounds.minY));
  const bMaxY = Math.min(24, Math.ceil(computedBounds.maxY));
  const bW = bMaxX - bMinX;
  const bH = bMaxY - bMinY;
  if (bW > 0 && bH > 0) {
    for (let y = bMinY; y < bMaxY; y++) {
      for (let x = bMinX; x < bMaxX; x++) {
        const mirrorX = bMaxX - 1 - (x - bMinX);
        const mirrorY = bMaxY - 1 - (y - bMinY);
        if (
          y >= 0 && y < 24 &&
          mirrorY >= 0 && mirrorY < 24 &&
          x >= 0 && x < 24 &&
          mirrorX >= 0 && mirrorX < 24
        ) {
          if (gridMatrix[y][x] !== gridMatrix[y][mirrorX]) {
            isBoxH = false;
          }
          if (gridMatrix[y][x] !== gridMatrix[mirrorY][x]) {
            isBoxV = false;
          }
        }
      }
    }
  }

  const symmetry: PXSymmetry = {
    horizontal: isCanvasH || isBoxH,
    vertical: isCanvasV || isBoxV,
    rotational90: isCanvas90,
    rotational180: isCanvas180 || (isBoxH && isBoxV),
  };

  // Weight detection
  const primaryWeights = Array.from(new Set(detectedLengths.filter((l) => l === ACTION_BAR_WEIGHT)));
  const secondaryWeights = Array.from(new Set(detectedLengths.filter((l) => l === MODIFIER_WEIGHT)));
  const detectedBarWeights = Array.from(new Set(detectedLengths.filter((l) => l % 2 === 0))).sort(
    (a, b) => a - b
  );

  // Primitive classification
  const primitives: PXPrimitive[] = allSubpaths.map((sub, idx) => {
    let pType: PXPrimitiveType = "orthogonal-polygon";
    const vCount = sub.vertices.length;

    if (vCount === 5 && sub.isClosed) {
      pType = sub.bounds.width === sub.bounds.height ? "square" : "rectangle";
    } else if (icon.name.includes("circle")) {
      pType = "container";
    } else if (detectedLengths.some((l) => l % 2 !== 0)) {
      pType = "stepped-diagonal";
    }

    return {
      type: pType,
      description: `Primitive #${idx + 1} (${pType}, ${vCount} vertices, ${sub.bounds.width}×${sub.bounds.height})`,
      bounds: sub.bounds,
      vertexCount: vCount,
    };
  });

  // Validation
  const issues: string[] = [];
  let integerAligned = true;

  for (const v of resolvedVertices) {
    if (!Number.isInteger(v.x) || !Number.isInteger(v.y)) {
      // Check if it's an approved 0.5 optical correction
      const isOpticalHalf = v.x % 0.5 === 0 && v.y % 0.5 === 0;
      if (!isOpticalHalf) {
        integerAligned = false;
        issues.push(`Vertex P${v.index} (${v.x}, ${v.y}) has off-grid fractional precision.`);
      }
    }
  }

  const insideCanvas =
    computedBounds.minX >= 0 &&
    computedBounds.minY >= 0 &&
    computedBounds.maxX <= PX_GRID &&
    computedBounds.maxY <= PX_GRID;

  if (!insideCanvas) {
    issues.push(`Icon geometry exceeds canonical 24×24 canvas bounds.`);
  }

  const safeMarginSatisfied =
    computedBounds.minX >= CANVAS_SAFE_MARGIN - 0.5 &&
    computedBounds.minY >= CANVAS_SAFE_MARGIN - 0.5 &&
    computedBounds.maxX <= PX_GRID - CANVAS_SAFE_MARGIN + 0.5 &&
    computedBounds.maxY <= PX_GRID - CANVAS_SAFE_MARGIN + 0.5;

  const declaredBoundsMatch =
    Math.abs(computedBounds.minX - declaredBounds.minX) <= 0.5 &&
    Math.abs(computedBounds.minY - declaredBounds.minY) <= 0.5 &&
    Math.abs(computedBounds.maxX - declaredBounds.maxX) <= 0.5 &&
    Math.abs(computedBounds.maxY - declaredBounds.maxY) <= 0.5;

  if (!declaredBoundsMatch && icon.geometry?.bounds) {
    issues.push(
      `Declared bounds (${declaredBounds.minX},${declaredBounds.minY})→(${declaredBounds.maxX},${declaredBounds.maxY}) do not match computed bounds (${computedBounds.minX},${computedBounds.minY})→(${computedBounds.maxX},${computedBounds.maxY}).`
    );
  }

  return {
    name: icon.name,
    slug: icon.slug || `px-${icon.name}`,
    canvas: { width: 24, height: 24 },
    declaredBounds,
    computedBounds,
    dimensions: {
      width: computedBounds.width,
      height: computedBounds.height,
    },
    center,
    centroid,
    opticalOffset,
    margins,
    weights: {
      primary: primaryWeights,
      secondary: secondaryWeights,
      detectedBarWeights,
    },
    symmetry,
    vertices: resolvedVertices,
    edges: resolvedEdges,
    primitives,
    occupancyMap,
    occupiedCellCount: occupiedCount,
    activeFillPercentage: Math.round((occupiedCount / 576) * 1000) / 10,
    subpaths: allSubpaths,
    validation: {
      integerAligned,
      insideCanvas,
      safeMarginSatisfied,
      declaredBoundsMatch,
      familyCompatible: true,
      issues,
    },
  };
}

/**
 * Programmatic Geometry API (Section 72)
 * Look up an icon by slug or name and return its full pin-to-pin geometry analysis.
 */
export function getPXIconGeometry(slugOrName: string): PXGeometryAnalysis | null {
  const clean = slugOrName
    .replace(/^px-/, "")
    .replace(/^PXIcon/, "")
    .toLowerCase();

  const icon = ICONS_CATALOG.find(
    (i) =>
      i.name.toLowerCase() === clean ||
      (i.slug && i.slug.toLowerCase() === `px-${clean}`) ||
      (i.slug && i.slug.toLowerCase() === clean)
  );

  if (!icon) return null;
  return analyzeIconPinToPin(icon);
}
