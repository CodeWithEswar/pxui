"use client";

import * as React from "react";
import Link from "next/link";
import { PXUIMark } from "@/components/brand";
import {
  PXIconX,
  PXIconSearch,
  PXIconTerminal,
  PXIconSparkles,
  PXIconFileCode,
  PXIconGitBranch,
  PXIconArrowRight,
} from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { PixelSquare, GridCoordinateLabel } from "@/components/landing/technical-mark";

interface MobileMenuSheetProps {
  open: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

export function MobileMenuSheet({ open, onClose, onOpenSearch }: MobileMenuSheetProps) {
  // Lock body scroll when mobile sheet is active
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [open, onClose]);

  if (!open) return null;

  const navItems = [
    {
      num: "01",
      label: "ICONS WORKSPACE",
      href: "/icons",
      desc: "Full 100+ production pixel icon catalog with live SVG code export",
      icon: PXIconArrowRight,
      badge: "CATALOG",
    },
    {
      num: "02",
      label: "ANIMATED ICONS",
      href: "/animated",
      desc: "Motion-enabled icons with stepped frame sequencer and live controls",
      icon: PXIconSparkles,
      badge: "MOTION",
    },
    {
      num: "03",
      label: "BRAND ICONS",
      href: "/brands",
      desc: "Curated third-party brand marks with ownership and trademark context",
      icon: PXIconFileCode,
      badge: "BRANDS",
    },
    {
      num: "04",
      label: "SHADCN REGISTRY",
      href: "/registry",
      desc: "Direct CLI installation workflow and local component ownership",
      icon: PXIconTerminal,
      badge: "REGISTRY",
    },
    {
      num: "05",
      label: "DEVELOPER DOCS",
      href: "/docs/getting-started",
      desc: "React, React Native, accessibility, animation, and design system guides",
      icon: PXIconFileCode,
      badge: "DOCS",
    },
    {
      num: "06",
      label: "PLAYGROUND LAB",
      href: "/playground",
      desc: "Interactive developer workbench with contextual UI previews and live code",
      icon: PXIconArrowRight,
      badge: "LAB",
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      className="fixed inset-0 z-50 flex flex-col bg-background/98 backdrop-blur-xl lg:hidden overflow-y-auto animate-in fade-in duration-200"
    >
      {/* Background Architectural Grid & Grain */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-paper-grid opacity-75 pointer-events-none select-none z-0"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-paper-grain opacity-30 pointer-events-none select-none z-0"
      />

      {/* Sheet Control Header Bar */}
      <div className="relative z-10 h-16 px-4 sm:px-6 border-b border-border/80 flex items-center justify-between bg-background/80 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <PXUIMark size={20} variant="coral" />
          <span className="font-serif font-medium text-lg tracking-tight text-foreground">
            PXUI
          </span>
          <span className="font-mono text-[10px] text-muted-foreground/60">/</span>
          <GridCoordinateLabel label="NAV 001" />
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="outline"
            size="icon-sm"
            onClick={onClose}
            aria-label="Close menu"
            className="border-border/80 bg-card hover:bg-card/80 text-foreground rounded-md shadow-2xs"
          >
            <PXIconX size={16} />
          </Button>
        </div>
      </div>

      {/* Sheet Body */}
      <div className="relative z-10 flex-1 px-4 sm:px-6 py-6 space-y-6 max-w-lg mx-auto w-full">
        {/* Mobile Quick Search Trigger */}
        <button
          type="button"
          onClick={() => {
            onClose();
            onOpenSearch();
          }}
          className="w-full flex items-center justify-between h-11 px-3.5 text-xs font-sans text-muted-foreground bg-card border border-border rounded-md hover:border-primary/50 shadow-2xs group transition-all"
        >
          <span className="flex items-center gap-2.5">
            <PXIconSearch size={15} className="text-primary group-hover:scale-110 transition-transform" />
            <span className="font-medium text-foreground">Search all 100 icons...</span>
          </span>
          <kbd className="inline-flex h-5 items-center px-1.5 rounded-xs border border-border bg-background font-mono text-[10px] text-muted-foreground">
            ⌘K
          </kbd>
        </button>

        {/* Technical Nav Items */}
        <div className="space-y-2 pt-2">
          <div className="px-1 pb-1 flex items-center justify-between font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
            <span>INDEX / SPECIMEN SECTIONS</span>
            <span className="text-primary">4 TARGETS</span>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.num}
                  href={item.href}
                  onClick={onClose}
                  className="block p-3.5 rounded-lg border border-border/80 bg-card/60 hover:bg-card hover:border-primary/40 transition-all group shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs text-primary font-semibold">
                        {item.num}
                      </span>
                      <span className="font-sans font-medium text-sm text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                        {item.label}
                      </span>
                    </div>
                    <span className="font-mono text-[9px] px-1.5 py-0.5 rounded-xs border border-border/60 bg-background text-muted-foreground">
                      {item.badge}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground font-sans pl-6">
                    {item.desc}
                  </p>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Direct Action Quicklinks */}
        <div className="pt-4 border-t border-border/80 flex flex-col gap-3">
          <Link href="/icons" onClick={onClose} className="w-full">
            <Button className="w-full h-11 rounded-md font-sans text-xs font-medium bg-primary text-primary-foreground hover:bg-[#a9583e] shadow-sm justify-center gap-2">
              <span>Open Icon Workspace</span>
              <PXIconArrowRight size={15} />
            </Button>
          </Link>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="w-full"
          >
            <Button
              variant="outline"
              className="w-full h-10 rounded-md font-sans text-xs font-medium border-border bg-card text-foreground justify-center gap-2"
            >
              <PXIconGitBranch size={14} className="text-primary" />
              <span>GitHub Repository (v1.0.0)</span>
            </Button>
          </a>
        </div>
      </div>

      {/* Sheet Technical Footer */}
      <div className="relative z-10 px-6 py-4 border-t border-border/80 bg-background/90 text-center font-mono text-[10px] text-muted-foreground/60 flex items-center justify-between">
        <span>24×24 INTEGER SPECIMEN</span>
        <span className="text-primary font-mono">0.000px DRIFT</span>
      </div>
    </div>
  );
}
