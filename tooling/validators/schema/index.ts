import { PXIconDefinition } from "../../../icons/schemas/icon.schema";
import { ICON_CATEGORIES, isValidCategory } from "../../../icons/categories";
import { QualityGateIssue } from "../types";

export type ValidationIssue = QualityGateIssue;

export function validateSchema(icon: PXIconDefinition): QualityGateIssue[] {
  const issues: QualityGateIssue[] = [];
  const slug = icon.slug || `px-${icon.name.replace(/^(px-|PXIcon)/, "").toLowerCase()}`;

  // 1. Title validation (Section 9.3)
  if (!icon.title || icon.title.trim().length === 0) {
    issues.push({
      gate: "schema",
      severity: "BLOCKING",
      slug,
      field: "title",
      code: "MISSING_TITLE",
      message: "Title is required and must not be empty.",
      expected: "Human-readable string (e.g. 'Home')",
      actual: String(icon.title),
    });
  }

  // 2. Description validation (Section 9.3)
  if (!icon.description || icon.description.trim().length < 8) {
    issues.push({
      gate: "schema",
      severity: "BLOCKING",
      slug,
      field: "description",
      code: "INSUFFICIENT_DESCRIPTION",
      message: `Description is required and must be meaningful (got: '${icon.description || ""}').`,
      expected: "Meaningful sentence explaining icon usage (>= 8 chars)",
      actual: icon.description || "undefined",
    });
  }

  // 3. Category validation
  if (!icon.category || !isValidCategory(icon.category)) {
    issues.push({
      gate: "taxonomy",
      severity: "BLOCKING",
      slug,
      field: "category",
      code: "INVALID_CATEGORY",
      message: `Category '${icon.category}' is invalid. Must be one of registered categories.`,
      expected: `One of: ${ICON_CATEGORIES.slice(0, 8).join(", ")}...`,
      actual: String(icon.category),
    });
  }

  // 4. Tags quality check
  if (!icon.tags || icon.tags.length === 0) {
    issues.push({
      gate: "schema",
      severity: "BLOCKING",
      slug,
      field: "tags",
      code: "EMPTY_TAGS",
      message: "Icon must have at least one search tag.",
      expected: "Non-empty string array",
      actual: "0 tags",
    });
  } else {
    const seenTags = new Set<string>();
    for (const tag of icon.tags) {
      if (seenTags.has(tag.toLowerCase())) {
        issues.push({
          gate: "schema",
          severity: "REVIEW",
          slug,
          field: "tags",
          code: "DUPLICATE_TAG",
          message: `Duplicate search tag found: '${tag}'.`,
          actual: tag,
          suggestion: "Remove redundant duplicate tag.",
        });
      }
      seenTags.add(tag.toLowerCase());
    }
  }

  // 5. Aliases quality check
  if (icon.aliases && icon.aliases.length > 0) {
    const seenAliases = new Set<string>();
    for (const alias of icon.aliases) {
      if (seenAliases.has(alias.toLowerCase())) {
        issues.push({
          gate: "schema",
          severity: "REVIEW",
          slug,
          field: "aliases",
          code: "DUPLICATE_ALIAS",
          message: `Duplicate alias found: '${alias}'.`,
          actual: alias,
          suggestion: "Remove redundant duplicate alias.",
        });
      }
      seenAliases.add(alias.toLowerCase());
    }
  }

  // 6. Geometry existence check
  if (!icon.geometry || !icon.geometry.paths || icon.geometry.paths.length === 0) {
    issues.push({
      gate: "schema",
      severity: "BLOCKING",
      slug,
      field: "geometry.paths",
      code: "MISSING_GEOMETRY",
      message: "Icon geometry must contain at least one vector path.",
      expected: "Array of paths",
      actual: "0 paths",
    });
  }

  // 7. Lifecycle status check (Section 9.3)
  const validStatuses = ["draft", "experimental", "stable", "deprecated", "beta"];
  if (icon.status && !validStatuses.includes(icon.status)) {
    issues.push({
      gate: "schema",
      severity: "BLOCKING",
      slug,
      field: "status",
      code: "INVALID_STATUS",
      message: `Status '${icon.status}' is invalid. Must be one of: ${validStatuses.join(", ")}.`,
      expected: validStatuses.join(" | "),
      actual: String(icon.status),
    });
  }

  // 8. Deprecation consistency (Section 9.62)
  if (icon.deprecated || icon.status === "deprecated") {
    if (icon.replacedBy && !icon.replacedBy.startsWith("px-") && !icon.replacedBy.startsWith("PXIcon")) {
      issues.push({
        gate: "schema",
        severity: "REVIEW",
        slug,
        field: "replacedBy",
        code: "INVALID_REPLACEMENT_TARGET",
        message: `Deprecated icon references non-canonical replacement target '${icon.replacedBy}'.`,
        actual: icon.replacedBy,
        expected: "Canonical replacement slug (e.g. 'px-new-name')",
      });
    }
  }

  return issues;
}
