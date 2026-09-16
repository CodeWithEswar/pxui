import { NormalizedIcon } from "../../compiler/src/normalize";
import { ICON_CATEGORIES } from "../../../icons/categories";
import { ICON_FAMILIES } from "../../../icons/families";
import { ICON_COLLECTIONS } from "../../../icons/collections";

export function generateMetadataBundle(icons: NormalizedIcon[]) {
  const searchIndex = icons.map((icon) => ({
    name: icon.name,
    canonicalName: icon.cleanName,
    slug: icon.slug,
    componentName: icon.pascalName,
    title: icon.title,
    description: icon.description,
    category: icon.category,
    family: icon.family,
    tags: icon.tags,
    aliases: icon.aliases,
    grid: icon.grid,
    variants: icon.variants,
    animated: icon.animated,
    hasFilled: Boolean(icon.filledPaths && icon.filledPaths.length > 0),
    platforms: icon.platforms,
    status: icon.status,
    introduced: icon.introduced,
    deprecated: icon.deprecated,
  }));

  const categoryCounts: Record<string, number> = {};
  for (const cat of ICON_CATEGORIES) {
    const count = icons.filter((i) => i.category === cat).length;
    if (count > 0) {
      categoryCounts[cat] = count;
    }
  }

  const familyCounts: Record<string, number> = {};
  for (const fam of Object.keys(ICON_FAMILIES)) {
    const count = icons.filter((i) => (i.family || "").toLowerCase() === fam.toLowerCase()).length;
    if (count > 0) {
      familyCounts[fam] = count;
    }
  }

  const manifest = {
    version: "0.1.0",
    generatedAt: new Date().toISOString(),
    iconCount: icons.length,
    total: icons.length,
    catalogFloor: 5000,
    planningEnvelope: 5840,
    stable: icons.filter((i) => (i.status || "stable") === "stable").length,
    experimental: icons.filter((i) => i.status === "experimental").length,
    draft: icons.filter((i) => i.status === "draft").length,
    deprecated: icons.filter((i) => Boolean(i.deprecated) || i.status === "deprecated").length,
    animated: icons.filter((i) => Boolean(i.animated)).length,
    brands: icons.filter((i) => i.category === "brands").length,
    categories: Array.from(ICON_CATEGORIES),
    categoryCounts,
    families: Object.keys(ICON_FAMILIES),
    familyCounts,
    collections: Object.keys(ICON_COLLECTIONS),
  };

  const iconsJson = icons.map((i) => ({
    name: i.name,
    canonicalName: i.cleanName,
    slug: i.slug,
    componentName: i.pascalName,
    title: i.title,
    description: i.description,
    category: i.category,
    family: i.family,
    tags: i.tags,
    aliases: i.aliases,
    grid: i.grid,
    variants: i.variants,
    animated: i.animated,
    platforms: i.platforms,
    status: i.status,
    introduced: i.introduced,
    deprecated: i.deprecated,
  }));

  return {
    searchIndex,
    manifest,
    iconsJson,
    categoriesJson: ICON_CATEGORIES,
    familiesJson: ICON_FAMILIES,
    collectionsJson: ICON_COLLECTIONS,
  };
}
