import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "fs";
import path from "path";
import { CANONICAL_ICONS } from "../../icons/source";

describe("PXUI Stepped Motion & Reduced-Motion Contract Gate (Section 9.30, 9.31)", () => {
  it("should enforce deterministic animation metadata for all animated icons", () => {
    const animatedIcons = CANONICAL_ICONS.filter((i) => Boolean(i.animation || (i.animations && i.animations.length > 0)));
    assert.ok(animatedIcons.length > 0, "There must be at least one animated icon in catalog");

    for (const icon of animatedIcons) {
      const anim = icon.animation || (icon.animations && icon.animations[0]);
      assert.ok(anim, `Animated icon ${icon.name} must have valid animation metadata`);
      assert.ok(
        anim.type || anim.steps || (anim as any).keyframes,
        `Icon ${icon.name} must specify animation type or discrete stepped keyframes`
      );
    }
  });

  it("should have CSS reduced-motion overrides in globals.css", () => {
    const cssPath = path.resolve(__dirname, "../../app/globals.css");
    const content = fs.readFileSync(cssPath, "utf-8");

    assert.ok(content.includes("@media (prefers-reduced-motion: reduce)"), "globals.css must have prefers-reduced-motion media query");
    assert.ok(content.includes("animation: none !important"), "Reduced motion must disable continuous loops");
  });

  it("should have dual-theme and stepped frame poses in SpecMotionWorkbench", () => {
    const workbenchPath = path.resolve(__dirname, "../../components/specification/spec-motion-workbench.tsx");
    const content = fs.readFileSync(workbenchPath, "utf-8");

    assert.ok(content.includes("stageTheme"), "SpecMotionWorkbench must have stageTheme state");
    assert.ok(content.includes("getFramePose"), "SpecMotionWorkbench must calculate frame poses");
    assert.ok(content.includes("setStageTheme(\"light\")"), "SpecMotionWorkbench must have light theme toggle");
    assert.ok(content.includes("setStageTheme(\"dark\")"), "SpecMotionWorkbench must have dark theme toggle");
    assert.ok(content.includes("STEPPED FRAME BREAKDOWN"), "SpecMotionWorkbench must render stepped frame breakdown");
  });
});
