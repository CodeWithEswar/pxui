"use client";

import * as React from "react";
import {
  PXIconHeart,
  PXIconStar,
  PXIconBookmark,
  PXIconBell,
  PXIconShieldCheck,
  PXIconUser,
  PXIconSparkles,
} from "@/components/icons";

const FILLED_SPECIMENS = [
  { name: "heart", component: PXIconHeart, title: "Heart", category: "Social", desc: "Solid central mass with stepped lobe curves" },
  { name: "star", component: PXIconStar, title: "Star", category: "Actions", desc: "Balanced 5-point geometry on 24x24 envelope" },
  { name: "bookmark", component: PXIconBookmark, title: "Bookmark", category: "Content", desc: "Clean solid ribbon with exact 90° notch cut" },
  { name: "bell", component: PXIconBell, title: "Bell", category: "Alerts", desc: "Weighted body with decoupled clapper module" },
  { name: "shield-check", component: PXIconShieldCheck, title: "Shield Check", category: "Security", desc: "Reinforced crest perimeter with positive check inset" },
  { name: "user", component: PXIconUser, title: "User", category: "People", desc: "Proportional head module over solid shoulder arch" },
];

export function FilledLanguageSection() {
  const [hoveredIdx, setHoveredIdx] = React.useState<number | null>(null);

  return (
    <section id="filled" className="py-20 md:py-28 border-b border-border/80 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl space-y-12">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight text-foreground">
            Designed to read <span className="text-primary italic">instantly</span>.
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-sans leading-relaxed">
            PXUI icons are built from solid mass with precise pixel cuts.
            Unlike thin hairline wireframes that dissolve into background noise, our filled language guarantees immediate semantic recognition and optical weight at any size.
          </p>
        </div>

        {/* Specimen Showcase Grid (6 Curated Solid Icons) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FILLED_SPECIMENS.map((specimen, idx) => {
            const Icon = specimen.component;
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={specimen.name}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`p-6 rounded-xl border bg-card transition-all duration-200 shadow-2xs flex flex-col justify-between gap-6 group cursor-pointer ${
                  isHovered ? "border-primary/60 shadow-md translate-y-[-2px]" : "border-border hover:border-border/80"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="w-16 h-16 rounded-lg bg-background border border-border flex items-center justify-center text-foreground group-hover:text-primary transition-colors shadow-inner">
                    <Icon size={36} filled className="transition-transform group-hover:scale-110" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground px-2 py-0.5 rounded bg-surface-soft border border-border">
                    {specimen.category}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-foreground font-sans">
                      {specimen.title}
                    </h3>
                    <span className="font-mono text-[11px] text-muted-foreground">
                      px-{specimen.name}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                    {specimen.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-border flex items-center justify-between font-mono text-[10px] text-muted-foreground">
                  <span>CANONICAL: FILLED</span>
                  <span className={isHovered ? "text-primary font-semibold" : ""}>
                    {isHovered ? "24×24 ACTIVE" : "24×24 SAFE"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
