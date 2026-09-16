import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { ICONS_CATALOG } from "../lib/icons/catalog";
import { validateIconCatalog } from "../scripts/validate-icons";
import { toPixelComponentName, toPXComponentName } from "../lib/compiler";

describe("PXUI Canonical Icon Catalog", () => {
  it("should pass all design system validation rules", () => {
    const result = validateIconCatalog(ICONS_CATALOG);
    assert.strictEqual(result.valid, true);
    assert.deepStrictEqual(result.errors, []);
    assert.ok(result.iconCount >= 100);
  });

  it("should generate canonical PXIcon-prefixed component names", () => {
    assert.strictEqual(toPXComponentName("home"), "PXIconHome");
    assert.strictEqual(toPXComponentName("bell"), "PXIconBell");
    assert.strictEqual(toPXComponentName("arrow-left"), "PXIconArrowLeft");
    assert.strictEqual(toPXComponentName("git-branch"), "PXIconGitBranch");
    assert.strictEqual(toPXComponentName("volume-2"), "PXIconVolume2");
  });

  it("should have all icons on strict 24x24 grid", () => {
    for (const icon of ICONS_CATALOG) {
      assert.strictEqual(icon.grid, 24);
    }
  });

  it("should have unique canonical names", () => {
    const names = ICONS_CATALOG.map((i) => i.name);
    const uniqueNames = new Set(names);
    assert.strictEqual(names.length, uniqueNames.size);
  });
});
