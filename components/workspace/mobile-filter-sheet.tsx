"use client";

import * as React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { DiscoveryRail } from "./discovery-rail";
import { CommunityPanel } from "./community-panel";

interface MobileFilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: string;
  onSelectCategory: (category: string) => void;
  animatedOnly: boolean;
  onToggleAnimated: (enabled: boolean) => void;
  filledOnly: boolean;
  onToggleFilled: (enabled: boolean) => void;
  countsMap?: Map<string, number>;
}

export function MobileFilterSheet({
  open,
  onOpenChange,
  category,
  onSelectCategory,
  animatedOnly,
  onToggleAnimated,
  filledOnly,
  onToggleFilled,
  countsMap,
}: MobileFilterSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="p-0 data-[side=left]:!w-[256px] data-[side=left]:!max-w-[72vw] !w-[256px] !max-w-[72vw] sm:!w-[280px] bg-background border-border flex flex-col h-full overflow-hidden shadow-2xl"
      >
        <SheetHeader className="p-3.5 sm:p-4 border-b border-border/80 shrink-0 select-none">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-mono text-xs sm:text-sm font-bold tracking-tight">
              DISCOVER & FILTER
            </SheetTitle>
          </div>
        </SheetHeader>

        {/* Scrollable category list with touch-friendly 44-48px targets */}
        <div className="min-h-0 flex-1 overflow-y-auto workspace-scrollbar p-2 touch-pan-y overscroll-contain">
          <DiscoveryRail
            selectedCategory={category}
            onSelectCategory={(cat) => {
              onSelectCategory(cat);
              onOpenChange(false);
            }}
            animatedOnly={animatedOnly}
            onToggleAnimated={onToggleAnimated}
            filledOnly={filledOnly}
            onToggleFilled={onToggleFilled}
            countsMap={countsMap}
          />
        </div>

        {/* Mobile Community Links (Section 47) at the bottom of the navigation sheet */}
        <CommunityPanel />
      </SheetContent>
    </Sheet>
  );
}
