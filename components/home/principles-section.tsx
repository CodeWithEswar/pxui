"use client";

import * as React from "react";
import {
  PXIconSliders,
  PXIconTerminal,
  PXIconZap,
  PXIconShieldCheck,
  PXIconArchive,
  PXIconSmartphone,
} from "@/components/icons";

export function PrinciplesSection() {
  const principles = [
    {
      icon: PXIconSliders,
      title: "Pixel Precision",
      description:
        "Strict 24×24 canonical integer grid. Stepped diagonals and deliberate optical balance preserve crisp silhouettes without fuzzy vector interpolation.",
    },
    {
      icon: PXIconTerminal,
      title: "shadcn Registry Native",
      description:
        "Every icon is served via official shadcn registry JSON. Zero external icon packages; install directly into your codebase with one CLI command.",
    },
    {
      icon: PXIconZap,
      title: "Motion with Purpose",
      description:
        "Static by default. Animations are discrete stepped transitions (CSS steps()) that preserve the pixel aesthetic while respecting prefers-reduced-motion.",
    },
    {
      icon: PXIconSmartphone,
      title: "Web & React Native Parity",
      description:
        "One canonical icon definition compiles to both Web React components and React Native Svg implementations without duplicate maintenance.",
    },
    {
      icon: PXIconArchive,
      title: "Tree-Shakeable Architecture",
      description:
        "Standalone components ensure your production bundle only ships the exact icons imported by your application. No monolithic bundle leaks.",
    },
    {
      icon: PXIconShieldCheck,
      title: "Accessible Contract",
      description:
        "Accessible by default. Purely decorative icons are marked aria-hidden='true', while meaningful icons accept semantic labels and title tags.",
    },
  ];

  return (
    <section id="principles" className="py-20 border-b border-border bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-border bg-card rounded-full font-mono text-xs text-foreground shadow-2xs">
            <span>Foundational Engineering Standards</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-serif font-normal tracking-tight text-foreground">
            Built for precision, consistency, and scale.
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto font-sans leading-relaxed">
            Constructed with uncompromising attention to visual balance, integer coordinate precision, and production runtime performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {principles.map((p, idx) => {
            const IconComp = p.icon;
            return (
              <div
                key={idx}
                className="p-6 border border-border bg-card rounded-lg space-y-3.5 shadow-2xs hover:border-foreground/30 transition-all"
              >
                <div className="w-9 h-9 border border-border bg-background rounded-md flex items-center justify-center text-primary shadow-2xs">
                  <IconComp size={16} />
                </div>
                <h3 className="font-sans text-sm font-semibold text-foreground">
                  {p.title}
                </h3>
                <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
