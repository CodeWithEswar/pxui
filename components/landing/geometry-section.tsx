"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PXIconSearch, PXIconBell, PXIconSettings, PXIconSliders } from "@/components/icons";

export function GeometrySection() {
  const [showGrid, setShowGrid] = React.useState(true);
  const [showBounds, setShowBounds] = React.useState(true);
  const [showAxes, setShowAxes] = React.useState(true);
  const [activeIcon, setActiveIcon] = React.useState<"search" | "bell" | "settings">("search");
  const [hoverCoord, setHoverCoord] = React.useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.min(23, Math.max(0, Math.floor(((e.clientX - rect.left) / rect.width) * 24)));
    const y = Math.min(23, Math.max(0, Math.floor(((e.clientY - rect.top) / rect.height) * 24)));
    setHoverCoord({ x, y });
  };

  return (
    <section id="geometry" className="py-20 md:py-28 border-b border-border/80 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl space-y-12">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight text-foreground">
            Built on a grid. <br />
            <span className="text-primary italic">Refined</span> by eye.
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-sans leading-relaxed">
            Every PXUI symbol originates on an absolute 24×24 integer coordinate space.
            Stepped diagonals, optical center-weighting, and exact module bounding boxes preserve crisp silhouettes without fuzzy vector interpolation.
          </p>
        </div>

        {/* Technical Panel */}
        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-md grid grid-cols-1 lg:grid-cols-12">
          {/* Interactive 24x24 Geometry Canvas */}
          <div className="lg:col-span-7 p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-border bg-background/50 flex flex-col items-center justify-center relative select-none">
            {/* 24x24 Coordinate Display Box */}
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setHoverCoord(null)}
              className="relative w-64 h-64 sm:w-80 sm:h-80 border-2 border-border/80 bg-background rounded-lg flex items-center justify-center shadow-inner cursor-crosshair overflow-hidden"
            >
              {/* Minor 24x24 grid lines */}
              {showGrid && (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none opacity-25"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, currentColor 1px, transparent 1px),
                      linear-gradient(to bottom, currentColor 1px, transparent 1px)
                    `,
                    backgroundSize: `${100 / 24}% ${100 / 24}%`,
                  }}
                />
              )}

              {/* 20x20 Safe bounds box (2px padding) */}
              {showBounds && (
                <div
                  aria-hidden="true"
                  className="absolute border border-dashed border-primary/50 pointer-events-none"
                  style={{
                    inset: `${(2 / 24) * 100}%`,
                  }}
                >
                  <span className="absolute -top-4 left-0 text-[9px] font-mono text-primary/70">
                    20×20 SAFE
                  </span>
                </div>
              )}

              {/* Optical center axes */}
              {showAxes && (
                <>
                  <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#5db8a6]/40 pointer-events-none" />
                  <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#5db8a6]/40 pointer-events-none" />
                </>
              )}

              {/* Scaled specimen icon */}
              <div className="relative z-10 text-foreground">
                {activeIcon === "search" && <PXIconSearch size={180} />}
                {activeIcon === "bell" && <PXIconBell size={180} />}
                {activeIcon === "settings" && <PXIconSettings size={180} />}
              </div>

              {/* Coordinate indicator tooltip */}
              {hoverCoord && (
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-foreground text-background font-mono text-[10px] pointer-events-none">
                  X:{hoverCoord.x} Y:{hoverCoord.y}
                </div>
              )}
            </div>

            {/* Canvas controls strip */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <Button
                variant={showGrid ? "default" : "outline"}
                size="sm"
                onClick={() => setShowGrid(!showGrid)}
                className="h-7 text-[11px] font-mono rounded-sm px-2.5"
              >
                Grid: {showGrid ? "ON" : "OFF"}
              </Button>
              <Button
                variant={showBounds ? "default" : "outline"}
                size="sm"
                onClick={() => setShowBounds(!showBounds)}
                className="h-7 text-[11px] font-mono rounded-sm px-2.5"
              >
                Safe Bounds: {showBounds ? "ON" : "OFF"}
              </Button>
              <Button
                variant={showAxes ? "default" : "outline"}
                size="sm"
                onClick={() => setShowAxes(!showAxes)}
                className="h-7 text-[11px] font-mono rounded-sm px-2.5"
              >
                Axes: {showAxes ? "ON" : "OFF"}
              </Button>
            </div>
          </div>

          {/* Right Column: Architectural Readout */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                  Select Specimen
                </span>
                <div className="flex gap-1">
                  {(["search", "bell", "settings"] as const).map((id) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setActiveIcon(id)}
                      className={`px-2 py-1 text-xs font-mono rounded-sm capitalize transition-all ${
                        activeIcon === id
                          ? "bg-primary text-primary-foreground font-semibold"
                          : "bg-surface-soft hover:bg-surface-card text-foreground"
                      }`}
                    >
                      {id}
                    </button>
                  ))}
                </div>
              </div>

              {/* Technical Matrix Table */}
              <div className="space-y-2 font-mono text-xs">
                <div className="p-2.5 bg-background border border-border rounded-md flex justify-between">
                  <span className="text-muted-foreground">GRID STANDARD</span>
                  <span className="font-bold text-foreground">24 × 24 Integer</span>
                </div>
                <div className="p-2.5 bg-background border border-border rounded-md flex justify-between">
                  <span className="text-muted-foreground">COORDINATE DRIFT</span>
                  <span className="font-bold text-[#5db872]">0.000000px</span>
                </div>
                <div className="p-2.5 bg-background border border-border rounded-md flex justify-between">
                  <span className="text-muted-foreground">DIAGONAL MODULE</span>
                  <span className="font-bold text-primary">Stair-Step Discrete</span>
                </div>
                <div className="p-2.5 bg-background border border-border rounded-md flex justify-between">
                  <span className="text-muted-foreground">COLOR SYSTEM</span>
                  <span className="font-bold text-foreground">currentColor Native</span>
                </div>
                <div className="p-2.5 bg-background border border-border rounded-md flex justify-between">
                  <span className="text-muted-foreground">OUTPUT PARITY</span>
                  <span className="font-bold text-foreground">React / Native / SVG</span>
                </div>
              </div>
            </div>

            {/* Explanatory Callout */}
            <div className="p-3.5 bg-surface-soft border border-border rounded-lg text-xs font-sans text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground block mb-0.5">
                Why 24×24 integer safe?
              </span>
              Scaling icons on fractional coordinates causes fuzzy browser anti-aliasing.
              PXUI snaps all vertices to absolute integer coordinates, maintaining pixel sharpness on standard and high-DPI displays.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
