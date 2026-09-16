"use client";

import * as React from "react";
import { IconDefinition } from "@/lib/icons/schema";
import { CatalogToolbar } from "./catalog-toolbar";
import { CatalogGrid } from "./catalog-grid";
import { DensityMode } from "./hooks/use-density-preference";

interface CatalogPanelProps {
  icons: IconDefinition[];
  totalCatalogCount: number;
  selectedIconName?: string;
  onSelectIcon: (icon: IconDefinition) => void;
  query: string;
  onQueryChange: (q: string) => void;
  category: string;
  onCategoryChange: (cat: string) => void;
  animatedOnly: boolean;
  onAnimatedChange: (v: boolean) => void;
  filledOnly: boolean;
  onFilledChange: (v: boolean) => void;
  tileScale: 20 | 24 | 32;
  onTileScaleChange: (scale: 20 | 24 | 32) => void;
  density: DensityMode;
  onDensityChange: (d: DensityMode) => void;
  onResetFilters: () => void;
  onOpenMobileFilters?: () => void;
  searchInputRef?: React.RefObject<HTMLInputElement | null>;
  isMobile?: boolean;
}

export function CatalogPanel({
  icons,
  totalCatalogCount,
  selectedIconName,
  onSelectIcon,
  query,
  onQueryChange,
  category,
  onCategoryChange,
  animatedOnly,
  onAnimatedChange,
  filledOnly,
  onFilledChange,
  tileScale,
  onTileScaleChange,
  density,
  onDensityChange,
  onResetFilters,
  onOpenMobileFilters,
  searchInputRef,
  isMobile = false,
}: CatalogPanelProps) {
  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col bg-background relative overflow-hidden">
      {/* Sticky Top Catalog Toolbar */}
      <CatalogToolbar
        query={query}
        onQueryChange={onQueryChange}
        category={category}
        totalCatalogCount={totalCatalogCount}
        filteredCount={icons.length}
        tileScale={tileScale}
        onTileScaleChange={onTileScaleChange}
        density={density}
        onDensityChange={onDensityChange}
        onOpenMobileFilters={onOpenMobileFilters}
        searchInputRef={searchInputRef}
        isMobile={isMobile}
      />

      {/* Independently Scrollable Icon Matrix */}
      <CatalogGrid
        icons={icons}
        selectedIconName={selectedIconName}
        onSelectIcon={onSelectIcon}
        previewSize={tileScale}
        density={density}
        isMobile={isMobile}
        query={query}
        category={category}
        animatedOnly={animatedOnly}
        filledOnly={filledOnly}
        onClearQuery={() => onQueryChange("")}
        onClearCategory={() => onCategoryChange("all")}
        onClearAnimated={() => onAnimatedChange(false)}
        onClearFilled={() => onFilledChange(false)}
        onResetAll={onResetFilters}
      />
    </section>
  );
}
