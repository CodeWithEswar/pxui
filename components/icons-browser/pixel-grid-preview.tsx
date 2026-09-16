"use client";

import * as React from "react";
import { IconDefinition } from "@/lib/icons/schema";
import { PXIconBase } from "@/components/icons/px-icon-base";
import { Button } from "@/components/ui/button";
import { PXIconSliders, PXIconMoon, PXIconSun, PXIconSparkles } from "@/components/icons";

interface PixelGridPreviewProps {
  icon: IconDefinition;
  filled?: boolean;
  animated?: boolean;
}

export function PixelGridPreview({ icon, filled = false, animated = false }: PixelGridPreviewProps) {
  const [showGrid, setShowGrid] = React.useState(true);
  const [bgMode, setBgMode] = React.useState<"dark" | "light" | "checker">("dark");
  const [zoom, setZoom] = React.useState<1 | 2 | 4 | 8>(8);

  const canvasSize = 24 * zoom; // e.g. 24 * 8 = 192px

  const bgStyles = {
    dark: "bg-[#181715] text-[#faf9f5] border-[#2e2c28]",
    light: "bg-[#faf9f5] text-[#141413] border-border",
    checker:
      "bg-[#1f1e1b] text-[#faf9f5] border-[#2e2c28] [background-image:linear-gradient(45deg,#252320_25%,transparent_25%),linear-gradient(-45deg,#252320_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#252320_75%),linear-gradient(-45deg,transparent_75%,#252320_75%)] [background-size:16px_16px] [background-position:0_0,0_8px,8px_-8px,-8px_0]",
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Canvas Area */}
      <div
        className={`relative border rounded-lg transition-colors flex items-center justify-center select-none overflow-hidden shadow-sm ${bgStyles[bgMode]}`}
        style={{
          width: 240,
          height: 240,
        }}
      >
        {/* Pixel Grid Lines Overlay (24x24) */}
        {showGrid && (
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(to right, currentColor 1px, transparent 1px),
                linear-gradient(to bottom, currentColor 1px, transparent 1px)
              `,
              backgroundSize: `${240 / 24}px ${240 / 24}px`,
            }}
          />
        )}

        {/* The Icon Scaled Up */}
        <div className="relative z-10 transition-transform">
          <PXIconBase
            definition={icon}
            size={168}
            filled={filled}
            animated={animated}
            color="currentColor"
          />
        </div>

        {/* 24x24 Badge */}
        <div className="absolute top-2.5 left-2.5 px-2 py-0.5 text-[9px] font-mono border border-border bg-background/90 backdrop-blur-xs text-foreground uppercase tracking-wider rounded-sm shadow-2xs">
          24×24 Native Grid
        </div>
      </div>

      {/* Control Toolbar */}
      <div className="flex items-center gap-1.5 text-xs">
        <Button
          variant={showGrid ? "default" : "outline"}
          size="sm"
          className="h-8 text-xs font-sans rounded-md gap-1.5 px-3"
          onClick={() => setShowGrid(!showGrid)}
          title="Toggle 24x24 pixel grid lines"
        >
          <PXIconSliders size={14} />
          Grid: {showGrid ? "ON" : "OFF"}
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="h-8 text-xs font-sans rounded-md gap-1.5 px-3"
          onClick={() =>
            setBgMode((prev) => (prev === "dark" ? "light" : prev === "light" ? "checker" : "dark"))
          }
          title="Toggle preview background mode"
        >
          {bgMode === "dark" && <PXIconMoon size={14} />}
          {bgMode === "light" && <PXIconSun size={14} />}
          {bgMode === "checker" && <PXIconSparkles size={14} />}
          Canvas: {bgMode.toUpperCase()}
        </Button>
      </div>
    </div>
  );
}
