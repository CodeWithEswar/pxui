"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { PXUIMark } from "@/components/brand";
import {
  PXIconSearch,
  PXIconMenu,
  PXIconGitBranch,
  PXIconArrowRight,
  PXIconTerminal,
  PXIconSparkles,
  PXIconFileCode,
  PXIconCode,
  PXIconSliders,
} from "@/components/icons";
import { CommandSearch } from "./command-search";
import { MobileMenuSheet } from "./mobile-menu-sheet";
import { PixelSquare, GridCoordinateLabel } from "@/components/landing/technical-mark";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [searchModalOpen, setSearchModalOpen] = React.useState(false);

  // Monitor scroll for dynamic paper opacity & segmented bottom rail
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/icons", label: "Icons", icon: PXIconArrowRight },
    { href: "/animated", label: "Animated", icon: PXIconSparkles },
    { href: "/brands", label: "Brands", icon: PXIconCode },
    { href: "/registry", label: "Registry", icon: PXIconTerminal },
    { href: "/docs/getting-started", label: "Docs", icon: PXIconFileCode },
    { href: "/playground", label: "Playground", icon: PXIconSliders },
  ];

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full shrink-0 transition-all duration-200 select-none",
          scrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border shadow-2xs"
            : "bg-background/80 backdrop-blur-xs border-b border-border/60"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* LEFT: Canonical Brand Lockup & Technical Drafting Mark */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="group flex items-center gap-3 cursor-pointer py-1"
              aria-label="PXUI — Home"
            >
              <PXUIMark
                size={22}
                variant="coral"
                className="group-hover:scale-105 transition-transform"
              />
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-[19px] font-normal tracking-tight text-foreground group-hover:text-primary transition-colors">
                  PXUI
                </span>
                <span className="hidden md:inline-block font-mono text-[9px] tracking-widest text-muted-foreground/70 uppercase">
                  ICON SYSTEM
                </span>
              </div>
            </Link>

            {/* Hairline Divider */}
            <div aria-hidden="true" className="hidden lg:block w-[1px] h-4 bg-border/80" />

            {/* CENTER: Architectural Pixel Navigation */}
            <nav className="hidden lg:flex items-center gap-1 text-xs font-medium">
              {navLinks.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : item.href.startsWith("/docs")
                    ? pathname.startsWith("/docs")
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "group relative px-3 py-1.5 rounded-sm transition-colors font-sans flex items-center gap-1.5",
                      isActive
                        ? "text-foreground font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {/* Stepped Pixel Locator: appears on hover or active */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "w-1.5 h-1.5 bg-primary transition-all duration-150 shrink-0",
                        isActive
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100"
                      )}
                    />
                    <span>{item.label}</span>

                    {/* Active pixel underline */}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute bottom-0 left-3 right-3 h-[2px] bg-primary"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* RIGHT: Developer Search, Controls & Action */}
          <div className="flex items-center gap-2.5">
            {/* Global Command Search Trigger */}
            <CommandSearch
              open={searchModalOpen}
              onOpenChange={setSearchModalOpen}
            />

            {/* Mobile Search Button (<640px) */}
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => setSearchModalOpen(true)}
              aria-label="Search icons"
              className="sm:hidden border-border/80 bg-card hover:bg-card/80 text-foreground rounded-md shadow-2xs"
            >
              <PXIconSearch size={15} className="text-primary" />
            </Button>

            {/* Hairline Divider */}
            <div aria-hidden="true" className="hidden sm:block w-[1px] h-4 bg-border/80 mx-1" />

            {/* GitHub Repo Quicklink */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex"
            >
              <Button
                variant="outline"
                size="icon-sm"
                className="border-border/80 hover:border-foreground/40 rounded-md bg-card/60 hover:bg-card text-foreground transition-all shadow-2xs"
                title="GitHub Repository (v1.0.0)"
                aria-label="GitHub Repository"
              >
                <PXIconGitBranch size={15} className="text-foreground" />
              </Button>
            </a>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Primary Action Button: Explore Icons ↗ (with subtle pixel corner cut) */}
            <Link href="/icons" className="hidden md:inline-flex">
              <Button
                size="sm"
                className="pixel-corner-tr h-8 px-3.5 rounded-sm font-sans text-xs font-medium bg-primary text-primary-foreground hover:bg-[#a9583e] active:bg-[#8e432d] gap-1.5 shadow-2xs transition-all"
              >
                <span>Explore Icons</span>
                <span className="font-mono text-[10px] opacity-85">↗</span>
              </Button>
            </Link>

            {/* Mobile Menu Trigger (<1024px) */}
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile navigation menu"
              className="lg:hidden border-border/80 bg-card hover:bg-card/80 text-foreground rounded-md shadow-2xs"
            >
              <PXIconMenu size={16} />
            </Button>
          </div>
        </div>

        {/* 1px Bottom Segmented Rail: indicates active technical sheet state */}
        <div
          aria-hidden="true"
          className={cn(
            "h-[1px] w-full transition-opacity duration-300",
            scrolled ? "opacity-100 bg-border" : "opacity-0"
          )}
        />
      </header>

      {/* Full Pixel-Paper Mobile Navigation Sheet */}
      <MobileMenuSheet
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenSearch={() => setSearchModalOpen(true)}
      />
    </>
  );
}
