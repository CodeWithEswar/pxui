import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { ICONS_CATALOG } from "../../lib/icons/catalog";
import {
  analyzeIconPinToPin,
  getPXIconGeometry,
  tokenizePath,
  resolvePathSubpaths,
} from "../../lib/geometry/pin-to-pin";
import {
  PX_GRID,
  ACTION_BAR_WEIGHT,
  ACTION_STANDARD_EXTENT,
  CONTAINER_CORNER_STEP,
  MODIFIER_WEIGHT,
  CANVAS_SAFE_MARGIN,
} from "@pxui/core";

describe("PXUI Canonical Geometry & Pin-to-Pin Engine", () => {
  it("should export canonical geometry design tokens", () => {
    assert.strictEqual(PX_GRID, 24);
    assert.strictEqual(ACTION_BAR_WEIGHT, 4);
    assert.strictEqual(ACTION_STANDARD_EXTENT, 16);
    assert.strictEqual(CONTAINER_CORNER_STEP, 2);
    assert.strictEqual(MODIFIER_WEIGHT, 2);
    assert.strictEqual(CANVAS_SAFE_MARGIN, 2);
  });

  it("should verify exact Section 14 reference pin-to-pin analysis for PXIconAdd", () => {
    const addIcon = ICONS_CATALOG.find((i) => i.name === "add");
    assert.ok(addIcon, "Add icon must exist in canonical catalog");

    const analysis = analyzeIconPinToPin(addIcon);

    // 1. Canvas & Grid
    assert.strictEqual(analysis.canvas.width, 24);
    assert.strictEqual(analysis.canvas.height, 24);

    // 2. Declared & Computed bounds (4,4) -> (20,20)
    assert.deepStrictEqual(analysis.computedBounds, {
      minX: 4,
      minY: 4,
      maxX: 20,
      maxY: 20,
      width: 16,
      height: 16,
    });
    assert.strictEqual(analysis.validation.declaredBoundsMatch, true);

    // 3. Footprint & Center
    assert.strictEqual(analysis.dimensions.width, 16);
    assert.strictEqual(analysis.dimensions.height, 16);
    assert.deepStrictEqual(analysis.center, { x: 12, y: 12 });
    assert.deepStrictEqual(analysis.centroid, { x: 12, y: 12 });
    assert.strictEqual(analysis.opticalOffset.dx, 0);
    assert.strictEqual(analysis.opticalOffset.dy, 0);

    // 4. Margins: T4 R4 B4 L4
    assert.deepStrictEqual(analysis.margins, {
      top: 4,
      right: 4,
      bottom: 4,
      left: 4,
      formatted: "T4 R4 B4 L4",
    });

    // 5. 4-Fold Symmetry
    assert.strictEqual(analysis.symmetry.horizontal, true);
    assert.strictEqual(analysis.symmetry.vertical, true);
    assert.strictEqual(analysis.symmetry.rotational180, true);
    assert.strictEqual(analysis.symmetry.rotational90, true);

    // 6. Section 14 Exact Polygon Vertices traversal
    const expectedCoordinates = [
      { x: 10, y: 4 },
      { x: 14, y: 4 },
      { x: 14, y: 10 },
      { x: 20, y: 10 },
      { x: 20, y: 14 },
      { x: 14, y: 14 },
      { x: 14, y: 20 },
      { x: 10, y: 20 },
      { x: 10, y: 14 },
      { x: 4, y: 14 },
      { x: 4, y: 10 },
      { x: 10, y: 10 },
      { x: 10, y: 4 },
    ];

    assert.strictEqual(analysis.vertices.length, expectedCoordinates.length);
    for (let i = 0; i < expectedCoordinates.length; i++) {
      assert.strictEqual(analysis.vertices[i].x, expectedCoordinates[i].x, `P${i}.x mismatch`);
      assert.strictEqual(analysis.vertices[i].y, expectedCoordinates[i].y, `P${i}.y mismatch`);
    }

    // 7. Edges & Lengths
    assert.strictEqual(analysis.edges.length, 12);
    for (const edge of analysis.edges) {
      assert.ok(edge.orientation === "Horizontal" || edge.orientation === "Vertical");
      assert.ok(edge.length === 4 || edge.length === 6);
    }

    // 8. 24x24 Occupancy Matrix & Active Fill Area (112 occupied cells)
    assert.strictEqual(analysis.occupancyMap.length, 24);
    for (const row of analysis.occupancyMap) {
      assert.strictEqual(row.length, 24);
    }
    assert.strictEqual(analysis.occupiedCellCount, 112);
  });

  it("should verify Close, Check, and Edit reference icons", () => {
    const closeIcon = ICONS_CATALOG.find((i) => i.name === "close");
    assert.ok(closeIcon);
    const closeGeom = analyzeIconPinToPin(closeIcon);
    assert.strictEqual(closeGeom.validation.declaredBoundsMatch, true);
    assert.strictEqual(closeGeom.validation.insideCanvas, true);
    assert.strictEqual(closeGeom.symmetry.horizontal, true);
    assert.strictEqual(closeGeom.symmetry.vertical, true);

    const checkIcon = ICONS_CATALOG.find((i) => i.name === "check");
    assert.ok(checkIcon);
    const checkGeom = analyzeIconPinToPin(checkIcon);
    assert.strictEqual(checkGeom.validation.declaredBoundsMatch, true);
    assert.strictEqual(checkGeom.validation.insideCanvas, true);

    const editIcon = ICONS_CATALOG.find((i) => i.name === "edit");
    assert.ok(editIcon);
    const editGeom = analyzeIconPinToPin(editIcon);
    assert.strictEqual(editGeom.validation.declaredBoundsMatch, true);
    assert.strictEqual(editGeom.validation.insideCanvas, true);
  });

  it("should support programmatic lookup via getPXIconGeometry", () => {
    const geom1 = getPXIconGeometry("px-add");
    assert.ok(geom1);
    assert.strictEqual(geom1.name, "add");

    const geom2 = getPXIconGeometry("add");
    assert.ok(geom2);
    assert.strictEqual(geom2.name, "add");

    const missing = getPXIconGeometry("non-existent-icon");
    assert.strictEqual(missing, null);
  });

  it("should pass bounds and canvas validation across all 148 icons", () => {
    for (const icon of ICONS_CATALOG) {
      const analysis = analyzeIconPinToPin(icon);
      assert.strictEqual(
        analysis.validation.declaredBoundsMatch,
        true,
        `Declared bounds mismatch in '${icon.name}'`
      );
      assert.strictEqual(
        analysis.validation.insideCanvas,
        true,
        `Canvas overflow in '${icon.name}'`
      );
      assert.ok(
        analysis.occupiedCellCount > 0,
        `Zero area path in '${icon.name}'`
      );
    }
  });

  it("should tokenize path and resolve subpaths accurately", () => {
    const cmds = tokenizePath("M10 4h4v6z");
    assert.strictEqual(cmds.length, 4);
    assert.strictEqual(cmds[0].command, "M");
    assert.deepStrictEqual(cmds[0].args, [10, 4]);

    const subpaths = resolvePathSubpaths("M10 4h4v6z");
    assert.strictEqual(subpaths.length, 1);
    assert.strictEqual(subpaths[0].isClosed, true);
  });
});
