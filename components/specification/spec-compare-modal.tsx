"use client";

import * as React from "react";
import { IconDefinition } from "@/lib/icons/schema";
import { ICONS_CATALOG } from "@/lib/icons/catalog";
import { toPXComponentName } from "@/lib/compiler";
import { PXIconBase } from "@/components/icons/px-icon-base";
import { PXIconX, PXIconSearch, PXIconMoon, PXIconSun } from "@/components/icons";
import { cn } from "@/lib/utils";

interface SpecCompareModalProps {
  primaryIcon: IconDefinition;
  candidateIcons: IconDefinition[];
  isOpen: boolean;
  onClose: () => void;
}

export function SpecCompareModal({
  primaryIcon,
  candidateIcons,
  isOpen,
  onClose,
}: SpecCompareModalProps) {
  const [selectedCandidate, setSelectedCandidate] = React.useState<IconDefinition>(
    () => candidateIcons[0] || primaryIcon
  );
  const [showGrid, setShowGrid] = React.useState(true);
  const [showAxes, setShowAxes] = React.useState(true);
  const [showBounds, setShowBounds] = React.useState(true);
  const [zoom, setZoom] = React.useState<4 | 6 | 8>(6);
  const [stageTheme, setStageTheme] = React.useState<"auto" | "dark" | "light">("auto");
  const [searchQuery, setSearchQuery] = React.useState("");

  // Esc key listener
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Adjust candidate search query when modal opens
  const [prevIsOpen, setPrevIsOpen] = React.useState(isOpen);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setSearchQuery("");
    }
  }

  if (!isOpen) return null;

  // Filter candidates from catalog
  const filteredCandidates = searchQuery.trim()
    ? ICONS_CATALOG.filter(
        (i) =>
          i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          i.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 20)
    : candidateIcons.length > 0
    ? candidateIcons
    : ICONS_CATALOG.slice(0, 16);

  const stageDimension = zoom === 4 ? 192 : zoom === 6 ? 240 : 288;
  const iconRenderSize = zoom * 24;

  const stageThemeClasses = cn(
    "relative flex items-center justify-center rounded-xl overflow-hidden shadow-inner transition-colors duration-200 border",
    stageTheme === "dark"
      ? "bg-[#141413] text-[#faf9f5] border-[#2e2c28]"
      : stageTheme === "light"
      ? "bg-[#faf9f5] text-[#141413] border-[#e6dfd8]"
      : "bg-[#faf9f5] dark:bg-[#141413] text-[#141413] dark:text-[#faf9f5] border-[#e6dfd8] dark:border-[#2e2c28]"
  );

  const gridBackgroundStyle = {
    backgroundImage:
      stageTheme === "dark"
        ? "linear-gradient(to right, rgba(250,249,245,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(250,249,245,0.3) 1px, transparent 1px)"
        : stageTheme === "light"
        ? "linear-gradient(to right, rgba(20,20,19,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,20,19,0.18) 1px, transparent 1px)"
        : "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
    backgroundSize: "4.166667% 4.166667%",
    opacity: stageTheme === "auto" ? 0.15 : 1,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 dark:bg-black/80 backdrop-blur-md select-none">
      <div className="w-full max-w-5xl rounded-2xl border border-[#e6dfd8] dark:border-[#2e2c28] bg-white dark:bg-[#181715] text-[#141413] dark:text-[#faf9f5] overflow-hidden shadow-2xl flex flex-col max-h-[92vh] transition-colors duration-200">
        {/* Header */}
        <div className="p-4 border-b border-[#e6dfd8] dark:border-[#2e2c28] flex flex-wrap items-center justify-between gap-3 font-mono text-xs bg-[#faf9f5]/80 dark:bg-[#181715]/80 backdrop-blur-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#cc785c] shrink-0" />
            <span className="font-bold text-sm text-[#141413] dark:text-[#faf9f5]">
              GEOMETRIC COMPARISON LAB
            </span>
            <span className="hidden sm:inline text-[#8e8b82]">
              · SYNCHRONIZED DRAFTING STAGE
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 ml-auto shrink-0">
            {/* Stage Theme Toggle */}
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
                title="Dark specimen background"
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
                title="Light paper specimen background"
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

            {/* Synchronized Zoom Toggle */}
            <div className="hidden sm:inline-flex h-8 items-stretch gap-0.5 border border-[#e6dfd8] dark:border-[#2e2c28] rounded-md bg-[#faf9f5] dark:bg-[#201e1b] p-0.5 box-border shrink-0 shadow-2xs">
              {([4, 6, 8] as const).map((z) => (
                <button
                  key={z}
                  type="button"
                  onClick={() => setZoom(z)}
                  className={cn(
                    "inline-flex items-center justify-center px-2 rounded text-[10px] font-mono transition-all cursor-pointer self-stretch",
                    zoom === z
                      ? "bg-[#cc785c] text-white font-bold"
                      : "text-[#8e8b82] hover:text-foreground"
                  )}
                >
                  {z}×
                </button>
              ))}
            </div>

            {/* Overlays */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setShowGrid(!showGrid)}
                className={cn(
                  "h-8 px-2.5 inline-flex items-center justify-center rounded-md text-xs font-mono border transition-all cursor-pointer box-border shrink-0 shadow-2xs",
                  showGrid
                    ? "bg-[#cc785c]/15 border-[#cc785c] text-[#cc785c] font-bold"
                    : "border-[#e6dfd8] dark:border-[#2e2c28] text-[#8e8b82] hover:text-foreground bg-white dark:bg-[#201e1b]"
                )}
              >
                Grid
              </button>
              <button
                type="button"
                onClick={() => setShowAxes(!showAxes)}
                className={cn(
                  "h-8 px-2.5 inline-flex items-center justify-center rounded-md text-xs font-mono border transition-all cursor-pointer box-border shrink-0 shadow-2xs",
                  showAxes
                    ? "bg-[#cc785c]/15 border-[#cc785c] text-[#cc785c] font-bold"
                    : "border-[#e6dfd8] dark:border-[#2e2c28] text-[#8e8b82] hover:text-foreground bg-white dark:bg-[#201e1b]"
                )}
              >
                Axes
              </button>
              <button
                type="button"
                onClick={() => setShowBounds(!showBounds)}
                className={cn(
                  "h-8 px-2.5 inline-flex items-center justify-center rounded-md text-xs font-mono border transition-all cursor-pointer box-border shrink-0 shadow-2xs",
                  showBounds
                    ? "bg-[#cc785c]/15 border-[#cc785c] text-[#cc785c] font-bold"
                    : "border-[#e6dfd8] dark:border-[#2e2c28] text-[#8e8b82] hover:text-foreground bg-white dark:bg-[#201e1b]"
                )}
              >
                Bounds
              </button>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-[#e6dfd8] dark:border-[#2e2c28] bg-[#faf9f5] dark:bg-[#201e1b] hover:bg-[#f5f0e8] dark:hover:bg-[#282622] text-[#8e8b82] hover:text-foreground transition-all cursor-pointer shrink-0 shadow-2xs box-border p-0"
              title="Close comparison (Esc)"
              aria-label="Close modal"
            >
              <PXIconX size={15} />
            </button>
          </div>
        </div>

        {/* Specimen Comparison Body */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-8 items-center justify-center overflow-y-auto workspace-scrollbar flex-1">
          {/* Left: Primary Specimen */}
          <div className="flex flex-col items-center gap-3">
            <div className="text-center font-mono space-y-0.5">
              <span className="text-[10px] text-[#cc785c] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#cc785c]/15 inline-block">
                PRIMARY SPECIMEN
              </span>
              <div className="font-bold text-base text-[#141413] dark:text-[#faf9f5]">
                {toPXComponentName(primaryIcon.name)}
              </div>
              <div className="text-xs text-[#8e8b82]">px-{primaryIcon.name}</div>
            </div>

            <div
              className={stageThemeClasses}
              style={{ width: `${stageDimension}px`, height: `${stageDimension}px` }}
            >
              {showGrid && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={gridBackgroundStyle}
                />
              )}
              {showAxes && (
                <>
                  <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-[#cc785c]/50 pointer-events-none" />
                  <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-[#cc785c]/50 pointer-events-none" />
                </>
              )}
              {showBounds && (
                <div className="absolute inset-[8.333%] border border-dashed border-[#cc785c]/70 pointer-events-none" />
              )}
              <PXIconBase
                definition={primaryIcon}
                size={iconRenderSize}
                className="relative z-10 transition-transform duration-100"
              />
            </div>
          </div>

          {/* Right: Candidate Specimen */}
          <div className="flex flex-col items-center gap-3">
            <div className="text-center font-mono space-y-0.5">
              <span className="text-[10px] text-[#5db872] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#5db872]/15 inline-block">
                COMPARISON CANDIDATE
              </span>
              <div className="font-bold text-base text-[#141413] dark:text-[#faf9f5]">
                {toPXComponentName(selectedCandidate.name)}
              </div>
              <div className="text-xs text-[#8e8b82]">px-{selectedCandidate.name}</div>
            </div>

            <div
              className={stageThemeClasses}
              style={{ width: `${stageDimension}px`, height: `${stageDimension}px` }}
            >
              {showGrid && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={gridBackgroundStyle}
                />
              )}
              {showAxes && (
                <>
                  <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-[#cc785c]/50 pointer-events-none" />
                  <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-[#cc785c]/50 pointer-events-none" />
                </>
              )}
              {showBounds && (
                <div className="absolute inset-[8.333%] border border-dashed border-[#cc785c]/70 pointer-events-none" />
              )}
              <PXIconBase
                definition={selectedCandidate}
                size={iconRenderSize}
                className="relative z-10 transition-transform duration-100"
              />
            </div>
          </div>
        </div>

        {/* Candidate Selector Strip */}
        <div className="p-4 border-t border-[#e6dfd8] dark:border-[#2e2c28] bg-[#faf9f5] dark:bg-[#141413] space-y-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono">
            <span className="text-[10px] text-[#8e8b82] uppercase font-bold tracking-wider">
              SELECT CANDIDATE TO COMPARE ({filteredCandidates.length} AVAILABLE):
            </span>

            {/* Search filter */}
            <div className="relative w-full sm:w-60">
              <PXIconSearch
                size={13}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8e8b82]"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter candidate..."
                className="w-full h-8 pl-8 pr-2.5 text-xs rounded-md border border-[#e6dfd8] dark:border-[#2e2c28] bg-white dark:bg-[#201e1b] text-foreground focus:outline-none focus:ring-1 focus:ring-[#cc785c] box-border"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto workspace-scrollbar pb-1">
            {filteredCandidates.map((cand) => (
              <button
                key={cand.name}
                type="button"
                onClick={() => setSelectedCandidate(cand)}
                className={cn(
                  "h-8 px-3 rounded-md border font-mono text-xs shrink-0 inline-flex items-center gap-2 transition-all cursor-pointer shadow-2xs box-border",
                  selectedCandidate.name === cand.name
                    ? "border-[#cc785c] bg-[#cc785c]/15 text-[#cc785c] font-bold"
                    : "border-[#e6dfd8] dark:border-[#2e2c28] bg-white dark:bg-[#201e1b] text-[#6c6a64] dark:text-[#8e8b82] hover:text-foreground hover:border-[#cc785c]/60"
                )}
              >
                <PXIconBase definition={cand} size={14} />
                <span>{cand.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
