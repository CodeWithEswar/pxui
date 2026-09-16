import { QualityGateIssue } from "../types";

export const CANONICAL_NAME_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const COMPONENT_PATTERN = /^PXIcon[A-Z][A-Za-z0-9]*$/;
export const SLUG_PATTERN = /^px-[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateNaming(slug: string, name: string): QualityGateIssue[] {
  const issues: QualityGateIssue[] = [];

  // 1. Slug format validation (Section 9.4)
  if (!SLUG_PATTERN.test(slug)) {
    issues.push({
      gate: "naming",
      severity: "BLOCKING",
      slug,
      field: "slug",
      code: "INVALID_SLUG_FORMAT",
      message: `Invalid slug '${slug}'. Must match format ^px-[a-z0-9]+(?:-[a-z0-9]+)*$`,
      expected: "^px-[a-z0-9]+(?:-[a-z0-9]+)*$",
      actual: slug,
    });
  }

  // 2. Component pattern validation (Section 9.4)
  if (!COMPONENT_PATTERN.test(name)) {
    issues.push({
      gate: "naming",
      severity: "BLOCKING",
      slug,
      field: "name",
      code: "INVALID_COMPONENT_NAME",
      message: `Component name '${name}' must start with 'PXIcon' followed by PascalCase. Disallowed names include PXHome, PixelHome, HomeIcon, PxIconHome.`,
      expected: "^PXIcon[A-Z][A-Za-z0-9]*$",
      actual: name,
    });
  }

  // 3. Canonical semantic identifier derivation and validation
  const semantic = slug.replace(/^px-/, "");
  if (!CANONICAL_NAME_PATTERN.test(semantic)) {
    issues.push({
      gate: "naming",
      severity: "BLOCKING",
      slug,
      field: "semantic",
      code: "INVALID_SEMANTIC_NAME",
      message: `Canonical semantic identifier '${semantic}' must be lowercase-kebab-case (matching ^[a-z0-9]+(?:-[a-z0-9]+)*$).`,
      expected: "^[a-z0-9]+(?:-[a-z0-9]+)*$",
      actual: semantic,
    });
  }

  // 4. Exact derivation check: PXIcon + PascalCase(slug without px-)
  const expectedName =
    "PXIcon" +
    semantic
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join("");

  if (name !== expectedName) {
    issues.push({
      gate: "naming",
      severity: "BLOCKING",
      slug,
      field: "name",
      code: "NAME_SLUG_MISMATCH",
      message: `Component name '${name}' does not match expected '${expectedName}' derived from slug '${slug}'`,
      expected: expectedName,
      actual: name,
    });
  }

  return issues;
}
