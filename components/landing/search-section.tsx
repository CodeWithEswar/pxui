"use client";

import * as React from "react";
import {
  PXIconSearch,
  PXIconCalendar,
  PXIconTrash,
  PXIconHeart,
  PXIconSettings,
} from "@/components/icons";

const SEARCH_DEMOS = [
  {
    query: "appointment",
    canonical: "calendar",
    component: "PXIconCalendar",
    componentIcon: PXIconCalendar,
    matchedAlias: "appointment",
    tags: ["date", "event", "schedule", "time"],
  },
  {
    query: "magnifier",
    canonical: "search",
    component: "PXIconSearch",
    componentIcon: PXIconSearch,
    matchedAlias: "magnifier",
    tags: ["find", "lookup", "explore", "query"],
  },
  {
    query: "bin",
    canonical: "trash",
    component: "PXIconTrash",
    componentIcon: PXIconTrash,
    matchedAlias: "bin",
    tags: ["delete", "remove", "garbage", "discard"],
  },
  {
    query: "like",
    canonical: "heart",
    component: "PXIconHeart",
    componentIcon: PXIconHeart,
    matchedAlias: "like",
    tags: ["love", "favorite", "react", "social"],
  },
  {
    query: "gear",
    canonical: "settings",
    component: "PXIconSettings",
    componentIcon: PXIconSettings,
    matchedAlias: "gear",
    tags: ["preferences", "options", "configure", "admin"],
  },
];

export function SearchSection() {
  const [activeIdx, setActiveIdx] = React.useState(0);
  const activeDemo = SEARCH_DEMOS[activeIdx];
  const ActiveIcon = activeDemo.componentIcon;

  return (
    <section id="search-experience" className="py-20 md:py-28 border-b border-border/80 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl space-y-12">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight text-foreground">
            Find the concept, <br />
            not just the <span className="text-primary italic">name</span>.
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-sans leading-relaxed">
            Every symbol is indexed with synonyms, developer jargon, and contextual aliases.
            Search for how you think—PXUI maps intuitive vocabulary directly to canonical component exports.
          </p>
        </div>

        {/* Interactive Search Demonstrator Card */}
        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-md grid grid-cols-1 lg:grid-cols-12">
          {/* Left: Simulated Search Input & Query Chips */}
          <div className="lg:col-span-6 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-border bg-background space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider block">
                Simulated Search Query
              </span>
              <div className="relative flex items-center">
                <PXIconSearch size={16} className="absolute left-3 text-primary" />
                <input
                  type="text"
                  readOnly
                  value={activeDemo.query}
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-card font-mono text-sm text-foreground shadow-inner focus:outline-none"
                />
              </div>
            </div>

            {/* Query Chips */}
            <div className="space-y-2">
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider block">
                Try Semantic Queries:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {SEARCH_DEMOS.map((demo, idx) => (
                  <button
                    key={demo.query}
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    className={`px-3 py-1.5 rounded-md font-mono text-xs transition-all ${
                      idx === activeIdx
                        ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                        : "bg-surface-soft hover:bg-surface-card border border-border text-foreground"
                    }`}
                  >
                    &quot;{demo.query}&quot;
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3.5 bg-surface-soft border border-border rounded-lg text-xs font-sans text-muted-foreground leading-relaxed">
              Query is evaluated against canonical names, categories, primary aliases, and tag arrays simultaneously in memory without network latency.
            </div>
          </div>

          {/* Right: Resolved Metadata & Icon Match Result */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                  RESOLVED CANONICAL MATCH
                </span>
                <span className="font-mono text-[10px] text-[#5db872] font-semibold">
                  100% CONFIDENCE
                </span>
              </div>

              {/* Match Result Display */}
              <div className="p-4 rounded-lg border border-border bg-background flex items-center gap-4 shadow-2xs">
                <div className="w-14 h-14 rounded-lg bg-surface-soft border border-border flex items-center justify-center text-primary shadow-inner">
                  <ActiveIcon size={32} />
                </div>
                <div className="space-y-0.5">
                  <span className="font-mono text-sm font-bold text-foreground">
                    {activeDemo.component}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground block">
                    px-{activeDemo.canonical}
                  </span>
                </div>
              </div>

              {/* Matched Alias & Associated Tags */}
              <div className="space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between p-2 bg-primary/10 border border-primary/30 rounded text-primary">
                  <span>MATCHED ALIAS:</span>
                  <span className="font-bold">#{activeDemo.matchedAlias}</span>
                </div>

                <div className="space-y-1 pt-1">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">
                    Associated Vocabulary:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {activeDemo.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-[10px] rounded bg-background border border-border text-foreground"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-border font-mono text-[11px] text-muted-foreground flex justify-between">
              <span>INDEX: packages/metadata/</span>
              <span>SCHEMA: v1.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
