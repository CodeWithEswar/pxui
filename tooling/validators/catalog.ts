import { IconDefinition } from "../../lib/icons/schema";

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  iconCount: number;
}

export function validateIconCatalog(icons: IconDefinition[]): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const names = new Set<string>();

  for (const icon of icons) {
    // 1. Check Name
    if (!icon.name) {
      errors.push(`Icon missing 'name': ${JSON.stringify(icon)}`);
      continue;
    }

    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(icon.name)) {
      errors.push(`Icon '${icon.name}' name must be lowercase-kebab-case.`);
    }

    if (names.has(icon.name)) {
      errors.push(`Duplicate icon name found: '${icon.name}'`);
    }
    names.add(icon.name);

    // 2. Check Title
    if (!icon.title || icon.title.trim() === "") {
      errors.push(`Icon '${icon.name}' is missing a title.`);
    }

    // 3. Check Category
    if (!icon.category) {
      errors.push(`Icon '${icon.name}' is missing a category.`);
    }

    // 4. Check Grid
    if (icon.grid !== 24) {
      errors.push(`Icon '${icon.name}' grid must be 24 (got ${icon.grid}).`);
    }

    // 5. Check Tags
    if (!Array.isArray(icon.tags) || icon.tags.length === 0) {
      warnings.push(`Icon '${icon.name}' has no tags.`);
    }

    // 6. Check Paths
    if (!Array.isArray(icon.paths) || icon.paths.length === 0) {
      errors.push(`Icon '${icon.name}' must have at least one path definition.`);
    } else {
      for (const [idx, p] of icon.paths.entries()) {
        if (!p.d || p.d.trim() === "") {
          errors.push(`Icon '${icon.name}' path #${idx} has empty path data.`);
        }
      }
    }

    // 7. Check Animation if present
    if (icon.animation) {
      if (!icon.animation.family || !icon.animation.cssClass) {
        errors.push(`Icon '${icon.name}' animation is missing required fields.`);
      }
    }

    // 8. Check Version
    if (!icon.introducedVersion) {
      warnings.push(`Icon '${icon.name}' missing introducedVersion.`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    iconCount: icons.length,
  };
}
