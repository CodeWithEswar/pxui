"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PXIconTerminal } from "@/components/icons";
import { FlowingGridField } from "./flowing-grid-field";

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] min-h-[calc(100svh-4rem)] flex flex-col justify-center items-center py-12 sm:py-16 md:py-24 border-b border-border/80 overflow-hidden select-none">
      {/* 1. Discrete Orthogonal Flowing Grid Dots (Focal radial field) */}
      <FlowingGridField className="opacity-90" />

      {/* 2. Soft Ambient Warm Core Radiance */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[900px] h-[400px] bg-radial from-primary/10 via-primary/3 to-transparent blur-[100px] pointer-events-none z-0"
      />

      {/* 3. Centered Monumental Editorial Content */}
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center space-y-6 sm:space-y-8 relative z-10 my-auto">
        {/* Monumental Serif Display Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[84px] font-serif font-normal tracking-[-2px] sm:tracking-[-3px] leading-[0.98] sm:leading-[1.02] text-foreground max-w-3xl mx-auto">
          Pixel-native <br />
          interface <span className="text-primary italic font-serif">icons</span>.
        </h1>

        {/* Humanist Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-sans max-w-xl mx-auto leading-relaxed font-normal">
          A precision 24×24 icon system for React, React Native, and shadcn.
        </p>

        {/* High-Performance Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <Link href="/icons">
            <Button
              size="default"
              className="pixel-corner-tr h-11 px-7 rounded-sm font-sans text-sm font-medium bg-primary text-primary-foreground hover:bg-[#a9583e] active:bg-[#8e432d] shadow-md hover:shadow-lg transition-all gap-2 group"
            >
              <span>Explore All Icons</span>
              <span className="font-mono text-xs group-hover:translate-x-0.5 transition-transform">↗</span>
            </Button>
          </Link>

          <a href="#registry">
            <Button
              variant="outline"
              size="default"
              className="h-11 px-6 rounded-sm font-sans text-sm font-medium border-border/90 bg-card/80 backdrop-blur-xs hover:bg-card text-foreground gap-2 transition-all hover:border-primary/40 shadow-2xs"
            >
              <PXIconTerminal size={15} className="text-primary" />
              <span>Install CLI</span>
            </Button>
          </a>
        </div>
      </div>

      {/* Subtle Bottom Scroll Cue */}
      <div className="pt-8 pb-2 flex justify-center relative z-10 opacity-60 hover:opacity-100 transition-opacity">
        <a
          href="#geometry"
          aria-label="Scroll to Section 02"
          className="inline-flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground/75 hover:text-primary transition-colors"
        >
          <span className="tracking-wider uppercase">SCROLL</span>
          <span className="inline-block animate-px-bounce font-mono">↓</span>
        </a>
      </div>
    </section>
  );
}
