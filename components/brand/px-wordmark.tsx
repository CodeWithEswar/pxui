"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface PXUIWordmarkProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const SIZE_CLASSES = {
  sm: "text-base tracking-tight",
  md: "text-lg tracking-tight",
  lg: "text-2xl tracking-tighter",
  xl: "text-3xl tracking-tighter font-bold",
};

/**
 * PXUIWordmark — The Refined Typographic Identity for PXUI.
 *
 * Strict capitalization: always "PXUI", never "PxUI" or "PixelUI".
 * High-density letter spacing with optical baseline compensation.
 */
export function PXUIWordmark({
  size = "md",
  className,
  ...props
}: PXUIWordmarkProps) {
  return (
    <span
      className={cn(
        "font-sans font-bold select-none text-foreground leading-none",
        SIZE_CLASSES[size],
        className
      )}
      {...props}
    >
      PXUI
    </span>
  );
}
