"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { SpecSectionItem } from "./spec-index-rail";

interface SpecMobileNavProps {
  sections: SpecSectionItem[];
  activeSection: string;
  onSelectSection: (id: string) => void;
}

export function SpecMobileNav({
  sections,
  activeSection,
  onSelectSection,
}: SpecMobileNavProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Scroll active tab into view horizontally
  React.useEffect(() => {
    if (containerRef.current) {
      const activeEl = containerRef.current.querySelector<HTMLButtonElement>(
        `[data-section="${activeSection}"]`
      );
      if (activeEl) {
        activeEl.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [activeSection]);

  return (
    <div className="lg:hidden sticky top-16 z-30 w-full border-b border-[#e6dfd8] dark:border-[#252320] bg-[#faf9f5]/95 dark:bg-[#181715]/95 backdrop-blur-md">
      <div
        ref={containerRef}
        className="flex items-center gap-1 px-4 py-2 overflow-x-auto workspace-scrollbar scroll-smooth"
      >
        {sections.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              data-section={sec.id}
              type="button"
              onClick={() => onSelectSection(sec.id)}
              className={cn(
                "h-8 px-3 inline-flex items-center justify-center rounded-full text-xs font-mono shrink-0 transition-all border cursor-pointer box-border shadow-2xs",
                isActive
                  ? "bg-[#141413] dark:bg-[#faf9f5] text-[#faf9f5] dark:text-[#141413] border-[#141413] dark:border-[#faf9f5] font-semibold"
                  : "bg-white/70 dark:bg-[#201e1b]/70 border-[#e6dfd8] dark:border-[#2e2c28] text-[#6c6a64] dark:text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5]"
              )}
            >
              <span className="flex items-center gap-1.5">
                {isActive && <span className="w-1.5 h-1.5 rounded-xs bg-[#cc785c]" />}
                <span>{sec.label}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
