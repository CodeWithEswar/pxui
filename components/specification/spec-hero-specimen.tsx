"use client";

import * as React from "react";
import { IconDefinition } from "@/lib/icons/schema";
import { toPXComponentName } from "@/lib/compiler";
import { PXIconBase } from "@/components/icons/px-icon-base";
import { PXIconSun, PXIconMoon } from "@/components/icons";
import { GeometryAnalysis } from "@/lib/geometry/path-analysis";
import { cn } from "@/lib/utils";

interface SpecHeroSpecimenProps {
  icon: IconDefinition;
  analysis: GeometryAnalysis;
  onOpenFullscreen?: () => void;
}

export function SpecHeroSpecimen({
  icon,
  analysis,
  onOpenFullscreen,
}: SpecHeroSpecimenProps) {
  const componentName = toPXComponentName(icon.name);
  const hasFilled = Boolean(icon.filled && icon.filled.length > 0);

  // Overlays state
  const [showGrid, setShowGrid] = React.useState(true);
  const [showAxes, setShowAxes] = React.useState(false);
  const [showBounds, setShowBounds] = React.useState(false);
  const [showBaseline, setShowBaseline] = React.useState(false);
  const [showOpticalCenter, setShowOpticalCenter] = React.useState(false);
  const [showSafeArea, setShowSafeArea] = React.useState(false);
  const [showCells, setShowCells] = React.useState(false);
  const [pixelInspect, setPixelInspect] = React.useState(false);

  // Zoom state: 1x, 2x, 4x, 8x, Fit
  const [zoom, setZoom] = React.useState<1 | 2 | 4 | 8 | "fit">(8);
  const [isFilled, setIsFilled] = React.useState(false);
  const [stageTheme, setStageTheme] = React.useState<"auto" | "dark" | "light">("auto");

  // Hovered coordinate on 24x24 drafting plate
  const [hoverCoord, setHoverCoord] = React.useState<{ x: number; y: number } | null>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const x = Math.floor(Math.max(0, Math.min(23, px * 24)));
    const y = Math.floor(Math.max(0, Math.min(23, py * 24)));
    setHoverCoord({ x, y });
  };

  const handleMouseLeave = () => {
    setHoverCoord(null);
  };

  // Zoom dimension calculation
  const getRenderSize = () => {
    switch (zoom) {
      case 1:
        return 24;
      case 2:
        return 48;
      case 4:
        return 96;
      case 8:
        return 192;
      case "fit":
        return 216;
    }
  };

  const scaleMultiplier = typeof zoom === "number" ? zoom : 9;

  return (
    <section id="overview" className="scroll-mt-24 space-y-8">
      {/* 1. Identity & Technical Metadata Strip */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Identity & Description */}
        <div className="lg:col-span-6 space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#cc785c] rounded-xs shrink-0" />
              <h1 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-[#141413] dark:text-[#faf9f5]">
                {componentName}
              </h1>
            </div>

            <div className="flex items-center gap-3 font-mono text-sm">
              <span className="font-semibold text-[#141413] dark:text-[#faf9f5]">
                {icon.title || icon.name}
              </span>
              <span className="text-[#8e8b82]">·</span>
              <span className="text-[#8e8b82]">px-{icon.name}</span>
            </div>
          </div>

          <p className="font-sans text-sm sm:text-base text-[#6c6a64] dark:text-[#8e8b82] leading-relaxed max-w-xl">
            {icon.description ||
              `Canonical pixel-native ${icon.title || icon.name} icon, authored strictly on the 24×24 integer grid for high-density interfaces.`}
          </p>

          {/* Technical Metadata Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 pt-4 border-t border-[#e6dfd8] dark:border-[#252320] font-mono text-xs">
            <div>
              <span className="block text-[10px] text-[#8e8b82] uppercase tracking-wider">
                CATEGORY
              </span>
              <span className="text-[#141413] dark:text-[#faf9f5] font-medium">
                {icon.category}
              </span>
            </div>
            <div>
              <span className="block text-[10px] text-[#8e8b82] uppercase tracking-wider">
                FAMILY
              </span>
              <span className="text-[#141413] dark:text-[#faf9f5] font-medium capitalize">
                {icon.family || icon.name.split("-")[0]}
              </span>
            </div>
            <div>
              <span className="block text-[10px] text-[#8e8b82] uppercase tracking-wider">
                GRID
              </span>
              <span className="text-[#141413] dark:text-[#faf9f5] font-medium">
                24 × 24
              </span>
            </div>
            <div>
              <span className="block text-[10px] text-[#8e8b82] uppercase tracking-wider">
                STYLE
              </span>
              <span className="text-[#141413] dark:text-[#faf9f5] font-medium">
                {isFilled ? "Filled" : hasFilled ? "Outline / Filled" : "Monoline"}
              </span>
            </div>
            <div>
              <span className="block text-[10px] text-[#8e8b82] uppercase tracking-wider">
                STATUS
              </span>
              <span className="text-[#5db872] font-semibold">
                Stable (v{icon.introducedVersion || "0.1"})
              </span>
            </div>
            <div>
              <span className="block text-[10px] text-[#8e8b82] uppercase tracking-wider">
                TARGETS
              </span>
              <span className="text-[#141413] dark:text-[#faf9f5]">
                React · Native · SVG
              </span>
            </div>
          </div>
        </div>

        {/* Right: Technical Summary readout */}
        <div className="lg:col-span-6 flex flex-col justify-between h-full bg-[#f5f0e8]/50 dark:bg-[#1d1b18]/50 border border-[#e6dfd8] dark:border-[#252320] rounded-lg p-5 font-mono text-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#e6dfd8] dark:border-[#252320]">
            <span className="font-bold text-[#cc785c] tracking-wider uppercase text-[10px]">
              GEOMETRIC SPECIFICATION READOUT
            </span>
            <span className="text-[#8e8b82] text-[10px]">CANONICAL IR</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-[#8e8b82] text-[10px] block">BOUNDS</span>
              <span className="font-semibold text-[#141413] dark:text-[#faf9f5]">
                {analysis.bounds.width} × {analysis.bounds.height}
              </span>
              <span className="text-[10px] text-[#8e8b82] block">
                x:{analysis.bounds.minX}..{analysis.bounds.maxX} y:{analysis.bounds.minY}..{analysis.bounds.maxY}
              </span>
            </div>
            <div>
              <span className="text-[#8e8b82] text-[10px] block">OPTICAL CENTER</span>
              <span className="font-semibold text-[#141413] dark:text-[#faf9f5]">
                {analysis.center.x} / {analysis.center.y}
              </span>
              <span className="text-[10px] text-[#8e8b82] block">
                offset: {analysis.opticalCorrection.x >= 0 ? `+${analysis.opticalCorrection.x}` : analysis.opticalCorrection.x}x, {analysis.opticalCorrection.y >= 0 ? `+${analysis.opticalCorrection.y}` : analysis.opticalCorrection.y}y
              </span>
            </div>
            <div>
              <span className="text-[#8e8b82] text-[10px] block">OCCUPIED CELLS</span>
              <span className="font-semibold text-[#141413] dark:text-[#faf9f5]">
                {analysis.occupiedCellCount} / 576
              </span>
              <span className="text-[10px] text-[#8e8b82] block">
                {Math.round((analysis.occupiedCellCount / 576) * 100)}% density
              </span>
            </div>
            <div>
              <span className="text-[#8e8b82] text-[10px] block">PATH SEGMENTS</span>
              <span className="font-semibold text-[#141413] dark:text-[#faf9f5]">
                {analysis.segmentCount} segments
              </span>
              <span className="text-[10px] text-[#8e8b82] block">
                {icon.paths.length} subpaths
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-[#e6dfd8] dark:border-[#252320] flex items-center justify-between text-[11px]">
            <span className="text-[#8e8b82]">Hover Coordinate:</span>
            <span className="font-bold text-[#cc785c]">
              {hoverCoord ? `x: ${hoverCoord.x}  y: ${hoverCoord.y}` : "—"}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Drafting Plate Specimen Surface */}
      <div className="relative border border-[#e6dfd8] dark:border-[#252320] rounded-xl bg-white dark:bg-[#181715] overflow-hidden shadow-xs">
        {/* Top Specimen Control Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#f5f0e8]/80 dark:bg-[#1d1b18]/80 border-b border-[#e6dfd8] dark:border-[#252320] font-mono text-xs select-none">
          {/* Left: Live Overlay Toggles */}
          <div className="flex flex-wrap items-center gap-1">
            <span className="text-[10px] uppercase text-[#8e8b82] mr-1 font-bold">
              OVERLAYS:
            </span>
            <button
              type="button"
              onClick={() => setShowGrid(!showGrid)}
              className={cn(
                "h-8 px-2.5 inline-flex items-center justify-center rounded-md text-xs font-mono border transition-all cursor-pointer box-border shrink-0 shadow-2xs",
                showGrid
                  ? "bg-[#141413] dark:bg-[#faf9f5] text-[#faf9f5] dark:text-[#141413] border-[#141413] dark:border-[#faf9f5] font-semibold"
                  : "bg-white dark:bg-[#201e1b] border-[#e6dfd8] dark:border-[#2e2c28] text-[#6c6a64] dark:text-[#8e8b82]"
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
                  ? "bg-[#141413] dark:bg-[#faf9f5] text-[#faf9f5] dark:text-[#141413] border-[#141413] dark:border-[#faf9f5] font-semibold"
                  : "bg-white dark:bg-[#201e1b] border-[#e6dfd8] dark:border-[#2e2c28] text-[#6c6a64] dark:text-[#8e8b82]"
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
                  ? "bg-[#141413] dark:bg-[#faf9f5] text-[#faf9f5] dark:text-[#141413] border-[#141413] dark:border-[#faf9f5] font-semibold"
                  : "bg-white dark:bg-[#201e1b] border-[#e6dfd8] dark:border-[#2e2c28] text-[#6c6a64] dark:text-[#8e8b82]"
              )}
            >
              Bounds
            </button>
            <button
              type="button"
              onClick={() => setShowBaseline(!showBaseline)}
              className={cn(
                "h-8 px-2.5 inline-flex items-center justify-center rounded-md text-xs font-mono border transition-all cursor-pointer box-border shrink-0 shadow-2xs",
                showBaseline
                  ? "bg-[#141413] dark:bg-[#faf9f5] text-[#faf9f5] dark:text-[#141413] border-[#141413] dark:border-[#faf9f5] font-semibold"
                  : "bg-white dark:bg-[#201e1b] border-[#e6dfd8] dark:border-[#2e2c28] text-[#6c6a64] dark:text-[#8e8b82]"
              )}
            >
              Baseline
            </button>
            <button
              type="button"
              onClick={() => setShowOpticalCenter(!showOpticalCenter)}
              className={cn(
                "h-8 px-2.5 inline-flex items-center justify-center rounded-md text-xs font-mono border transition-all cursor-pointer box-border shrink-0 shadow-2xs",
                showOpticalCenter
                  ? "bg-[#141413] dark:bg-[#faf9f5] text-[#faf9f5] dark:text-[#141413] border-[#141413] dark:border-[#faf9f5] font-semibold"
                  : "bg-white dark:bg-[#201e1b] border-[#e6dfd8] dark:border-[#2e2c28] text-[#6c6a64] dark:text-[#8e8b82]"
              )}
            >
              Optical
            </button>
            <button
              type="button"
              onClick={() => setShowSafeArea(!showSafeArea)}
              className={cn(
                "h-8 px-2.5 inline-flex items-center justify-center rounded-md text-xs font-mono border transition-all cursor-pointer box-border shrink-0 shadow-2xs",
                showSafeArea
                  ? "bg-[#141413] dark:bg-[#faf9f5] text-[#faf9f5] dark:text-[#141413] border-[#141413] dark:border-[#faf9f5] font-semibold"
                  : "bg-white dark:bg-[#201e1b] border-[#e6dfd8] dark:border-[#2e2c28] text-[#6c6a64] dark:text-[#8e8b82]"
              )}
            >
              Safe Area
            </button>
            <button
              type="button"
              onClick={() => setPixelInspect(!pixelInspect)}
              className={cn(
                "h-8 px-2.5 inline-flex items-center justify-center rounded-md text-xs font-mono border transition-all cursor-pointer box-border shrink-0 shadow-2xs",
                pixelInspect
                  ? "bg-[#cc785c] text-white border-[#cc785c] font-bold"
                  : "bg-white dark:bg-[#201e1b] border-[#e6dfd8] dark:border-[#2e2c28] text-[#6c6a64] dark:text-[#8e8b82]"
              )}
            >
              Pixel Inspect
            </button>
          </div>

          {/* Right: Zoom & Style */}
          <div className="flex items-center gap-2">
            {hasFilled && (
              <button
                type="button"
                onClick={() => setIsFilled(!isFilled)}
                className={cn(
                  "h-8 px-2.5 inline-flex items-center justify-center rounded-md text-xs font-mono border transition-all cursor-pointer box-border shrink-0 shadow-2xs",
                  isFilled
                    ? "bg-[#cc785c] text-white border-[#cc785c] font-bold"
                    : "bg-white dark:bg-[#201e1b] border-[#e6dfd8] dark:border-[#2e2c28] text-[#6c6a64] dark:text-[#8e8b82]"
                )}
              >
                Filled Variant
              </button>
            )}

            {/* Stage Theme Switcher */}
            <div className="h-8 inline-flex items-stretch gap-0.5 border border-[#e6dfd8] dark:border-[#2e2c28] rounded-md bg-white dark:bg-[#201e1b] p-0.5 box-border shrink-0 shadow-2xs">
              <button
                type="button"
                onClick={() => setStageTheme("dark")}
                className={cn(
                  "inline-flex items-center justify-center gap-1 px-2 rounded text-[10px] font-mono transition-all cursor-pointer self-stretch",
                  stageTheme === "dark"
                    ? "bg-[#141413] text-[#faf9f5] font-bold shadow-2xs"
                    : "text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5]"
                )}
                title="Force dark specimen stage"
              >
                <PXIconMoon size={11} className="shrink-0" />
                <span className="hidden sm:inline">Dark</span>
              </button>
              <button
                type="button"
                onClick={() => setStageTheme("light")}
                className={cn(
                  "inline-flex items-center justify-center gap-1 px-2 rounded text-[10px] font-mono transition-all cursor-pointer self-stretch",
                  stageTheme === "light"
                    ? "bg-[#faf9f5] text-[#141413] font-bold shadow-2xs border border-[#e6dfd8]"
                    : "text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5]"
                )}
                title="Force light paper specimen stage"
              >
                <PXIconSun size={11} className="shrink-0" />
                <span className="hidden sm:inline">Light</span>
              </button>
              <button
                type="button"
                onClick={() => setStageTheme("auto")}
                className={cn(
                  "inline-flex items-center justify-center px-2 rounded text-[10px] uppercase font-mono transition-all cursor-pointer self-stretch",
                  stageTheme === "auto"
                    ? "bg-[#cc785c] text-white font-bold"
                    : "text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5]"
                )}
                title="Follow system theme"
              >
                Auto
              </button>
            </div>

            <div className="h-8 inline-flex items-stretch gap-0.5 border border-[#e6dfd8] dark:border-[#2e2c28] rounded-md bg-white dark:bg-[#201e1b] p-0.5 box-border shrink-0 shadow-2xs">
              {([1, 2, 4, 8, "fit"] as const).map((z) => (
                <button
                  key={z}
                  type="button"
                  onClick={() => setZoom(z)}
                  className={cn(
                    "inline-flex items-center justify-center px-2 rounded text-[10px] uppercase font-mono transition-all cursor-pointer self-stretch",
                    zoom === z
                      ? "bg-[#141413] dark:bg-[#faf9f5] text-[#faf9f5] dark:text-[#141413] font-bold"
                      : "text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5]"
                  )}
                >
                  {typeof z === "number" ? `${z}×` : "Fit"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center Specimen Stage - Dark & Light Theme Support */}
        <div
          ref={stageRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "relative w-full h-[320px] sm:h-[380px] md:h-[440px] flex items-center justify-center overflow-hidden cursor-crosshair select-none transition-colors duration-200",
            stageTheme === "dark"
              ? "bg-[#141413] text-[#faf9f5]"
              : stageTheme === "light"
              ? "bg-[#faf9f5] text-[#141413]"
              : "bg-[#faf9f5] dark:bg-[#141413] text-[#141413] dark:text-[#faf9f5]"
          )}
        >
          {/* Architectural Drafting Plate Corner Markers */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#cc785c]/60 pointer-events-none" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#cc785c]/60 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#cc785c]/60 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#cc785c]/60 pointer-events-none" />

          {/* Canonical 24x24 drafting stage container */}
          <div
            className="relative transition-all duration-150 ease-out flex items-center justify-center"
            style={{
              width: `${getRenderSize()}px`,
              height: `${getRenderSize()}px`,
            }}
          >
            {/* 24x24 Grid Lines */}
            {showGrid && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(142,139,130,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(142,139,130,0.18) 1px, transparent 1px)",
                  backgroundSize: "4.166667% 4.166667%", // 100% / 24
                }}
              />
            )}

            {/* Major Axes */}
            {showAxes && (
              <>
                <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-[#cc785c]/40 pointer-events-none" />
                <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-[#cc785c]/40 pointer-events-none" />
              </>
            )}

            {/* Bounding Box safe boundary */}
            {showBounds && (
              <div
                className="absolute border border-dashed border-[#cc785c] pointer-events-none"
                style={{
                  left: `${(analysis.bounds.minX / 24) * 100}%`,
                  top: `${(analysis.bounds.minY / 24) * 100}%`,
                  width: `${(analysis.bounds.width / 24) * 100}%`,
                  height: `${(analysis.bounds.height / 24) * 100}%`,
                }}
              />
            )}

            {/* Baseline indicator (y = 20) */}
            {showBaseline && (
              <div
                className="absolute left-0 right-0 h-[1px] bg-[#5db872] pointer-events-none"
                style={{ top: `${(20 / 24) * 100}%` }}
              >
                <span className="absolute right-1 -top-3 text-[8px] font-mono text-[#5db872]">
                  BASELINE
                </span>
              </div>
            )}

            {/* Optical Center indicator */}
            {showOpticalCenter && (
              <div
                className="absolute w-2 h-2 rounded-full border border-[#cc785c] bg-[#cc785c]/20 pointer-events-none -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${(analysis.center.x / 24) * 100}%`,
                  top: `${(analysis.center.y / 24) * 100}%`,
                }}
              />
            )}

            {/* Safe Area (20x20 box, 2px margin) */}
            {showSafeArea && (
              <div
                className="absolute inset-[8.333%] border border-[#8e8b82]/40 border-dotted pointer-events-none"
                title="20x20 Safe Area"
              />
            )}

            {/* Pixel Inspect Mode Cell Highlighting */}
            {pixelInspect && hoverCoord && (
              <div
                className="absolute bg-[#cc785c]/30 border border-[#cc785c] pointer-events-none z-10"
                style={{
                  left: `${(hoverCoord.x / 24) * 100}%`,
                  top: `${(hoverCoord.y / 24) * 100}%`,
                  width: "4.166667%",
                  height: "4.166667%",
                }}
              />
            )}

            {/* The Actual Specimen Icon */}
            <PXIconBase
              definition={icon}
              size={getRenderSize()}
              filled={isFilled}
              className={cn(
                "relative z-0 transition-colors duration-150",
                stageTheme === "dark"
                  ? "text-[#faf9f5]"
                  : stageTheme === "light"
                  ? "text-[#141413]"
                  : "text-[#141413] dark:text-[#faf9f5]"
              )}
            />
          </div>
        </div>

        {/* Drafting Plate Technical Footer */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 bg-[#f5f0e8] dark:bg-[#1d1b18] border-t border-[#e6dfd8] dark:border-[#252320] font-mono text-[10px] text-[#8e8b82]">
          <div className="flex items-center gap-3">
            <span>GRID: 24 × 24</span>
            <span>·</span>
            <span>SCALE: {scaleMultiplier}×</span>
            <span>·</span>
            <span>VIEWBOX: 0 0 24 24</span>
          </div>

          <div className="flex items-center gap-3">
            {hoverCoord ? (
              <span className="text-[#cc785c] font-bold">
                HOVER: X={hoverCoord.x} Y={hoverCoord.y}
              </span>
            ) : (
              <span>DRAFTING PLATE #01</span>
            )}
            {onOpenFullscreen && (
              <button
                type="button"
                onClick={onOpenFullscreen}
                className="hover:text-[#141413] dark:hover:text-[#faf9f5] underline cursor-pointer"
              >
                Fullscreen Specimen [Esc]
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
