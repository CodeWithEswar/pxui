"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface PixelTransitionProps {
  direction?: "to-dark" | "to-paper";
  className?: string;
}

/**
 * SteppedPixelTransition — Architectural pixelated boundary between paper canvas and dark developer engine.
 */
export function SteppedPixelTransition({
  direction = "to-dark",
  className,
}: PixelTransitionProps) {
  const isToDark = direction === "to-dark";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative w-full overflow-hidden select-none pointer-events-none h-6 sm:h-8 flex flex-col justify-end dark:hidden",
        isToDark ? "bg-background" : "bg-[#181715]",
        className
      )}
    >
      {/* Stepped pixel teeth pattern */}
      <div
        className={cn(
          "w-full h-4 sm:h-6",
          isToDark ? "text-[#181715]" : "text-background"
        )}
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 12px, transparent 12px),
            linear-gradient(to right, currentColor 24px, transparent 24px)
          `,
          backgroundSize: "24px 8px, 48px 16px",
          backgroundRepeat: "repeat-x",
          backgroundPosition: isToDark ? "bottom" : "top",
        }}
      />
    </div>
  );
}
