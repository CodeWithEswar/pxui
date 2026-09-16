"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PXIconSearch, PXIconX, PXIconSliders } from "@/components/icons";
import { cn } from "@/lib/utils";
import { DensityMode } from "./hooks/use-density-preference";

interface CatalogToolbarProps {
  query: string;
  onQueryChange: (q: string) => void;
  category: string;
  totalCatalogCount: number;
  filteredCount: number;
  tileScale: 20 | 24 | 32;
  onTileScaleChange: (scale: 20 | 24 | 32) => void;
  density: DensityMode;
  onDensityChange: (d: DensityMode) => void;
  onOpenMobileFilters?: () => void;
  searchInputRef?: React.RefObject<HTMLInputElement | null>;
  isMobile?: boolean;
}

export function CatalogToolbar({
  query,
  onQueryChange,
  category,
  totalCatalogCount,
  filteredCount,
  tileScale,
  onTileScaleChange,
  density,
  onDensityChange,
  onOpenMobileFilters,
  searchInputRef,
  isMobile = false,
}: CatalogToolbarProps) {
  return (
    <div className="h-14 sm:h-16 px-3 sm:px-4 border-b border-border/80 bg-background/95 backdrop-blur-xs flex items-center justify-between gap-2.5 sm:gap-3 shrink-0 relative select-none">
      {/* Search Input Box */}
      <div className="relative flex-1 max-w-lg min-w-0">
        <PXIconSearch
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-soft pointer-events-none"
        />
        <Input
          ref={searchInputRef}
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={
            isMobile
              ? "Search icons..."
              : "Search icons by name, alias, tags (e.g. 'lock', 'calendar')..."
          }
          className="pl-8.5 pr-14 font-sans text-xs h-9 rounded-md border-border bg-card/60 hover:bg-card focus:bg-background text-foreground focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary/50 transition-all w-full"
        />
        {query ? (
          <button
            type="button"
            onClick={() => onQueryChange("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-soft hover:text-foreground cursor-pointer p-0.5"
            title="Clear search"
          >
            <PXIconX size={13} />
          </button>
        ) : (
          <kbd className="hidden sm:inline-block absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none px-1.5 py-0.5 text-[9px] font-mono border border-border bg-muted/40 text-muted-soft rounded-xs">
            /
          </kbd>
        )}
      </div>

      {/* Mobile/Tablet Filter Trigger Button */}
      {onOpenMobileFilters && (
        <div className="flex items-center gap-1.5 lg:hidden shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenMobileFilters}
            className="text-xs font-sans h-9 gap-1.5 border-border bg-card px-2.5"
          >
            <PXIconSliders size={14} />
            <span className="hidden xs:inline">Filter</span>
          </Button>
        </div>
      )}

      {/* Desktop/Tablet Right Controls: Contextual Count + Density + Size Segmented Control */}
      <div className="hidden sm:flex items-center gap-3 text-xs font-mono text-muted-soft shrink-0">
        {/* Contextual Count */}
        <div className="hidden md:block text-[11px] font-mono tracking-wider uppercase text-muted-soft">
          {category !== "all" ? (
            <span>
              {category} · <strong className="text-foreground">{filteredCount}</strong>
            </span>
          ) : (
            <span>
              <strong className="text-foreground">{filteredCount}</strong> / {totalCatalogCount}
            </span>
          )}
        </div>

        {/* Density Selector (Compact | Default | Comfortable) */}
        <div className="hidden lg:flex items-center gap-0.5 border border-border rounded-md p-0.5 bg-card/50">
          <span className="text-[10px] font-mono uppercase text-muted-soft px-1.5 select-none">
            GRID
          </span>
          {(["compact", "default", "comfortable"] as DensityMode[]).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => onDensityChange(d)}
              className={cn(
                "px-2 py-0.5 rounded text-[10px] font-mono transition-all cursor-pointer capitalize",
                density === d
                  ? "bg-foreground text-background font-bold shadow-2xs"
                  : "text-muted-soft hover:text-foreground"
              )}
            >
              {d === "comfortable" ? "wide" : d}
            </button>
          ))}
        </div>

        {/* Size Selector (20 | 24 | 32) */}
        <div className="flex items-center gap-0.5 border border-border rounded-md p-0.5 bg-card/50">
          <span className="text-[10px] font-mono uppercase text-muted-soft px-1.5 select-none">
            SIZE
          </span>
          {([20, 24, 32] as const).map((sz) => (
            <button
              key={sz}
              type="button"
              onClick={() => onTileScaleChange(sz)}
              className={cn(
                "px-2 py-0.5 rounded text-[10px] font-mono transition-all cursor-pointer",
                tileScale === sz
                  ? "bg-foreground text-background font-bold shadow-2xs"
                  : "text-muted-soft hover:text-foreground"
              )}
            >
              {sz}
            </button>
          ))}
        </div>
      </div>

      {/* Living Orthogonal Signal Motif along the toolbar bottom edge */}
      <div className="absolute -bottom-px left-0 right-0 h-px bg-border/80">
        <span className="absolute top-[-1px] left-[15%] w-4 h-[3px] bg-primary animate-pulse" />
      </div>
    </div>
  );
}
