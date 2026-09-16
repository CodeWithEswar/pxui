/**
 * Client-safe SVG path parser and geometry analysis engine for PXUI Icon Specifications.
 * Extracts bounding boxes, command streams, segment counts, and rasterized pixel cells.
 */

export interface PathBounds {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  width: number;
  height: number;
}

export interface PathCommand {
  command: string;
  args: number[];
  raw: string;
  index: number;
}

export interface GeometryAnalysis {
  bounds: PathBounds;
  center: { x: number; y: number };
  segmentCount: number;
  commands: PathCommand[];
  occupiedCellCount: number;
  occupiedCells: Set<string>; // "x,y" coordinate pairs
  opticalCorrection: { x: number; y: number };
}

/**
 * Tokenize an SVG path 'd' string into commands and numeric arguments.
 */
export function tokenizePath(d: string): PathCommand[] {
  const commands: PathCommand[] = [];
  const commandRegex = /([a-df-z])([^a-df-z]*)/gi;
  let match: RegExpExecArray | null;
  let idx = 0;

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

    commands.push({
      command: cmd,
      args,
      raw: `${cmd} ${args.join(" ")}`.trim(),
      index: idx++,
    });
  }

  return commands;
}

/**
 * Compute the bounding box and geometry metrics from multiple SVG paths on a 24x24 grid.
 */
export function analyzeGeometry(paths: Array<{ d: string }>, grid: number = 24): GeometryAnalysis {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  let totalSegments = 0;
  const allCommands: PathCommand[] = [];
  const occupiedCells = new Set<string>();

  for (const p of paths) {
    const cmds = tokenizePath(p.d);
    allCommands.push(...cmds);

    let curX = 0;
    let curY = 0;
    let startX = 0;
    let startY = 0;

    for (const item of cmds) {
      const { command, args } = item;
      const isRel = command === command.toLowerCase();
      const cmdUpper = command.toUpperCase();

      totalSegments++;

      const updatePoint = (x: number, y: number) => {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;

        // Mark discrete 24x24 cell
        const cellX = Math.floor(Math.max(0, Math.min(grid - 1, x)));
        const cellY = Math.floor(Math.max(0, Math.min(grid - 1, y)));
        occupiedCells.add(`${cellX},${cellY}`);
      };

      switch (cmdUpper) {
        case "M": {
          for (let i = 0; i < args.length; i += 2) {
            const x = isRel ? curX + args[i] : args[i];
            const y = isRel ? curY + args[i + 1] : args[i + 1];
            curX = x;
            curY = y;
            if (i === 0) {
              startX = x;
              startY = y;
            }
            updatePoint(curX, curY);
          }
          break;
        }
        case "L": {
          for (let i = 0; i < args.length; i += 2) {
            const x = isRel ? curX + args[i] : args[i];
            const y = isRel ? curY + args[i + 1] : args[i + 1];
            
            // Raster line between curX,curY and x,y for cell occupancy
            rasterizeLine(curX, curY, x, y, occupiedCells, grid);
            curX = x;
            curY = y;
            updatePoint(curX, curY);
          }
          break;
        }
        case "H": {
          for (let i = 0; i < args.length; i++) {
            const x = isRel ? curX + args[i] : args[i];
            rasterizeLine(curX, curY, x, curY, occupiedCells, grid);
            curX = x;
            updatePoint(curX, curY);
          }
          break;
        }
        case "V": {
          for (let i = 0; i < args.length; i++) {
            const y = isRel ? curY + args[i] : args[i];
            rasterizeLine(curX, curY, curX, y, occupiedCells, grid);
            curY = y;
            updatePoint(curX, curY);
          }
          break;
        }
        case "Z": {
          rasterizeLine(curX, curY, startX, startY, occupiedCells, grid);
          curX = startX;
          curY = startY;
          break;
        }
        case "C": {
          for (let i = 0; i < args.length; i += 6) {
            const cp1X = isRel ? curX + args[i] : args[i];
            const cp1Y = isRel ? curY + args[i + 1] : args[i + 1];
            const cp2X = isRel ? curX + args[i + 2] : args[i + 2];
            const cp2Y = isRel ? curY + args[i + 3] : args[i + 3];
            const endX = isRel ? curX + args[i + 4] : args[i + 4];
            const endY = isRel ? curY + args[i + 5] : args[i + 5];

            updatePoint(cp1X, cp1Y);
            updatePoint(cp2X, cp2Y);
            updatePoint(endX, endY);
            curX = endX;
            curY = endY;
          }
          break;
        }
        case "S": {
          for (let i = 0; i < args.length; i += 4) {
            const cp2X = isRel ? curX + args[i] : args[i];
            const cp2Y = isRel ? curY + args[i + 1] : args[i + 1];
            const endX = isRel ? curX + args[i + 2] : args[i + 2];
            const endY = isRel ? curY + args[i + 3] : args[i + 3];

            updatePoint(cp2X, cp2Y);
            updatePoint(endX, endY);
            curX = endX;
            curY = endY;
          }
          break;
        }
        case "Q": {
          for (let i = 0; i < args.length; i += 4) {
            const cpX = isRel ? curX + args[i] : args[i];
            const cpY = isRel ? curY + args[i + 1] : args[i + 1];
            const endX = isRel ? curX + args[i + 2] : args[i + 2];
            const endY = isRel ? curY + args[i + 3] : args[i + 3];

            updatePoint(cpX, cpY);
            updatePoint(endX, endY);
            curX = endX;
            curY = endY;
          }
          break;
        }
        case "T": {
          for (let i = 0; i < args.length; i += 2) {
            const endX = isRel ? curX + args[i] : args[i];
            const endY = isRel ? curY + args[i + 1] : args[i + 1];
            updatePoint(endX, endY);
            curX = endX;
            curY = endY;
          }
          break;
        }
        case "A": {
          // Arc: rx ry x-axis-rotation large-arc-flag sweep-flag x y
          for (let i = 0; i < args.length; i += 7) {
            const endX = isRel ? curX + args[i + 5] : args[i + 5];
            const endY = isRel ? curY + args[i + 6] : args[i + 6];
            updatePoint(endX, endY);
            curX = endX;
            curY = endY;
          }
          break;
        }
      }
    }
  }

  if (minX === Infinity) {
    minX = 0;
    maxX = 0;
    minY = 0;
    maxY = 0;
  }

  const bounds: PathBounds = {
    minX: Math.round(minX * 10) / 10,
    minY: Math.round(minY * 10) / 10,
    maxX: Math.round(maxX * 10) / 10,
    maxY: Math.round(maxY * 10) / 10,
    width: Math.round((maxX - minX) * 10) / 10,
    height: Math.round((maxY - minY) * 10) / 10,
  };

  const center = {
    x: Math.round(((bounds.minX + bounds.maxX) / 2) * 10) / 10,
    y: Math.round(((bounds.minY + bounds.maxY) / 2) * 10) / 10,
  };

  const opticalCorrection = {
    x: Math.round((center.x - 12) * 10) / 10,
    y: Math.round((center.y - 12) * 10) / 10,
  };

  return {
    bounds,
    center,
    segmentCount: totalSegments,
    commands: allCommands,
    occupiedCellCount: occupiedCells.size,
    occupiedCells,
    opticalCorrection,
  };
}

/**
 * Bresenham-like cell traversal for occupied pixel estimation
 */
function rasterizeLine(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  cells: Set<string>,
  grid: number
) {
  const steps = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0), 1) * 2;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = x0 + (x1 - x0) * t;
    const y = y0 + (y1 - y0) * t;
    const cx = Math.floor(Math.max(0, Math.min(grid - 1, x)));
    const cy = Math.floor(Math.max(0, Math.min(grid - 1, y)));
    cells.add(`${cx},${cy}`);
  }
}
