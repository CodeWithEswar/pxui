"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { InspectorTab } from "./hooks/use-icon-selection";

interface InspectorTabsProps {
  activeTab: InspectorTab;
  onTabChange: (tab: InspectorTab) => void;
  className?: string;
}

const TABS: { id: InspectorTab; label: string }[] = [
  { id: "specimen", label: "SPECIMEN" },
  { id: "sizes", label: "SIZES" },
  { id: "geometry", label: "GEOMETRY" },
  { id: "code", label: "CODE" },
];

export function InspectorTabs({ activeTab, onTabChange, className }: InspectorTabsProps) {
  return (
    <div
      className={cn(
        "flex items-center border-b border-[#e6dfd8] dark:border-[#252320] bg-[#faf9f5] dark:bg-[#1a1916] px-2 sm:px-4 shrink-0 select-none overflow-x-auto no-scrollbar",
        className
      )}
    >
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "flex-1 sm:flex-initial px-2 sm:px-3.5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-mono font-medium tracking-wider transition-all relative cursor-pointer text-center shrink-0",
            activeTab === tab.id
              ? "text-[#141413] dark:text-[#faf9f5] font-semibold"
              : "text-[#6c6a64] dark:text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5]"
          )}
        >
          <span>{tab.label}</span>
          {activeTab === tab.id && (
            <span className="absolute bottom-0 left-2 right-2 sm:left-0 sm:right-0 h-[2px] bg-primary rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
}
