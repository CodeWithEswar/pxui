import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { ICONS_CATALOG } from "../../lib/icons/catalog";
import { CANONICAL_ICONS } from "../../icons/source";
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

  it("should pass bounds and canvas validation across all icons in catalog", () => {
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

  it("should verify Edit family canonical consistency and container clearance", () => {
    const editCircle = CANONICAL_ICONS.find((i) => i.slug === "px-edit-circle");
    const editSquare = CANONICAL_ICONS.find((i) => i.slug === "px-edit-square");
    assert.ok(editCircle && editSquare);

    // Both containers use identical inner pencil primitive:
    const innerPencil = "M15 7h2v1h-2z M14 8h1v1h-1z M16 8h1v1h-1z M12 9h4v2h-4z M10 11h4v2h-4z M9 13h1v1h-1z M11 13h1v1h-1z M8 14h2v1h-2z M7 15h2v2h-2z";
    assert.ok(editCircle.geometry.paths[0].d.includes(innerPencil));
    assert.ok(editSquare.geometry.paths[0].d.includes(innerPencil));

    // Edit locked has decoupled top-left pencil and bottom-right padlock
    const editLocked = CANONICAL_ICONS.find((i) => i.slug === "px-edit-locked");
    assert.ok(editLocked);
    const lockedAnalysis = analyzeIconPinToPin(editLocked);
    assert.strictEqual(lockedAnalysis.validation.declaredBoundsMatch, true);
    assert.strictEqual(lockedAnalysis.validation.insideCanvas, true);
  });

  it("should verify Batch 006 Copy and Save family size hierarchy", () => {
    const copySmall = analyzeIconPinToPin(CANONICAL_ICONS.find((i) => i.slug === "px-copy-small")!);
    const copyBase = analyzeIconPinToPin(CANONICAL_ICONS.find((i) => i.slug === "px-copy")!);
    const copyLarge = analyzeIconPinToPin(CANONICAL_ICONS.find((i) => i.slug === "px-copy-large")!);

    assert.ok(
      copySmall.occupiedCellCount < copyBase.occupiedCellCount,
      `CopySmall (${copySmall.occupiedCellCount}) should be < CopyBase (${copyBase.occupiedCellCount})`
    );
    assert.ok(
      copyBase.occupiedCellCount < copyLarge.occupiedCellCount,
      `CopyBase (${copyBase.occupiedCellCount}) should be < CopyLarge (${copyLarge.occupiedCellCount})`
    );

    const saveSmall = analyzeIconPinToPin(CANONICAL_ICONS.find((i) => i.slug === "px-save-small")!);
    const saveBase = analyzeIconPinToPin(CANONICAL_ICONS.find((i) => i.slug === "px-save")!);
    const saveLarge = analyzeIconPinToPin(CANONICAL_ICONS.find((i) => i.slug === "px-save-large")!);

    assert.ok(
      saveSmall.occupiedCellCount < saveBase.occupiedCellCount,
      `SaveSmall (${saveSmall.occupiedCellCount}) should be < SaveBase (${saveBase.occupiedCellCount})`
    );
    assert.ok(
      saveBase.occupiedCellCount < saveLarge.occupiedCellCount,
      `SaveBase (${saveBase.occupiedCellCount}) should be < SaveLarge (${saveLarge.occupiedCellCount})`
    );
  });

  it("should verify Batch 006 directional pairs reflection symmetry", () => {
    const copyLeft = analyzeIconPinToPin(CANONICAL_ICONS.find((i) => i.slug === "px-copy-left")!);
    const copyRight = analyzeIconPinToPin(CANONICAL_ICONS.find((i) => i.slug === "px-copy-right")!);
    assert.strictEqual(copyLeft.occupiedCellCount, copyRight.occupiedCellCount, "CopyLeft and CopyRight cell count mismatch");

    const copyUp = analyzeIconPinToPin(CANONICAL_ICONS.find((i) => i.slug === "px-copy-up")!);
    const copyDown = analyzeIconPinToPin(CANONICAL_ICONS.find((i) => i.slug === "px-copy-down")!);
    assert.strictEqual(copyUp.occupiedCellCount, copyDown.occupiedCellCount, "CopyUp and CopyDown cell count mismatch");

    const saveLeft = analyzeIconPinToPin(CANONICAL_ICONS.find((i) => i.slug === "px-save-left")!);
    const saveRight = analyzeIconPinToPin(CANONICAL_ICONS.find((i) => i.slug === "px-save-right")!);
    assert.strictEqual(saveLeft.occupiedCellCount, saveRight.occupiedCellCount, "SaveLeft and SaveRight cell count mismatch");

    const saveUp = analyzeIconPinToPin(CANONICAL_ICONS.find((i) => i.slug === "px-save-up")!);
    const saveDown = analyzeIconPinToPin(CANONICAL_ICONS.find((i) => i.slug === "px-save-down")!);
    assert.strictEqual(saveUp.occupiedCellCount, saveDown.occupiedCellCount, "SaveUp and SaveDown cell count mismatch");
  });

  it("should verify Batch 006 container consistency", () => {
    const copyCircle = CANONICAL_ICONS.find((i) => i.slug === "px-copy-circle");
    const copySquare = CANONICAL_ICONS.find((i) => i.slug === "px-copy-square");
    assert.ok(copyCircle && copySquare);

    const innerCopy = "M10 7h7v7h-3v-2h1V9h-3v1h-2V7z M7 10h7v7H7v-7zm2 2v3h3v-3H9z";
    assert.ok(copyCircle.geometry.paths[0].d.includes(innerCopy));
    assert.ok(copySquare.geometry.paths[0].d.includes(innerCopy));

    const saveCircle = CANONICAL_ICONS.find((i) => i.slug === "px-save-circle");
    const saveSquare = CANONICAL_ICONS.find((i) => i.slug === "px-save-square");
    assert.ok(saveCircle && saveSquare);

    const innerSave = "M7 7h9v1h1v9H7V7zm2 2h5v2H9V9zm1 4h5v3h-5v-3z";
    assert.ok(saveCircle.geometry.paths[0].d.includes(innerSave));
    assert.ok(saveSquare.geometry.paths[0].d.includes(innerSave));
  });

  it("should verify Batch 007 Share, Refresh, and Sync family size hierarchy", () => {
    for (const fam of ["share", "refresh", "sync"]) {
      const small = analyzeIconPinToPin(CANONICAL_ICONS.find((i) => i.slug === `px-${fam}-small`)!);
      const base = analyzeIconPinToPin(CANONICAL_ICONS.find((i) => i.slug === `px-${fam}`)!);
      const large = analyzeIconPinToPin(CANONICAL_ICONS.find((i) => i.slug === `px-${fam}-large`)!);

      assert.ok(
        small.occupiedCellCount < base.occupiedCellCount,
        `${fam}-small (${small.occupiedCellCount}) should be < ${fam}-base (${base.occupiedCellCount})`
      );
      assert.ok(
        base.occupiedCellCount < large.occupiedCellCount,
        `${fam}-base (${base.occupiedCellCount}) should be < ${fam}-large (${large.occupiedCellCount})`
      );
    }
  });

  it("should verify Batch 007 directional pairs reflection symmetry", () => {
    const hPairs = [["share-left", "share-right"], ["refresh-left", "refresh-right"], ["sync-left", "sync-right"]];
    for (const [l, r] of hPairs) {
      const left = analyzeIconPinToPin(CANONICAL_ICONS.find((i) => i.slug === `px-${l}`)!);
      const right = analyzeIconPinToPin(CANONICAL_ICONS.find((i) => i.slug === `px-${r}`)!);
      assert.strictEqual(left.occupiedCellCount, right.occupiedCellCount, `${l} and ${r} cell count mismatch`);
    }

    const vPairs = [["share-up", "share-down"], ["refresh-up", "refresh-down"], ["sync-up", "sync-down"]];
    for (const [u, d] of vPairs) {
      const up = analyzeIconPinToPin(CANONICAL_ICONS.find((i) => i.slug === `px-${u}`)!);
      const down = analyzeIconPinToPin(CANONICAL_ICONS.find((i) => i.slug === `px-${d}`)!);
      assert.strictEqual(up.occupiedCellCount, down.occupiedCellCount, `${u} and ${d} cell count mismatch`);
    }
  });

  it("should verify Batch 007 container consistency and inner glyph equality", () => {
    for (const fam of ["share", "refresh", "sync"]) {
      const circle = CANONICAL_ICONS.find((i) => i.slug === `px-${fam}-circle`);
      const square = CANONICAL_ICONS.find((i) => i.slug === `px-${fam}-square`);
      assert.ok(circle && square, `Missing container pair for ${fam}`);

      const innerC = circle.geometry.paths[0].d.split(" M")[1];
      const innerS = square.geometry.paths[0].d.split(" M")[1];
      assert.strictEqual(innerC, innerS, `Inner glyph mismatch between ${fam}-circle and ${fam}-square`);
    }
  });

  it("should verify Refresh and Sync semantic differentiation", () => {
    const refresh = analyzeIconPinToPin(CANONICAL_ICONS.find((i) => i.slug === "px-refresh")!);
    const sync = analyzeIconPinToPin(CANONICAL_ICONS.find((i) => i.slug === "px-sync")!);

    // Refresh is an open cyclic loop with 1 arrowhead, whereas Sync has 180-deg rotational symmetry with 2 opposing flows
    assert.strictEqual(sync.symmetry.rotational180, true, "Sync must exhibit 180-deg rotational symmetry");
    assert.strictEqual(refresh.symmetry.rotational180, false, "Refresh must be unidirectional cycle, not 180-deg symmetrical");
    assert.notStrictEqual(refresh.subpaths[0].d, sync.subpaths[0].d, "Refresh and Sync paths must be distinct");
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
