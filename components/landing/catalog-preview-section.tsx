"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  PXIconArrowLeft,
  PXIconArrowRight,
  PXIconArrowUp,
  PXIconCompass,
  PXIconTerminal,
  PXIconCode,
  PXIconGitBranch,
  PXIconDatabase,
  PXIconMail,
  PXIconMessageSquare,
  PXIconBell,
  PXIconShare,
  PXIconShoppingCart,
  PXIconCreditCard,
  PXIconShield,
  PXIconLock,
  PXIconSliders,
} from "@/components/icons";

const CATEGORY_STRIPS = [
  {
    category: "Navigation & Directional",
    icons: [
      { name: "Arrow Left", comp: PXIconArrowLeft, id: "arrow-left" },
      { name: "Arrow Right", comp: PXIconArrowRight, id: "arrow-right" },
      { name: "Arrow Up", comp: PXIconArrowUp, id: "arrow-up" },
      { name: "Compass", comp: PXIconCompass, id: "compass" },
    ],
  },
  {
    category: "Development & Systems",
    icons: [
      { name: "Terminal", comp: PXIconTerminal, id: "terminal" },
      { name: "Code", comp: PXIconCode, id: "code" },
      { name: "Git Branch", comp: PXIconGitBranch, id: "git-branch" },
      { name: "Database", comp: PXIconDatabase, id: "database" },
    ],
  },
  {
    category: "Communication & Alerts",
    icons: [
      { name: "Mail", comp: PXIconMail, id: "mail" },
      { name: "Message", comp: PXIconMessageSquare, id: "message-square" },
      { name: "Notification", comp: PXIconBell, id: "bell" },
      { name: "Share", comp: PXIconShare, id: "share" },
    ],
  },
  {
    category: "Security & Commerce",
    icons: [
      { name: "Shield", comp: PXIconShield, id: "shield" },
      { name: "Lock", comp: PXIconLock, id: "lock" },
      { name: "Cart", comp: PXIconShoppingCart, id: "shopping-cart" },
      { name: "Card", comp: PXIconCreditCard, id: "credit-card" },
    ],
  },
];

export function CatalogPreviewSection() {
  return (
    <section id="catalog-preview" className="py-20 md:py-28 border-b border-border/80 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight text-foreground">
              Built to <span className="text-primary italic">scale</span>.
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground font-sans leading-relaxed">
              Designed for 5,000+ icons spanning 20 structured collections and 29 fine-grained canonical categories.
              The full catalog lives in the dedicated 3-column workspace.
            </p>
          </div>

          <Link href="/icons">
            <Button
              size="default"
              className="h-11 px-6 rounded-md font-sans text-sm font-medium bg-primary text-primary-foreground hover:bg-[#a9583e] active:bg-[#8e432d] shadow-2xs gap-2 shrink-0"
            >
              <span>Explore All Icons</span>
              <PXIconArrowRight size={16} />
            </Button>
          </Link>
        </div>

        {/* Staggered Technical Specimen Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORY_STRIPS.map((strip) => (
            <div
              key={strip.category}
              className="p-5 rounded-xl border border-border bg-card space-y-4 shadow-2xs"
            >
              <div className="border-b border-border pb-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block">
                  {strip.category}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {strip.icons.map((item) => {
                  const Icon = item.comp;
                  return (
                    <Link
                      key={item.id}
                      href={`/icons?icon=${item.id}`}
                      className="p-3 rounded-lg bg-background border border-border flex flex-col items-center justify-center gap-2 hover:border-primary/50 transition-all group shadow-2xs"
                    >
                      <Icon size={24} className="text-foreground group-hover:scale-110 group-hover:text-primary transition-all" />
                      <span className="text-[10px] font-mono text-muted-foreground truncate w-full text-center group-hover:text-foreground">
                        {item.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
