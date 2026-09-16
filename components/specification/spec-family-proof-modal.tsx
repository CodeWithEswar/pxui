"use client";

import * as React from "react";
import Link from "next/link";
import { IconDefinition } from "@/lib/icons/schema";
import { toPXComponentName } from "@/lib/compiler";
import { PXIconBase } from "@/components/icons/px-icon-base";
import { PXIconX, PXIconMoon, PXIconSun } from "@/components/icons";
import { cn } from "@/lib/utils";

interface SpecFamilyProofModalProps {
  familyName: string;
  familyIcons: IconDefinition[];
  isOpen: boolean;
  onClose: () => void;
}

export function SpecFamilyProofModal({
  familyName,
  familyIcons,
  isOpen,
  onClose,
}: SpecFamilyProofModalProps) {
  const [stageTheme, setStageTheme] = React.useState<"auto" | "dark" | "light">("auto");
  const [specimenSize, setSpecimenSize] = React.useState<32 | 48 | 64>(48);

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const stageThemeClasses = cn(
    "relative flex items-center justify-center rounded-lg border transition-colors duration-200 shadow-inner",
    stageTheme === "dark"
      ? "bg-[#141413] text-[#faf9f5] border-[#2e2c28]"
      : stageTheme === "light"
      ? "bg-[#faf9f5] text-[#141413] border-[#e6dfd8]"
      : "bg-[#faf9f5] dark:bg-[#141413] text-[#141413] dark:text-[#faf9f5] border-[#e6dfd8] dark:border-[#2e2c28]"
  );

  const gridStyle = {
    backgroundImage:
      stageTheme === "dark"
        ? "linear-gradient(to right, rgba(250,249,245,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(250,249,245,0.3) 1px, transparent 1px)"
        : stageTheme === "light"
        ? "linear-gradient(to right, rgba(20,20,19,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,20,19,0.18) 1px, transparent 1px)"
        : "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
    backgroundSize: "8.33% 8.33%",
    opacity: stageTheme === "auto" ? 0.15 : 1,
  };

  const plateDimensions =
    specimenSize === 32 ? "w-24 h-24" : specimenSize === 48 ? "w-28 h-28" : "w-36 h-36";

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#faf9f5] dark:bg-[#141413] text-[#141413] dark:text-[#faf9f5] select-none transition-colors duration-200">
      {/* Header */}
      <div className="h-14 border-b border-[#e6dfd8] dark:border-[#2e2c28] px-4 sm:px-6 flex items-center justify-between font-mono text-xs bg-white/90 dark:bg-[#181715]/90 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-xs bg-[#cc785c] shrink-0" />
          <span className="font-bold text-sm text-[#141413] dark:text-[#faf9f5] uppercase">
            {familyName} FAMILY PROOF SHEET
          </span>
          <span className="text-[#8e8b82] hidden sm:inline">
            · {familyIcons.length} SPECIMENS
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 ml-auto shrink-0">
          {/* Stage Theme Switcher */}
          <div className="h-8 inline-flex items-stretch gap-0.5 border border-[#e6dfd8] dark:border-[#2e2c28] rounded-md bg-[#faf9f5] dark:bg-[#201e1b] p-0.5 box-border shrink-0 shadow-2xs">
            <button
              type="button"
              onClick={() => setStageTheme("dark")}
              className={cn(
                "inline-flex items-center justify-center gap-1 px-2 rounded text-[10px] font-mono transition-all cursor-pointer self-stretch",
                stageTheme === "dark"
                  ? "bg-[#141413] text-[#faf9f5] font-bold shadow-2xs"
                  : "text-[#8e8b82] hover:text-foreground"
              )}
              title="Dark plates"
            >
              <PXIconMoon size={11} className="shrink-0" />
              <span className="hidden xs:inline">Dark</span>
            </button>
            <button
              type="button"
              onClick={() => setStageTheme("light")}
              className={cn(
                "inline-flex items-center justify-center gap-1 px-2 rounded text-[10px] font-mono transition-all cursor-pointer self-stretch",
                stageTheme === "light"
                  ? "bg-[#faf9f5] text-[#141413] font-bold shadow-2xs border border-[#e6dfd8]"
                  : "text-[#8e8b82] hover:text-foreground"
              )}
              title="Light paper plates"
            >
              <PXIconSun size={11} className="shrink-0" />
              <span className="hidden xs:inline">Light</span>
            </button>
            <button
              type="button"
              onClick={() => setStageTheme("auto")}
              className={cn(
                "inline-flex items-center justify-center px-2 rounded text-[10px] uppercase font-mono transition-all cursor-pointer self-stretch",
                stageTheme === "auto"
                  ? "bg-[#cc785c] text-white font-bold"
                  : "text-[#8e8b82] hover:text-foreground"
              )}
              title="Follow system theme"
            >
              Auto
            </button>
          </div>

          {/* Size Selector */}
          <div className="h-8 inline-flex items-stretch gap-0.5 border border-[#e6dfd8] dark:border-[#2e2c28] rounded-md bg-[#faf9f5] dark:bg-[#201e1b] p-0.5 box-border shrink-0 shadow-2xs">
            {([32, 48, 64] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSpecimenSize(s)}
                className={cn(
                  "inline-flex items-center justify-center px-2.5 rounded text-[10px] font-mono transition-all cursor-pointer self-stretch",
                  specimenSize === s
                    ? "bg-[#cc785c] text-white font-bold"
                    : "text-[#8e8b82] hover:text-foreground"
                )}
              >
                {s}px
              </button>
            ))}
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-[#e6dfd8] dark:border-[#2e2c28] bg-[#faf9f5] dark:bg-[#201e1b] hover:bg-[#f5f0e8] dark:hover:bg-[#282622] text-[#8e8b82] hover:text-foreground transition-all cursor-pointer shrink-0 shadow-2xs box-border p-0"
            title="Close proof sheet (Esc)"
            aria-label="Close modal"
          >
            <PXIconX size={15} />
          </button>
        </div>
      </div>

      {/* Grid of specimens */}
      <div className="flex-1 overflow-y-auto workspace-scrollbar p-4 sm:p-8">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
          {familyIcons.map((item) => (
            <Link
              key={item.name}
              href={`/icons/px-${item.name}`}
              onClick={onClose}
              className="p-4 rounded-xl border border-[#e6dfd8] dark:border-[#2e2c28] bg-white dark:bg-[#181715] flex flex-col items-center justify-between gap-3 text-center shadow-xs transition-all hover:border-[#cc785c] hover:shadow-md group cursor-pointer"
            >
              <div
                className={cn(plateDimensions, stageThemeClasses)}
              >
                {/* 24x24 grid lines */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={gridStyle}
                />
                <PXIconBase
                  definition={item}
                  size={specimenSize}
                  className="relative z-10 transition-transform duration-100 group-hover:scale-105"
                />
              </div>

              <div className="font-mono text-xs space-y-0.5 w-full">
                <div className="font-bold text-[#141413] dark:text-[#faf9f5] truncate group-hover:text-[#cc785c] transition-colors">
                  {toPXComponentName(item.name)}
                </div>
                <div className="text-[10px] text-[#8e8b82] truncate">px-{item.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="h-10 border-t border-[#e6dfd8] dark:border-[#2e2c28] px-4 sm:px-6 flex items-center justify-between font-mono text-[10px] text-[#8e8b82] bg-white/70 dark:bg-[#181715]/70">
        <span>CANONICAL 24×24 DRAFTING PLATES · CLICK TO OPEN SPECIFICATION</span>
        <span className="hidden sm:inline">PRESS ESC TO EXIT</span>
      </div>
    </div>
  );
}
