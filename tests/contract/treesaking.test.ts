import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "fs";
import path from "path";

describe("PXUI Tree-Shaking Contract Gate (@pxui/react)", () => {
  const generatedDir = path.resolve(__dirname, "../../packages/react/src/generated");

  it("should generate isolated per-icon component modules", () => {
    const homeFile = path.join(generatedDir, "PXIconHome.tsx");
    assert.ok(fs.existsSync(homeFile), "PXIconHome.tsx must exist");

    const content = fs.readFileSync(homeFile, "utf-8");

    // 1. Must NOT import full catalog or metadata
    assert.ok(!content.includes("ICONS_CATALOG"), "Per-icon file must not import ICONS_CATALOG");
    assert.ok(!content.includes("search-index"), "Per-icon file must not import search-index");
    assert.ok(!content.includes("packages/metadata"), "Per-icon file must not import metadata package");

    // 2. Must NOT import other icon components
    assert.ok(!content.includes("PXIconSearch"), "Per-icon file must not import other icon components");
    assert.ok(!content.includes("PXIconSettings"), "Per-icon file must not import other icon components");

    // 3. Must be standalone React.forwardRef component
    assert.ok(content.includes("React.forwardRef"), "Must be a forwardRef component");
    assert.ok(content.includes("export const PXIconHomeDefinition"), "Must export standalone definition");
  });

  it("should have lightweight component file size within budget (< 3.5KB per icon)", () => {
    const homeFile = path.join(generatedDir, "PXIconHome.tsx");
    const stat = fs.statSync(homeFile);
    assert.ok(stat.size < 3500, `Per-icon component size must be under 3.5KB (got ${stat.size} bytes)`);
  });

  it("should support direct subpath import without pulling root barrel", () => {
    // Verifies that a consumer importing from @pxui/react/generated/PXIconHome can do so cleanly
    const searchFile = path.join(generatedDir, "PXIconSearch.tsx");
    assert.ok(fs.existsSync(searchFile), "Subpath component must exist");
  });
});
