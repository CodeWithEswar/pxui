"use client";

import * as React from "react";
import { IconDefinition } from "@/lib/icons/schema";
import { PXIconBase } from "@/components/icons/px-icon-base";
import { cn } from "@/lib/utils";

interface SpecOpticalSizesProps {
  icon: IconDefinition;
}

const SIZES = [
  { size: 16, label: "16px", role: "Dense UI / Table" },
  { size: 20, label: "20px", role: "Toolbar / Compact" },
  { size: 24, label: "24px", role: "Default / Canonical" },
  { size: 32, label: "32px", role: "Feature / Card" },
  { size: 48, label: "48px", role: "Display / Hero" },
] as const;

type ProofBackground = "paper" | "dark" | "coral" | "transparent";

export function SpecOpticalSizes({ icon }: SpecOpticalSizesProps) {
  const [bg, setBg] = React.useState<ProofBackground>("paper");

  const getBgClass = () => {
    switch (bg) {
      case "paper":
        return "bg-[#faf9f5] text-[#141413] border-[#e6dfd8] dark:bg-[#181715] dark:text-[#faf9f5] dark:border-[#252320]";
      case "dark":
        return "bg-[#141413] text-[#faf9f5] border-[#252320]";
      case "coral":
        return "bg-[#cc785c] text-white border-[#b8694f]";
      case "transparent":
        return "bg-transparent text-[#141413] dark:text-[#faf9f5] border-dashed border-[#e6dfd8] dark:border-[#252320]";
    }
  };

  return (
    <section id="sizes" className="scroll-mt-24 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <h2 className="font-sans text-2xl font-bold tracking-tight text-[#141413] dark:text-[#faf9f5]">
            Optical Sizes
          </h2>
          <p className="font-mono text-xs text-[#8e8b82]">
            Type-foundry proof sheet verifying silhouette clarity, negative space, and baseline alignment across scales.
          </p>
        </div>

        {/* Background Switcher */}
        <div className="h-8 inline-flex items-stretch gap-0.5 font-mono text-xs border border-[#e6dfd8] dark:border-[#252320] rounded-md p-0.5 bg-white dark:bg-[#181715] box-border shrink-0 shadow-2xs self-start sm:self-auto overflow-x-auto max-w-full">
          <span className="text-[10px] text-[#8e8b82] uppercase px-1.5 font-bold hidden xs:inline-flex items-center">
            SURFACE:
          </span>
          {(["paper", "dark", "coral", "transparent"] as const).map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setBg(b)}
              className={cn(
                "inline-flex items-center justify-center px-2 rounded text-[10px] uppercase font-mono transition-all cursor-pointer self-stretch",
                bg === b
                  ? "bg-[#141413] dark:bg-[#faf9f5] text-[#faf9f5] dark:text-[#141413] font-bold shadow-2xs"
                  : "text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5]"
              )}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Optical Proof Board */}
      <div
        className={cn(
          "rounded-xl border p-6 sm:p-8 transition-colors overflow-x-auto workspace-scrollbar",
          getBgClass()
        )}
      >
        <div className="min-w-[600px] flex items-end justify-between gap-6 pb-6 border-b border-current/15">
          {SIZES.map(({ size, label, role }) => (
            <div key={size} className="flex flex-col items-center gap-4 flex-1">
              {/* Baseline stage */}
              <div className="relative flex items-end justify-center h-16 w-full">
                {/* Red hairline baseline */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-red-500/30" />
                <PXIconBase
                  definition={icon}
                  size={size}
                  className="pixel-crisp transition-transform"
                />
              </div>

              {/* Label & usage role */}
              <div className="text-center font-mono space-y-0.5">
                <div className="font-bold text-xs">{label}</div>
                <div className="text-[10px] opacity-70 truncate max-w-[120px]">
                  {role}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Evaluation checklist footer */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] opacity-80">
          <div className="flex items-center gap-4">
            <span>✓ PIXEL SNAPPING: CRISP</span>
            <span>✓ STROKE COLLAPSE: 0%</span>
            <span>✓ NEGATIVE SPACE: PRESERVED</span>
          </div>
          <div>CANONICAL RASTER FIDELITY</div>
        </div>
      </div>
    </section>
  );
}
