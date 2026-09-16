import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "fs";
import path from "path";

describe("PXUI shadcn Registry Generation", () => {
  const registryDir = path.resolve(__dirname, "../public/r");

  it("should have generated registry.json with valid root schema", () => {
    const registryPath = path.join(registryDir, "registry.json");
    assert.ok(fs.existsSync(registryPath), "registry.json should exist");

    const content = JSON.parse(fs.readFileSync(registryPath, "utf-8"));
    assert.strictEqual(content.name, "pxui");
    assert.ok(content.$schema.includes("registry.json"));
    assert.ok(Array.isArray(content.items));
    assert.ok(content.items.length >= 101, "Should have 100 icons + px-icon-base");
  });

  it("should have valid px-icon-base registry item", () => {
    const baseJsonPath = path.join(registryDir, "px-icon-base.json");
    assert.ok(fs.existsSync(baseJsonPath), "px-icon-base.json should exist");

    const baseJson = JSON.parse(fs.readFileSync(baseJsonPath, "utf-8"));
    assert.strictEqual(baseJson.name, "px-icon-base");
    assert.strictEqual(baseJson.type, "registry:ui");
    assert.strictEqual(baseJson.files.length, 2);
    assert.strictEqual(baseJson.files[0].path, "components/icons/px-icon-base.tsx");
    assert.strictEqual(baseJson.files[1].path, "lib/icons/schema.ts");
  });

  it("should have valid px-home.json registry item conforming to PXUI registry contract", () => {
    const pxHomeJsonPath = path.join(registryDir, "px-home.json");
    assert.ok(fs.existsSync(pxHomeJsonPath), "px-home.json should exist");

    const pxHomeJson = JSON.parse(fs.readFileSync(pxHomeJsonPath, "utf-8"));
    assert.strictEqual(pxHomeJson.name, "px-home");
    assert.strictEqual(pxHomeJson.title, "PXIconHome");
    assert.strictEqual(pxHomeJson.type, "registry:ui");
    assert.ok(Array.isArray(pxHomeJson.files));
    assert.strictEqual(pxHomeJson.files[0].target, "components/pxui/px-home.tsx");
    assert.ok(pxHomeJson.files[0].content.includes("export const PXIconHome"));
    assert.ok(Array.isArray(pxHomeJson.registryDependencies));
    assert.ok(pxHomeJson.registryDependencies[0].includes("px-icon-base.json"));
  });

  it("should have valid home.json registry item conforming to shadcn specs", () => {
    const homeJsonPath = path.join(registryDir, "home.json");
    assert.ok(fs.existsSync(homeJsonPath), "home.json should exist");

    const homeJson = JSON.parse(fs.readFileSync(homeJsonPath, "utf-8"));
    assert.strictEqual(homeJson.name, "home");
    assert.strictEqual(homeJson.title, "PXIconHome");
    assert.strictEqual(homeJson.type, "registry:ui");
    assert.ok(Array.isArray(homeJson.files));
    assert.ok(homeJson.files[0].content.includes("export const PXIconHome"));
  });
});
