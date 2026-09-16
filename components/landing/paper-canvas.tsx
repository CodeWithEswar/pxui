"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { GridSignal } from "./grid-signal";

interface PaperCanvasProps {
  className?: string;
  signals?: boolean;
  gridOpacity?: number;
  children: React.ReactNode;
}

/**
 * PaperCanvas — Global Continuous Technical Paper Sheet.
 *
 * Layers:
 * 1. Base paper gradient (warm subtle tonal depth)
 * 2. Restrained material grain (~1.5% noise)
 * 3. Canonical dual-tier 24px minor + 96px major architectural grid
 * 4. Radial hierarchy masks (soft behind editorial text, crisp at edges)
 * 5. 1–3 discrete stepped grid signals
 */
export function PaperCanvas({
  className,
  children,
}: PaperCanvasProps) {
  return (
    <div
      className={cn(
        "bg-paper-canvas relative w-full overflow-hidden transition-colors",
        className
      )}
    >
      {/* Layer 1: Restrained Material Paper Grain (~1.5% opacity) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-paper-grain pointer-events-none select-none z-0 opacity-40 dark:opacity-25"
      />

      {/* Layer 2: Soft Radial Ambient Vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none z-0 bg-radial from-transparent via-transparent to-background/40"
      />

      {/* Foreground Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
