"use client";

import * as React from "react";
import { IconDefinition } from "@/lib/icons/schema";
import { toPXComponentName } from "@/lib/compiler";
import { DiscoveryPanel } from "./discovery-panel";
import { CatalogPanel } from "./catalog-panel";
import { InspectorPanel } from "./inspector-panel";
import { MobileFilterSheet } from "./mobile-filter-sheet";
import { MobileInspectorSheet } from "./mobile-inspector-sheet";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useWorkspaceBreakpoint } from "./hooks/use-workspace-breakpoint";
import { useDensityPreference } from "./hooks/use-density-preference";
import { useCatalogQuery } from "./hooks/use-catalog-query";
import { useIconSelection } from "./hooks/use-icon-selection";
import { toast } from "sonner";

interface WorkspaceShellProps {
  initialCategory?: string;
  initialQuery?: string;
  initialIconName?: string;
}

export function WorkspaceShell({
  initialCategory = "all",
  initialQuery = "",
  initialIconName,
}: WorkspaceShellProps) {
  const { isMobile, isTablet, isMediumDesktop, isDesktop } = useWorkspaceBreakpoint();
  const { density, setDensity } = useDensityPreference();

  const {
    query,
    setQuery,
    category,
    setCategory,
    animatedOnly,
    setAnimatedOnly,
    filledOnly,
    setFilledOnly,
    tileScale,
    setTileScale,
    filteredIcons,
    categoryCounts,
    totalCount,
    resetFilters,
  } = useCatalogQuery({ initialCategory, initialQuery });

  const {
    selectedIcon,
    selectIcon,
    activeTab,
    setActiveTab,
    isMobileInspectorOpen,
    setIsMobileInspectorOpen,
  } = useIconSelection({ initialIconName, isMobile });

  // Tablet & Medium Desktop drawer state
  const [isTabletDrawerOpen, setIsTabletDrawerOpen] = React.useState(Boolean(initialIconName && (isTablet || isMediumDesktop)));
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = React.useState(false);

  const searchInputRef = React.useRef<HTMLInputElement>(null);

  // Icon selection handler across form factors
  const handleSelectIcon = React.useCallback(
    (icon: IconDefinition) => {
      selectIcon(icon, isMobile);
      if (isTablet || isMediumDesktop) {
        setIsTabletDrawerOpen(true);
      }
    },
    [selectIcon, isMobile, isTablet, isMediumDesktop]
  );

  // Keyboard navigation & accessibility workflow (Section 61 & 62)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isTyping =
        activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA");

      // '/' or Cmd/Ctrl+K to focus search input
      if ((e.key === "/" || (e.key === "k" && (e.metaKey || e.ctrlKey))) && !isTyping) {
        e.preventDefault();
        searchInputRef.current?.focus();
        return;
      }

      // Escape clears search or closes active overlays
      if (e.key === "Escape") {
        if (activeEl === searchInputRef.current) {
          setQuery("");
          searchInputRef.current?.blur();
          return;
        }
        if (isMobileInspectorOpen) {
          setIsMobileInspectorOpen(false);
          return;
        }
        if (isTabletDrawerOpen) {
          setIsTabletDrawerOpen(false);
          return;
        }
        if (isMobileFiltersOpen) {
          setIsMobileFiltersOpen(false);
          return;
        }
      }

      if (isTyping) return;

      // 'c' or 'C' copies selected component name / JSX snippet
      if (e.key === "c" || e.key === "C") {
        if (selectedIcon) {
          const name = toPXComponentName(selectedIcon.name);
          navigator.clipboard.writeText(`<${name} size={24} />`).then(() => {
            toast.success(`Copied <${name} /> to clipboard`);
          });
        }
        return;
      }

      // Arrow keys navigate catalog without stealing focus into Inspector (Section 62)
      if (
        ["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"].includes(e.key) &&
        filteredIcons.length > 0
      ) {
        e.preventDefault();
        const currentIndex = selectedIcon
          ? filteredIcons.findIndex((i) => i.name === selectedIcon.name)
          : 0;
        let nextIndex = currentIndex;

        if (e.key === "ArrowRight") {
          nextIndex = (currentIndex + 1) % filteredIcons.length;
        } else if (e.key === "ArrowLeft") {
          nextIndex = (currentIndex - 1 + filteredIcons.length) % filteredIcons.length;
        } else if (e.key === "ArrowDown") {
          nextIndex = Math.min(currentIndex + 4, filteredIcons.length - 1);
        } else if (e.key === "ArrowUp") {
          nextIndex = Math.max(currentIndex - 4, 0);
        }

        if (nextIndex !== currentIndex && filteredIcons[nextIndex]) {
          handleSelectIcon(filteredIcons[nextIndex]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    filteredIcons,
    selectedIcon,
    handleSelectIcon,
    isMobileInspectorOpen,
    isTabletDrawerOpen,
    isMobileFiltersOpen,
    setIsMobileInspectorOpen,
    setQuery,
  ]);

  return (
    <div className="w-full h-full min-h-0 flex flex-col bg-background text-foreground overflow-hidden select-none">
      {/* ========================================================================= */}
      {/* 1. FULL DESKTOP WORKSPACE (>= 1280px): Fixed 3-Column Workstation         */}
      {/* ========================================================================= */}
      {isDesktop && (
        <div className="flex-1 min-h-0 overflow-hidden grid grid-cols-[248px_minmax(0,1fr)_408px] xl:grid-cols-[256px_minmax(0,1fr)_424px] 2xl:grid-cols-[256px_minmax(0,1fr)_432px] divide-x divide-border/80">
          {/* Panel 1: Left Discovery (scrollable categories + pinned community footer) */}
          <DiscoveryPanel
            selectedCategory={category}
            onSelectCategory={setCategory}
            animatedOnly={animatedOnly}
            onToggleAnimated={setAnimatedOnly}
            filledOnly={filledOnly}
            onToggleFilled={setFilledOnly}
            countsMap={categoryCounts}
          />

          {/* Panel 2: Center Catalog (sticky toolbar + independently scrollable grid) */}
          <CatalogPanel
            icons={filteredIcons}
            totalCatalogCount={totalCount}
            selectedIconName={selectedIcon?.name}
            onSelectIcon={handleSelectIcon}
            query={query}
            onQueryChange={setQuery}
            category={category}
            onCategoryChange={setCategory}
            animatedOnly={animatedOnly}
            onAnimatedChange={setAnimatedOnly}
            filledOnly={filledOnly}
            onFilledChange={setFilledOnly}
            tileScale={tileScale}
            onTileScaleChange={setTileScale}
            density={density}
            onDensityChange={setDensity}
            onResetFilters={resetFilters}
            searchInputRef={searchInputRef}
          />

          {/* Panel 3: Right Inspector (sticky identity + sticky tabs + independently scrollable content) */}
          <InspectorPanel
            icon={selectedIcon}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onSelectIcon={handleSelectIcon}
          />
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. MEDIUM DESKTOP (1024–1279px): Left Rail + Fluid Catalog + Side Drawer */}
      {/* ========================================================================= */}
      {isMediumDesktop && (
        <div className="flex-1 min-h-0 overflow-hidden flex divide-x divide-border/80">
          <DiscoveryPanel
            selectedCategory={category}
            onSelectCategory={setCategory}
            animatedOnly={animatedOnly}
            onToggleAnimated={setAnimatedOnly}
            filledOnly={filledOnly}
            onToggleFilled={setFilledOnly}
            countsMap={categoryCounts}
            className="w-[220px]"
          />

          <CatalogPanel
            icons={filteredIcons}
            totalCatalogCount={totalCount}
            selectedIconName={selectedIcon?.name}
            onSelectIcon={handleSelectIcon}
            query={query}
            onQueryChange={setQuery}
            category={category}
            onCategoryChange={setCategory}
            animatedOnly={animatedOnly}
            onAnimatedChange={setAnimatedOnly}
            filledOnly={filledOnly}
            onFilledChange={setFilledOnly}
            tileScale={tileScale}
            onTileScaleChange={setTileScale}
            density={density}
            onDensityChange={setDensity}
            onResetFilters={resetFilters}
            searchInputRef={searchInputRef}
          />

          {/* Slide-in Inspector Drawer for Medium Desktop */}
          <Sheet open={isTabletDrawerOpen} onOpenChange={setIsTabletDrawerOpen}>
            <SheetContent
              side="right"
              className="p-0 w-[400px] sm:w-[420px] bg-white dark:bg-[#181715] text-[#141413] dark:text-[#faf9f5] border-[#e6dfd8] dark:border-[#2e2c28] flex flex-col h-full overflow-hidden"
            >
              <SheetHeader className="sr-only">
                <SheetTitle>Icon Inspector</SheetTitle>
              </SheetHeader>
              <InspectorPanel
                icon={selectedIcon}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onSelectIcon={handleSelectIcon}
                onClose={() => setIsTabletDrawerOpen(false)}
                isDrawer={true}
              />
            </SheetContent>
          </Sheet>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. TABLET (768–1023px): Compact 64px Icon Rail + Fluid Catalog + Drawer   */}
      {/* ========================================================================= */}
      {isTablet && (
        <div className="flex-1 min-h-0 overflow-hidden flex divide-x divide-border/80">
          <DiscoveryPanel
            selectedCategory={category}
            onSelectCategory={setCategory}
            animatedOnly={animatedOnly}
            onToggleAnimated={setAnimatedOnly}
            filledOnly={filledOnly}
            onToggleFilled={setFilledOnly}
            compact={true}
            countsMap={categoryCounts}
          />

          <CatalogPanel
            icons={filteredIcons}
            totalCatalogCount={totalCount}
            selectedIconName={selectedIcon?.name}
            onSelectIcon={handleSelectIcon}
            query={query}
            onQueryChange={setQuery}
            category={category}
            onCategoryChange={setCategory}
            animatedOnly={animatedOnly}
            onAnimatedChange={setAnimatedOnly}
            filledOnly={filledOnly}
            onFilledChange={setFilledOnly}
            tileScale={tileScale}
            onTileScaleChange={setTileScale}
            density={density}
            onDensityChange={setDensity}
            onResetFilters={resetFilters}
            searchInputRef={searchInputRef}
          />

          {/* Slide-in Inspector Drawer for Tablet */}
          <Sheet open={isTabletDrawerOpen} onOpenChange={setIsTabletDrawerOpen}>
            <SheetContent
              side="right"
              className="p-0 w-[380px] sm:w-[400px] bg-white dark:bg-[#181715] text-[#141413] dark:text-[#faf9f5] border-[#e6dfd8] dark:border-[#2e2c28] flex flex-col h-full overflow-hidden"
            >
              <SheetHeader className="sr-only">
                <SheetTitle>Icon Inspector</SheetTitle>
              </SheetHeader>
              <InspectorPanel
                icon={selectedIcon}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onSelectIcon={handleSelectIcon}
                onClose={() => setIsTabletDrawerOpen(false)}
                isDrawer={true}
              />
            </SheetContent>
          </Sheet>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. MOBILE (< 768px): Single Catalog Scroll + Filter Sheet + Bottom Sheet */}
      {/* ========================================================================= */}
      {isMobile && (
        <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
          <CatalogPanel
            icons={filteredIcons}
            totalCatalogCount={totalCount}
            selectedIconName={selectedIcon?.name}
            onSelectIcon={handleSelectIcon}
            query={query}
            onQueryChange={setQuery}
            category={category}
            onCategoryChange={setCategory}
            animatedOnly={animatedOnly}
            onAnimatedChange={setAnimatedOnly}
            filledOnly={filledOnly}
            onFilledChange={setFilledOnly}
            tileScale={tileScale}
            onTileScaleChange={setTileScale}
            density={density}
            onDensityChange={setDensity}
            onResetFilters={resetFilters}
            onOpenMobileFilters={() => setIsMobileFiltersOpen(true)}
            searchInputRef={searchInputRef}
            isMobile={true}
          />

          {/* Mobile Filter Sheet with pinned community links */}
          <MobileFilterSheet
            open={isMobileFiltersOpen}
            onOpenChange={setIsMobileFiltersOpen}
            category={category}
            onSelectCategory={setCategory}
            animatedOnly={animatedOnly}
            onToggleAnimated={setAnimatedOnly}
            filledOnly={filledOnly}
            onToggleFilled={setFilledOnly}
            countsMap={categoryCounts}
          />

          {/* Mobile Expandable Draggable Inspector Bottom Sheet */}
          <MobileInspectorSheet
            icon={selectedIcon}
            open={isMobileInspectorOpen}
            onOpenChange={setIsMobileInspectorOpen}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onSelectIcon={handleSelectIcon}
          />
        </div>
      )}
    </div>
  );
}
