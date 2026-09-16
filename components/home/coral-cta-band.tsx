"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { PXIconTerminal, PXIconArrowRight } from "@/components/icons";
import { toast } from "sonner";

export function CoralCtaBand() {
  const [origin, setOrigin] = React.useState("https://pxui.dev");

  React.useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const installCmd = `npx shadcn@latest add ${origin}/r/px-home.json`;

  const copyCommand = async () => {
    try {
      await navigator.clipboard.writeText(installCmd);
      toast.success("Copied installation command!");
    } catch {
      toast.error("Failed to copy command.");
    }
  };

  return (
    <section className="py-16 md:py-20 bg-background border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        {/* Full-bleed coral card */}
        <div className="relative overflow-hidden rounded-xl bg-primary text-primary-foreground p-8 md:p-14 lg:p-16 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Subtle background decoration */}
          <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />

          <div className="space-y-3 text-center md:text-left max-w-xl relative z-10">
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white font-mono text-xs font-medium uppercase tracking-wider">
              Start Building Today
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight text-white leading-tight">
              Ready to bring pixel precision to your UI?
            </h2>
            <p className="text-sm sm:text-base text-white/90 font-sans leading-relaxed">
              Install any PXUI icon directly into your codebase with one CLI command. Zero extra dependencies, complete SVG source control, and native React parity.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 relative z-10 shrink-0">
            <Button
              size="lg"
              onClick={copyCommand}
              className="h-11 px-6 rounded-md font-sans text-sm font-medium bg-[#faf9f5] text-[#141413] hover:bg-[#efe9de] active:bg-[#e8e0d2] shadow-md border border-white/20 gap-2"
            >
              <PXIconTerminal size={16} className="text-[#cc785c]" />
              Copy Install Command
            </Button>

            <a href="#explorer">
              <Button
                variant="outline"
                size="lg"
                className="h-11 px-6 rounded-md font-sans text-sm font-medium bg-white/10 hover:bg-white/20 text-white border-white/30 gap-2"
              >
                <span>Browse Catalog</span>
                <PXIconArrowRight size={16} />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
