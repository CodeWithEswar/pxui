import { QualityGateIssue } from "../types";

export interface PathBounds {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  width: number;
  height: number;
}

export interface PathParseResult {
  bounds: PathBounds;
  segmentsCount: number;
  hasDegenerateSegments: boolean;
  issues: QualityGateIssue[];
  coordinates: number[];
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
      // Match all float/integer numbers including negative signs
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
 * Parses SVG path 'd' string, computes actual bounds, and checks integrity.
 */
export function parseAndAnalyzePath(
  d: string,
  slug: string,
  pathIndex: number,
  _grid: number = 24
): PathParseResult {
  void _grid;
  const issues: QualityGateIssue[] = [];
  const coordinates: number[] = [];
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  let segmentsCount = 0;
  let hasDegenerateSegments = false;

  if (!d || d.trim().length === 0) {
    issues.push({
      gate: "geometry",
      severity: "BLOCKING",
      slug,
      field: `geometry.paths[${pathIndex}]`,
      code: "EMPTY_PATH",
      message: `Path 'd' string is empty.`,
      expected: "Valid SVG path string (e.g. M12 2L2 11h3...)",
      actual: "empty string",
      primitiveIndex: pathIndex,
    });
    return {
      bounds: { minX: 0, minY: 0, maxX: 0, maxY: 0, width: 0, height: 0 },
      segmentsCount: 0,
      hasDegenerateSegments: false,
      issues,
      coordinates,
    };
  }

  const tokenized = tokenizePath(d);
  if (tokenized.length === 0) {
    issues.push({
      gate: "geometry",
      severity: "BLOCKING",
      slug,
      field: `geometry.paths[${pathIndex}]`,
      code: "MALFORMED_PATH",
      message: `Failed to parse any valid SVG commands from path.`,
      expected: "Valid SVG path string",
      actual: d,
      primitiveIndex: pathIndex,
    });
    return {
      bounds: { minX: 0, minY: 0, maxX: 0, maxY: 0, width: 0, height: 0 },
      segmentsCount: 0,
      hasDegenerateSegments: false,
      issues,
      coordinates,
    };
  }

  let curX = 0;
  let curY = 0;
  let startX = 0;
  let startY = 0;

  const updateBounds = (x: number, y: number) => {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  };

  for (let cmdIdx = 0; cmdIdx < tokenized.length; cmdIdx++) {
    const { command, args } = tokenized[cmdIdx];
    segmentsCount++;

    // Collect all coordinates for grid testing
    for (const a of args) {
      coordinates.push(a);
    }

    const isRelative = command === command.toLowerCase();
    const cmdUpper = command.toUpperCase();

    switch (cmdUpper) {
      case "M": {
        // MoveTo: can have multiple coordinate pairs
        for (let i = 0; i < args.length; i += 2) {
          const x = isRelative ? curX + args[i] : args[i];
          const y = isRelative ? curY + args[i + 1] : args[i + 1];
          curX = x;
          curY = y;
          if (i === 0) {
            startX = x;
            startY = y;
          }
          updateBounds(curX, curY);
        }
        break;
      }

      case "L": {
        // LineTo
        for (let i = 0; i < args.length; i += 2) {
          const prevX = curX;
          const prevY = curY;
          curX = isRelative ? curX + args[i] : args[i];
          curY = isRelative ? curY + args[i + 1] : args[i + 1];

          // Check for zero-length degenerate line segment
          if (Math.abs(curX - prevX) < 0.0001 && Math.abs(curY - prevY) < 0.0001) {
            hasDegenerateSegments = true;
            issues.push({
              gate: "geometry",
              severity: "REVIEW",
              slug,
              field: `geometry.paths[${pathIndex}]`,
              code: "ZERO_LENGTH_SEGMENT",
              message: `Zero-length line segment detected at command ${cmdIdx} (${command} ${args[i]},${args[i + 1]}).`,
              primitiveIndex: pathIndex,
              suggestion: "Remove redundant zero-length lineTo command.",
            });
          }

          updateBounds(curX, curY);
        }
        break;
      }

      case "H": {
        // Horizontal LineTo
        for (let i = 0; i < args.length; i++) {
          const prevX = curX;
          curX = isRelative ? curX + args[i] : args[i];
          if (Math.abs(curX - prevX) < 0.0001) {
            hasDegenerateSegments = true;
          }
          updateBounds(curX, curY);
        }
        break;
      }

      case "V": {
        // Vertical LineTo
        for (let i = 0; i < args.length; i++) {
          const prevY = curY;
          curY = isRelative ? curY + args[i] : args[i];
          if (Math.abs(curY - prevY) < 0.0001) {
            hasDegenerateSegments = true;
          }
          updateBounds(curX, curY);
        }
        break;
      }

      case "C": {
        // Cubic Bézier: x1 y1 x2 y2 x y
        for (let i = 0; i < args.length; i += 6) {
          const x1 = isRelative ? curX + args[i] : args[i];
          const y1 = isRelative ? curY + args[i + 1] : args[i + 1];
          const x2 = isRelative ? curX + args[i + 2] : args[i + 2];
          const y2 = isRelative ? curY + args[i + 3] : args[i + 3];
          curX = isRelative ? curX + args[i + 4] : args[i + 4];
          curY = isRelative ? curY + args[i + 5] : args[i + 5];
          updateBounds(x1, y1);
          updateBounds(x2, y2);
          updateBounds(curX, curY);
        }
        break;
      }

      case "S": {
        // Smooth Cubic Bézier: x2 y2 x y
        for (let i = 0; i < args.length; i += 4) {
          const x2 = isRelative ? curX + args[i] : args[i];
          const y2 = isRelative ? curY + args[i + 1] : args[i + 1];
          curX = isRelative ? curX + args[i + 2] : args[i + 2];
          curY = isRelative ? curY + args[i + 3] : args[i + 3];
          updateBounds(x2, y2);
          updateBounds(curX, curY);
        }
        break;
      }

      case "Q": {
        // Quadratic Bézier: x1 y1 x y
        for (let i = 0; i < args.length; i += 4) {
          const x1 = isRelative ? curX + args[i] : args[i];
          const y1 = isRelative ? curY + args[i + 1] : args[i + 1];
          curX = isRelative ? curX + args[i + 2] : args[i + 2];
          curY = isRelative ? curY + args[i + 3] : args[i + 3];
          updateBounds(x1, y1);
          updateBounds(curX, curY);
        }
        break;
      }

      case "T": {
        // Smooth Quadratic Bézier: x y
        for (let i = 0; i < args.length; i += 2) {
          curX = isRelative ? curX + args[i] : args[i];
          curY = isRelative ? curY + args[i + 1] : args[i + 1];
          updateBounds(curX, curY);
        }
        break;
      }

      case "A": {
        // Arc: rx ry x-axis-rotation large-arc-flag sweep-flag x y
        for (let i = 0; i < args.length; i += 7) {
          curX = isRelative ? curX + args[i + 5] : args[i + 5];
          curY = isRelative ? curY + args[i + 6] : args[i + 6];
          updateBounds(curX, curY);
        }
        break;
      }

      case "Z": {
        // ClosePath
        curX = startX;
        curY = startY;
        break;
      }

      default: {
        issues.push({
          gate: "geometry",
          severity: "BLOCKING",
          slug,
          field: `geometry.paths[${pathIndex}]`,
          code: "UNSUPPORTED_COMMAND",
          message: `Unsupported path command '${command}'.`,
          expected: "M, L, H, V, C, S, Q, T, A, Z",
          actual: command,
          primitiveIndex: pathIndex,
        });
        break;
      }
    }
  }

  // If no points were set
  if (minX === Infinity) {
    minX = 0;
    maxX = 0;
    minY = 0;
    maxY = 0;
  }

  const bounds: PathBounds = {
    minX: Math.round(minX * 100) / 100,
    minY: Math.round(minY * 100) / 100,
    maxX: Math.round(maxX * 100) / 100,
    maxY: Math.round(maxY * 100) / 100,
    width: Math.round((maxX - minX) * 100) / 100,
    height: Math.round((maxY - minY) * 100) / 100,
  };

  return {
    bounds,
    segmentsCount,
    hasDegenerateSegments,
    issues,
    coordinates,
  };
}
