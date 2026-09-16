import { PXGeometry } from "./geometry.schema";
import { PXAnimationDefinition } from "./animation.schema";
import { PXBrandMetadata } from "./brand.schema";
import { PXIconCategory } from "../categories";

export type PXIconStatus = "draft" | "experimental" | "stable" | "deprecated" | "beta";

export type PXPlatform = "react" | "react-native" | "registry" | "svg";

export type PXVariant = "outline" | "filled";

export interface PXIconDefinition {
  /** Canonical semantic identifier (e.g. "home", "arrow-left") or component name ("PXIconHome") */
  name: string;
  /** Public framework component name (derived if omitted, e.g. "PXIconHome") */
  componentName?: string;
  /** Registry and URL slug (derived if omitted, e.g. "px-home") */
  slug?: string;
  /** Human-readable display label (e.g. "Home", "Calendar Clock") */
  title: string;
  /** Concise semantic explanation */
  description?: string;
  /** Primary taxonomy category */
  category: PXIconCategory;
  /** Related geometric/semantic family */
  family?: string;
  /** Search and discovery tags */
  tags: readonly string[];
  /** Alternate search vocabulary */
  aliases: readonly string[];
  /** Canonical authoring grid (default: 24) */
  grid?: number;
  /** Source icon geometry */
  geometry: PXGeometry;
  /** Supported canonical variants (e.g. ["outline", "filled"]) */
  variants?: readonly PXVariant[];
  /** Supported animation definition */
  animation?: PXAnimationDefinition;
  animations?: readonly PXAnimationDefinition[];
  /** Supported generated platform targets */
  platforms?: readonly PXPlatform[];
  /** Brand identity and legal metadata */
  brand?: PXBrandMetadata;
  /** Lifecycle status */
  status: PXIconStatus;
  /** First PXUI release containing this icon (e.g. "1.0.0") */
  introduced?: string;
  introducedVersion?: string;
  /** Deprecation flag */
  deprecated?: boolean;
  /** Replacement migration target if deprecated */
  replacedBy?: string;
  /** Extended discovery keywords */
  keywords?: readonly string[];
}

/**
 * Define icon helper to enforce typing and immutability.
 */
export function defineIcon(def: PXIconDefinition): PXIconDefinition {
  return Object.freeze(def);
}
