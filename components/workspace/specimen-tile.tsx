"use client";

import * as React from "react";
import { IconDefinition } from "@/lib/icons/schema";
import { toPXComponentName } from "@/lib/compiler";
import { PXIconBase } from "@/components/icons/px-icon-base";
import { cn } from "@/lib/utils";
import { PXIconCheck, PXIconCopy, IconCopyDialog } from "@/components/icons";
import { copyToClipboard } from "@/lib/clipboard";
import { DensityMode } from "./hooks/use-density-preference";

interface SpecimenTileProps {
  icon: IconDefinition;
  isSelected: boolean;
  onSelect: (icon: IconDefinition) => void;
  previewSize?: number;
  density?: DensityMode;
  isMobile?: boolean;
}

export const SpecimenTile = React.memo(function SpecimenTile({
  icon,
  isSelected,
  onSelect,
  previewSize = 24,
  density = "default",
  isMobile = false,
}: SpecimenTileProps) {
  const [copied, setCopied] = React.useState(false);
  const [isCopyDialogOpen, setIsCopyDialogOpen] = React.useState(false);

  const componentName = toPXComponentName(icon.name);
  const isAnimated = Boolean(icon.animation);
  const hasFilled = Boolean(icon.filled && icon.filled.length > 0);

  // Click on copy button opens the rich Copy & Export Dialog
  // Shift+Click performs instant quick clipboard copy
  const handleCopyClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (e.shiftKey) {
      const snippet = `<${componentName} size={24} />`;
      const success = await copyToClipboard(snippet);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      }
      return;
    }
    setIsCopyDialogOpen(true);
  };

  const minHeightClass =
    density === "compact"
      ? "min-h-[124px]"
      : density === "comfortable"
      ? "min-h-[160px]"
      : "min-h-[144px]";

  const paddingClass = density === "compact" ? "p-2 sm:p-2.5" : "p-2.5 sm:p-3.5";

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => onSelect(icon)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect(icon);
          }
        }}
        aria-label={`${componentName} pixel icon, ${icon.category} category`}
        aria-pressed={isSelected}
        className={cn(
          "group relative flex flex-col justify-between rounded-lg border transition-all duration-150 cursor-pointer text-left select-none outline-none overflow-hidden",
          minHeightClass,
          paddingClass,
          isSelected
            ? "bg-surface-card border-foreground/40 shadow-xs ring-1 ring-foreground/20"
            : "bg-card/75 hover:bg-surface-soft border-border hover:border-foreground/20 shadow-2xs"
        )}
      >
        {/* PXUI Distinctive Top-Left Coral Locator */}
        {isSelected && (
          <>
            <span
              className="absolute top-0 left-0 right-0 h-[2px] bg-primary pointer-events-none rounded-t-sm"
              aria-hidden="true"
            />
            <span
              className="absolute top-0 left-0 w-2 h-2 bg-primary pointer-events-none"
              aria-hidden="true"
            />
          </>
        )}

        {/* Top Meta: Dimension stamp & Status badge (guaranteed single line, never wraps) */}
        <div className="flex items-center justify-between w-full text-[10px] font-mono text-muted-soft mb-1 min-w-0">
          {!isMobile ? (
            <span className="opacity-60 group-hover:opacity-100 transition-opacity whitespace-nowrap shrink-0 text-[10px]">
              PX / {String(icon.grid || 24).padStart(3, "0")}
            </span>
          ) : (
            <span className="whitespace-nowrap shrink-0 text-[10px] opacity-60">
              {String(icon.grid || 24)}px
            </span>
          )}

          <div className="flex items-center gap-1 shrink-0 ml-1">
            {isAnimated && (
              <span
                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono bg-[#e8a55a]/15 text-[#e8a55a] border border-[#e8a55a]/30 font-semibold shrink-0 whitespace-nowrap"
                title="Stepped pixel animation supported"
              >
                <span className="w-1.5 h-1.5 rounded-xs bg-[#e8a55a] shrink-0" />
                <span className="hidden xs:inline">MOTION</span>
              </span>
            )}
            {hasFilled && (
              <span
                className="w-1.5 h-1.5 rounded-xs bg-[#6c6a64] dark:bg-[#a09d96] shrink-0"
                title="Solid filled variant available"
              />
            )}
          </div>
        </div>

        {/* Floating Action: Click opens Export & Copy Dialog (accessible on mobile and hover on desktop) */}
        <button
          type="button"
          onClick={handleCopyClick}
          title={`Export & Copy ${componentName} (Shift+Click to quick copy)`}
          aria-label={`Export & Copy ${componentName}`}
          className={cn(
            "absolute top-2 right-2 h-6 w-6 rounded flex items-center justify-center shrink-0 transition-all z-10 cursor-pointer shadow-2xs",
            copied
              ? "opacity-100 text-[#5db872] bg-[#5db872]/20 border border-[#5db872]/40"
              : "opacity-60 sm:opacity-0 group-hover:opacity-100 focus:opacity-100 text-muted-soft hover:text-foreground bg-white/90 dark:bg-[#201e1b]/90 hover:bg-white dark:hover:bg-[#282622] border border-border/80 hover:border-border"
          )}
        >
          {copied ? (
            <PXIconCheck size={12} className="text-[#5db872] animate-in zoom-in-50 duration-150" />
          ) : (
            <PXIconCopy size={12} />
          )}
        </button>

        {/* Dominant Icon Specimen Stage */}
        <div className="flex-1 w-full flex items-center justify-center py-2 relative">
          <div className="text-foreground transition-transform duration-150 group-hover:scale-105">
            <PXIconBase definition={icon} size={previewSize} />
          </div>
        </div>

        {/* Bottom Identity: Crisp Truncated Component Name (never breaks mid-word) & Monospace Slug */}
        <div className="mt-1.5 pt-1.5 border-t border-border/60 min-w-0">
          <div
            className={cn(
              "font-sans font-medium tracking-tight text-foreground leading-tight truncate group-hover:text-primary transition-colors",
              density === "compact" ? "text-[11.5px]" : "text-[12px] sm:text-[13px]"
            )}
            title={componentName}
          >
            {componentName}
          </div>
          <div
            className="font-mono text-[10.5px] text-muted-soft truncate mt-0.5"
            title={`px-${icon.name}`}
          >
            px-{icon.name}
          </div>
        </div>
      </div>

      {/* Full-Featured Export & Copy Modal for this Icon */}
      <IconCopyDialog
        icon={icon}
        isOpen={isCopyDialogOpen}
        onClose={() => setIsCopyDialogOpen(false)}
        initialTab="react"
      />
    </>
  );
});
