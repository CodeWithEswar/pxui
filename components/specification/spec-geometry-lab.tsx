"use client";

import * as React from "react";
import { IconDefinition } from "@/lib/icons/schema";
import { GeometryAnalysis, PathCommand } from "@/lib/geometry/path-analysis";
import {
  analyzeIconPinToPin,
  PXGeometryAnalysis,
  PXVertex,
  PXEdge,
} from "@/lib/geometry/pin-to-pin";
import { cn } from "@/lib/utils";
import { copyToClipboard } from "@/lib/clipboard";
import { PXIconCheck, PXIconCopy } from "@/components/icons";

interface SpecGeometryLabProps {
  icon: IconDefinition;
  analysis: GeometryAnalysis;
}

export function SpecGeometryLab({ icon, analysis }: SpecGeometryLabProps) {
  // Compute pin-to-pin exact geometry
  const pinAnalysis: PXGeometryAnalysis = React.useMemo(() => {
    return analyzeIconPinToPin(icon);
  }, [icon]);

  // Active tab in the inspector panel
  const [activeTab, setActiveTab] = React.useState<
    "pins" | "edges" | "commands" | "occupancy" | "primitives"
  >("pins");

  // Interaction states
  const [hoveredCell, setHoveredCell] = React.useState<{ x: number; y: number } | null>(null);
  const [selectedVertex, setSelectedVertex] = React.useState<PXVertex | null>(null);
  const [hoveredVertex, setHoveredVertex] = React.useState<PXVertex | null>(null);
  const [selectedEdge, setSelectedEdge] = React.useState<PXEdge | null>(null);
  const [hoveredEdge, setHoveredEdge] = React.useState<PXEdge | null>(null);
  const [highlightedCmd, setHighlightedCmd] = React.useState<PathCommand | null>(null);

  // Layer toggles
  const [showGrid, setShowGrid] = React.useState(true);
  const [showBounds, setShowBounds] = React.useState(true);
  const [showVertices, setShowVertices] = React.useState(true);
  const [showEdges, setShowEdges] = React.useState(true);
  const [showSafeArea, setShowSafeArea] = React.useState(true);
  const [showAxes, setShowAxes] = React.useState(true);
  const [showCentroid, setShowCentroid] = React.useState(true);
  const [showOccupancyOverlay, setShowOccupancyOverlay] = React.useState(false);

  // Zoom scale: 1x (288px), 1.5x (384px - 16px/unit), 2x (480px - 20px/unit)
  const [zoomLevel, setZoomLevel] = React.useState<1 | 1.5 | 2>(1.5);

  // Copy feedback state
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);
  const handleCopy = React.useCallback(async (text: string, key: string) => {
    await copyToClipboard(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  }, []);

  // Keyboard shortcut handler (G, B, V, S, N, C, +, -, 0)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if typing in an input or textarea
      const target = e.target as HTMLElement;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) {
        return;
      }

      const key = e.key.toUpperCase();
      if (key === "G") {
        e.preventDefault();
        setShowGrid((prev) => !prev);
      } else if (key === "B") {
        e.preventDefault();
        setShowBounds((prev) => !prev);
      } else if (key === "V") {
        e.preventDefault();
        setShowVertices((prev) => !prev);
      } else if (key === "S") {
        e.preventDefault();
        setShowSafeArea((prev) => !prev);
      } else if (key === "N") {
        e.preventDefault();
        setShowOccupancyOverlay((prev) => !prev);
      } else if (key === "C" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        const coordsJson = JSON.stringify(
          {
            name: icon.name,
            bounds: pinAnalysis.computedBounds,
            vertices: pinAnalysis.vertices,
            edges: pinAnalysis.edges,
          },
          null,
          2
        );
        handleCopy(coordsJson, "coords-shortcut");
      } else if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        setZoomLevel((prev) => (prev === 1 ? 1.5 : 2));
      } else if (e.key === "-") {
        e.preventDefault();
        setZoomLevel((prev) => (prev === 2 ? 1.5 : 1));
      } else if (e.key === "0") {
        e.preventDefault();
        setZoomLevel(1.5);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [icon.name, pinAnalysis, handleCopy]);

  const stageSize = zoomLevel === 1 ? 288 : zoomLevel === 1.5 ? 384 : 480;

  const activeVertex = hoveredVertex || selectedVertex;
  const activeEdge = hoveredEdge || selectedEdge;

  return (
    <section id="geometry" className="scroll-mt-24 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="font-sans text-2xl font-bold tracking-tight text-[#141413] dark:text-[#faf9f5]">
              Geometry Lab & Pin-to-Pin Inspector
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#5db872]/15 text-[#5db872] border border-[#5db872]/30">
              100% CANONICAL
            </span>
          </div>
          <p className="font-mono text-xs text-[#8e8b82]">
            Canonical 24×24 integer construction, resolved absolute vertices, edge traversal, area centroid, and binary occupancy matrix.
          </p>
        </div>

        {/* Quick Action Shortcuts */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleCopy(icon.paths.map((p) => p.d).join(" "), "canonical-path")}
            className="h-8 px-2.5 rounded-md border border-[#e6dfd8] dark:border-[#2e2c28] bg-white dark:bg-[#181715] hover:bg-[#f5f0e8] dark:hover:bg-[#201e1b] font-mono text-xs text-[#141413] dark:text-[#faf9f5] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Copy canonical SVG path data"
          >
            {copiedKey === "canonical-path" ? (
              <PXIconCheck size={12} className="text-[#5db872]" />
            ) : (
              <PXIconCopy size={12} className="text-[#8e8b82]" />
            )}
            <span>Copy Path</span>
          </button>

          <button
            type="button"
            onClick={() =>
              handleCopy(
                JSON.stringify(
                  {
                    name: icon.name,
                    bounds: pinAnalysis.computedBounds,
                    center: pinAnalysis.center,
                    centroid: pinAnalysis.centroid,
                    margins: pinAnalysis.margins,
                    symmetry: pinAnalysis.symmetry,
                    vertices: pinAnalysis.vertices,
                  },
                  null,
                  2
                ),
                "geom-json"
              )
            }
            className="h-8 px-2.5 rounded-md border border-[#e6dfd8] dark:border-[#2e2c28] bg-white dark:bg-[#181715] hover:bg-[#f5f0e8] dark:hover:bg-[#201e1b] font-mono text-xs text-[#141413] dark:text-[#faf9f5] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Copy geometry metrics as JSON"
          >
            {copiedKey === "geom-json" ? (
              <PXIconCheck size={12} className="text-[#5db872]" />
            ) : (
              <PXIconCopy size={12} className="text-[#8e8b82]" />
            )}
            <span>JSON Spec</span>
          </button>
        </div>
      </div>

      {/* Geometry Metrics Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono text-xs">
        {/* Bounds */}
        <div className="p-3 rounded-lg border border-[#e6dfd8] dark:border-[#252320] bg-white dark:bg-[#181715]">
          <span className="text-[10px] text-[#8e8b82] uppercase block">COMPUTED BOUNDS</span>
          <div className="font-bold text-sm text-[#141413] dark:text-[#faf9f5] mt-0.5">
            {pinAnalysis.dimensions.width} × {pinAnalysis.dimensions.height}
          </div>
          <span className="text-[10px] text-[#8e8b82] mt-1 block truncate">
            ({pinAnalysis.computedBounds.minX},{pinAnalysis.computedBounds.minY}) → ({pinAnalysis.computedBounds.maxX},{pinAnalysis.computedBounds.maxY})
          </span>
        </div>

        {/* Optical Center & Centroid */}
        <div className="p-3 rounded-lg border border-[#e6dfd8] dark:border-[#252320] bg-white dark:bg-[#181715]">
          <span className="text-[10px] text-[#8e8b82] uppercase block">CENTER / CENTROID</span>
          <div className="font-bold text-sm text-[#141413] dark:text-[#faf9f5] mt-0.5">
            ({pinAnalysis.centroid.x}, {pinAnalysis.centroid.y})
          </div>
          <span className="text-[10px] text-[#8e8b82] mt-1 block">
            Box: ({pinAnalysis.center.x}, {pinAnalysis.center.y}) · Δ({pinAnalysis.opticalOffset.dx.toFixed(2)}, {pinAnalysis.opticalOffset.dy.toFixed(2)})
          </span>
        </div>

        {/* Safe Margins */}
        <div className="p-3 rounded-lg border border-[#e6dfd8] dark:border-[#252320] bg-white dark:bg-[#181715]">
          <span className="text-[10px] text-[#8e8b82] uppercase block">MARGINS (T R B L)</span>
          <div className="font-bold text-sm text-[#141413] dark:text-[#faf9f5] mt-0.5">
            {pinAnalysis.margins.formatted}
          </div>
          <span className="text-[10px] text-[#8e8b82] mt-1 block">
            Safe: ≥2 {pinAnalysis.validation.safeMarginSatisfied ? "✓ Satisfied" : "⚠ Compact"}
          </span>
        </div>

        {/* Symmetry */}
        <div className="p-3 rounded-lg border border-[#e6dfd8] dark:border-[#252320] bg-white dark:bg-[#181715]">
          <span className="text-[10px] text-[#8e8b82] uppercase block">SYMMETRY PROFILE</span>
          <div className="font-bold text-sm text-[#141413] dark:text-[#faf9f5] mt-0.5 flex items-center gap-1.5">
            <span
              className={cn(
                "px-1 py-0.2 rounded text-[10px]",
                pinAnalysis.symmetry.horizontal ? "bg-[#5db872]/20 text-[#5db872]" : "text-[#8e8b82]"
              )}
              title="Horizontal reflection symmetry"
            >
              H:{pinAnalysis.symmetry.horizontal ? "✓" : "–"}
            </span>
            <span
              className={cn(
                "px-1 py-0.2 rounded text-[10px]",
                pinAnalysis.symmetry.vertical ? "bg-[#5db872]/20 text-[#5db872]" : "text-[#8e8b82]"
              )}
              title="Vertical reflection symmetry"
            >
              V:{pinAnalysis.symmetry.vertical ? "✓" : "–"}
            </span>
            <span
              className={cn(
                "px-1 py-0.2 rounded text-[10px]",
                pinAnalysis.symmetry.rotational180 ? "bg-[#5db872]/20 text-[#5db872]" : "text-[#8e8b82]"
              )}
              title="180° rotational symmetry"
            >
              180°:{pinAnalysis.symmetry.rotational180 ? "✓" : "–"}
            </span>
          </div>
          <span className="text-[10px] text-[#8e8b82] mt-1 block">
            90° Rot: {pinAnalysis.symmetry.rotational90 ? "Yes (4-Fold)" : "No"}
          </span>
        </div>

        {/* Primary Weights */}
        <div className="p-3 rounded-lg border border-[#e6dfd8] dark:border-[#252320] bg-white dark:bg-[#181715]">
          <span className="text-[10px] text-[#8e8b82] uppercase block">PRIMARY WEIGHT</span>
          <div className="font-bold text-sm text-[#141413] dark:text-[#faf9f5] mt-0.5">
            {pinAnalysis.weights.detectedBarWeights.length > 0
              ? `${pinAnalysis.weights.detectedBarWeights.join(", ")} units`
              : "Stepped"}
          </div>
          <span className="text-[10px] text-[#8e8b82] mt-1 block">
            Tokens: 4 heavy / 2 mod
          </span>
        </div>

        {/* Fill Density */}
        <div className="p-3 rounded-lg border border-[#e6dfd8] dark:border-[#252320] bg-white dark:bg-[#181715]">
          <span className="text-[10px] text-[#8e8b82] uppercase block">FILL DENSITY</span>
          <div className="font-bold text-sm text-[#141413] dark:text-[#faf9f5] mt-0.5">
            {pinAnalysis.occupiedCellCount} / 576
          </div>
          <span className="text-[10px] text-[#8e8b82] mt-1 block">
            {pinAnalysis.activeFillPercentage}% 24×24 active
          </span>
        </div>
      </div>

      {/* Main Drafting Workspace: Stage (Left) & Inspector Panels (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Drafting Stage (Section 17-18) */}
        <div className="lg:col-span-6 flex flex-col items-center p-4 border border-[#e6dfd8] dark:border-[#252320] rounded-xl bg-white dark:bg-[#181715]">
          {/* Controls toolbar */}
          <div className="w-full flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#e6dfd8] dark:border-[#252320] font-mono text-[11px]">
            <div className="flex items-center gap-1">
              <span className="font-bold text-[#141413] dark:text-[#faf9f5] uppercase tracking-wider text-[10px]">
                DRAFTING PLATE
              </span>
              <span className="text-[#8e8b82] text-[10px]">
                (24×24 · {zoomLevel * 16}px/cell)
              </span>
            </div>

            {/* Zoom Toggles */}
            <div className="flex items-center gap-1">
              {([1, 1.5, 2] as const).map((z) => (
                <button
                  key={z}
                  type="button"
                  onClick={() => setZoomLevel(z)}
                  className={cn(
                    "px-1.5 py-0.5 rounded text-[10px] transition-colors cursor-pointer border",
                    zoomLevel === z
                      ? "bg-[#cc785c] text-white border-[#cc785c] font-bold"
                      : "border-[#e6dfd8] dark:border-[#252320] bg-[#faf9f5] dark:bg-[#201e1b] text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5]"
                  )}
                  title={`Zoom ${z * 16}px per cell`}
                >
                  {z === 1 ? "1×" : z === 1.5 ? "1.5×" : "2×"}
                </button>
              ))}
            </div>
          </div>

          {/* Layer Toggles Strip */}
          <div className="w-full flex flex-wrap items-center gap-1.5 py-2.5 border-b border-[#e6dfd8] dark:border-[#252320] font-mono text-[10px]">
            <button
              type="button"
              onClick={() => setShowGrid((p) => !p)}
              className={cn(
                "px-2 py-0.5 rounded border transition-colors cursor-pointer",
                showGrid
                  ? "bg-[#cc785c]/15 text-[#cc785c] border-[#cc785c]/40 font-bold"
                  : "bg-transparent text-[#8e8b82] border-transparent hover:border-[#e6dfd8] dark:hover:border-[#252320]"
              )}
              title="Toggle Grid (Keyboard: G)"
            >
              Grid [G]
            </button>
            <button
              type="button"
              onClick={() => setShowBounds((p) => !p)}
              className={cn(
                "px-2 py-0.5 rounded border transition-colors cursor-pointer",
                showBounds
                  ? "bg-[#cc785c]/15 text-[#cc785c] border-[#cc785c]/40 font-bold"
                  : "bg-transparent text-[#8e8b82] border-transparent hover:border-[#e6dfd8] dark:hover:border-[#252320]"
              )}
              title="Toggle Bounds (Keyboard: B)"
            >
              Bounds [B]
            </button>
            <button
              type="button"
              onClick={() => setShowVertices((p) => !p)}
              className={cn(
                "px-2 py-0.5 rounded border transition-colors cursor-pointer",
                showVertices
                  ? "bg-[#cc785c]/15 text-[#cc785c] border-[#cc785c]/40 font-bold"
                  : "bg-transparent text-[#8e8b82] border-transparent hover:border-[#e6dfd8] dark:hover:border-[#252320]"
              )}
              title="Toggle Vertices (Keyboard: V)"
            >
              Vertices [V]
            </button>
            <button
              type="button"
              onClick={() => setShowEdges((p) => !p)}
              className={cn(
                "px-2 py-0.5 rounded border transition-colors cursor-pointer",
                showEdges
                  ? "bg-[#cc785c]/15 text-[#cc785c] border-[#cc785c]/40 font-bold"
                  : "bg-transparent text-[#8e8b82] border-transparent hover:border-[#e6dfd8] dark:hover:border-[#252320]"
              )}
              title="Toggle Edges"
            >
              Edges
            </button>
            <button
              type="button"
              onClick={() => setShowSafeArea((p) => !p)}
              className={cn(
                "px-2 py-0.5 rounded border transition-colors cursor-pointer",
                showSafeArea
                  ? "bg-[#cc785c]/15 text-[#cc785c] border-[#cc785c]/40 font-bold"
                  : "bg-transparent text-[#8e8b82] border-transparent hover:border-[#e6dfd8] dark:hover:border-[#252320]"
              )}
              title="Toggle Safe Area (Keyboard: S)"
            >
              Safe [S]
            </button>
            <button
              type="button"
              onClick={() => setShowAxes((p) => !p)}
              className={cn(
                "px-2 py-0.5 rounded border transition-colors cursor-pointer",
                showAxes
                  ? "bg-[#cc785c]/15 text-[#cc785c] border-[#cc785c]/40 font-bold"
                  : "bg-transparent text-[#8e8b82] border-transparent hover:border-[#e6dfd8] dark:hover:border-[#252320]"
              )}
              title="Toggle Center Axes"
            >
              Axes
            </button>
            <button
              type="button"
              onClick={() => setShowCentroid((p) => !p)}
              className={cn(
                "px-2 py-0.5 rounded border transition-colors cursor-pointer",
                showCentroid
                  ? "bg-[#cc785c]/15 text-[#cc785c] border-[#cc785c]/40 font-bold"
                  : "bg-transparent text-[#8e8b82] border-transparent hover:border-[#e6dfd8] dark:hover:border-[#252320]"
              )}
              title="Toggle Area Centroid"
            >
              Centroid
            </button>
            <button
              type="button"
              onClick={() => setShowOccupancyOverlay((p) => !p)}
              className={cn(
                "px-2 py-0.5 rounded border transition-colors cursor-pointer ml-auto",
                showOccupancyOverlay
                  ? "bg-[#5db872]/20 text-[#5db872] border-[#5db872]/50 font-bold"
                  : "bg-transparent text-[#8e8b82] border-transparent hover:border-[#e6dfd8] dark:hover:border-[#252320]"
              )}
              title="Toggle Binary Occupancy Overlay (Keyboard: N)"
            >
              Occupancy [N]
            </button>
          </div>

          {/* Interactive 24x24 Stage Plate */}
          <div className="relative my-4 flex items-center justify-center select-none w-full">
            <div
              style={{
                width: `min(${stageSize}px, 86vw)`,
                height: `min(${stageSize}px, 86vw)`,
              }}
              className="relative rounded-lg border border-[#e6dfd8] dark:border-[#252320] bg-[#faf9f5] dark:bg-[#141413] overflow-hidden shadow-inner cursor-crosshair shrink-0"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const xPixel = Math.floor(((e.clientX - rect.left) / rect.width) * 24);
                const yPixel = Math.floor(((e.clientY - rect.top) / rect.height) * 24);
                if (xPixel >= 0 && xPixel < 24 && yPixel >= 0 && yPixel < 24) {
                  setHoveredCell({ x: xPixel, y: yPixel });
                }
              }}
              onMouseLeave={() => setHoveredCell(null)}
            >
              {/* 1-unit fine grid */}
              {showGrid && (
                <div
                  className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-30"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(142,139,130,0.45) 1px, transparent 1px), linear-gradient(to bottom, rgba(142,139,130,0.45) 1px, transparent 1px)",
                    backgroundSize: "4.166667% 4.166667%",
                  }}
                />
              )}

              {/* 4-unit structural major grid */}
              {showGrid && (
                <div
                  className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-50"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(142,139,130,0.8) 1px, transparent 1px), linear-gradient(to bottom, rgba(142,139,130,0.8) 1px, transparent 1px)",
                    backgroundSize: "16.666667% 16.666667%",
                  }}
                />
              )}

              {/* Center Axes (X=12, Y=12) */}
              {showAxes && (
                <>
                  <div
                    className="absolute left-0 right-0 h-[1px] bg-[#cc785c]/60 pointer-events-none"
                    style={{ top: "50%" }}
                  />
                  <div
                    className="absolute top-0 bottom-0 w-[1px] bg-[#cc785c]/60 pointer-events-none"
                    style={{ left: "50%" }}
                  />
                </>
              )}

              {/* Safe Area Boundary (2..22) */}
              {showSafeArea && (
                <div
                  className="absolute border border-dashed border-[#8e8b82]/40 pointer-events-none"
                  style={{
                    top: `${(2 / 24) * 100}%`,
                    left: `${(2 / 24) * 100}%`,
                    width: `${(20 / 24) * 100}%`,
                    height: `${(20 / 24) * 100}%`,
                  }}
                />
              )}

              {/* Computed Bounds Box */}
              {showBounds && (
                <div
                  className="absolute border-2 border-[#cc785c] bg-[#cc785c]/5 pointer-events-none transition-all duration-150"
                  style={{
                    top: `${(pinAnalysis.computedBounds.minY / 24) * 100}%`,
                    left: `${(pinAnalysis.computedBounds.minX / 24) * 100}%`,
                    width: `${(pinAnalysis.dimensions.width / 24) * 100}%`,
                    height: `${(pinAnalysis.dimensions.height / 24) * 100}%`,
                  }}
                />
              )}

              {/* Base Icon SVG */}
              <svg
                viewBox="0 0 24 24"
                className="absolute inset-0 w-full h-full pixel-crisp text-[#141413] dark:text-[#faf9f5] opacity-85 pointer-events-none"
              >
                {icon.paths.map((p, i) => (
                  <path
                    key={i}
                    d={p.d}
                    fill="currentColor"
                    fillRule={p.fillRule}
                    clipRule={p.clipRule}
                  />
                ))}
              </svg>

              {/* Binary Occupancy Cell Overlay */}
              {showOccupancyOverlay && (
                <svg
                  viewBox="0 0 24 24"
                  className="absolute inset-0 w-full h-full pointer-events-none"
                >
                  {pinAnalysis.occupancyMap.map((row, y) =>
                    row.split("").map((ch, x) =>
                      ch === "█" ? (
                        <rect
                          key={`${x}-${y}`}
                          x={x}
                          y={y}
                          width="1"
                          height="1"
                          fill="#5db872"
                          opacity="0.35"
                        />
                      ) : null
                    )
                  )}
                </svg>
              )}

              {/* Highlighted Edge Overlay */}
              {showEdges && activeEdge && (
                <svg
                  viewBox="0 0 24 24"
                  className="absolute inset-0 w-full h-full pointer-events-none"
                >
                  <line
                    x1={activeEdge.start.x}
                    y1={activeEdge.start.y}
                    x2={activeEdge.end.x}
                    y2={activeEdge.end.y}
                    stroke="#cc785c"
                    strokeWidth="0.8"
                    strokeLinecap="square"
                  />
                </svg>
              )}

              {/* Pin Vertices (P0, P1, ...) */}
              {showVertices && (
                <svg
                  viewBox="0 0 24 24"
                  className="absolute inset-0 w-full h-full overflow-visible"
                >
                  {pinAnalysis.vertices.map((v) => {
                    const isSelected = selectedVertex?.index === v.index;
                    const isHovered = hoveredVertex?.index === v.index;
                    const isFocus = isSelected || isHovered;

                    return (
                      <g
                        key={v.index}
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredVertex(v)}
                        onMouseLeave={() => setHoveredVertex(null)}
                        onClick={() => setSelectedVertex(v)}
                      >
                        <circle
                          cx={v.x}
                          cy={v.y}
                          r={isFocus ? 0.9 : 0.45}
                          fill={isFocus ? "#cc785c" : "#141413"}
                          stroke="#faf9f5"
                          strokeWidth={isFocus ? 0.25 : 0.15}
                        />
                        {isFocus && (
                          <text
                            x={v.x}
                            y={v.y - 1.2}
                            textAnchor="middle"
                            fontSize="1.1"
                            fill="#cc785c"
                            fontWeight="bold"
                            fontFamily="monospace"
                          >
                            P{v.index} ({v.x},{v.y})
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>
              )}

              {/* Area Centroid & Bounding Box Center Marker */}
              {showCentroid && (
                <svg
                  viewBox="0 0 24 24"
                  className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                >
                  {/* Bounding box center (circle outline) */}
                  <circle
                    cx={pinAnalysis.center.x}
                    cy={pinAnalysis.center.y}
                    r="0.5"
                    fill="none"
                    stroke="#8e8b82"
                    strokeWidth="0.15"
                  />
                  {/* Filled area centroid (solid dot) */}
                  <circle
                    cx={pinAnalysis.centroid.x}
                    cy={pinAnalysis.centroid.y}
                    r="0.4"
                    fill="#3b82f6"
                    stroke="#fff"
                    strokeWidth="0.15"
                  />
                  {/* Delta vector */}
                  {(pinAnalysis.opticalOffset.dx !== 0 || pinAnalysis.opticalOffset.dy !== 0) && (
                    <line
                      x1={pinAnalysis.center.x}
                      y1={pinAnalysis.center.y}
                      x2={pinAnalysis.centroid.x}
                      y2={pinAnalysis.centroid.y}
                      stroke="#3b82f6"
                      strokeWidth="0.15"
                      strokeDasharray="0.3 0.3"
                    />
                  )}
                </svg>
              )}
            </div>
          </div>

          {/* Stage Coordinates & Status Footer */}
          <div className="w-full pt-2 border-t border-[#e6dfd8] dark:border-[#252320] font-mono text-[11px] flex flex-wrap items-center justify-between text-[#8e8b82]">
            <div className="flex items-center gap-2">
              <span className="text-[#cc785c] font-bold">
                {hoveredCell ? `GRID: (${hoveredCell.x}, ${hoveredCell.y})` : "HOVER GRID TO INSPECT (X,Y)"}
              </span>
              {activeVertex && (
                <span className="text-[#141413] dark:text-[#faf9f5]">
                  · P{activeVertex.index} = ({activeVertex.x}, {activeVertex.y})
                </span>
              )}
              {activeEdge && (
                <span className="text-[#141413] dark:text-[#faf9f5]">
                  · E{activeEdge.index}: ({activeEdge.start.x},{activeEdge.start.y})→({activeEdge.end.x},{activeEdge.end.y}) [{activeEdge.length}u]
                </span>
              )}
            </div>

            <span className="text-[10px] uppercase text-[#8e8b82]">
              Keys: G=Grid B=Bounds V=Pins S=Safe N=Map C=Copy
            </span>
          </div>
        </div>

        {/* Right: Inspection Tables & Primitives Explorer (Section 50-53) */}
        <div className="lg:col-span-6 border border-[#e6dfd8] dark:border-[#252320] rounded-xl bg-white dark:bg-[#181715] overflow-hidden flex flex-col h-[520px]">
          {/* Tabs bar */}
          <div className="px-3 py-2 bg-[#f5f0e8] dark:bg-[#1d1b18] border-b border-[#e6dfd8] dark:border-[#252320] flex items-center justify-between gap-2 font-mono text-xs">
            <div className="flex items-center gap-1 overflow-x-auto workspace-scrollbar">
              <button
                type="button"
                onClick={() => setActiveTab("pins")}
                className={cn(
                  "px-2.5 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer shrink-0",
                  activeTab === "pins"
                    ? "bg-[#cc785c] text-white"
                    : "text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5]"
                )}
              >
                Pin Table ({pinAnalysis.vertices.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("edges")}
                className={cn(
                  "px-2.5 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer shrink-0",
                  activeTab === "edges"
                    ? "bg-[#cc785c] text-white"
                    : "text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5]"
                )}
              >
                Edge Table ({pinAnalysis.edges.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("occupancy")}
                className={cn(
                  "px-2.5 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer shrink-0",
                  activeTab === "occupancy"
                    ? "bg-[#cc785c] text-white"
                    : "text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5]"
                )}
              >
                24×24 Map
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("commands")}
                className={cn(
                  "px-2.5 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer shrink-0",
                  activeTab === "commands"
                    ? "bg-[#cc785c] text-white"
                    : "text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5]"
                )}
              >
                Commands ({analysis.commands.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("primitives")}
                className={cn(
                  "px-2.5 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer shrink-0",
                  activeTab === "primitives"
                    ? "bg-[#cc785c] text-white"
                    : "text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5]"
                )}
              >
                Primitives ({pinAnalysis.primitives.length})
              </button>
            </div>
          </div>

          {/* Tab Content Body */}
          <div className="flex-1 overflow-y-auto workspace-scrollbar p-3 font-mono text-xs">
            {/* 1. Pin Table (Section 52) */}
            {activeTab === "pins" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono text-[11px] text-[#8e8b82] pb-1 border-b border-[#e6dfd8] dark:border-[#252320]">
                  <span>RESOLVED PIN VERTICES (X, Y)</span>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(
                        pinAnalysis.vertices.map((v) => `P${v.index}: (${v.x}, ${v.y})`).join("\n"),
                        "copy-pins"
                      )
                    }
                    className="text-[#cc785c] hover:underline cursor-pointer inline-flex items-center gap-1"
                  >
                    {copiedKey === "copy-pins" ? "Copied!" : "Copy Pins List"}
                  </button>
                </div>

                <div className="border border-[#e6dfd8] dark:border-[#252320] rounded-md overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#f5f0e8]/60 dark:bg-[#201e1b] text-[10px] text-[#8e8b82] uppercase border-b border-[#e6dfd8] dark:border-[#252320]">
                        <th className="p-2">Point</th>
                        <th className="p-2 text-right">X</th>
                        <th className="p-2 text-right">Y</th>
                        <th className="p-2 text-right">Alignment</th>
                        <th className="p-2 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e6dfd8]/60 dark:divide-[#252320]">
                      {pinAnalysis.vertices.map((v) => {
                        const isSelected = selectedVertex?.index === v.index;
                        const isHovered = hoveredVertex?.index === v.index;
                        const isFocus = isSelected || isHovered;

                        return (
                          <tr
                            key={v.index}
                            onMouseEnter={() => setHoveredVertex(v)}
                            onMouseLeave={() => setHoveredVertex(null)}
                            onClick={() => setSelectedVertex(v)}
                            className={cn(
                              "cursor-pointer transition-colors",
                              isFocus
                                ? "bg-[#cc785c]/15 text-[#cc785c] font-semibold"
                                : "hover:bg-[#f5f0e8]/50 dark:hover:bg-[#201e1b] text-[#3d3d3a] dark:text-[#d4d0c8]"
                            )}
                          >
                            <td className="p-2 font-bold">P{v.index}</td>
                            <td className="p-2 text-right">{v.x}</td>
                            <td className="p-2 text-right">{v.y}</td>
                            <td className="p-2 text-right text-[10px] text-[#5db872]">
                              Integer Grid
                            </td>
                            <td className="p-2 text-right">
                              <span className="text-[10px] text-[#8e8b82]">
                                {isFocus ? "Pinned" : "Inspect"}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 2. Edge Table (Section 53) */}
            {activeTab === "edges" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono text-[11px] text-[#8e8b82] pb-1 border-b border-[#e6dfd8] dark:border-[#252320]">
                  <span>RESOLVED EDGES & LENGTHS</span>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(
                        pinAnalysis.edges
                          .map(
                            (e) =>
                              `E${e.index}: (${e.start.x},${e.start.y}) → (${e.end.x},${e.end.y}) [${e.orientation}, ${e.length}u]`
                          )
                          .join("\n"),
                        "copy-edges"
                      )
                    }
                    className="text-[#cc785c] hover:underline cursor-pointer inline-flex items-center gap-1"
                  >
                    {copiedKey === "copy-edges" ? "Copied!" : "Copy Edges List"}
                  </button>
                </div>

                <div className="border border-[#e6dfd8] dark:border-[#252320] rounded-md overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#f5f0e8]/60 dark:bg-[#201e1b] text-[10px] text-[#8e8b82] uppercase border-b border-[#e6dfd8] dark:border-[#252320]">
                        <th className="p-2">Edge</th>
                        <th className="p-2">Start</th>
                        <th className="p-2">End</th>
                        <th className="p-2">Orientation</th>
                        <th className="p-2 text-right">Length</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e6dfd8]/60 dark:divide-[#252320]">
                      {pinAnalysis.edges.map((e) => {
                        const isSelected = selectedEdge?.index === e.index;
                        const isHovered = hoveredEdge?.index === e.index;
                        const isFocus = isSelected || isHovered;

                        return (
                          <tr
                            key={e.index}
                            onMouseEnter={() => setHoveredEdge(e)}
                            onMouseLeave={() => setHoveredEdge(null)}
                            onClick={() => setSelectedEdge(e)}
                            className={cn(
                              "cursor-pointer transition-colors",
                              isFocus
                                ? "bg-[#cc785c]/15 text-[#cc785c] font-semibold"
                                : "hover:bg-[#f5f0e8]/50 dark:hover:bg-[#201e1b] text-[#3d3d3a] dark:text-[#d4d0c8]"
                            )}
                          >
                            <td className="p-2 font-bold">E{e.index}</td>
                            <td className="p-2">
                              ({e.start.x}, {e.start.y})
                            </td>
                            <td className="p-2">
                              ({e.end.x}, {e.end.y})
                            </td>
                            <td className="p-2 text-[10px]">
                              <span
                                className={cn(
                                  "px-1.5 py-0.5 rounded",
                                  e.orientation === "Horizontal"
                                    ? "bg-blue-500/10 text-blue-500"
                                    : e.orientation === "Vertical"
                                    ? "bg-emerald-500/10 text-emerald-500"
                                    : "bg-purple-500/10 text-purple-500"
                                )}
                              >
                                {e.orientation}
                              </span>
                            </td>
                            <td className="p-2 text-right font-bold">{e.length} u</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 3. 24x24 Monospace ASCII Occupancy Map (Section 40) */}
            {activeTab === "occupancy" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono text-[11px] text-[#8e8b82] pb-1 border-b border-[#e6dfd8] dark:border-[#252320]">
                  <span>24×24 BINARY OCCUPANCY MATRIX (· = empty, █ = filled)</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(pinAnalysis.occupancyMap.join("\n"), "copy-ascii")}
                    className="text-[#cc785c] hover:underline cursor-pointer inline-flex items-center gap-1"
                  >
                    {copiedKey === "copy-ascii" ? "Copied!" : "Copy ASCII Grid"}
                  </button>
                </div>

                <div className="p-3 bg-[#faf9f5] dark:bg-[#141413] border border-[#e6dfd8] dark:border-[#252320] rounded-md font-mono text-[11px] leading-[1.1] tracking-widest text-[#141413] dark:text-[#faf9f5] overflow-x-auto whitespace-pre select-all">
                  {pinAnalysis.occupancyMap.join("\n")}
                </div>

                <div className="text-[11px] text-[#8e8b82] font-mono flex items-center justify-between">
                  <span>Occupied Area: {pinAnalysis.occupiedCellCount} cells</span>
                  <span>Density: {pinAnalysis.activeFillPercentage}%</span>
                </div>
              </div>
            )}

            {/* 4. Command Stream */}
            {activeTab === "commands" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono text-[11px] text-[#8e8b82] pb-1 border-b border-[#e6dfd8] dark:border-[#252320]">
                  <span>SVG PATH COMMAND STREAM</span>
                  <span className="text-[#8e8b82] text-[10px]">
                    {analysis.commands.length} commands
                  </span>
                </div>

                <div className="divide-y divide-[#e6dfd8]/60 dark:divide-[#252320] border border-[#e6dfd8] dark:border-[#252320] rounded-md overflow-hidden">
                  {analysis.commands.map((cmd, idx) => {
                    const isHovered = highlightedCmd?.index === cmd.index;
                    return (
                      <div
                        key={idx}
                        onMouseEnter={() => setHighlightedCmd(cmd)}
                        onMouseLeave={() => setHighlightedCmd(null)}
                        className={cn(
                          "px-3 py-2 flex items-center justify-between transition-colors cursor-pointer",
                          isHovered
                            ? "bg-[#cc785c]/10 text-[#cc785c] font-semibold"
                            : "hover:bg-[#f5f0e8]/50 dark:hover:bg-[#201e1b] text-[#3d3d3a] dark:text-[#d4d0c8]"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] text-[#8e8b82] w-6">#{idx + 1}</span>
                          <span className="px-1.5 py-0.5 rounded bg-[#f5f0e8] dark:bg-[#201e1b] border border-[#e6dfd8] dark:border-[#2e2c28] text-[11px] font-bold text-[#cc785c]">
                            {cmd.command}
                          </span>
                          <span className="truncate max-w-[200px] sm:max-w-[280px]">
                            {cmd.args.join(", ")}
                          </span>
                        </div>

                        <span className="text-[10px] text-[#8e8b82] uppercase">
                          {cmd.command.toUpperCase() === "M"
                            ? "Move"
                            : cmd.command.toUpperCase() === "L"
                            ? "Line"
                            : cmd.command.toUpperCase() === "H"
                            ? "H-Line"
                            : cmd.command.toUpperCase() === "V"
                            ? "V-Line"
                            : cmd.command.toUpperCase() === "Z"
                            ? "Close"
                            : "Path"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 5. Primitives Breakdown (Section 34-35) */}
            {activeTab === "primitives" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono text-[11px] text-[#8e8b82] pb-1 border-b border-[#e6dfd8] dark:border-[#252320]">
                  <span>GEOMETRIC PRIMITIVE CLASSIFICATION</span>
                  <span className="text-[#8e8b82] text-[10px]">
                    {pinAnalysis.primitives.length} primitives
                  </span>
                </div>

                <div className="space-y-2">
                  {pinAnalysis.primitives.map((prim, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg border border-[#e6dfd8] dark:border-[#252320] bg-[#faf9f5] dark:bg-[#141413] space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#141413] dark:text-[#faf9f5] capitalize flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#cc785c]" />
                          Primitive #{idx + 1}: {prim.type}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-[#e6dfd8]/50 dark:bg-[#252320] text-[#8e8b82]">
                          {prim.vertexCount} vertices
                        </span>
                      </div>
                      <p className="text-[#8e8b82] text-[11px]">{prim.description}</p>
                      <div className="text-[10px] text-[#8e8b82]">
                        Bounds: ({prim.bounds.minX},{prim.bounds.minY}) → ({prim.bounds.maxX},{prim.bounds.maxY}) [{prim.bounds.width}×{prim.bounds.height}]
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
