"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ICONS_CATALOG } from "@/lib/icons/catalog";
import {
  PXIconSliders,
  PXIconArrowRight,
  PXIconSparkles,
  PXIconDollarSign,
  PXIconShoppingCart,
  PXIconMessageSquare,
  PXIconCode,
  PXIconSmartphone,
  PXIconFolder,
  PXIconMapPin,
  PXIconCamera,
  PXIconStar,
  PXIconUsers,
  PXIconShield,
  PXIconClock,
  PXIconFilter,
} from "@/components/icons";

interface DiscoveryRailProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  animatedOnly: boolean;
  onToggleAnimated: (enabled: boolean) => void;
  filledOnly: boolean;
  onToggleFilled: (enabled: boolean) => void;
  compact?: boolean;
  countsMap?: Map<string, number>;
}

// Authentic PXUI category icons
const CATEGORY_ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  "Actions & Controls": PXIconSliders,
  "Arrows & Navigation": PXIconArrowRight,
  "AI & Emerging Tech": PXIconSparkles,
  "Business & Finance": PXIconDollarSign,
  Commerce: PXIconShoppingCart,
  Communication: PXIconMessageSquare,
  "Development & Code": PXIconCode,
  "Devices & Hardware": PXIconSmartphone,
  "Files & Folders": PXIconFolder,
  "Maps & Travel": PXIconMapPin,
  "Media & Creative": PXIconCamera,
  "Miscellaneous & Symbols": PXIconStar,
  "People & Social": PXIconUsers,
  "Security & Privacy": PXIconShield,
  "Time & Calendar": PXIconClock,
};

export function DiscoveryRail({
  selectedCategory,
  onSelectCategory,
  animatedOnly,
  onToggleAnimated,
  filledOnly,
  onToggleFilled,
  compact = false,
  countsMap,
}: DiscoveryRailProps) {
  // Compute fallback counts per category
  const categoryCounts = React.useMemo(() => {
    if (countsMap) return countsMap;
    const map = new Map<string, number>();
    ICONS_CATALOG.forEach((icon) => {
      map.set(icon.category, (map.get(icon.category) || 0) + 1);
    });
    return map;
  }, [countsMap]);

  const totalCount = ICONS_CATALOG.length;
  const animatedCount = React.useMemo(
    () => ICONS_CATALOG.filter((i) => Boolean(i.animation)).length,
    []
  );
  const filledCount = React.useMemo(
    () => ICONS_CATALOG.filter((i) => Boolean(i.filled && i.filled.length > 0)).length,
    []
  );

  const categories = React.useMemo(() => {
    return Array.from(categoryCounts.keys()).sort();
  }, [categoryCounts]);

  // Tablet Compact 64px Rail Mode
  if (compact) {
    return (
      <div className="w-16 shrink-0 py-3 flex flex-col items-center gap-2 select-none">
        {/* All Icons */}
        <button
          type="button"
          onClick={() => onSelectCategory("all")}
          title={`All Icons (${totalCount})`}
          className={cn(
            "w-10 h-10 rounded-md flex items-center justify-center relative transition-all cursor-pointer",
            selectedCategory === "all" && !animatedOnly && !filledOnly
              ? "bg-surface-card text-foreground font-medium border border-border shadow-2xs"
              : "text-muted-soft hover:text-foreground hover:bg-surface-soft"
          )}
        >
          {selectedCategory === "all" && !animatedOnly && !filledOnly && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-primary rounded-r-xs" />
          )}
          <PXIconFilter size={16} />
        </button>

        {/* Animated Toggle */}
        <button
          type="button"
          onClick={() => onToggleAnimated(!animatedOnly)}
          title={`Animated (${animatedCount})`}
          className={cn(
            "w-10 h-10 rounded-md flex items-center justify-center relative transition-all cursor-pointer",
            animatedOnly
              ? "bg-surface-card text-[#e8a55a] font-medium border border-border shadow-2xs"
              : "text-muted-soft hover:text-foreground hover:bg-surface-soft"
          )}
        >
          {animatedOnly && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-primary rounded-r-xs" />
          )}
          <PXIconSparkles size={16} className={animatedOnly ? "text-[#e8a55a]" : "text-muted-soft"} />
        </button>

        <div className="w-8 h-px bg-border/80 my-1" />

        {/* Categories icons */}
        <div className="flex flex-col gap-1 items-center w-full">
          {categories.map((cat) => {
            const IconComp = CATEGORY_ICON_MAP[cat] || PXIconSliders;
            const count = categoryCounts.get(cat) || 0;
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => onSelectCategory(cat)}
                title={`${cat} (${count})`}
                className={cn(
                  "w-10 h-10 rounded-md flex items-center justify-center relative transition-all cursor-pointer",
                  isSelected
                    ? "bg-surface-card text-foreground font-medium border border-border shadow-2xs"
                    : "text-muted-soft hover:text-foreground hover:bg-surface-soft"
                )}
              >
                {isSelected && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-primary rounded-r-xs" />
                )}
                <IconComp size={16} />
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Full Desktop Discovery Rail
  return (
    <div className="select-none flex flex-col gap-5 p-3.5 text-foreground">
      {/* 1. LIBRARY SECTION */}
      <div>
        <div className="text-[10px] font-mono uppercase tracking-[0.08em] text-muted-soft px-2.5 mb-1.5 font-semibold">
          LIBRARY
        </div>
        <nav className="space-y-0.5">
          {/* All Icons */}
          <button
            type="button"
            onClick={() => onSelectCategory("all")}
            className={cn(
              "w-full flex items-center justify-between px-2.5 py-1.5 rounded-sm text-xs font-sans transition-colors text-left cursor-pointer",
              selectedCategory === "all" && !animatedOnly && !filledOnly
                ? "bg-surface-card text-foreground font-semibold border border-border shadow-2xs"
                : "text-muted-foreground hover:text-foreground hover:bg-surface-soft border border-transparent"
            )}
          >
            <span className="flex items-center gap-2 truncate">
              {selectedCategory === "all" && !animatedOnly && !filledOnly ? (
                <span className="w-1.5 h-1.5 rounded-xs bg-primary shrink-0" />
              ) : (
                <PXIconFilter size={14} className="text-muted-soft shrink-0" />
              )}
              <span className="truncate">All Icons</span>
            </span>
            <span className="font-mono text-[11px] text-muted-soft tabular-nums shrink-0 ml-2">
              {totalCount}
            </span>
          </button>

          {/* Animated Icons */}
          <button
            type="button"
            onClick={() => onToggleAnimated(!animatedOnly)}
            className={cn(
              "w-full flex items-center justify-between px-2.5 py-1.5 rounded-sm text-xs font-sans transition-colors text-left cursor-pointer",
              animatedOnly
                ? "bg-surface-card text-foreground font-semibold border border-border shadow-2xs"
                : "text-muted-foreground hover:text-foreground hover:bg-surface-soft border border-transparent"
            )}
          >
            <span className="flex items-center gap-2 truncate">
              {animatedOnly ? (
                <span className="w-1.5 h-1.5 rounded-xs bg-primary shrink-0" />
              ) : (
                <PXIconSparkles size={14} className="text-[#e8a55a] shrink-0" />
              )}
              <span className="truncate">Animated</span>
            </span>
            <span className="font-mono text-[11px] text-muted-soft tabular-nums shrink-0 ml-2">
              {animatedCount}
            </span>
          </button>

          {/* Filled Variants */}
          <button
            type="button"
            onClick={() => onToggleFilled(!filledOnly)}
            className={cn(
              "w-full flex items-center justify-between px-2.5 py-1.5 rounded-sm text-xs font-sans transition-colors text-left cursor-pointer",
              filledOnly
                ? "bg-surface-card text-foreground font-semibold border border-border shadow-2xs"
                : "text-muted-foreground hover:text-foreground hover:bg-surface-soft border border-transparent"
            )}
          >
            <span className="flex items-center gap-2 truncate">
              {filledOnly ? (
                <span className="w-1.5 h-1.5 rounded-xs bg-primary shrink-0" />
              ) : (
                <span className="w-2.5 h-2.5 rounded-xs bg-foreground/60 inline-block shrink-0" />
              )}
              <span className="truncate">Filled Variants</span>
            </span>
            <span className="font-mono text-[11px] text-muted-soft tabular-nums shrink-0 ml-2">
              {filledCount}
            </span>
          </button>
        </nav>
      </div>

      {/* 2. CATEGORIES SECTION */}
      <div>
        <div className="text-[10px] font-mono uppercase tracking-[0.08em] text-muted-soft px-2.5 mb-1.5 font-semibold">
          CATEGORIES
        </div>
        <nav className="space-y-0.5">
          {categories.map((cat) => {
            const IconComp = CATEGORY_ICON_MAP[cat] || PXIconSliders;
            const count = categoryCounts.get(cat) || 0;
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => onSelectCategory(cat)}
                className={cn(
                  "w-full flex items-center justify-between px-2.5 py-1.5 rounded-sm text-xs font-sans transition-all text-left cursor-pointer",
                  isSelected
                    ? "bg-surface-card text-foreground font-semibold border border-border shadow-2xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface-soft border border-transparent"
                )}
              >
                <span className="flex items-center gap-2 truncate pr-2">
                  {isSelected ? (
                    <span className="w-1.5 h-1.5 rounded-xs bg-primary shrink-0" />
                  ) : (
                    <IconComp size={14} className="text-muted-soft shrink-0" />
                  )}
                  <span className="truncate">{cat}</span>
                </span>
                <span className="font-mono text-[11px] text-muted-soft tabular-nums shrink-0">
                  {count}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
