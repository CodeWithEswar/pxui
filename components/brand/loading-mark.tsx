"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { PXUIMark } from "./px-mark";

export interface PXUILoadingMarkProps {
  size?: number | "sm" | "md" | "lg";
  text?: string;
  className?: string;
}

/**
 * PXUILoadingMark — Unique Pixel-Native Loading State.
 *
 * Derived directly from the canonical PXUI logo geometry.
 * Uses a subtle 500ms pulsing frame rhythm rather than a generic circular spinner.
 * Fully respects prefers-reduced-motion.
 */
export function PXUILoadingMark({
  size = 32,
  text = "Loading...",
  className,
}: PXUILoadingMarkProps) {
  const pixelSize = typeof size === "number" ? size : size === "sm" ? 20 : size === "md" ? 32 : 48;

  return (
    <div
      className={cn(
        "inline-flex flex-col items-center justify-center gap-3 p-4 select-none",
        className
      )}
      role="status"
      aria-label={text}
    >
      <div className="relative flex items-center justify-center">
        {/* Ambient subtle back-glow */}
        <div
          className="absolute inset-0 bg-primary/15 blur-sm rounded-sm animate-pulse motion-reduce:hidden"
          style={{ width: pixelSize, height: pixelSize }}
        />
        {/* Discrete pulsing mark */}
        <PXUIMark
          size={pixelSize}
          variant="coral"
          className="relative z-10 transition-opacity duration-300 animate-pulse motion-reduce:animate-none"
        />
      </div>

      {text && (
        <span className="text-xs font-mono tracking-wider uppercase text-muted-foreground animate-pulse motion-reduce:animate-none">
          {text}
        </span>
      )}
    </div>
  );
}
