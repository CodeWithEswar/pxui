"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PXIconTerminal, PXIconCheck, PXIconCopy, PXIconSearch, PACKAGE_MANAGERS } from "@/components/icons";
import { toast } from "sonner";

export function RegistrySection() {
  const [copiedPkg, setCopiedPkg] = React.useState<string | null>(null);
  const [origin, setOrigin] = React.useState("https://pxui.dev");

  React.useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const getCmd = (pkg: "npm" | "pnpm" | "bun" | "yarn") => {
    switch (pkg) {
      case "npm": return `npx shadcn@latest add ${origin}/r/px-search.json`;
      case "pnpm": return `pnpm dlx shadcn@latest add ${origin}/r/px-search.json`;
      case "bun": return `bunx --bun shadcn@latest add ${origin}/r/px-search.json`;
      case "yarn": return `yarn dlx shadcn@latest add ${origin}/r/px-search.json`;
    }
  };

  const copyCommand = async (cmd: string, pkg: string) => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopiedPkg(pkg);
      toast.success(`Copied ${pkg} CLI command!`);
      setTimeout(() => setCopiedPkg(null), 1800);
    } catch {
      // quiet fail
    }
  };

  return (
    <section id="registry" className="py-20 md:py-28 border-b border-border/80 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl space-y-12">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight text-foreground">
            Install what you <span className="text-primary italic">need</span>.
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-sans leading-relaxed">
            Every PXUI icon is served as an official shadcn/ui registry item.
            No heavy third-party packages to lock into your dependencies—install individual icon components straight into your repository with complete code ownership.
          </p>
        </div>

        {/* 3-Stage Visual Pipeline Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 rounded-xl border border-border bg-card shadow-2xs space-y-3 relative">
            <span className="font-mono text-[10px] text-primary font-bold">STAGE 01</span>
            <h3 className="text-base font-semibold font-sans text-foreground">PXUI Registry Endpoint</h3>
            <p className="text-xs text-muted-foreground font-sans leading-relaxed">
              Deterministic JSON definition declaring schema version, paths, and React dependencies.
            </p>
            <div className="p-2 bg-background border border-border rounded font-mono text-[11px] text-muted-foreground truncate">
              /r/px-search.json
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card shadow-2xs space-y-3 relative">
            <span className="font-mono text-[10px] text-primary font-bold">STAGE 02</span>
            <h3 className="text-base font-semibold font-sans text-foreground">Official shadcn CLI</h3>
            <p className="text-xs text-muted-foreground font-sans leading-relaxed">
              The standard CLI downloads the icon file directly into your local <code className="text-foreground">components/icons/</code> directory.
            </p>
            <div className="p-2 bg-background border border-border rounded font-mono text-[11px] text-[#5db872] truncate">
              ✔ Added PXIconSearch.tsx
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card shadow-2xs space-y-3 relative">
            <span className="font-mono text-[10px] text-primary font-bold">STAGE 03</span>
            <h3 className="text-base font-semibold font-sans text-foreground">Complete Code Ownership</h3>
            <p className="text-xs text-muted-foreground font-sans leading-relaxed">
              Full SVG source control. Customize colors, tweak sizing tokens, and commit directly to your git history.
            </p>
            <div className="p-2 bg-background border border-border rounded font-mono text-[11px] text-foreground flex items-center gap-2">
              <PXIconSearch size={14} className="text-primary" />
              <span>&lt;PXIconSearch size=&#123;20&#125; /&gt;</span>
            </div>
          </div>
        </div>

        {/* Terminal Command Box (Dark Surface) */}
        <div className="rounded-xl border border-[#2e2c28] bg-[#181715] text-[#faf9f5] shadow-xl overflow-hidden font-mono text-xs">
          <Tabs defaultValue="npm" className="w-full">
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#252320] bg-[#1f1e1b]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#363430]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#363430]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#363430]" />
                <span className="text-xs font-mono text-[#a09d96] ml-2">shadcn CLI Execution</span>
              </div>

              <TabsList className="bg-[#141413] h-7.5 p-0.5 gap-1 border border-[#2e2c28] rounded-md">
                {PACKAGE_MANAGERS.map((pm) => {
                  const Icon = pm.icon;
                  return (
                    <TabsTrigger
                      key={pm.id}
                      value={pm.id}
                      className="text-xs font-mono rounded-sm h-6.5 px-2.5 text-[#a09d96] data-[state=active]:bg-[#252320] data-[state=active]:text-[#faf9f5] inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Icon size={13} className="shrink-0" />
                      <span>{pm.label}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            {(["npm", "pnpm", "bun", "yarn"] as const).map((pkg) => {
              const cmd = getCmd(pkg);
              return (
                <TabsContent
                  key={pkg}
                  value={pkg}
                  className="m-0 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#181715]"
                >
                  <div className="flex items-center gap-3 overflow-x-auto select-all">
                    <span className="text-primary font-bold select-none text-base">$</span>
                    <span className="text-[#faf9f5] font-mono text-xs sm:text-sm">{cmd}</span>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => copyCommand(cmd, pkg)}
                    className="rounded-md h-9 px-4 font-sans text-xs bg-primary text-primary-foreground hover:bg-[#a9583e] shrink-0 gap-1.5 shadow-2xs"
                  >
                    {copiedPkg === pkg ? <PXIconCheck size={14} className="text-white" /> : <PXIconCopy size={14} />}
                    <span>{copiedPkg === pkg ? "Copied" : "Copy Command"}</span>
                  </Button>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
