import { test, describe } from "node:test";
import assert from "node:assert";
import { ICONS_CATALOG } from "../../lib/icons/catalog";
import { analyzeGeometry } from "../../lib/geometry/path-analysis";
import { toPXComponentName } from "../../lib/compiler";

describe("PXUI Full-Window Icon Specification Contract", () => {
  test("should resolve canonical specification data for px-home", () => {
    const icon = ICONS_CATALOG.find((i) => i.name === "home");
    assert.ok(icon, "Canonical home icon must exist");

    const componentName = toPXComponentName(icon.name);
    assert.strictEqual(componentName, "PXIconHome");

    const analysis = analyzeGeometry(icon.paths, icon.grid || 24);
    assert.ok(analysis.bounds.width > 0, "Bounds width must be > 0");
    assert.ok(analysis.bounds.height > 0, "Bounds height must be > 0");
    assert.ok(analysis.bounds.minX >= 0, "Bounds minX must be >= 0");
    assert.ok(analysis.bounds.maxX <= 24, "Bounds maxX must be <= 24");
    assert.ok(analysis.bounds.minY >= 0, "Bounds minY >= 0");
    assert.ok(analysis.bounds.maxY <= 24, "Bounds maxY <= 24");
    assert.ok(analysis.commands.length > 0, "Command stream must not be empty");
    assert.ok(analysis.occupiedCellCount > 0, "Occupied cells must be > 0");
  });

  test("should compute optical correction within approved envelope", () => {
    for (const icon of ICONS_CATALOG) {
      const analysis = analyzeGeometry(icon.paths, icon.grid || 24);
      assert.ok(
        Math.abs(analysis.opticalCorrection.x) <= 12,
        `Optical correction x (${analysis.opticalCorrection.x}) for ${icon.name} must be within 12 units`
      );
      assert.ok(
        Math.abs(analysis.opticalCorrection.y) <= 12,
        `Optical correction y (${analysis.opticalCorrection.y}) for ${icon.name} must be within 12 units`
      );
    }
  });

  test("should verify family grouping for sequential specification navigation", () => {
    const homeIcon = ICONS_CATALOG.find((i) => i.name === "home");
    assert.ok(homeIcon, "home icon must exist");

    const familyName = homeIcon.family || homeIcon.name.split("-")[0];
    const familyIcons = ICONS_CATALOG.filter(
      (i) => (i.family || i.name.split("-")[0]) === familyName
    );

    assert.ok(familyIcons.length >= 1, "Family must contain at least the home icon");
  });
});
