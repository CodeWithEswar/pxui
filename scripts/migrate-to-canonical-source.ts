import fs from "fs";
import path from "path";
import { ICONS_CATALOG } from "../lib/icons/catalog";
import { toPXComponentName } from "../lib/compiler";
import { PXIconCategory, ICON_CATEGORIES } from "../icons/categories";

const ICONS_SOURCE_ROOT = path.resolve(__dirname, "../icons/source");

// Category normalizer
function normalizeCategory(rawCat: string, name: string): PXIconCategory {
  if (name === "home" || name === "search" || name === "compass" || name === "map-pin" || name === "globe") {
    return "navigation";
  }

  const lower = rawCat.toLowerCase();
  if (lower.includes("arrow")) return "arrows";
  if (lower.includes("action")) return "actions";
  if (lower.includes("file")) return "files";
  if (lower.includes("communi")) return "communication";
  if (lower.includes("people") || lower.includes("social")) return "people";
  if (lower.includes("device") || lower.includes("hard")) return "devices";
  if (lower.includes("develop") || lower.includes("code")) return "development";
  if (lower.includes("business")) return "business";
  if (lower.includes("commerce")) return "commerce";
  if (lower.includes("media") || lower.includes("creat")) return "media";
  if (lower.includes("map") || lower.includes("travel")) return "maps";
  if (lower.includes("secur") || lower.includes("priv")) return "security";
  if (lower.includes("time") || lower.includes("calen")) return "time";
  if (lower.includes("weather") || lower.includes("natur")) return "weather";

  return "actions";
}

function deriveFamily(name: string): string {
  const root = name.split("-")[0];
  return root;
}

export function migrate() {
  console.log("Migrating canonical icon definitions to icons/source/...");

  const indexExports: string[] = [
    `/**\n * AUTO-GENERATED ROOT CATALOG FROM CANONICAL SOURCES.\n * Do not edit manually.\n */\n`,
    `import { PXIconDefinition } from "../schemas/icon.schema";\n`,
  ];
  const allIconsArray: string[] = [];

  for (const icon of ICONS_CATALOG) {
    const category = normalizeCategory(icon.category, icon.name);
    const componentName = toPXComponentName(icon.name);
    const slug = `px-${icon.name}`;
    const family = deriveFamily(icon.name);

    const categoryDir = path.join(ICONS_SOURCE_ROOT, category);
    fs.mkdirSync(categoryDir, { recursive: true });

    const iconDef = {
      name: componentName,
      slug,
      title: icon.title,
      description: icon.description || `Pixel-native ${icon.title} icon.`,
      category,
      family,
      aliases: icon.aliases || [],
      tags: icon.tags || [],
      geometry: {
        grid: 24,
        paths: icon.paths,
        filled: icon.filled || undefined,
        bounds: { minX: 0, minY: 0, maxX: 24, maxY: 24 },
      },
      animation: icon.animation
        ? {
            type: icon.animation.type,
            family: icon.animation.family,
            trigger: icon.animation.trigger,
            durationMs: (icon.animation as any).durationMs || (icon.animation as any).duration,
          }
        : undefined,
      status: "stable",
      introducedVersion: icon.introducedVersion || "0.1.0",
    };

    const varName = icon.name.replace(/-([a-z0-9])/g, (_, g) => g.toUpperCase());

    const fileContent = `import { defineIcon } from "../../schemas/icon.schema";

export const ${varName} = defineIcon(${JSON.stringify(iconDef, null, 2)});
export default ${varName};
`;

    const filePath = path.join(categoryDir, `${icon.name}.ts`);
    fs.writeFileSync(filePath, fileContent, "utf-8");

    // Add to index aggregator
    indexExports.push(`import { ${varName} as ${componentName}Def } from "./${category}/${icon.name}";`);
    allIconsArray.push(`${componentName}Def`);
  }

  indexExports.push(`\nexport const CANONICAL_ICONS: PXIconDefinition[] = [\n  ${allIconsArray.join(",\n  ")}\n];\n`);
  indexExports.push(`export default CANONICAL_ICONS;\n`);

  fs.writeFileSync(path.join(ICONS_SOURCE_ROOT, "index.ts"), indexExports.join("\n"), "utf-8");
  console.log(`Successfully generated ${ICONS_CATALOG.length} canonical icon definitions in icons/source/!`);
}

migrate();
