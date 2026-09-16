import { describe, it } from "node:test";
import assert from "node:assert";

describe("PXUI Product Pages Ecosystem Contract (Section 11)", () => {
  it("should have valid SEO metadata and component exports for /registry", async () => {
    const page = await import("../../app/registry/page");
    assert.strictEqual(typeof page.default, "function", "Registry page must export default React component");
    assert.ok(page.metadata, "Registry page must export SEO metadata");
    assert.ok(page.metadata.title?.toString().includes("Registry — PXUI"), "Title must conform to Section 11.73");
    assert.ok(page.metadata.description, "Must have description");
  });

  it("should have valid SEO metadata and component exports for /animated", async () => {
    const page = await import("../../app/animated/page");
    assert.strictEqual(typeof page.default, "function", "Animated page must export default React component");
    assert.ok(page.metadata, "Animated page must export SEO metadata");
    assert.ok(page.metadata.title?.toString().includes("Animated Icons — PXUI"), "Title must conform to Section 11.73");
    assert.ok(page.metadata.description, "Must have description");
  });

  it("should have valid SEO metadata and component exports for /brands", async () => {
    const page = await import("../../app/brands/page");
    assert.strictEqual(typeof page.default, "function", "Brands page must export default React component");
    assert.ok(page.metadata, "Brands page must export SEO metadata");
    assert.ok(page.metadata.title?.toString().includes("Brand Icons — PXUI"), "Title must conform to Section 11.73");
    assert.ok(page.metadata.description, "Must have description");
  });

  it("should have valid SEO metadata and component exports for /playground", async () => {
    const page = await import("../../app/playground/page");
    assert.strictEqual(typeof page.default, "function", "Playground page must export default React component");
    assert.ok(page.metadata, "Playground page must export SEO metadata");
    assert.ok(page.metadata.title?.toString().includes("Playground — PXUI"), "Title must conform to Section 11.73");
    assert.ok(page.metadata.description, "Must have description");
  });

  it("should have valid SEO metadata and component exports for /changelog", async () => {
    const page = await import("../../app/changelog/page");
    assert.strictEqual(typeof page.default, "function", "Changelog page must export default React component");
    assert.ok(page.metadata, "Changelog page must export SEO metadata");
    assert.ok(page.metadata.title?.toString().includes("Changelog — PXUI"), "Title must conform to Section 11.73");
  });

  it("should have valid SEO metadata for legal pages (/legal/license and /legal/brand-policy)", async () => {
    const licensePage = await import("../../app/legal/license/page");
    assert.strictEqual(typeof licensePage.default, "function");
    assert.ok(licensePage.metadata.title?.toString().includes("License — PXUI"));

    const brandPolicyPage = await import("../../app/legal/brand-policy/page");
    assert.strictEqual(typeof brandPolicyPage.default, "function");
    assert.ok(brandPolicyPage.metadata.title?.toString().includes("Brand Policy & Trademarks — PXUI"));
  });

  it("should have valid SEO metadata and articles for all 7 canonical documentation routes", async () => {
    const docRoutes = [
      { path: "../../app/docs/getting-started/page", title: "Getting Started" },
      { path: "../../app/docs/react/page", title: "React Integration" },
      { path: "../../app/docs/react-native/page", title: "React Native" },
      { path: "../../app/docs/animation/page", title: "Animation System" },
      { path: "../../app/docs/accessibility/page", title: "Accessibility" },
      { path: "../../app/docs/design-principles/page", title: "Design Principles" },
      { path: "../../app/docs/contributing/page", title: "Contributing Guide" },
    ];

    for (const route of docRoutes) {
      const docPage = await import(route.path);
      assert.strictEqual(typeof docPage.default, "function", `Doc route ${route.path} must export component`);
      assert.ok(docPage.metadata, `Doc route ${route.path} must export metadata`);
      assert.ok(
        docPage.metadata.title?.toString().includes("PXUI"),
        `Doc route ${route.path} title must include PXUI: ${docPage.metadata.title}`
      );
      assert.ok(docPage.metadata.description, `Doc route ${route.path} must have description`);
    }
  });

  it("should enforce brand provenance and visual separation in brand definitions", async () => {
    const { BRAND_ITEMS } = await import("../../components/brands/brands-workbench");
    assert.ok(BRAND_ITEMS.length >= 6, "Must define curated brand marks");
    for (const brand of BRAND_ITEMS) {
      assert.ok(brand.owner, `Brand ${brand.name} must declare trademark owner`);
      assert.ok(brand.officialReference, `Brand ${brand.name} must declare official source reference`);
      assert.ok(brand.trademarkContext, `Brand ${brand.name} must provide trademark context`);
      assert.ok(brand.colorPolicy, `Brand ${brand.name} must declare color policy`);
      assert.ok(brand.introducedVersion, `Brand ${brand.name} must declare introduced version`);
    }
  });
});
