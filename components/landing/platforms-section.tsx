"use client";

import * as React from "react";
import {
  PXIconCpu,
  PXIconMonitor,
  PXIconSmartphone,
  PXIconFileCode,
  PXIconDatabase,
  PXIconShieldCheck,
} from "@/components/icons";

const PLATFORMS = [
  {
    name: "React (Web)",
    pkg: "@pxui/react",
    icon: PXIconMonitor,
    desc: "Tree-shakeable React 19 / 18 components with full TypeScript props and SVG vector rendering.",
    tag: "WEB",
  },
  {
    name: "React Native",
    pkg: "@pxui/react-native",
    icon: PXIconSmartphone,
    desc: "Compiled directly to react-native-svg with identical path geometry and mobile property parity.",
    tag: "MOBILE",
  },
  {
    name: "Optimized SVG",
    pkg: "@pxui/svg",
    icon: PXIconFileCode,
    desc: "Clean, standardized SVG files with crisp integer coordinates for Astro, Svelte, Vue, or Figma.",
    tag: "RAW",
  },
  {
    name: "shadcn Registry",
    pkg: "@pxui/registry",
    icon: PXIconDatabase,
    desc: "Deterministic JSON schema endpoints for seamless installation via official shadcn CLI.",
    tag: "DISTRIBUTION",
  },
];

export function PlatformsSection() {
  return (
    <section id="platforms" className="py-20 md:py-28 border-b border-border/80 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl space-y-12">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight text-foreground">
            One source. <br />
            Every <span className="text-primary italic">target</span>.
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-sans leading-relaxed">
            One canonical icon definition compiles deterministically to Web React, React Native, raw SVG, and Registry packages. Zero manual duplication, zero divergence.
          </p>
        </div>

        {/* Compiler Branching Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PLATFORMS.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.pkg}
                className="p-6 rounded-xl border border-border bg-card flex flex-col justify-between gap-6 shadow-2xs hover:border-primary/50 transition-all group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center text-primary shadow-2xs group-hover:scale-105 transition-transform">
                      <Icon size={20} />
                    </div>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-surface-soft border border-border text-muted-foreground">
                      {p.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-foreground font-sans">
                      {p.name}
                    </h3>
                    <span className="font-mono text-xs text-primary block mt-0.5">
                      {p.pkg}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-border flex items-center gap-1.5 font-mono text-[10px] text-[#5db872]">
                  <PXIconShieldCheck size={12} />
                  <span>Contract verified</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Monorepo Architecture Footnote */}
        <div className="p-4 rounded-lg border border-border bg-background flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span>Monorepo Pipeline: Canonical Icon → Geometry QA → Compiler → 5 Target Packages</span>
          </div>
          <span className="text-foreground font-semibold">24/24 Automated Contract Tests Passing</span>
        </div>
      </div>
    </section>
  );
}
