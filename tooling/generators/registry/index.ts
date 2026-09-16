import { NormalizedIcon } from "../../compiler/src/normalize";
import { generateReactComponent } from "../react";

export function generateRegistryItem(
  icon: NormalizedIcon,
  baseUrl = process.env.PXUI_REGISTRY_BASE_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
) {
  const reactCode = generateReactComponent(icon);

  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: icon.slug,
    type: "registry:ui",
    title: icon.pascalName,
    description: icon.description,
    dependencies: [],
    devDependencies: [],
    registryDependencies: [`${baseUrl}/r/px-icon-base.json`],
    files: [
      {
        path: `components/pxui/${icon.slug}.tsx`,
        content: reactCode,
        type: "registry:ui",
        target: `components/pxui/${icon.slug}.tsx`,
      },
    ],
    categories: [icon.category],
    meta: {
      tags: icon.tags,
      aliases: icon.aliases,
      grid: icon.grid,
      animated: icon.animated,
      hasFilled: Boolean(icon.filledPaths && icon.filledPaths.length > 0),
      source: icon.sourceFile,
    },
  };
}

export function generateRootRegistry(
  icons: NormalizedIcon[],
  baseUrl = process.env.PXUI_REGISTRY_BASE_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
) {
  return {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "pxui",
    homepage: baseUrl,
    items: icons.map((icon) => generateRegistryItem(icon, baseUrl)),
  };
}
