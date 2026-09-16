import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "fs";
import path from "path";

describe("PXUI Metadata Package Contract (@pxui/metadata)", () => {
  const metadataDir = path.resolve(__dirname, "../../packages/metadata/generated");

  it("should generate valid manifest.json", () => {
    const manifestFile = path.join(metadataDir, "manifest.json");
    assert.ok(fs.existsSync(manifestFile), "manifest.json must exist");

    const manifest = JSON.parse(fs.readFileSync(manifestFile, "utf-8"));
    assert.ok(manifest.version);
    assert.ok(manifest.iconCount >= 100, `Expected iconCount >= 100, got ${manifest.iconCount}`);
    assert.ok(Array.isArray(manifest.categories));
    assert.ok(manifest.categories.length >= 10);
  });

  it("should generate search-index.json containing valid searchable records", () => {
    const searchFile = path.join(metadataDir, "search-index.json");
    assert.ok(fs.existsSync(searchFile), "search-index.json must exist");

    const records = JSON.parse(fs.readFileSync(searchFile, "utf-8"));
    assert.ok(Array.isArray(records));
    assert.ok(records.length >= 100, `Expected records >= 100, got ${records.length}`);

    const home = records.find((r: any) => r.slug === "px-home");
    assert.ok(home);
    assert.strictEqual(home.componentName, "PXIconHome");
    assert.ok(home.aliases.includes("house"));
  });
});
