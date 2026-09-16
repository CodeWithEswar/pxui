"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PXUIMark, PXUIMarkProps } from "./px-mark";
import { PXUIWordmark } from "./px-wordmark";
import { Badge } from "@/components/ui/badge";

export interface PXUILogoProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "horizontal" | "compact" | "mark" | "stacked";
  size?: "sm" | "md" | "lg";
  markVariant?: PXUIMarkProps["variant"];
  badge?: string;
  href?: string;
  asLink?: boolean;
}

const MARK_SIZES = {
  sm: 18,
  md: 22,
  lg: 28,
};

/**
 * PXUILogo — Unified Brand Lockup Component.
 *
 * Supports:
 * - horizontal: [MARK] PXUI (default header lockup)
 * - compact: [MARK] PXUI with minimal padding (narrow nav / mobile)
 * - mark: Standalone mark only (favicon, mobile collapsed, app icon)
 * - stacked: Vertical hero arrangement
 */
export function PXUILogo({
  variant = "horizontal",
  size = "md",
  markVariant = "default",
  badge,
  href,
  asLink = Boolean(href),
  className,
  ...props
}: PXUILogoProps) {
  const markSize = MARK_SIZES[size];

  const content = (
    <div
      className={cn(
        "inline-flex items-center select-none group",
        variant === "stacked" ? "flex-col items-center gap-2" : "flex-row items-center",
        variant === "compact" ? "gap-2" : "gap-2.5",
        className
      )}
      {...props}
    >
      {/* Canonical Pixel Mark */}
      <PXUIMark
        size={markSize}
        variant={markVariant}
        className="transition-transform group-hover:scale-[1.03] duration-150"
      />

      {/* Wordmark (omitted if mark variant) */}
      {variant !== "mark" && (
        <div className="flex items-center gap-2">
          <PXUIWordmark size={size} />
          {badge && (
            <Badge
              variant="pill"
              className="text-[10px] py-0 px-2 font-mono bg-muted text-muted-foreground border border-border/80"
            >
              {badge}
            </Badge>
          )}
        </div>
      )}
    </div>
  );

  if (asLink && href) {
    return (
      <Link href={href} className="inline-flex items-center" aria-label="PXUI Home">
        {content}
      </Link>
    );
  }

  return content;
}
