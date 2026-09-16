"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TechnicalMarkProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
}

/**
 * Crosshair '+' drafting marker at grid intersections
 */
export function CrosshairMark({ className, size = 9, ...props }: TechnicalMarkProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("relative inline-block pointer-events-none select-none text-muted-foreground/40", className)}
      style={{ width: size, height: size }}
      {...props}
    >
      <div className="absolute top-1/2 left-0 right-0 h-[1px] -translate-y-1/2 bg-current" />
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 bg-current" />
    </div>
  );
}

/**
 * Corner framing tick (┌, ┐, └, ┘)
 */
export function CornerMark({
  position = "tl",
  length = 8,
  className,
  ...props
}: {
  position?: "tl" | "tr" | "bl" | "br";
  length?: number;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  const isTop = position.startsWith("t");
  const isLeft = position.endsWith("l");

  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute pointer-events-none select-none text-muted-foreground/50",
        isTop ? "top-0" : "bottom-0",
        isLeft ? "left-0" : "right-0",
        className
      )}
      style={{ width: length, height: length }}
      {...props}
    >
      <div
        className={cn(
          "absolute bg-current",
          isTop ? "top-0 left-0 right-0 h-[1px]" : "bottom-0 left-0 right-0 h-[1px]"
        )}
      />
      <div
        className={cn(
          "absolute bg-current",
          isLeft ? "top-0 bottom-0 left-0 w-[1px]" : "top-0 bottom-0 right-0 w-[1px]"
        )}
      />
    </div>
  );
}

/**
 * Solid pixel square marker (■)
 */
export function PixelSquare({
  size = 5,
  className,
  ...props
}: {
  size?: number;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={cn("inline-block pointer-events-none select-none bg-primary shrink-0", className)}
      style={{ width: size, height: size }}
      {...props}
    />
  );
}

/**
 * Monospace Grid Coordinate / Specimen Identifier
 */
export function GridCoordinateLabel({
  label,
  className,
  ...props
}: {
  label: string;
  className?: string;
} & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "font-mono text-[10px] tracking-wider text-muted-foreground/70 uppercase select-none",
        className
      )}
      {...props}
    >
      {label}
    </span>
  );
}

/**
 * Section Reference Badge (e.g. "01 / SYSTEM", "02 / GEOMETRY")
 */
export function SectionDraftingBadge({
  number,
  label,
  className,
}: {
  number: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1 border border-border/80 bg-background/80 backdrop-blur-xs font-mono text-[11px] text-foreground shadow-2xs select-none",
        className
      )}
    >
      <PixelSquare size={4} className="bg-primary animate-pulse" />
      <span className="text-primary font-medium">{number}</span>
      <span className="text-muted-foreground/50">/</span>
      <span className="tracking-widest uppercase text-muted-foreground">{label}</span>
    </div>
  );
}

/**
 * Technical Separator Rule (────■────)
 */
export function TechnicalRule({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("relative w-full flex items-center justify-center my-6 select-none pointer-events-none", className)}
    >
      <div className="w-full h-[1px] bg-border/80" />
      <div className="absolute flex items-center gap-2 px-2 bg-background text-primary">
        <PixelSquare size={5} />
      </div>
    </div>
  );
}
