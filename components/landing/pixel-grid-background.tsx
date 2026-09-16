"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { GridSignal } from "./grid-signal";

interface PixelGridBackgroundProps {
  className?: string;
  signals?: boolean;
  children?: React.ReactNode;
}

export function PixelGridBackground({
  className,
  signals = true,
  children,
}: PixelGridBackgroundProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Engineered Dual-Tier Pixel Grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none z-0"
        style={{
          backgroundImage: `
            /* Minor 24px Grid */
            linear-gradient(to right, var(--color-border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--color-border) 1px, transparent 1px),
            /* Major 96px Grid (every 4 cells) */
            linear-gradient(to right, var(--color-border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px, 24px 24px, 96px 96px, 96px 96px",
          backgroundPosition: "0 0, 0 0, 0 0, 0 0",
          opacity: 0.35,
        }}
      />

      {/* Moving Pixel Signal Paths */}
      {signals && (
        <>
          <GridSignal
            top={72}
            left="15%"
            horizontalDistance={216}
            verticalDistance={72}
            duration={10}
            delay={0}
          />
          <GridSignal
            top={288}
            left="65%"
            horizontalDistance={144}
            verticalDistance={96}
            duration={12}
            delay={4}
          />
        </>
      )}

      {/* Foreground Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
