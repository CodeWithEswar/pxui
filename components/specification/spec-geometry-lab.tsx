"use client";

import * as React from "react";
import { IconDefinition } from "@/lib/icons/schema";
import { GeometryAnalysis, PathCommand } from "@/lib/geometry/path-analysis";
import { cn } from "@/lib/utils";

interface SpecGeometryLabProps {
  icon: IconDefinition;
  analysis: GeometryAnalysis;
}

export function SpecGeometryLab({ icon, analysis }: SpecGeometryLabProps) {
  const [highlightedCmd, setHighlightedCmd] = React.useState<PathCommand | null>(null);

  return (
    <section id="geometry" className="scroll-mt-24 space-y-6">
      <div className="space-y-1">
        <h2 className="font-sans text-2xl font-bold tracking-tight text-[#141413] dark:text-[#faf9f5]">
          Geometry Lab
        </h2>
        <p className="font-mono text-xs text-[#8e8b82]">
          Canonical 24×24 construction, optical alignment, and primitive token inspection.
        </p>
      </div>

      {/* Geometry Metrics Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
        <div className="p-3 rounded-lg border border-[#e6dfd8] dark:border-[#252320] bg-white dark:bg-[#181715]">
          <span className="text-[10px] text-[#8e8b82] uppercase block">GRID BOUNDS</span>
          <div className="font-bold text-sm text-[#141413] dark:text-[#faf9f5] mt-0.5">
            {analysis.bounds.width} × {analysis.bounds.height}
          </div>
          <span className="text-[10px] text-[#8e8b82] mt-1 block">
            X:[{analysis.bounds.minX}..{analysis.bounds.maxX}] Y:[{analysis.bounds.minY}..{analysis.bounds.maxY}]
          </span>
        </div>

        <div className="p-3 rounded-lg border border-[#e6dfd8] dark:border-[#252320] bg-white dark:bg-[#181715]">
          <span className="text-[10px] text-[#8e8b82] uppercase block">OPTICAL CENTER</span>
          <div className="font-bold text-sm text-[#141413] dark:text-[#faf9f5] mt-0.5">
            {analysis.center.x} / {analysis.center.y}
          </div>
          <span className="text-[10px] text-[#8e8b82] mt-1 block">
            Δ {analysis.opticalCorrection.x}x · {analysis.opticalCorrection.y}y
          </span>
        </div>

        <div className="p-3 rounded-lg border border-[#e6dfd8] dark:border-[#252320] bg-white dark:bg-[#181715]">
          <span className="text-[10px] text-[#8e8b82] uppercase block">OCCUPIED CELLS</span>
          <div className="font-bold text-sm text-[#141413] dark:text-[#faf9f5] mt-0.5">
            {analysis.occupiedCellCount} cells
          </div>
          <span className="text-[10px] text-[#8e8b82] mt-1 block">
            {Math.round((analysis.occupiedCellCount / 576) * 100)}% active fill
          </span>
        </div>

        <div className="p-3 rounded-lg border border-[#e6dfd8] dark:border-[#252320] bg-white dark:bg-[#181715]">
          <span className="text-[10px] text-[#8e8b82] uppercase block">PATH PRIMITIVES</span>
          <div className="font-bold text-sm text-[#141413] dark:text-[#faf9f5] mt-0.5">
            {analysis.commands.length} commands
          </div>
          <span className="text-[10px] text-[#8e8b82] mt-1 block">
            {analysis.segmentCount} segments · {icon.paths.length} subpaths
          </span>
        </div>
      </div>

      {/* Interactive Primitives & Coordinate Token Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Primitives Command List */}
        <div className="lg:col-span-7 border border-[#e6dfd8] dark:border-[#252320] rounded-lg bg-white dark:bg-[#181715] overflow-hidden">
          <div className="px-4 py-2.5 bg-[#f5f0e8] dark:bg-[#1d1b18] border-b border-[#e6dfd8] dark:border-[#252320] flex items-center justify-between font-mono text-xs">
            <span className="font-bold text-[#141413] dark:text-[#faf9f5] text-[11px] uppercase tracking-wider">
              PRIMITIVE COMMAND STREAM
            </span>
            <span className="text-[#8e8b82] text-[10px]">
              Hover command to inspect
            </span>
          </div>

          <div className="max-h-[300px] overflow-y-auto workspace-scrollbar divide-y divide-[#e6dfd8]/60 dark:divide-[#252320] font-mono text-xs">
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
                    <span className="truncate max-w-[280px] sm:max-w-[360px]">
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
                      : cmd.command.toUpperCase() === "C"
                      ? "Cubic"
                      : cmd.command.toUpperCase() === "Z"
                      ? "Close"
                      : "Path"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Interactive Geometry Stage with Coordinate Overlay */}
        <div className="lg:col-span-5 border border-[#e6dfd8] dark:border-[#252320] rounded-lg bg-[#faf9f5] dark:bg-[#141413] p-4 flex flex-col items-center justify-between h-full min-h-[350px]">
          <div className="w-full flex items-center justify-between font-mono text-[10px] text-[#8e8b82] pb-2 border-b border-[#e6dfd8] dark:border-[#252320]">
            <span>GEOMETRY PROJECTION</span>
            <span>24 × 24 CANONICAL</span>
          </div>

          {/* 24x24 Stage */}
          <div className="relative w-48 h-48 my-4 flex items-center justify-center">
            {/* Grid */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(142,139,130,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(142,139,130,0.4) 1px, transparent 1px)",
                backgroundSize: "4.166667% 4.166667%",
              }}
            />

            {/* Base Icon SVG */}
            <svg
              viewBox="0 0 24 24"
              width="192"
              height="192"
              className="pixel-crisp text-[#141413] dark:text-[#faf9f5] opacity-70"
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

            {/* Command Highlight Overlay */}
            {highlightedCmd && (
              <div className="absolute inset-0 pointer-events-none">
                <svg viewBox="0 0 24 24" width="192" height="192" className="overflow-visible">
                  {highlightedCmd.args.length >= 2 && (
                    <circle
                      cx={highlightedCmd.args[highlightedCmd.args.length - 2]}
                      cy={highlightedCmd.args[highlightedCmd.args.length - 1]}
                      r="0.8"
                      fill="#cc785c"
                      stroke="#fff"
                      strokeWidth="0.2"
                    />
                  )}
                </svg>
              </div>
            )}
          </div>

          <div className="w-full pt-2 border-t border-[#e6dfd8] dark:border-[#252320] font-mono text-[10px] text-[#8e8b82] flex items-center justify-between">
            <span>
              {highlightedCmd
                ? `ACTIVE CMD: ${highlightedCmd.raw}`
                : "HOVER A COMMAND TO HIGHLIGHT"}
            </span>
            <span className="text-[#cc785c] font-bold">GRID COMPLIANT</span>
          </div>
        </div>
      </div>
    </section>
  );
}
