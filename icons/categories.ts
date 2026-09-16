/**
 * Canonical Category Definitions for PXUI.
 * Frozen taxonomy to prevent ad-hoc category sprawl.
 */
export const ICON_CATEGORIES = [
  "accessibility",
  "actions",
  "actions-controls",
  "ai",
  "arrows",
  "brands",
  "buildings",
  "business",
  "commerce",
  "communication",
  "development",
  "devices",
  "editing",
  "education",
  "files",
  "finance",
  "health",
  "infrastructure",
  "maps",
  "media",
  "navigation",
  "objects",
  "people",
  "security",
  "shapes",
  "social",
  "status",
  "symbols",
  "time",
  "weather",
] as const;

export type PXIconCategory = typeof ICON_CATEGORIES[number];

export function isValidCategory(category: string): category is PXIconCategory {
  return ICON_CATEGORIES.includes(category as PXIconCategory);
}
