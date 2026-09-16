import fs from "fs";
import path from "path";
import { CANONICAL_ICONS } from "../../../icons/source";
import { normalizeIcon, NormalizedIcon } from "./normalize";
import { validateSchema } from "../../validators/schema";
import { validateGeometry } from "../../validators/geometry";
import { validateNaming } from "../../validators/naming";
import { validateTaxonomy } from "../../validators/taxonomy";
import { validateCollisions } from "../../validators/collision";
import { validateHygiene } from "../../validators/hygiene";
import { validateRegistryItem } from "../../validators/registry";
import { QualityGateIssue } from "../../validators/types";
import { generateReactComponent } from "../../generators/react";
import { generateReactNativeComponent } from "../../generators/react-native";
import { generateSvgAsset } from "../../generators/svg";
import { generateRegistryItem, generateRootRegistry } from "../../generators/registry";
import { generateMetadataBundle } from "../../generators/metadata";
import { generateVisualRegressionSheetHtml } from "../../generators/visual-sheet";

const ROOT_DIR = path.resolve(__dirname, "../../../");
const PKG_REACT = path.join(ROOT_DIR, "packages/react/src");
const PKG_NATIVE = path.join(ROOT_DIR, "packages/react-native/src");
const PKG_SVG = path.join(ROOT_DIR, "packages/svg");
const PKG_METADATA = path.join(ROOT_DIR, "packages/metadata/generated");
const PKG_REGISTRY = path.join(ROOT_DIR, "packages/registry/generated");
const PUBLIC_R = path.join(ROOT_DIR, "public/r");
const COMPONENTS_ICONS = path.join(ROOT_DIR, "components/icons");

function cleanDirectory(dir: string, preserveFiles: string[] = []) {
  if (!fs.existsSync(dir)) return;
  for (const file of fs.readdirSync(dir)) {
    if (preserveFiles.includes(file)) continue;
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      fs.rmSync(fullPath, { recursive: true, force: true });
    } else {
      fs.unlinkSync(fullPath);
    }
  }
}

export async function runPipeline() {
  console.log("⚡ [PXUI Compiler Pipeline] Initializing quality-governed compilation...");

  // 1. Stage: Source Validation Gates (Section 9.2)
  console.log("🔍 Validating canonical icon definitions against quality gates...");
  const allIssues: QualityGateIssue[] = [];

  for (const icon of CANONICAL_ICONS) {
    const slug = icon.slug || (icon.name.startsWith("px-") ? icon.name : `px-${icon.name.replace(/^PXIcon/, "").toLowerCase()}`);
    const schemaIssues = validateSchema(icon);
    const geometryIssues = validateGeometry(slug, icon.geometry);
    const namingIssues = validateNaming(slug, icon.name);
    const taxonomyIssues = validateTaxonomy(slug, icon.category, icon.family);
    const hygieneIssues = validateHygiene(icon);

    allIssues.push(
      ...schemaIssues,
      ...geometryIssues,
      ...namingIssues,
      ...taxonomyIssues,
      ...hygieneIssues
    );
  }

  // Collision & Duplicate validation across the entire catalog (Section 9.5, 9.11)
  const collisionIssues = validateCollisions(CANONICAL_ICONS);
  allIssues.push(...collisionIssues);

  const blockingIssues = allIssues.filter((i) => i.severity === "BLOCKING");
  const reviewIssues = allIssues.filter((i) => i.severity === "REVIEW");

  if (reviewIssues.length > 0) {
    console.warn(`⚠️  Quality Review Signals (${reviewIssues.length}):`);
    reviewIssues.slice(0, 5).forEach((i) => console.warn(`  - [${i.slug}] ${i.code}: ${i.message}`));
    if (reviewIssues.length > 5) {
      console.warn(`    ... and ${reviewIssues.length - 5} more review items.`);
    }
  }

  if (blockingIssues.length > 0) {
    console.error(`❌ Compilation Gate Failed with ${blockingIssues.length} BLOCKING errors:`);
    blockingIssues.forEach((e) => {
      console.error(`  - [${e.slug}] [${e.gate.toUpperCase()}] ${e.code}: ${e.message}`);
      if (e.expected && e.actual) {
        console.error(`      Expected: ${e.expected} | Actual: ${e.actual}`);
      }
    });
    throw new Error(`Compiler pipeline aborted: ${blockingIssues.length} blocking quality gate failures.`);
  }

  console.log(`✅ All ${CANONICAL_ICONS.length} icons passed blocking quality gates (Schema, Naming, Taxonomy, Geometry Bounds/Grid, Hygiene, Duplicates)!`);

  // 2. Normalization Stage: Canonical Intermediate Representation (Section 9.1)
  console.log("🔄 Normalizing canonical intermediate representation (IR)...");
  const normalizedIcons: NormalizedIcon[] = CANONICAL_ICONS.map((i) => normalizeIcon(i));

  // 3. Ensure Output Directories and Clean Stale Artifacts
  const reactGenDir = path.join(PKG_REACT, "generated");
  const nativeGenDir = path.join(PKG_NATIVE, "generated");
  const svgGenDir = path.join(PKG_SVG, "generated");

  fs.mkdirSync(reactGenDir, { recursive: true });
  fs.mkdirSync(nativeGenDir, { recursive: true });
  fs.mkdirSync(svgGenDir, { recursive: true });
  fs.mkdirSync(PKG_METADATA, { recursive: true });
  fs.mkdirSync(path.join(PKG_REGISTRY, "r"), { recursive: true });
  fs.mkdirSync(PUBLIC_R, { recursive: true });
  fs.mkdirSync(COMPONENTS_ICONS, { recursive: true });

  cleanDirectory(reactGenDir);
  cleanDirectory(nativeGenDir);
  cleanDirectory(COMPONENTS_ICONS, ["px-icon-base.tsx", "px-icon-wrap.tsx", "package-manager-switcher.tsx", "icon-copy-dialog.tsx"]);

  // 4. Generate React Package (@pxui/react)
  console.log("📦 Generating @pxui/react package...");
  const reactBarrelExports: string[] = [
    `/**\n * AUTO-GENERATED ROOT BARREL EXPORT FOR @pxui/react\n * Do not edit manually.\n */\n`,
    `export * from "./runtime/px-icon-base";\n`,
  ];
  const appBarrelExports: string[] = [
    `/**\n * AUTO-GENERATED ROOT BARREL EXPORT FOR COMPONENTS/ICONS\n * Do not edit manually.\n */\n`,
    `export * from "./px-icon-base";\n`,
    `export * from "./px-icon-wrap";\n`,
    `export * from "./package-manager-switcher";\n`,
    `export * from "./icon-copy-dialog";\n`,
  ];

  for (const icon of normalizedIcons) {
    const componentCode = generateReactComponent(icon);
    const componentFile = path.join(reactGenDir, `${icon.pascalName}.tsx`);
    fs.writeFileSync(componentFile, componentCode, "utf-8");

    // Mirror to components/icons for application direct consumption
    const appCompFile = path.join(COMPONENTS_ICONS, `${icon.pascalName}.tsx`);
    fs.writeFileSync(appCompFile, componentCode, "utf-8");

    reactBarrelExports.push(
      `export { ${icon.pascalName}, ${icon.pascalName}Definition } from "./generated/${icon.pascalName}";`
    );
    appBarrelExports.push(
      `export { ${icon.pascalName}, ${icon.pascalName}Definition } from "./${icon.pascalName}";`
    );
  }

  fs.writeFileSync(path.join(PKG_REACT, "index.ts"), reactBarrelExports.join("\n") + "\n", "utf-8");
  fs.writeFileSync(path.join(COMPONENTS_ICONS, "index.ts"), appBarrelExports.join("\n") + "\n", "utf-8");

  // 5. Generate React Native Package (@pxui/react-native)
  console.log("📱 Generating @pxui/react-native package...");
  const nativeBarrelExports: string[] = [
    `/**\n * AUTO-GENERATED ROOT BARREL EXPORT FOR @pxui/react-native\n * Do not edit manually.\n */\n`,
  ];

  for (const icon of normalizedIcons) {
    const nativeCode = generateReactNativeComponent(icon);
    const nativeFile = path.join(nativeGenDir, `${icon.pascalName}.tsx`);
    fs.writeFileSync(nativeFile, nativeCode, "utf-8");

    nativeBarrelExports.push(
      `export { ${icon.pascalName} } from "./generated/${icon.pascalName}";`
    );
  }
  fs.writeFileSync(path.join(PKG_NATIVE, "index.ts"), nativeBarrelExports.join("\n") + "\n", "utf-8");

  // 6. Generate SVG Package (@pxui/svg)
  console.log("🎨 Generating @pxui/svg package...");
  const svgManifest: Record<string, string> = {};

  for (const icon of normalizedIcons) {
    const catDir = path.join(PKG_SVG, "generated", icon.category);
    fs.mkdirSync(catDir, { recursive: true });

    const svgContent = generateSvgAsset(icon);
    const svgFilePath = path.join(catDir, `${icon.slug}.svg`);
    fs.writeFileSync(svgFilePath, svgContent, "utf-8");

    svgManifest[icon.slug] = `generated/${icon.category}/${icon.slug}.svg`;
  }
  fs.writeFileSync(path.join(PKG_SVG, "manifest.json"), JSON.stringify(svgManifest, null, 2), "utf-8");

  // 7. Generate Metadata Package (@pxui/metadata)
  console.log("📊 Generating @pxui/metadata package...");
  const metadataBundle = generateMetadataBundle(normalizedIcons);
  fs.writeFileSync(path.join(PKG_METADATA, "icons.json"), JSON.stringify(metadataBundle.iconsJson, null, 2), "utf-8");
  fs.writeFileSync(path.join(PKG_METADATA, "categories.json"), JSON.stringify(metadataBundle.categoriesJson, null, 2), "utf-8");
  fs.writeFileSync(path.join(PKG_METADATA, "families.json"), JSON.stringify(metadataBundle.familiesJson, null, 2), "utf-8");
  fs.writeFileSync(path.join(PKG_METADATA, "collections.json"), JSON.stringify(metadataBundle.collectionsJson, null, 2), "utf-8");
  fs.writeFileSync(path.join(PKG_METADATA, "search-index.json"), JSON.stringify(metadataBundle.searchIndex, null, 2), "utf-8");
  fs.writeFileSync(path.join(PKG_METADATA, "manifest.json"), JSON.stringify(metadataBundle.manifest, null, 2), "utf-8");

  // Sync search-index to lib/search/search-index.json
  fs.mkdirSync(path.join(ROOT_DIR, "lib/search"), { recursive: true });
  fs.writeFileSync(path.join(ROOT_DIR, "lib/search/search-index.json"), JSON.stringify(metadataBundle.searchIndex, null, 2), "utf-8");

  // 8. Generate Registry Package (@pxui/registry) & public/r
  console.log("🏛️  Generating @pxui/registry and public/r/ endpoints...");
  const baseComponentCode = fs.readFileSync(path.join(COMPONENTS_ICONS, "px-icon-base.tsx"), "utf-8");
  const schemaCode = fs.readFileSync(path.join(ROOT_DIR, "lib/icons/schema.ts"), "utf-8");
  const { generateBaseRegistryItemJson } = await import("../../../lib/compiler");
  const baseRegistryItem = generateBaseRegistryItemJson(baseComponentCode, schemaCode);

  fs.writeFileSync(path.join(PKG_REGISTRY, "r/px-icon-base.json"), JSON.stringify(baseRegistryItem, null, 2), "utf-8");
  fs.writeFileSync(path.join(PUBLIC_R, "px-icon-base.json"), JSON.stringify(baseRegistryItem, null, 2), "utf-8");

  for (const icon of normalizedIcons) {
    const regItem = generateRegistryItem(icon);

    // Verify registry item format before writing
    const regIssues = validateRegistryItem(regItem);
    const regBlocking = regIssues.filter((i) => i.severity === "BLOCKING");
    if (regBlocking.length > 0) {
      throw new Error(`Registry artifact validation failed for ${icon.slug}: ${regBlocking[0].message}`);
    }

    fs.writeFileSync(path.join(PKG_REGISTRY, "r", `${icon.slug}.json`), JSON.stringify(regItem, null, 2), "utf-8");
    fs.writeFileSync(path.join(PUBLIC_R, `${icon.slug}.json`), JSON.stringify(regItem, null, 2), "utf-8");
    fs.writeFileSync(path.join(PUBLIC_R, `${icon.cleanName}.json`), JSON.stringify({ ...regItem, name: icon.cleanName }, null, 2), "utf-8");
  }

  // Root registry
  const rootReg = generateRootRegistry(normalizedIcons);
  rootReg.items.unshift(baseRegistryItem as any);
  fs.writeFileSync(path.join(PKG_REGISTRY, "registry.json"), JSON.stringify(rootReg, null, 2), "utf-8");
  fs.writeFileSync(path.join(PUBLIC_R, "registry.json"), JSON.stringify(rootReg, null, 2), "utf-8");

  // 9. Generate Visual Reference Matrix (Section 9.33, 9.34)
  console.log("📐 Generating visual regression & family reference sheet...");
  const visualSheetHtml = generateVisualRegressionSheetHtml(normalizedIcons);
  fs.writeFileSync(path.join(PKG_METADATA, "visual-sheet.html"), visualSheetHtml, "utf-8");
  fs.writeFileSync(path.join(ROOT_DIR, "public/visual-sheet.html"), visualSheetHtml, "utf-8");

  console.log("✨ [PXUI Compiler Pipeline] Completed successfully with 0 blocking errors!");
}
