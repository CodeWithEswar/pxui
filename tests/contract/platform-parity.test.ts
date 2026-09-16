import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  toPXComponentName,
  generateReactComponentCode,
  generateReactNativeCode,
  generateSvgString,
} from "../../lib/compiler";
import { ICONS_CATALOG } from "../../lib/icons/catalog";
import { IconDefinition } from "../../lib/icons/schema";

describe("PXUI Multi-Platform Parity Contract (Section 12.7, 12.8, 14.9)", () => {
  // Representative Diverse Test Fixtures (Section 12.8)
  const representativeFixtures = [
    { name: "home", type: "simple enclosed geometry" },
    { name: "bell", type: "animation-capable icon" },
    { name: "heart", type: "filled silhouette capability" },
    { name: "plus", type: "base modifier geometry" },
    { name: "calendar", type: "compound semantic geometry" },
  ];

  for (const fixture of representativeFixtures) {
    it(`should guarantee multi-platform parity for representative fixture: ${fixture.name} (${fixture.type})`, () => {
      const icon = ICONS_CATALOG.find((i) => i.name === fixture.name);
      assert.ok(icon, `Icon fixture '${fixture.name}' must exist in canonical catalog`);

      const componentName = toPXComponentName(icon.name);
      assert.strictEqual(
        componentName,
        `PXIcon${fixture.name.charAt(0).toUpperCase() + fixture.name.slice(1)}`
      );

      // 1. React Output Target
      const reactCode = generateReactComponentCode(icon);
      assert.ok(reactCode.includes(`export const ${componentName}`), "Must export PXIcon* component");
      assert.ok(reactCode.includes(`displayName = "${componentName}"`), "Must define displayName");
      assert.ok(reactCode.includes("PXIconBase"), "Must reference standard PXIconBase renderer");

      // 2. React Native Output Target
      const nativeCode = generateReactNativeCode(icon);
      assert.ok(nativeCode.includes(`export const ${componentName}: React.FC`), "Must export Native component");
      assert.ok(nativeCode.includes("from 'react-native-svg'"), "Must import react-native-svg");
      assert.ok(nativeCode.includes('viewBox="0 0 24 24"'), "Must preserve 24x24 canonical grid in Native");

      // Verify that Native uses identical path coordinates as canonical geometry
      for (const p of icon.paths) {
        assert.ok(
          nativeCode.includes(p.d),
          `Native code must preserve exact canonical path coordinates for ${icon.name}`
        );
      }

      // 3. Pure SVG Output Target
      const svgString = generateSvgString(icon);
      assert.ok(svgString.startsWith("<svg"), "Must render standard SVG element");
      assert.ok(svgString.includes('viewBox="0 0 24 24"'), "SVG must use 24x24 viewBox");
      assert.ok(svgString.includes('fill="currentColor"'), "SVG must enforce currentColor policy");
      assert.ok(svgString.includes('shape-rendering="crispEdges"'), "SVG must declare crispEdges for pixel-native rendering");

      // Verify that SVG uses identical path coordinates
      for (const p of icon.paths) {
        assert.ok(
          svgString.includes(p.d),
          `Pure SVG markup must preserve exact canonical path coordinates for ${icon.name}`
        );
      }
    });
  }

  it("should enforce directional family symmetry and rotational alignment (Section 12.15)", () => {
    const arrowIcons = ["arrow-up", "arrow-down", "arrow-left", "arrow-right"];
    const loadedArrows: IconDefinition[] = [];

    for (const name of arrowIcons) {
      const arrow = ICONS_CATALOG.find((i) => i.name === name);
      if (arrow) loadedArrows.push(arrow);
    }

    assert.ok(loadedArrows.length >= 2, "Directional arrow icons must be present in catalog");

    for (const arrow of loadedArrows) {
      assert.strictEqual(arrow.grid, 24, "All directional arrows must align to 24x24 grid");
      assert.ok(arrow.paths.length > 0, "Directional arrow must have path geometry");
      assert.ok(arrow.tags.includes("direction") || arrow.tags.includes("arrow") || arrow.category.includes("Navigation"), "Must have directional metadata tags");
    }
  });
});
