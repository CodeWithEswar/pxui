import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "fs";
import path from "path";

describe("PXUI Accessibility Contract Gate (Section 9.28)", () => {
  const baseFile = path.resolve(__dirname, "../../components/icons/px-icon-base.tsx");

  it("should support decorative usage via aria-hidden", () => {
    assert.ok(fs.existsSync(baseFile), "px-icon-base.tsx must exist");
    const content = fs.readFileSync(baseFile, "utf-8");

    // Component supports aria-hidden and accessible role
    assert.ok(content.includes("aria-hidden="), "Must support aria-hidden prop");
    assert.ok(content.includes("role="), "Must support accessible role attribute");
  });

  it("should forward accessible props to the rendered SVG element", () => {
    const content = fs.readFileSync(baseFile, "utf-8");
    // Ensure all standard SVG HTML props are spread onto svg via restProps
    assert.ok(content.includes("...restProps") || content.includes("...props"), "Must spread forwarded HTML/SVG props to root svg");
    assert.ok(content.includes("ref={ref}"), "Must forward ref to svg element");
  });
});
