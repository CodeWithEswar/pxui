"use client";

import * as React from "react";
import { IconDefinition } from "@/lib/icons/schema";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { InspectorIdentity } from "./inspector-identity";
import { InspectorTabs } from "./inspector-tabs";
import { InspectorContent } from "./inspector-content";
import { InspectorTab } from "./hooks/use-icon-selection";
import { PXIconMaximize, PXIconMinimize, PXIconX } from "@/components/icons";
import { cn } from "@/lib/utils";

interface MobileInspectorSheetProps {
  icon: IconDefinition | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeTab: InspectorTab;
  onTabChange: (tab: InspectorTab) => void;
  onSelectIcon?: (icon: IconDefinition) => void;
}

export function MobileInspectorSheet({
  icon,
  open,
  onOpenChange,
  activeTab,
  onTabChange,
  onSelectIcon,
}: MobileInspectorSheetProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  if (!icon) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        className={cn(
          "p-0 bg-white dark:bg-[#161513] text-[#141413] dark:text-[#faf9f5] border-t border-[#e6dfd8] dark:border-[#2e2c28] rounded-t-2xl sm:rounded-t-3xl overflow-hidden flex flex-col transition-all duration-300 shadow-2xl backdrop-blur-xl gap-0",
          isExpanded
            ? "data-[side=bottom]:!h-[96dvh] data-[side=bottom]:!max-h-[96dvh] !h-[96dvh] !max-h-[96dvh]"
            : "data-[side=bottom]:!h-[85dvh] data-[side=bottom]:!max-h-[85dvh] !h-[85dvh] !max-h-[85dvh]"
        )}
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Icon Inspector — {icon.name}</SheetTitle>
        </SheetHeader>

        {/* Tactile Mobile Grab Header with Integrated Controls */}
        <div className="relative h-9 flex items-center justify-between px-3 bg-[#faf9f5] dark:bg-[#1d1b18] border-b border-[#e6dfd8] dark:border-[#252320] shrink-0 select-none">
          {/* Left subtle taxonomy slug */}
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#6c6a64] dark:text-[#8e8b82]">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="uppercase tracking-widest font-semibold">INSPECTOR</span>
          </div>

          {/* Centered tactile drag pill */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-1 rounded-full bg-[#c5c0b8] dark:bg-[#44413b]"
            aria-hidden="true"
          />

          {/* Right Action Cluster: Expand Fullscreen & Close */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-md text-[#6c6a64] dark:text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5] hover:bg-[#ede8e1] dark:hover:bg-[#252320] transition-colors cursor-pointer active:scale-95"
              title={isExpanded ? "Collapse height" : "Expand to fullscreen"}
              aria-label={isExpanded ? "Collapse inspector height" : "Expand inspector height"}
            >
              {isExpanded ? <PXIconMinimize size={13} /> : <PXIconMaximize size={13} />}
            </button>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="p-1.5 rounded-md text-[#6c6a64] dark:text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5] hover:bg-[#ede8e1] dark:hover:bg-[#252320] transition-colors cursor-pointer active:scale-95"
              title="Close drawer"
              aria-label="Close inspector"
            >
              <PXIconX size={14} />
            </button>
          </div>
        </div>

        {/* Fixed Identity Header with quick copy, install & spec */}
        <InspectorIdentity
          icon={icon}
          className="p-3 sm:p-4 shrink-0"
        />

        {/* Fixed Inspector Tabs */}
        <InspectorTabs activeTab={activeTab} onTabChange={onTabChange} className="shrink-0" />

        {/* Directly scrollable Tab Content taking 100% of remaining flex height */}
        <InspectorContent
          icon={icon}
          activeTab={activeTab}
          onSelectIcon={onSelectIcon}
          className="pb-[calc(28px+env(safe-area-inset-bottom))] touch-pan-y overscroll-contain"
        />
      </SheetContent>
    </Sheet>
  );
}
