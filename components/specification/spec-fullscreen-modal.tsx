"use client";

import * as React from "react";
import { IconDefinition } from "@/lib/icons/schema";
import { toPXComponentName } from "@/lib/compiler";
import { PXIconBase } from "@/components/icons/px-icon-base";
import { PXIconX, PXIconMoon, PXIconSun } from "@/components/icons";
import { cn } from "@/lib/utils";

interface SpecFullscreenModalProps {
  icon: IconDefinition;
  isOpen: boolean;
  onClose: () => void;
}

export function SpecFullscreenModal({
  icon,
  isOpen,
  onClose,
}: SpecFullscreenModalProps) {
  const [zoom, setZoom] = React.useState<4 | 8 | 12 | 16>(12);
  const [showGrid, setShowGrid] = React.useState(true);
  const [showAxes, setShowAxes] = React.useState(true);
  const [showBounds, setShowBounds] = React.useState(true);
  const [stageTheme, setStageTheme] = React.useState<"auto" | "dark" | "light">("auto");
  const [hoverCoord, setHoverCoord] = React.useState<{ x: number; y: number } | null>(null);

  const stageRef = React.useRef<HTMLDivElement>(null);
  const componentName = toPXComponentName(icon.name);

  // Close on Esc key
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const x = Math.floor(Math.max(0, Math.min(23, px * 24)));
    const y = Math.floor(Math.max(0, Math.min(23, py * 24)));
    setHoverCoord({ x, y });
  };

  const renderSize = zoom * 24;

  const canvasBackground =
    stageTheme === "dark"
      ? "bg-[#0f0e0d]"
      : stageTheme === "light"
      ? "bg-[#f0ebe1]"
      : "bg-[#f0ebe1] dark:bg-[#0f0e0d]";

  const stageThemeClasses = cn(
    "relative transition-all duration-150 flex items-center justify-center border shadow-2xl",
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
    backgroundSize: "4.166667% 4.166667%",
    opacity: stageTheme === "auto" ? 0.15 : 1,
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#faf9f5] dark:bg-[#141413] text-[#141413] dark:text-[#faf9f5] select-none transition-colors duration-200">
      {/* Top Header */}
      <div className="h-14 border-b border-[#e6dfd8] dark:border-[#2e2c28] px-4 sm:px-6 flex items-center justify-between font-mono text-xs bg-white/90 dark:bg-[#181715]/90 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-xs bg-[#cc785c] shrink-0" />
          <span className="font-bold text-sm text-[#141413] dark:text-[#faf9f5]">{componentName}</span>
          <span className="text-[#8e8b82] hidden xs:inline">px-{icon.name}</span>
          <span className="text-[10px] text-[#8e8b82] hidden md:inline">· FULLSCREEN GEOMETRY INSPECTOR</span>
        </div>

        {/* Overlays, Stage Theme & Zoom */}
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
              title="Dark canvas background"
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
              title="Light paper canvas background"
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

          {/* Overlay Toggles */}
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

          {/* Zoom Toggles */}
          <div className="hidden sm:inline-flex h-8 items-stretch gap-0.5 border border-[#e6dfd8] dark:border-[#2e2c28] rounded-md bg-[#faf9f5] dark:bg-[#201e1b] p-0.5 box-border shrink-0 shadow-2xs">
            {([4, 8, 12, 16] as const).map((z) => (
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

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-[#e6dfd8] dark:border-[#2e2c28] bg-[#faf9f5] dark:bg-[#201e1b] hover:bg-[#f5f0e8] dark:hover:bg-[#282622] text-[#8e8b82] hover:text-foreground transition-all cursor-pointer shrink-0 shadow-2xs box-border p-0"
            title="Exit Fullscreen (Esc)"
            aria-label="Exit fullscreen"
          >
            <PXIconX size={15} />
          </button>
        </div>
      </div>

      {/* Main Canvas Viewport */}
      <div
        className={cn(
          "flex-1 flex items-center justify-center p-8 overflow-auto workspace-scrollbar cursor-crosshair relative transition-colors duration-200",
          canvasBackground
        )}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoverCoord(null)}
      >
        <div
          ref={stageRef}
          className={stageThemeClasses}
          style={{ width: `${renderSize}px`, height: `${renderSize}px` }}
        >
          {/* Grid lines */}
          {showGrid && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={gridStyle}
            />
          )}

          {/* Axes */}
          {showAxes && (
            <>
              <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-[#cc785c]/50 pointer-events-none" />
              <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-[#cc785c]/50 pointer-events-none" />
            </>
          )}

          {/* Bounds */}
          {showBounds && (
            <div className="absolute inset-[8.333%] border border-dashed border-[#cc785c] pointer-events-none" />
          )}

          {/* Hover cell highlight */}
          {hoverCoord && (
            <div
              className="absolute bg-[#cc785c]/35 border border-[#cc785c] pointer-events-none z-20"
              style={{
                left: `${(hoverCoord.x / 24) * 100}%`,
                top: `${(hoverCoord.y / 24) * 100}%`,
                width: "4.166667%",
                height: "4.166667%",
              }}
            />
          )}

          <PXIconBase
            definition={icon}
            size={renderSize}
            className="relative z-10 transition-transform duration-100"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="h-10 border-t border-[#e6dfd8] dark:border-[#2e2c28] px-4 sm:px-6 flex items-center justify-between font-mono text-[10px] text-[#8e8b82] bg-white/70 dark:bg-[#181715]/70">
        <span>CANONICAL VIEWBOX: 0 0 24 24 · RENDER: {renderSize}px</span>
        <span className="text-[#cc785c] font-bold">
          {hoverCoord ? `COORDINATE: X=${hoverCoord.x} Y=${hoverCoord.y}` : "HOVER TO INSPECT 24×24 CELLS"}
        </span>
        <span className="hidden sm:inline">PRESS ESC TO EXIT</span>
      </div>
    </div>
  );
}
