"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PXIconArrowRight, PXIconTerminal, PXIconSparkles } from "@/components/icons";
import { toast } from "sonner";

export function FinalCta() {
  const [origin, setOrigin] = React.useState("https://pxui.dev");

  React.useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const cliSnippet = `npx shadcn@latest add ${origin}/r/px-home.json`;

  const copyCli = async () => {
    try {
      await navigator.clipboard.writeText(cliSnippet);
      toast.success("Copied installation command!");
    } catch {
      // quiet fail
    }
  };

  return (
    <section id="final-cta" className="relative py-20 md:py-28 bg-primary text-primary-foreground overflow-hidden">
      {/* Decorative Stepped Pixel Top Border */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-3 opacity-25 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(90deg, #ffffff 50%, transparent 50%)`,
          backgroundSize: "16px 6px",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 max-w-5xl relative z-10 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white font-mono text-xs shadow-xs">
          <PXIconSparkles size={12} />
          <span>START BUILDING TODAY</span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal tracking-tight text-white leading-tight max-w-3xl mx-auto">
          Bring pixel precision to your <span className="italic">interface</span>.
        </h2>

        <p className="text-base sm:text-lg text-white/90 font-sans max-w-xl mx-auto leading-relaxed">
          Engineered for developers and product designers who value geometry, consistency, and complete source control.
          Zero monolithic bundle leaks.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link href="/icons">
            <Button
              size="lg"
              className="h-12 px-7 rounded-md font-sans text-sm font-medium bg-[#faf9f5] text-[#141413] hover:bg-[#efe9de] active:bg-[#e8e0d2] shadow-lg border border-white/20 gap-2"
            >
              <span>Explore All Icons</span>
              <PXIconArrowRight size={16} />
            </Button>
          </Link>

          <Button
            size="lg"
            variant="outline"
            onClick={copyCli}
            className="h-12 px-6 rounded-md font-sans text-sm font-medium bg-white/10 hover:bg-white/20 text-white border-white/30 gap-2 shadow-xs"
          >
            <PXIconTerminal size={16} />
            <span>Copy CLI Command</span>
          </Button>
        </div>

        <div className="pt-6 font-mono text-xs text-white/70 flex flex-wrap items-center justify-center gap-4">
          <span>React 19 & 18</span>
          <span>•</span>
          <span>React Native (Svg)</span>
          <span>•</span>
          <span>shadcn Registry</span>
          <span>•</span>
          <span>Open Source</span>
        </div>
      </div>
    </section>
  );
}
