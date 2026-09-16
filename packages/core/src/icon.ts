import { PXGeometry } from "./geometry";
import { PXAnimationDefinition } from "./animation";
import { PXIconCategory } from "./category";

export type PXIconStatus = "draft" | "experimental" | "stable" | "deprecated" | "beta";

export type PXPlatform = "react" | "react-native" | "registry" | "svg";

export type PXVariant = "outline" | "filled";

export interface PXIconDefinition {
  name: string;
  componentName?: string;
  slug: string;
  title: string;
  description?: string;
  category: PXIconCategory;
  family?: string;
  aliases: readonly string[];
  tags: readonly string[];
  geometry: PXGeometry;
  variants?: readonly PXVariant[];
  animation?: PXAnimationDefinition;
  animations?: readonly PXAnimationDefinition[];
  platforms?: readonly PXPlatform[];
  status: PXIconStatus;
  introduced?: string;
  introducedVersion?: string;
  deprecated?: boolean;
  replacedBy?: string;
}

export interface PXIconProps {
  size?: number | string;
  color?: string;
  filled?: boolean;
  animated?: boolean;
  className?: string;
  title?: string;
  "aria-label"?: string;
  "aria-hidden"?: boolean | "true" | "false";
}
