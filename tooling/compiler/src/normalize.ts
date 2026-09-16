import crypto from "crypto";
import { PXIconDefinition, PXPlatform, PXVariant } from "../../../icons/schemas/icon.schema";
import { parseAndAnalyzePath, PathBounds } from "../../validators/geometry/path-parser";

export interface NormalizedIcon {
  name: string;
  slug: string;
  pascalName: string;
  cleanName: string;
  title: string;
  description: string;
  category: string;
  family: string;
  aliases: string[];
  tags: string[];
  paths: { d: string; fillRule?: string; clipRule?: string }[];
  filledPaths?: { d: string; fillRule?: string; clipRule?: string }[];
  grid: number;
  bounds: PathBounds;
  geometryHash: string;
  variants: PXVariant[];
  animated: boolean;
  animation?: any;
  platforms: PXPlatform[];
  status: string;
  introduced: string;
  deprecated: boolean;
  replacedBy?: string;
  sourceFile: string;
}

/**
 * Computes deterministic SHA-256 geometry hash for icon.
 */
function computeDeterministicHash(paths: { d: string }[]): string {
  const normalized = paths
    .map((p) => p.d.replace(/\s+/g, " ").trim())
    .sort()
    .join("|");
  return crypto.createHash("sha256").update(normalized).digest("hex");
}

export function normalizeIcon(icon: PXIconDefinition, sourceFile = ""): NormalizedIcon {
  // 1. Resolve clean canonical semantic name (Section 9.4)
  let cleanName = "";
  if (icon.slug) {
    cleanName = icon.slug.replace(/^px-/, "");
  } else if (/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(icon.name)) {
    cleanName = icon.name;
  } else if (icon.name.startsWith("PXIcon")) {
    cleanName = icon.name
      .replace(/^PXIcon/, "")
      .replace(/([A-Z])/g, "-$1")
      .toLowerCase()
      .replace(/^-/, "");
  } else {
    cleanName = icon.name.toLowerCase();
  }

  // 2. Resolve public component name (Section 9.4)
  const pascalSemantic = cleanName
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
  const pascalName = `PXIcon${pascalSemantic}`;

  // 3. Resolve slug (Section 9.4)
  const slug = `px-${cleanName}`;

  // 4. Resolve variants
  const hasFilled = Boolean(icon.geometry.filled && icon.geometry.filled.length > 0);
  const variants: PXVariant[] = icon.variants
    ? [...icon.variants]
    : hasFilled
    ? ["outline", "filled"]
    : ["outline"];

  // 5. Resolve platforms
  const platforms: PXPlatform[] = icon.platforms
    ? [...icon.platforms]
    : ["react", "react-native", "registry", "svg"];

  // 6. Compute true geometric bounding box across all paths
  const grid = icon.geometry.grid || icon.grid || 24;
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  const normalizedPaths = icon.geometry.paths.map((p, idx) => {
    const analysis = parseAndAnalyzePath(p.d, slug, idx, grid);
    if (analysis.bounds.minX < minX) minX = analysis.bounds.minX;
    if (analysis.bounds.minY < minY) minY = analysis.bounds.minY;
    if (analysis.bounds.maxX > maxX) maxX = analysis.bounds.maxX;
    if (analysis.bounds.maxY > maxY) maxY = analysis.bounds.maxY;
    return {
      d: p.d.trim(),
      fillRule: p.fillRule,
      clipRule: p.clipRule,
    };
  });

  const filledPaths = icon.geometry.filled?.map((p, idx) => {
    const analysis = parseAndAnalyzePath(p.d, slug, idx, grid);
    if (analysis.bounds.minX < minX) minX = analysis.bounds.minX;
    if (analysis.bounds.minY < minY) minY = analysis.bounds.minY;
    if (analysis.bounds.maxX > maxX) maxX = analysis.bounds.maxX;
    if (analysis.bounds.maxY > maxY) maxY = analysis.bounds.maxY;
    return {
      d: p.d.trim(),
      fillRule: p.fillRule,
      clipRule: p.clipRule,
    };
  });

  const bounds: PathBounds = {
    minX: minX === Infinity ? 0 : minX,
    minY: minY === Infinity ? 0 : minY,
    maxX: maxX === -Infinity ? 0 : maxX,
    maxY: maxY === -Infinity ? 0 : maxY,
    width: maxX === -Infinity ? 0 : Math.round((maxX - minX) * 100) / 100,
    height: maxY === -Infinity ? 0 : Math.round((maxY - minY) * 100) / 100,
  };

  // 7. Compute canonical geometry hash (Section 9.12)
  const geometryHash = computeDeterministicHash(normalizedPaths);

  return {
    name: pascalName,
    slug,
    pascalName,
    cleanName,
    title: icon.title,
    description: icon.description || `Pixel-native ${icon.title} icon.`,
    category: icon.category,
    family: icon.family || cleanName.split("-")[0],
    aliases: Array.from(
      new Set(
        (icon.aliases || [])
          .map((a) => a.trim().toLowerCase())
          .filter((a) => a.length > 0)
      )
    ),
    tags: Array.from(
      new Set(
        (icon.tags || [])
          .map((t) => t.trim().toLowerCase())
          .filter((t) => t.length > 0)
      )
    ),
    paths: normalizedPaths,
    filledPaths,
    grid,
    bounds,
    geometryHash,
    variants,
    animated: Boolean(icon.animation || (icon.animations && icon.animations.length > 0)),
    animation: icon.animation || (icon.animations && icon.animations[0]),
    platforms,
    status: icon.status || "stable",
    introduced: icon.introduced || icon.introducedVersion || "1.0.0",
    deprecated: Boolean(icon.deprecated || icon.status === "deprecated"),
    replacedBy: icon.replacedBy,
    sourceFile: sourceFile || `icons/source/${icon.category}/${cleanName}.ts`,
  };
}
