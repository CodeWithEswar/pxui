import { IconDefinition } from "../icons/schema";

/**
 * Canonical naming transformer: converts a semantic kebab-case name to PascalCase with 'PXIcon' prefix.
 * Example: 'home' -> 'PXIconHome', 'bell' -> 'PXIconBell', 'arrow-left' -> 'PXIconArrowLeft'
 */
export function toPXComponentName(name: string): string {
  const clean = name.replace(/^(px-|PXIcon|PX|Pixel)/, "");
  const pascal = clean
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
  return `PXIcon${pascal}`;
}

/**
 * Canonical component name helper for PXUI.
 */
export function toPixelComponentName(name: string): string {
  return toPXComponentName(name);
}

/**
 * Generates standalone, tree-shakeable React component source code.
 * Follows the canonical PXIcon* naming convention.
 */
export function generateReactComponentCode(icon: IconDefinition): string {
  const componentName = toPXComponentName(icon.name);
  const defJson = JSON.stringify(icon, null, 2);

  return `"use client";

import * as React from "react";
import { PXIconBase } from "@/components/icons/px-icon-base";
import { IconDefinition, PixelIconProps } from "@/lib/icons/schema";

export const ${componentName}Definition: IconDefinition = ${defJson};

/**
 * ${componentName} - ${icon.title}
 * ${icon.description || "Pixel-native icon from the PXUI icon system."}
 * Canonical: ${componentName}
 * Package: @pxui/react
 * Category: ${icon.category}
 * Grid: 24x24
 */
export const ${componentName} = React.forwardRef<SVGSVGElement, PixelIconProps>(
  (props, ref) => {
    return <PXIconBase ref={ref} definition={${componentName}Definition} {...props} />;
  }
);

${componentName}.displayName = "${componentName}";

export default ${componentName};
`;
}

/**
 * Generates standalone React Native code using react-native-svg.
 */
export function generateReactNativeCode(icon: IconDefinition): string {
  const componentName = toPXComponentName(icon.name);
  const paths = icon.paths.map((p) => `      <Path d="${p.d}" fill={color} />`).join("\n");
  const filledPaths = icon.filled
    ? icon.filled.map((p) => `      <Path d="${p.d}" fill={color} />`).join("\n")
    : paths;

  return `import React from 'react';
import Svg, { Path } from 'react-native-svg';

export interface ${componentName}Props {
  size?: number | string;
  color?: string;
  filled?: boolean;
}

/**
 * ${componentName} - React Native
 * Canonical Grid: 24x24
 * Package: @pxui/react-native
 */
export const ${componentName}: React.FC<${componentName}Props> = ({
  size = 24,
  color = '#000000',
  filled = false,
}) => {
  const dimension = typeof size === 'string' ? parseInt(size, 10) || 24 : size;

  return (
    <Svg width={dimension} height={dimension} viewBox="0 0 24 24">
${icon.filled ? `      {filled ? (\n  ${filledPaths}\n      ) : (\n  ${paths}\n      )}` : paths}
    </Svg>
  );
};

export default ${componentName};
`;
}

/**
 * Generates raw SVG markup for the icon.
 */
export function generateSvgString(icon: IconDefinition, filled = false): string {
  const paths = filled && icon.filled && icon.filled.length > 0
    ? icon.filled
    : icon.paths;

  const pathElements = paths
    .map(
      (p) =>
        `  <path d="${p.d}" fill="currentColor"${p.fillRule ? ` fill-rule="${p.fillRule}"` : ""}${p.clipRule ? ` clip-rule="${p.clipRule}"` : ""} />`
    )
    .join("\n");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" shape-rendering="crispEdges">
${pathElements}
</svg>`;
}

/**
 * Generates official shadcn registry JSON for an icon.
 */
export function generateRegistryItemJson(
  icon: IconDefinition,
  baseUrl = process.env.PXUI_REGISTRY_BASE_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
) {
  const componentName = toPXComponentName(icon.name);
  const reactCode = generateReactComponentCode(icon);

  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: `px-${icon.name}`,
    type: "registry:ui",
    title: componentName,
    description: icon.description || `Pixel-native ${icon.title} icon.`,
    dependencies: [],
    devDependencies: [],
    registryDependencies: [`${baseUrl}/r/px-icon-base.json`],
    files: [
      {
        path: `components/pxui/px-${icon.name}.tsx`,
        content: reactCode,
        type: "registry:ui",
        target: `components/pxui/px-${icon.name}.tsx`,
      },
    ],
    categories: [icon.category],
    meta: {
      tags: icon.tags,
      aliases: icon.aliases || [],
      grid: 24,
      animated: Boolean(icon.animation),
      hasFilled: Boolean(icon.filled),
      introducedVersion: icon.introducedVersion,
    },
  };
}

/**
 * Generates registry definition for the shared PXIconBase primitive.
 */
export function generateBaseRegistryItemJson(
  baseComponentCode: string,
  schemaCode: string
) {
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "px-icon-base",
    type: "registry:ui",
    title: "PXIconBase",
    description: "Core pixel rendering engine and TypeScript schema for PXUI icons.",
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
    files: [
      {
        path: "components/icons/px-icon-base.tsx",
        content: baseComponentCode,
        type: "registry:ui",
        target: "components/icons/px-icon-base.tsx",
      },
      {
        path: "lib/icons/schema.ts",
        content: schemaCode,
        type: "registry:lib",
        target: "lib/icons/schema.ts",
      },
    ],
    categories: ["Core Primitives"],
  };
}

/**
 * Generates the root registry.json catalog for shadcn registry discovery.
 */
export function generateRootRegistryJson(
  icons: IconDefinition[],
  baseUrl = process.env.PXUI_REGISTRY_BASE_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
) {
  return {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "pxui",
    homepage: baseUrl,
    items: icons.map((icon) => generateRegistryItemJson(icon, baseUrl)),
  };
}
