"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  PXIconHome,
  PXIconSearch,
  PXIconSettings,
  PXIconBell,
  PXIconHeart,
  PXIconTerminal,
  PXIconShieldCheck,
  PXIconSparkles,
  PXIconCpu,
  PXIconStar,
  PXIconArrowRight,
  PXIconCopy,
  PXIconCheck,
} from "@/components/icons";
import { PXUIMark } from "@/components/brand";
import { toast } from "sonner";

export function HeroSection() {
  const [copied, setCopied] = React.useState(false);

  const heroSnippet = `// 1. Install via shadcn Registry
$ npx shadcn@latest add https://pxui.dev/r/px-bell.json

// 2. Import canonical PXIcon component
import { PXIconBell } from "@pxui/react";

export function NotificationBadge() {
  return <PXIconBell size={24} animated className="text-primary" />;
}`;

  const copyHeroCode = async () => {
    try {
      await navigator.clipboard.writeText(heroSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // quiet fail
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-border bg-background">
      {/* Background Pixel Dots with Warm Tint */}
      <div className="absolute inset-0 bg-pixel-dots opacity-15 pointer-events-none text-foreground/40" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-5xl space-y-10">
        {/* Editorial Heading Column */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          {/* Status Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-border bg-card rounded-full text-xs font-mono text-foreground shadow-2xs">
            <PXUIMark size="xs" variant="coral" />
            <span className="font-medium">PXUI v1.0.0</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">100 Reference Pixel Icons</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-primary font-semibold">shadcn Registry</span>
          </div>

          {/* Main Product Headline: Editorial Serif Display */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-serif font-normal tracking-[-1.5px] leading-[1.05] text-foreground">
            Pixel-native icons for <span className="text-primary italic">considered</span> interfaces.
          </h1>

          {/* Humanist Sans Subtitle */}
          <p className="text-base sm:text-lg text-muted-foreground font-sans max-w-2xl mx-auto leading-relaxed">
            Engineered on a strict 24×24 integer grid for Web and React Native.
            Distributed natively through your custom shadcn/ui registry with zero runtime bloat.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a href="/icons">
              <Button
                size="default"
                className="h-10 px-6 rounded-md font-sans text-sm font-medium bg-primary text-primary-foreground hover:bg-[#a9583e] active:bg-[#8e432d] shadow-2xs gap-2"
              >
                <PXIconArrowRight size={16} />
                Open Icon Workspace
              </Button>
            </a>

            <a href="#registry">
              <Button
                variant="outline"
                size="default"
                className="h-10 px-5 rounded-md font-sans text-sm font-medium border-border bg-background hover:bg-muted/60 text-foreground gap-2"
              >
                <PXIconTerminal size={16} className="text-muted-foreground" />
                Registry CLI
              </Button>
            </a>
          </div>
        </div>

        {/* Hero Product Mockup Card (Surface Dark #181715) */}
        <div className="rounded-xl border border-[#2e2c28] bg-[#181715] text-[#faf9f5] shadow-xl overflow-hidden">
          {/* Mockup Header Chrome */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#252320] bg-[#1f1e1b]/80">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#363430] inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#363430] inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#363430] inline-block" />
              <span className="text-xs font-mono text-[#a09d96] ml-2">pxui-workspace.tsx</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-[#5db8a6] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5db8a6]" />
                24×24 integer safe
              </span>
              <button
                type="button"
                onClick={copyHeroCode}
                className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-mono text-[#a09d96] hover:text-[#faf9f5] rounded hover:bg-[#252320] transition-colors"
                title="Copy snippet"
              >
                {copied ? <PXIconCheck size={12} className="text-[#5db872]" /> : <PXIconCopy size={12} />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          {/* Mockup Body: 2-Column Product Chrome */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left: Interactive Pixel Icons Stage */}
            <div className="lg:col-span-6 p-6 border-b lg:border-b-0 lg:border-r border-[#252320] flex flex-col justify-between gap-6 bg-[#181715]">
              <div className="space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#a09d96]">
                  Canonical Icon Grid — 24×24 Native
                </div>
                <p className="text-xs text-[#a09d96] font-sans">
                  Stepped diagonals, optical weight balancing, and zero vector blur.
                </p>
              </div>

              {/* Live Preview Tiles */}
              <div className="grid grid-cols-5 gap-3 p-4 rounded-lg bg-[#1f1e1b] border border-[#2e2c28]">
                <div className="flex flex-col items-center gap-1.5 p-2 rounded hover:bg-[#252320] transition-colors group">
                  <PXIconHome size={28} className="text-[#faf9f5] group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-mono text-[#a09d96]">home</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-2 rounded hover:bg-[#252320] transition-colors group">
                  <PXIconSearch size={28} className="text-[#faf9f5] group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-mono text-[#a09d96]">search</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-2 rounded hover:bg-[#252320] transition-colors group">
                  <PXIconBell size={28} animated className="text-[#cc785c] group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-mono text-[#cc785c]">bell</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-2 rounded hover:bg-[#252320] transition-colors group">
                  <PXIconHeart size={28} animated className="text-[#e8a55a] group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-mono text-[#e8a55a]">heart</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-2 rounded hover:bg-[#252320] transition-colors group">
                  <PXIconSparkles size={28} animated className="text-[#5db8a6] group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-mono text-[#5db8a6]">sparkles</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-2 rounded hover:bg-[#252320] transition-colors group">
                  <PXIconTerminal size={28} className="text-[#faf9f5] group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-mono text-[#a09d96]">terminal</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-2 rounded hover:bg-[#252320] transition-colors group">
                  <PXIconShieldCheck size={28} className="text-[#5db872] group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-mono text-[#5db872]">shield</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-2 rounded hover:bg-[#252320] transition-colors group">
                  <PXIconCpu size={28} className="text-[#faf9f5] group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-mono text-[#a09d96]">cpu</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-2 rounded hover:bg-[#252320] transition-colors group">
                  <PXIconSettings size={28} className="text-[#faf9f5] group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-mono text-[#a09d96]">settings</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-2 rounded hover:bg-[#252320] transition-colors group">
                  <PXIconStar size={28} className="text-[#e8a55a] group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-mono text-[#e8a55a]">star</span>
                </div>
              </div>

              {/* Visual spec pills */}
              <div className="flex items-center gap-2 text-[11px] font-mono text-[#a09d96]">
                <span className="px-2 py-0.5 rounded bg-[#252320] border border-[#2e2c28]">100% SVG Paths</span>
                <span className="px-2 py-0.5 rounded bg-[#252320] border border-[#2e2c28]">Tree-shakeable</span>
                <span className="px-2 py-0.5 rounded bg-[#252320] border border-[#2e2c28]">Accessible</span>
              </div>
            </div>

            {/* Right: Code Window Card */}
            <div className="lg:col-span-6 p-6 font-mono text-xs flex flex-col justify-between bg-[#1f1e1b] overflow-x-auto">
              <div className="space-y-1 select-all leading-relaxed">
                <div className="text-[#a09d96]">{`// 1. Install directly into your shadcn components`}</div>
                <div className="text-[#5db8a6]">{`$ npx shadcn@latest add http://localhost:3000/r/px-bell.json`}</div>
                <div className="py-2 text-[#a09d96]">{`// 2. Import canonical PXIcon component`}</div>
                <div>
                  <span className="text-[#cc785c]">import</span>
                  <span className="text-[#faf9f5]"> {`{ PXIconBell }`} </span>
                  <span className="text-[#cc785c]">from</span>
                  <span className="text-[#e8a55a]">{` "@pxui/react"`}</span>
                  <span className="text-[#faf9f5]">;</span>
                </div>
                <div className="pt-2">
                  <span className="text-[#cc785c]">export default function</span>
                  <span className="text-[#faf9f5]"> Notification() {`{`}</span>
                </div>
                <div className="pl-4">
                  <span className="text-[#cc785c]">return</span>
                  <span className="text-[#faf9f5]"> (</span>
                </div>
                <div className="pl-8">
                  <span className="text-[#5db8a6]">&lt;PXIconBell</span>
                </div>
                <div className="pl-12">
                  <span className="text-[#e8a55a]">size</span>
                  <span className="text-[#faf9f5]">=</span>
                  <span className="text-[#5db872]">{`{24}`}</span>
                </div>
                <div className="pl-12">
                  <span className="text-[#e8a55a]">animated</span>
                </div>
                <div className="pl-12">
                  <span className="text-[#e8a55a]">className</span>
                  <span className="text-[#faf9f5]">=</span>
                  <span className="text-[#e8a55a]">&quot;text-primary&quot;</span>
                </div>
                <div className="pl-8">
                  <span className="text-[#5db8a6]">/&gt;</span>
                </div>
                <div className="pl-4 text-[#faf9f5]">);</div>
                <div className="text-[#faf9f5]">{`}`}</div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#2e2c28] flex items-center justify-between text-[11px] text-[#a09d96]">
                <span>React 19 · Web · React Native</span>
                <span className="text-[#cc785c] font-medium">shadcn/ui native</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
