"use client";

import * as React from "react";
import {
  PXIconSearch,
  PXIconBell,
  PXIconCheck,
  PXIconShieldCheck,
} from "@/components/icons";

const SIZES = [16, 20, 24, 32, 48] as const;

export function QualitySection() {
  const [activeIcon, setActiveIcon] = React.useState<"search" | "bell">("search");
  const ActiveIcon = activeIcon === "search" ? PXIconSearch : PXIconBell;

  return (
    <section id="quality" className="py-20 md:py-28 border-b border-border/80 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl space-y-12">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight text-foreground">
            Designed at <span className="text-primary italic">every</span> size.
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-sans leading-relaxed">
            Most icon libraries only test at a single scale.
            PXUI geometry is tested across standard interface scales to guarantee that stepped diagonals and corner radii remain optically crisp at 16, 20, 24, 32, and 48px.
          </p>
        </div>

        {/* Multi-Scale Specimen Strip Card */}
        <div className="rounded-xl border border-border bg-card p-6 sm:p-10 space-y-8 shadow-md">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
              Simultaneous Scale Validation Strip
            </span>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => setActiveIcon("search")}
                className={`px-3 py-1 text-xs font-mono rounded-sm transition-all ${
                  activeIcon === "search"
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "bg-surface-soft hover:bg-surface-card text-foreground"
                }`}
              >
                PXIconSearch
              </button>
              <button
                type="button"
                onClick={() => setActiveIcon("bell")}
                className={`px-3 py-1 text-xs font-mono rounded-sm transition-all ${
                  activeIcon === "bell"
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "bg-surface-soft hover:bg-surface-card text-foreground"
                }`}
              >
                PXIconBell
              </button>
            </div>
          </div>

          {/* Scale Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 items-end justify-center py-4">
            {SIZES.map((size) => (
              <div
                key={size}
                className="flex flex-col items-center gap-3 p-4 rounded-lg bg-background border border-border/80 shadow-2xs group hover:border-primary/50 transition-colors"
              >
                <div className="h-14 flex items-center justify-center text-foreground group-hover:text-primary transition-colors">
                  <ActiveIcon size={size} />
                </div>
                <div className="text-center font-mono space-y-0.5">
                  <span className="text-sm font-bold text-foreground block">{size}px</span>
                  <span className="text-[10px] text-muted-foreground block uppercase">
                    {size === 24 ? "Native Canonical" : `${size}×${size} scale`}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* QA Engineering Assertions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border font-mono text-xs">
            <div className="p-3 bg-surface-soft rounded-lg border border-border flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-[#5db872]/20 text-[#5db872] flex items-center justify-center shrink-0">
                <PXIconCheck size={12} />
              </div>
              <div>
                <span className="font-bold text-foreground block text-[11px]">GRID SAFE</span>
                <span className="text-[10px] text-muted-foreground">Aligned to integer pixel boundaries</span>
              </div>
            </div>

            <div className="p-3 bg-surface-soft rounded-lg border border-border flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-[#5db872]/20 text-[#5db872] flex items-center justify-center shrink-0">
                <PXIconCheck size={12} />
              </div>
              <div>
                <span className="font-bold text-foreground block text-[11px]">OPTICALLY BALANCED</span>
                <span className="text-[10px] text-muted-foreground">Zero sub-pixel anti-aliasing blur</span>
              </div>
            </div>

            <div className="p-3 bg-surface-soft rounded-lg border border-border flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-[#5db872]/20 text-[#5db872] flex items-center justify-center shrink-0">
                <PXIconCheck size={12} />
              </div>
              <div>
                <span className="font-bold text-foreground block text-[11px]">FAMILY VALIDATED</span>
                <span className="text-[10px] text-muted-foreground">Consistent stroke weight and mass</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
