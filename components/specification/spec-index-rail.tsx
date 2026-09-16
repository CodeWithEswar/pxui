"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SpecSectionItem {
  id: string;
  label: string;
  badge?: string;
}

interface SpecIndexRailProps {
  sections: SpecSectionItem[];
  activeSection: string;
  onSelectSection: (id: string) => void;
  className?: string;
}

export function SpecIndexRail({
  sections,
  activeSection,
  onSelectSection,
  className,
}: SpecIndexRailProps) {
  return (
    <aside
      className={cn(
        "hidden lg:block w-56 shrink-0 sticky top-16 h-[calc(100dvh-64px)] overflow-y-auto workspace-scrollbar p-6 border-r border-[#e6dfd8] dark:border-[#252320] bg-transparent select-none",
        className
      )}
    >
      <div className="space-y-6">
        <div>
          <div className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#8e8b82] mb-3">
            SPECIFICATION INDEX
          </div>
          <nav className="space-y-1">
            {sections.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => onSelectSection(sec.id)}
                  className={cn(
                    "w-full flex items-center justify-between px-2.5 py-1.5 rounded text-xs font-mono transition-all text-left group cursor-pointer",
                    isActive
                      ? "text-[#141413] dark:text-[#faf9f5] font-semibold"
                      : "text-[#6c6a64] dark:text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5] hover:bg-[#f5f0e8]/60 dark:hover:bg-[#201e1b]"
                  )}
                >
                  <span className="flex items-center gap-2">
                    {/* Small coral square locator */}
                    <span
                      className={cn(
                        "w-1.5 h-1.5 rounded-xs transition-all",
                        isActive
                          ? "bg-[#cc785c] scale-100"
                          : "bg-transparent group-hover:bg-[#e6dfd8] dark:group-hover:bg-[#2e2c28] scale-75"
                      )}
                    />
                    <span>{sec.label}</span>
                  </span>

                  {sec.badge && (
                    <span className="text-[9px] px-1 py-0.2 rounded bg-[#f5f0e8] dark:bg-[#201e1b] border border-[#e6dfd8] dark:border-[#2e2c28] text-[#8e8b82]">
                      {sec.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Technical Specification Footer note */}
        <div className="pt-4 border-t border-[#e6dfd8] dark:border-[#252320] font-mono text-[10px] text-[#8e8b82] space-y-1">
          <div className="flex items-center justify-between">
            <span>GRID SYSTEM</span>
            <span className="text-[#141413] dark:text-[#faf9f5]">24 × 24</span>
          </div>
          <div className="flex items-center justify-between">
            <span>COORDINATES</span>
            <span className="text-[#141413] dark:text-[#faf9f5]">INTEGER</span>
          </div>
          <div className="flex items-center justify-between">
            <span>PIPELINE</span>
            <span className="text-[#5db872]">DETERMINISTIC</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
