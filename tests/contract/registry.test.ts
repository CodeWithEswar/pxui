import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "fs";
import path from "path";

describe("PXUI Registry Package Contract (@pxui/registry)", () => {
  const registryDir = path.resolve(__dirname, "../../packages/registry/generated");

  it("should generate registry.json matching shadcn registry schema", () => {
    const regFile = path.join(registryDir, "registry.json");
    assert.ok(fs.existsSync(regFile), "registry.json must exist in packages/registry/generated/");

    const reg = JSON.parse(fs.readFileSync(regFile, "utf-8"));
    assert.strictEqual(reg.name, "pxui");
    assert.ok(Array.isArray(reg.items));
    assert.ok(reg.items.length >= 101);
  });

  it("should generate px-home.json item with valid schema and source reference", () => {
    const homeItemFile = path.join(registryDir, "r/px-home.json");
    assert.ok(fs.existsSync(homeItemFile), "r/px-home.json must exist");

    const item = JSON.parse(fs.readFileSync(homeItemFile, "utf-8"));
    assert.strictEqual(item.name, "px-home");
    assert.strictEqual(item.title, "PXIconHome");
    assert.strictEqual(item.type, "registry:ui");
    assert.ok(item.meta.source.includes("icons/source/navigation/home.ts"));
  });
});
