"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface PXUIMarkProps extends React.SVGProps<SVGSVGElement> {
  size?: number | "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "default" | "monochrome" | "coral" | "inverse";
  animated?: boolean;
  className?: string;
}

const SIZE_MAP: Record<string, number> = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 48,
};

/**
 * PXUIMark — The Canonical PXUI Pixel-Native Brand Mark.
 *
 * Geometric Construction:
 * - 24x24 canonical coordinate space.
 * - Solid, filled architectural silhouette with intentional negative-space counters.
 * - Left vertical pillar encodes the 'P' foundation.
 * - Upper enclosed counter at (8..12, 5..8) resolves the 'P' lobe.
 * - Stepped right incisions and interlocking bottom clearance encode the 'X' dynamic.
 * - Optically balanced, high-density center of mass.
 * - Razor-sharp integer pixel snap at 16px, 20px, 24px, 32px, 48px, 64px+.
 */
export function PXUIMark({
  size = "md",
  variant = "default",
  animated = false,
  className,
  ...props
}: PXUIMarkProps) {
  const pixelSize = typeof size === "number" ? size : SIZE_MAP[size] || 24;

  const colorClass =
    variant === "coral"
      ? "text-primary fill-primary"
      : variant === "monochrome"
      ? "text-foreground fill-foreground"
      : variant === "inverse"
      ? "text-[#faf9f5] fill-[#faf9f5]"
      : "fill-current";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={pixelSize}
      height={pixelSize}
      className={cn(
        "inline-block shrink-0 select-none align-middle",
        colorClass,
        animated && "animate-pulse",
        className
      )}
      role="img"
      aria-label="PXUI Mark"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 3h18v6h-3v3h3v9h-6v-4h-4v4H3V3zm5 5h4V5H8v3zm4 5h3v3h-3v-3z"
      />
    </svg>
  );
}
