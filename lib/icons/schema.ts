export type IconCategory =
  | "Actions & Controls"
  | "Arrows & Navigation"
  | "Files & Folders"
  | "Communication"
  | "People & Social"
  | "Devices & Hardware"
  | "Development & Code"
  | "Business & Finance"
  | "Commerce"
  | "Media & Creative"
  | "Maps & Travel"
  | "Buildings & Objects"
  | "Health & Fitness"
  | "Weather & Nature"
  | "Security & Privacy"
  | "Time & Calendar"
  | "Education"
  | "AI & Emerging Tech"
  | "Brands & Technology"
  | "Miscellaneous & Symbols";

export type AnimationFamily =
  | "state"
  | "directional"
  | "attention"
  | "reveal"
  | "signal"
  | "loop";

export type AnimationType =
  | "spin"
  | "pulse"
  | "bounce"
  | "wiggle"
  | "blink"
  | "ring"
  | "shake"
  | "beat";

export type AnimationName =
  | "spin"
  | "pulse"
  | "bounce"
  | "wiggle"
  | "blink"
  | "ring"
  | "shake"
  | "beat"
  | "open"
  | "close"
  | "check"
  | "error"
  | "success"
  | "download"
  | "upload"
  | "appear"
  | "disappear"
  | "loading"
  | string;

export interface AnimationDefinition {
  family: AnimationFamily;
  type: AnimationType;
  cssClass: string;
  description: string;
  duration?: number;
  trigger?: "auto" | "hover" | "click" | "focus" | "controlled" | "always" | "mount";
}

export interface BrandDefinition {
  brand: string;
  owner: string;
  source?: string;
  guidelinesUrl?: string;
}

export interface IconPathDefinition {
  d: string;
  fillRule?: "nonzero" | "evenodd";
  clipRule?: "nonzero" | "evenodd";
}

export interface IconDefinition {
  name: string; // lowercase-kebab-case, e.g. "home", "search"
  componentName?: string; // Public framework component name, e.g. "PXIconHome"
  slug?: string; // Registry, URL and artifact identifier, e.g. "px-home"
  title: string;
  description?: string;
  category: IconCategory;
  family?: string; // Related geometric/semantic family (Section 7.19)
  tags: string[];
  aliases?: string[];
  grid: 24;
  paths: IconPathDefinition[];
  filled?: IconPathDefinition[];
  variants?: string[]; // Supported canonical variants, e.g. ["outline", "filled"]
  animation?: AnimationDefinition;
  brand?: BrandDefinition;
  platforms?: string[]; // Supported generated targets (Section 7.27)
  status?: "draft" | "experimental" | "stable" | "deprecated"; // Lifecycle state (Section 7.28)
  introduced?: string; // First PXUI release containing icon (Section 7.29)
  introducedVersion: string;
  deprecated?: boolean; // Deprecation state (Section 7.30)
  replacedBy?: string; // Migration target when deprecated
}

/**
 * PixelIconProps conforming strictly to Section 3.11.1 of the design system specification.
 */
export interface PixelIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
  strokeWidth?: number;
  animated?: boolean;
  animation?: AnimationName;
  duration?: number;
  delay?: number;
  loop?: boolean;
  trigger?: "auto" | "hover" | "click" | "focus" | "controlled";
  filled?: boolean;
  title?: string;
  className?: string;
  "aria-label"?: string;
}

/**
 * Backward compatibility alias for PXIconProps
 */
export type PXIconProps = PixelIconProps;
