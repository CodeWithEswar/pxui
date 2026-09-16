"use client";

import * as React from "react";
import { DiscoveryRail } from "./discovery-rail";
import { CommunityPanel } from "./community-panel";
import { cn } from "@/lib/utils";

interface DiscoveryPanelProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  animatedOnly: boolean;
  onToggleAnimated: (enabled: boolean) => void;
  filledOnly: boolean;
  onToggleFilled: (enabled: boolean) => void;
  compact?: boolean;
  countsMap?: Map<string, number>;
  className?: string;
}

export function DiscoveryPanel({
  selectedCategory,
  onSelectCategory,
  animatedOnly,
  onToggleAnimated,
  filledOnly,
  onToggleFilled,
  compact = false,
  countsMap,
  className,
}: DiscoveryPanelProps) {
  return (
    <aside
      className={cn(
        "flex min-h-0 min-w-0 flex-col border-r border-border/80 bg-background shrink-0 select-none transition-all duration-200",
        compact ? "w-16" : "w-[248px] xl:w-[256px]",
        className
      )}
    >
      {/* Scrollable Navigation Region with custom subtle scrollbar */}
      <div className="min-h-0 flex-1 overflow-y-auto workspace-scrollbar">
        <DiscoveryRail
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
          animatedOnly={animatedOnly}
          onToggleAnimated={onToggleAnimated}
          filledOnly={filledOnly}
          onToggleFilled={onToggleFilled}
          compact={compact}
          countsMap={countsMap}
        />
      </div>

      {/* Pinned Community Status Footer (hidden in collapsed 64px rail to save space) */}
      {!compact && <CommunityPanel />}
    </aside>
  );
}
