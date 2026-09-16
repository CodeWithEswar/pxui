import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { ICONS_CATALOG } from "../lib/icons/catalog";
import { searchIcons } from "../lib/search/search-engine";

describe("PXUI Search Engine", () => {
  it("should find icon by exact name", () => {
    const results = searchIcons(ICONS_CATALOG, { query: "home" });
    assert.ok(results.some((r) => r.name === "home"));
  });

  it("should find trash icon by alias 'delete'", () => {
    const results = searchIcons(ICONS_CATALOG, { query: "delete" });
    assert.ok(results.some((r) => r.name === "trash"));
  });

  it("should find search icon by alias 'magnifier'", () => {
    const results = searchIcons(ICONS_CATALOG, { query: "magnifier" });
    assert.ok(results.some((r) => r.name === "search"));
  });

  it("should find heart and thumbs-up by alias 'like'", () => {
    const results = searchIcons(ICONS_CATALOG, { query: "like" });
    const names = results.map((r) => r.name);
    assert.ok(names.includes("heart"));
    assert.ok(names.includes("thumbs-up"));
  });

  it("should filter by category accurately", () => {
    const navResults = searchIcons(ICONS_CATALOG, { category: "Arrows & Navigation" });
    assert.ok(navResults.length > 0);
    navResults.forEach((icon) => {
      assert.strictEqual(icon.category, "Arrows & Navigation");
    });
  });

  it("should filter animated icons", () => {
    const animatedResults = searchIcons(ICONS_CATALOG, { animatedOnly: true });
    assert.ok(animatedResults.length > 0);
    animatedResults.forEach((icon) => {
      assert.ok(icon.animation !== undefined);
    });
  });

  it("should prioritize canonical variants (add-circle, add-square) immediately after exact match for 'add'", () => {
    const results = searchIcons(ICONS_CATALOG, { query: "add" });
    const names = results.map((r) => r.name);
    assert.strictEqual(names[0], "add");
    assert.strictEqual(names[1], "add-circle");
    assert.strictEqual(names[2], "add-square");
  });

  it("should prioritize canonical remove family before aliases for 'remove'", () => {
    const results = searchIcons(ICONS_CATALOG, { query: "remove" });
    const top5 = results.slice(0, 5).map((r) => r.name);
    assert.deepStrictEqual(top5, [
      "remove",
      "remove-circle",
      "remove-square",
      "remove-row",
      "remove-column",
    ]);
  });

  it("should prioritize canonical subtract family before aliases for 'subtract'", () => {
    const results = searchIcons(ICONS_CATALOG, { query: "subtract" });
    const top3 = results.slice(0, 3).map((r) => r.name);
    assert.deepStrictEqual(top3, ["subtract", "subtract-circle", "subtract-square"]);
  });

  it("should prioritize canonical clear family before aliases for 'clear'", () => {
    const results = searchIcons(ICONS_CATALOG, { query: "clear" });
    const top3 = results.slice(0, 3).map((r) => r.name);
    assert.deepStrictEqual(top3, ["clear", "clear-circle", "clear-square"]);
  });

  it("should find close-circle by 'x circle'", () => {
    const results = searchIcons(ICONS_CATALOG, { query: "x circle" });
    assert.ok(results.some((r) => r.name === "close-circle"));
  });

  it("should find sidebar panels by 'close sidebar'", () => {
    const results = searchIcons(ICONS_CATALOG, { query: "close sidebar" });
    const names = results.map((r) => r.name);
    assert.ok(names.includes("close-panel-left"));
    assert.ok(names.includes("close-panel-right"));
  });

  it("should find close-tab by 'close editor tab'", () => {
    const results = searchIcons(ICONS_CATALOG, { query: "close editor tab" });
    assert.ok(results.some((r) => r.name === "close-tab"));
  });

  it("should find close-window by 'close dialog'", () => {
    const results = searchIcons(ICONS_CATALOG, { query: "close dialog" });
    assert.ok(results.some((r) => r.name === "close-window"));
  });

  it("should find dismiss by 'dismiss toast'", () => {
    const results = searchIcons(ICONS_CATALOG, { query: "dismiss toast" });
    assert.ok(results.some((r) => r.name === "dismiss"));
  });

  it("should find cancel by 'abort operation'", () => {
    const results = searchIcons(ICONS_CATALOG, { query: "abort operation" });
    assert.ok(results.some((r) => r.name === "cancel"));
  });

  // Batch D.04 (0031–0040): Check / Confirm / Selection
  it("should prioritize check family for 'check'", () => {
    const results = searchIcons(ICONS_CATALOG, { query: "check" });
    assert.strictEqual(results[0]?.name, "check");
    const top4 = results.slice(0, 4).map((r) => r.name);
    assert.ok(top4.includes("check-circle"));
    assert.ok(top4.includes("check-square"));
  });

  it("should find check-double by 'double check'", () => {
    const results = searchIcons(ICONS_CATALOG, { query: "double check" });
    assert.ok(results.some((r) => r.name === "check-double"));
  });

  it("should find check-all by 'complete all'", () => {
    const results = searchIcons(ICONS_CATALOG, { query: "complete all" });
    assert.ok(results.some((r) => r.name === "check-all"));
  });

  it("should find checkbox-checked by 'checkbox'", () => {
    const results = searchIcons(ICONS_CATALOG, { query: "checkbox" });
    assert.ok(results.some((r) => r.name === "checkbox-checked"));
  });

  it("should find radio-checked by 'radio'", () => {
    const results = searchIcons(ICONS_CATALOG, { query: "radio" });
    assert.ok(results.some((r) => r.name === "radio-checked"));
  });

  it("should find selection-check by 'confirm selection'", () => {
    const results = searchIcons(ICONS_CATALOG, { query: "confirm selection" });
    assert.ok(results.some((r) => r.name === "selection-check"));
  });

  it("should find confirm by 'accept'", () => {
    const results = searchIcons(ICONS_CATALOG, { query: "accept" });
    assert.ok(results.some((r) => r.name === "confirm"));
  });

  // Batch D.05 (0041–0050): Edit / Modify Search Acceptance
  it("should find edit by 'pencil'", () => {
    const results = searchIcons(ICONS_CATALOG, { query: "pencil" });
    assert.ok(results.some((r) => r.name === "edit"));
  });

  it("should find edit by 'modify'", () => {
    const results = searchIcons(ICONS_CATALOG, { query: "modify" });
    assert.ok(results.some((r) => r.name === "edit"));
  });

  it("should find edit-text by 'rewrite text'", () => {
    const results = searchIcons(ICONS_CATALOG, { query: "rewrite text" });
    assert.ok(results.some((r) => r.name === "edit-text"));
  });

  it("should find edit-document by 'edit file'", () => {
    const results = searchIcons(ICONS_CATALOG, { query: "edit file" });
    assert.ok(results.some((r) => r.name === "edit-document"));
  });

  it("should find edit-image by 'photo editor'", () => {
    const results = searchIcons(ICONS_CATALOG, { query: "photo editor" });
    assert.ok(results.some((r) => r.name === "edit-image"));
  });

  it("should find edit-code by 'edit source'", () => {
    const results = searchIcons(ICONS_CATALOG, { query: "edit source" });
    assert.ok(results.some((r) => r.name === "edit-code"));
  });

  it("should find edit-table by 'edit cells'", () => {
    const results = searchIcons(ICONS_CATALOG, { query: "edit cells" });
    assert.ok(results.some((r) => r.name === "edit-table"));
  });

  it("should find edit-selection by 'modify selection'", () => {
    const results = searchIcons(ICONS_CATALOG, { query: "modify selection" });
    assert.ok(results.some((r) => r.name === "edit-selection"));
  });

  it("should find edit-locked by 'read only edit'", () => {
    const results = searchIcons(ICONS_CATALOG, { query: "read only edit" });
    assert.ok(results.some((r) => r.name === "edit-locked"));
  });

  // Batch D.06 (0051–0070): Copy & Save Families Search Acceptance
  it("should prioritize copy family for 'copy'", () => {
    const results = searchIcons(ICONS_CATALOG, { query: "copy" });
    assert.strictEqual(results[0]?.name, "copy");
    const top4 = results.slice(0, 4).map((r) => r.name);
    assert.ok(top4.includes("copy-circle"));
    assert.ok(top4.includes("copy-square"));
  });

  it("should find copy by 'duplicate' and 'clipboard-copy'", () => {
    const r1 = searchIcons(ICONS_CATALOG, { query: "duplicate" });
    assert.ok(r1.some((r) => r.name === "copy"));
    const r2 = searchIcons(ICONS_CATALOG, { query: "clipboard-copy" });
    assert.ok(r2.some((r) => r.name === "copy"));
  });

  it("should prioritize save family for 'save'", () => {
    const results = searchIcons(ICONS_CATALOG, { query: "save" });
    assert.strictEqual(results[0]?.name, "save");
    const top4 = results.slice(0, 4).map((r) => r.name);
    assert.ok(top4.includes("save-circle"));
    assert.ok(top4.includes("save-square"));
  });

  it("should find save by 'persist', 'floppy', and 'commit'", () => {
    const r1 = searchIcons(ICONS_CATALOG, { query: "persist" });
    assert.ok(r1.some((r) => r.name === "save"));
    const r2 = searchIcons(ICONS_CATALOG, { query: "floppy" });
    assert.ok(r2.some((r) => r.name === "save"));
    const r3 = searchIcons(ICONS_CATALOG, { query: "commit" });
    assert.ok(r3.some((r) => r.name === "save"));
  });
});

