"use client";

import * as React from "react";
import { PXIconTerminal } from "@/components/icons";
import { cn } from "@/lib/utils";

interface ReleaseEntry {
  version: string;
  date: string;
  tagline: string;
  groups: {
    title: string;
    badge: "new" | "refined" | "motion" | "registry" | "package";
    items: string[];
  }[];
}

const RELEASES: ReleaseEntry[] = [
  {
    version: "1.1.0",
    date: "September 2026",
    tagline: "Stepped animation sequencer, full-window specification lab, and developer playground.",
    groups: [
      {
        title: "NEW SURFACES",
        badge: "new",
        items: [
          "Full-Window Icon Specification workspace at /icons/[name] with geometry lab and token inspection.",
          "Interactive Developer Playground at /playground with contextual UI previews (button, input, nav, toolbar, badge).",
          "Dedicated Motion discovery surface at /animated with frame timeline scrubber.",
          "Brand marks catalog at /brands with trademark provenance guidelines.",
        ],
      },
      {
        title: "ANIMATION ENGINE",
        badge: "motion",
        items: [
          "Discrete 5-frame stepped poses for refresh, bell, download, heart, and loader.",
          "Dual dark/light preview stages with OS-level prefers-reduced-motion overrides.",
        ],
      },
      {
        title: "REGISTRY & DISTRIBUTION",
        badge: "registry",
        items: [
          "Interactive Registry Explorer with raw JSON artifact inspection.",
          "Dedicated /registry documentation and copyable shadcn CLI commands.",
        ],
      },
    ],
  },
  {
    version: "1.0.0",
    date: "August 2026",
    tagline: "Foundational release of the PXUI pixel-native design system and multi-target compiler.",
    groups: [
      {
        title: "FOUNDATIONAL CATALOG",
        badge: "new",
        items: [
          "100 reference icons authored strictly on the 24×24 integer coordinate space.",
          "16 core categories spanning Actions, Navigation, Files, Communication, and Hardware.",
        ],
      },
      {
        title: "PACKAGES & COMPILER",
        badge: "package",
        items: [
          "Multi-target compiler generating @pxui/react, @pxui/react-native, and pure SVG output.",
          "Automated shadcn Registry JSON generation with zero runtime dependencies.",
          "Rigorous 37-gate CI test suite enforcing geometric bounds and byte-level determinism.",
        ],
      },
    ],
  },
];

const FILTERS = ["All", "Icons", "Animations", "Packages", "Registry"] as const;

export function ChangelogFeed() {
  const [activeFilter, setActiveFilter] = React.useState<(typeof FILTERS)[number]>("All");

  const badgeStyles = {
    new: "bg-[#5db872]/15 text-[#5db872] border-[#5db872]/30",
    refined: "bg-[#79c0ff]/15 text-[#79c0ff] border-[#79c0ff]/30",
    motion: "bg-[#cc785c]/15 text-[#cc785c] border-[#cc785c]/30",
    registry: "bg-[#e5c07b]/15 text-[#e5c07b] border-[#e5c07b]/30",
    package: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30",
  };

  return (
    <div className="space-y-12 py-8 select-none max-w-4xl">
      {/* Header */}
      <section className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#cc785c]/10 text-[#cc785c] font-mono text-xs font-bold uppercase tracking-wider border border-[#cc785c]/20">
          <PXIconTerminal size={14} />
          <span>RELEASE HISTORY</span>
        </div>

        <h1 className="font-sans text-4xl sm:text-5xl font-bold tracking-tight text-[#141413] dark:text-[#faf9f5]">
          Changelog
        </h1>

        <p className="font-sans text-base sm:text-lg text-[#6c6a64] dark:text-[#8e8b82] leading-relaxed">
          Track additions, optical refinements, animation expansions, and compiler enhancements across PXUI releases.
        </p>

        {/* Filters */}
        <div className="flex items-center gap-1.5 pt-2 font-mono text-xs overflow-x-auto workspace-scrollbar">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActiveFilter(f)}
              className={cn(
                "px-3 py-1.5 rounded-lg border transition-all cursor-pointer",
                activeFilter === f
                  ? "bg-[#cc785c] text-white border-[#cc785c] font-bold shadow-xs"
                  : "bg-white dark:bg-[#181715] border-[#e6dfd8] dark:border-[#252320] text-[#6c6a64] dark:text-[#8e8b82] hover:text-foreground"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* Timeline Feed */}
      <section className="space-y-10">
        {RELEASES.map((rel) => (
          <div
            key={rel.version}
            className="rounded-2xl border border-[#e6dfd8] dark:border-[#2e2c28] bg-white dark:bg-[#181715] p-6 sm:p-8 space-y-6 shadow-xs"
          >
            {/* Version Header */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#e6dfd8] dark:border-[#2e2c28] pb-4">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-2xl font-bold text-[#cc785c]">
                  v{rel.version}
                </span>
                <span className="font-mono text-xs text-[#8e8b82]">{rel.date}</span>
              </div>
              <span className="font-sans text-xs text-[#8e8b82]">{rel.tagline}</span>
            </div>

            {/* Impact Groups */}
            <div className="space-y-6 font-mono text-xs">
              {rel.groups.map((group) => (
                <div key={group.title} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "px-1.5 py-0.5 rounded text-[10px] uppercase font-bold border",
                        badgeStyles[group.badge]
                      )}
                    >
                      {group.title}
                    </span>
                  </div>

                  <ul className="space-y-1.5 pl-2">
                    {group.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 font-sans text-xs sm:text-sm text-[#3d3d3a] dark:text-[#d4d0c8] leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 rounded-xs bg-[#cc785c] mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
