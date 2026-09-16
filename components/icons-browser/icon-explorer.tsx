"use client";

import * as React from "react";
import { IconDefinition } from "@/lib/icons/schema";
import { ICONS_CATALOG } from "@/lib/icons/catalog";
import { searchIcons } from "@/lib/search/search-engine";
import { toPXComponentName } from "@/lib/compiler";
import { PXIconBase } from "@/components/icons/px-icon-base";
import { IconInspector } from "./icon-inspector";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PXIconSearch, PXIconX, PXIconSparkles } from "@/components/icons";

interface IconExplorerProps {
  initialCategory?: string;
  initialQuery?: string;
}

export function IconExplorer({ initialCategory = "all", initialQuery = "" }: IconExplorerProps) {
  const [query, setQuery] = React.useState(initialQuery);
  const [category, setCategory] = React.useState(initialCategory);
  const [animatedOnly, setAnimatedOnly] = React.useState(false);
  const [filledOnly, setFilledOnly] = React.useState(false);
  const [cardSize, setCardSize] = React.useState<16 | 20 | 24 | 32>(24);
  const [selectedIcon, setSelectedIcon] = React.useState<IconDefinition | null>(null);
  const [isInspectorOpen, setIsInspectorOpen] = React.useState(false);

  const searchInputRef = React.useRef<HTMLInputElement>(null);

  // Keyboard shortcut: press '/' to focus search, ESC to clear
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === "Escape" && document.activeElement === searchInputRef.current) {
        setQuery("");
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Compute categories and counts
  const categoriesWithCounts = React.useMemo(() => {
    const map = new Map<string, number>();
    ICONS_CATALOG.forEach((icon) => {
      map.set(icon.category, (map.get(icon.category) || 0) + 1);
    });
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, []);

  // Filtered icons
  const filteredIcons = React.useMemo(() => {
    return searchIcons(ICONS_CATALOG, {
      query,
      category,
      animatedOnly,
      filledOnly,
    });
  }, [query, category, animatedOnly, filledOnly]);

  const handleSelectIcon = (icon: IconDefinition) => {
    setSelectedIcon(icon);
    setIsInspectorOpen(true);
  };

  return (
    <div className="w-full space-y-6">
      {/* Search & Filter Controls Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between p-3.5 bg-card border border-border rounded-lg shadow-2xs">
        {/* Search Input with Keyboard Cue */}
        <div className="relative flex-1">
          <PXIconSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            ref={searchInputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search icons by name, category, alias (e.g. 'home', 'bell', 'chat')..."
            className="pl-9 pr-14 font-sans text-xs h-10 rounded-md border-border bg-background text-foreground focus-visible:ring-2 focus-visible:ring-primary/40"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              title="Clear search"
            >
              <PXIconX size={16} className="h-4 w-4" />
            </button>
          ) : (
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none px-1.5 py-0.5 text-[10px] font-mono border border-border bg-muted/60 text-muted-foreground rounded-sm">
              /
            </kbd>
          )}
        </div>

        {/* Quick Toggles */}
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant={animatedOnly ? "default" : "outline"}
            size="sm"
            onClick={() => setAnimatedOnly(!animatedOnly)}
            className="h-10 text-xs font-sans font-medium rounded-md gap-1.5 px-3"
          >
            <PXIconSparkles size={14} className="h-3.5 w-3.5" />
            Animated ({ICONS_CATALOG.filter((i) => Boolean(i.animation)).length})
          </Button>

          <Button
            variant={filledOnly ? "default" : "outline"}
            size="sm"
            onClick={() => setFilledOnly(!filledOnly)}
            className="h-10 text-xs font-sans font-medium rounded-md px-3"
          >
            Filled
          </Button>

          {/* Card Size Selector */}
          <div className="hidden sm:flex items-center border border-border h-10 p-1 rounded-md bg-background">
            {([16, 20, 24, 32] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setCardSize(s)}
                className={`px-2 py-1 text-[11px] font-mono rounded-sm transition-colors ${
                  cardSize === s
                    ? "bg-card text-foreground font-semibold shadow-2xs border border-border/60"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title={`Grid size: ${s}px`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category Pills Strip */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
        <button
          type="button"
          onClick={() => setCategory("all")}
          className={`px-3 py-1.5 text-xs font-sans shrink-0 rounded-md transition-all ${
            category === "all"
              ? "bg-foreground text-background font-medium shadow-2xs"
              : "text-muted-foreground hover:text-foreground hover:bg-card/70"
          }`}
        >
          All Icons ({ICONS_CATALOG.length})
        </button>

        {categoriesWithCounts.map(([catName, count]) => (
          <button
            key={catName}
            type="button"
            onClick={() => setCategory(catName)}
            className={`px-3 py-1.5 text-xs font-sans shrink-0 rounded-md transition-all flex items-center gap-1.5 ${
              category === catName
                ? "bg-foreground text-background font-medium shadow-2xs"
                : "text-muted-foreground hover:text-foreground hover:bg-card/70"
            }`}
          >
            <span className="capitalize">{catName}</span>
            <span className="text-[10px] opacity-70 font-mono">({count})</span>
          </button>
        ))}
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between text-xs font-sans text-muted-foreground px-1">
        <span>
          Showing <strong className="text-foreground">{filteredIcons.length}</strong> of{" "}
          {ICONS_CATALOG.length} pixel icons
        </span>
        {query && (
          <span>
            Query: <span className="text-primary font-medium">&ldquo;{query}&rdquo;</span>
          </span>
        )}
      </div>

      {/* Icons Grid */}
      {filteredIcons.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
          {filteredIcons.map((icon) => {
            const componentName = toPXComponentName(icon.name);
            const isAnimated = Boolean(icon.animation);

            return (
              <div
                key={icon.name}
                role="button"
                tabIndex={0}
                onClick={() => handleSelectIcon(icon)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelectIcon(icon);
                  }
                }}
                className="group relative flex flex-col items-center justify-center p-4 border border-border hover:border-foreground/30 bg-card hover:bg-card/80 rounded-lg shadow-2xs transition-all cursor-pointer select-none text-center focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
              >
                {/* Visual Badges */}
                <div className="absolute top-2 right-2 flex items-center gap-1">
                  {isAnimated && (
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" title="Supports stepped motion" />
                  )}
                  {icon.filled && (
                    <span className="text-[9px] font-mono text-muted-foreground opacity-60">F</span>
                  )}
                </div>

                {/* Icon Graphic */}
                <div className="h-14 flex items-center justify-center transition-transform group-hover:scale-110">
                  <PXIconBase
                    definition={icon}
                    size={cardSize}
                    filled={filledOnly}
                    animated={isAnimated}
                    color="currentColor"
                  />
                </div>

                {/* Public Component Name (Prominent) */}
                <span className="text-xs font-mono font-medium truncate w-full mt-2 text-foreground group-hover:text-primary transition-colors">
                  {componentName}
                </span>

                {/* Registry Slug (Secondary technical information) */}
                <span className="text-[10px] font-mono text-muted-foreground truncate w-full opacity-60 group-hover:opacity-100">
                  px-{icon.name}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center border border-dashed border-border bg-card rounded-lg space-y-4">
          <div className="mx-auto w-12 h-12 border border-border flex items-center justify-center bg-background rounded-md text-muted-foreground">
            <PXIconSearch size={24} className="opacity-60" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-sans font-semibold text-foreground">No icons match your criteria</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto font-sans">
              We couldn&apos;t find any pixel icons for &ldquo;{query}&rdquo; in {category === "all" ? "the catalog" : category}.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="rounded-md font-sans text-xs"
            onClick={() => {
              setQuery("");
              setCategory("all");
              setAnimatedOnly(false);
              setFilledOnly(false);
            }}
          >
            Reset All Filters
          </Button>
        </div>
      )}

      {/* Selected Icon Inspector Dialog */}
      <IconInspector
        icon={selectedIcon}
        open={isInspectorOpen}
        onOpenChange={setIsInspectorOpen}
        onSelectIcon={handleSelectIcon}
      />
    </div>
  );
}
