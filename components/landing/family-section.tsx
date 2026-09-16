"use client";

import * as React from "react";
import {
  PXIconMessageSquare,
  PXIconCheck,
  PXIconPlus,
  PXIconMinus,
  PXIconEdit,
  PXIconArchive,
} from "@/components/icons";

const FAMILY_VARIANTS = [
  { id: "base", name: "Message", componentName: "PXIconMessageSquare", modifier: "None", desc: "Canonical solid envelope with tailored corner tail" },
  { id: "add", name: "Message Add", componentName: "PXIconMessageSquareAdd", modifier: "Plus (+)", desc: "Shared silhouette with modular 8x8 bottom-right insert" },
  { id: "check", name: "Message Check", componentName: "PXIconMessageSquareCheck", modifier: "Check (✓)", desc: "State confirmation badge inset into canonical base" },
  { id: "edit", name: "Message Edit", componentName: "PXIconMessageSquareEdit", modifier: "Pencil (✎)", desc: "Drafting modification state within integer bounds" },
  { id: "remove", name: "Message Minus", componentName: "PXIconMessageSquareMinus", modifier: "Minus (-)", desc: "Suppression state with integer cut module" },
];

export function FamilySection() {
  const [activeVariant, setActiveVariant] = React.useState(FAMILY_VARIANTS[0]);

  return (
    <section id="families" className="py-20 md:py-28 border-b border-border/80 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl space-y-12">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight text-foreground">
            One language. <br />
            Thousands of <span className="text-primary italic">symbols</span>.
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-sans leading-relaxed">
            Rather than drawing thousands of unrelated symbols, PXUI builds modular semantic families.
            State and action modifiers attach deterministically into the lower-right module of the shared 24×24 envelope without geometry collision.
          </p>
        </div>

        {/* Family Tree Architectural Demonstration Card */}
        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-md grid grid-cols-1 lg:grid-cols-12">
          {/* Left: Interactive Family Silhouette Stage */}
          <div className="lg:col-span-6 p-8 border-b lg:border-b-0 lg:border-r border-border bg-background flex flex-col items-center justify-center relative">
            <div className="w-56 h-56 rounded-xl border border-border bg-surface-soft/60 flex items-center justify-center relative shadow-inner">
              {/* Canonical 24x24 grid lines */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, currentColor 1px, transparent 1px),
                    linear-gradient(to bottom, currentColor 1px, transparent 1px)
                  `,
                  backgroundSize: "16px 16px",
                }}
              />

              {/* Base icon silhouette */}
              <div className="relative z-10 text-foreground">
                <PXIconMessageSquare size={112} filled />
              </div>

              {/* Modular modifier overlay badge */}
              {activeVariant.id !== "base" && (
                <div className="absolute bottom-6 right-6 w-14 h-14 rounded-md bg-primary text-primary-foreground border-2 border-background flex items-center justify-center shadow-lg z-20 transition-all">
                  {activeVariant.id === "add" && <PXIconPlus size={24} />}
                  {activeVariant.id === "check" && <PXIconCheck size={24} />}
                  {activeVariant.id === "edit" && <PXIconEdit size={24} />}
                  {activeVariant.id === "remove" && <PXIconMinus size={24} />}
                </div>
              )}
            </div>

            <div className="mt-4 text-center font-mono text-xs">
              <span className="text-foreground font-bold">{activeVariant.componentName}</span>
              <span className="text-muted-foreground block text-[11px] mt-0.5">
                Modifier: {activeVariant.modifier} · 24×24 integer safe
              </span>
            </div>
          </div>

          {/* Right: Family Tree Variant Explorer */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-4 font-mono">
            <div className="space-y-1 border-b border-border pb-3">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">
                FAMILY TREE HIERARCHY
              </span>
              <h3 className="text-sm font-bold text-foreground font-sans">
                Message Family (5 Variants)
              </h3>
            </div>

            {/* Interactive Tree List */}
            <div className="space-y-2">
              {FAMILY_VARIANTS.map((v) => {
                const isActive = v.id === activeVariant.id;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setActiveVariant(v)}
                    className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between text-xs ${
                      isActive
                        ? "bg-surface-soft border-primary text-foreground shadow-2xs font-semibold"
                        : "bg-background border-border text-muted-foreground hover:text-foreground hover:border-border/80"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-primary font-bold">{isActive ? "▶" : "•"}</span>
                      <div>
                        <span className="text-foreground font-sans font-medium block">{v.name}</span>
                        <span className="text-[10px] text-muted-foreground">{v.componentName}</span>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-card border border-border">
                      {v.modifier}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 text-[11px] font-sans text-muted-foreground leading-relaxed">
              Family-first design guarantees that when an action state updates in user code (e.g. from idle message to pending or confirmed), the icon maintains identical optical center-of-gravity without visual jumping.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
