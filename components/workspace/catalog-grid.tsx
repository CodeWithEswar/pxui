"use client";

import * as React from "react";
import { IconDefinition } from "@/lib/icons/schema";
import { SpecimenTile } from "./specimen-tile";
import { Button } from "@/components/ui/button";
import { PXIconSearch } from "@/components/icons";
import { DensityMode } from "./hooks/use-density-preference";
import { cn } from "@/lib/utils";

interface CatalogGridProps {
  icons: IconDefinition[];
  selectedIconName?: string;
  onSelectIcon: (icon: IconDefinition) => void;
  previewSize?: 20 | 24 | 32;
  density?: DensityMode;
  isMobile?: boolean;
  query?: string;
  category?: string;
  animatedOnly?: boolean;
  filledOnly?: boolean;
  onClearQuery?: () => void;
  onClearCategory?: () => void;
  onClearAnimated?: () => void;
  onClearFilled?: () => void;
  onResetAll?: () => void;
}

export function CatalogGrid({
  icons,
  selectedIconName,
  onSelectIcon,
  previewSize = 24,
  density = "default",
  isMobile = false,
  query = "",
  category = "all",
  animatedOnly = false,
  filledOnly = false,
  onClearQuery,
  onClearCategory,
  onClearAnimated,
  onClearFilled,
  onResetAll,
}: CatalogGridProps) {
  const hasActiveFilters = category !== "all" || animatedOnly || filledOnly || Boolean(query);

  const gridClass = React.useMemo(() => {
    if (density === "compact") {
      return "grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2.5";
    }
    if (density === "comfortable") {
      return "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3.5 sm:gap-4";
    }
    return "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-3.5";
  }, [density]);

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-paper-grid relative">
      {/* Active Filter Chips Bar */}
      {hasActiveFilters && (
        <div className="px-3 sm:px-4 py-2 border-b border-border/60 bg-surface-soft/40 flex flex-wrap items-center gap-2 text-xs font-sans shrink-0 select-none">
          <span className="text-muted-soft text-[11px] font-mono">Active:</span>
          {category !== "all" && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-card border border-border text-foreground text-[11px] font-mono">
              {category}
              {onClearCategory && (
                <button
                  type="button"
                  onClick={onClearCategory}
                  className="hover:text-primary cursor-pointer ml-0.5"
                  aria-label="Remove category filter"
                >
                  ×
                </button>
              )}
            </span>
          )}
          {animatedOnly && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#e8a55a]/15 border border-[#e8a55a]/30 text-[#e8a55a] text-[11px] font-mono font-medium">
              animated
              {onClearAnimated && (
                <button
                  type="button"
                  onClick={onClearAnimated}
                  className="hover:text-foreground cursor-pointer ml-0.5"
                  aria-label="Remove animated filter"
                >
                  ×
                </button>
              )}
            </span>
          )}
          {filledOnly && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-card border border-border text-foreground text-[11px] font-mono">
              filled
              {onClearFilled && (
                <button
                  type="button"
                  onClick={onClearFilled}
                  className="hover:text-primary cursor-pointer ml-0.5"
                  aria-label="Remove filled filter"
                >
                  ×
                </button>
              )}
            </span>
          )}
          {query && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-card border border-border text-foreground text-[11px] font-mono">
              "{query}"
              {onClearQuery && (
                <button
                  type="button"
                  onClick={onClearQuery}
                  className="hover:text-primary cursor-pointer ml-0.5"
                  aria-label="Clear search query"
                >
                  ×
                </button>
              )}
            </span>
          )}
          {onResetAll && (
            <button
              type="button"
              onClick={onResetAll}
              className="text-[11px] font-mono text-muted-soft hover:text-foreground underline ml-2 cursor-pointer"
            >
              Clear all
            </button>
          )}
        </div>
      )}

      {/* Grid Specimen Canvas */}
      <div className="flex-1 p-3 sm:p-4 lg:p-6 overflow-y-auto workspace-scrollbar min-h-0">
        {icons.length > 0 ? (
          <div className={gridClass}>
            {icons.map((icon) => (
              <SpecimenTile
                key={icon.name}
                icon={icon}
                isSelected={selectedIconName === icon.name}
                onSelect={onSelectIcon}
                previewSize={previewSize}
                density={density}
                isMobile={isMobile}
              />
            ))}
          </div>
        ) : (
          /* Truthful Empty State (Section 64) */
          <div className="h-64 flex flex-col items-center justify-center text-center p-6 rounded-lg border border-dashed border-border bg-card/40 my-12 max-w-md mx-auto select-none">
            <PXIconSearch size={24} className="text-muted-soft mb-2 opacity-50" />
            <div className="font-mono text-xs font-semibold text-foreground">
              No icons match {query ? `"${query}"` : "the selected filters"}
            </div>
            <div className="font-sans text-xs text-muted-soft mt-1 max-w-xs">
              Try searching by another name or tag, or reset active filters.
            </div>
            {onResetAll && (
              <Button
                variant="outline"
                size="sm"
                onClick={onResetAll}
                className="mt-4 font-sans text-xs border-border bg-card cursor-pointer"
              >
                Clear filters
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
