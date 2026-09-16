import { ICON_CATEGORIES } from "../../../icons/categories";
import { ICON_FAMILIES } from "../../../icons/families";
import { QualityGateIssue } from "../types";

export function validateTaxonomy(
  slug: string,
  category: string,
  family?: string
): QualityGateIssue[] {
  const issues: QualityGateIssue[] = [];

  // 1. Category validation
  if (!ICON_CATEGORIES.includes(category as any)) {
    issues.push({
      gate: "taxonomy",
      severity: "BLOCKING",
      slug,
      field: "category",
      code: "UNKNOWN_CATEGORY",
      message: `Invalid category '${category}'. Must reference registered taxonomy category.`,
      expected: `One of: ${ICON_CATEGORIES.slice(0, 8).join(", ")}...`,
      actual: category,
      suggestion: "Use canonical singular/plural matching ICON_CATEGORIES.",
    });
  }

  // 2. Family validation (Section 9.6)
  if (family) {
    const familyKey = family.toLowerCase();
    if (!ICON_FAMILIES[familyKey]) {
      issues.push({
        gate: "taxonomy",
        severity: "REVIEW",
        slug,
        field: "family",
        code: "UNREGISTERED_FAMILY",
        message: `Family '${family}' is not registered in ICON_FAMILIES.`,
        expected: `Registered family in icons/families.ts`,
        actual: family,
        suggestion: `Register family '${family}' in icons/families.ts or link to closest parent family.`,
      });
    }
  }

  return issues;
}
