"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PXIconCopy, PXIconCheck, PXIconTerminal, PACKAGE_MANAGERS } from "@/components/icons";
import { toast } from "sonner";

export function DeveloperInstallSection() {
  const [copied, setCopied] = React.useState<string | null>(null);
  const [origin, setOrigin] = React.useState("https://pxui.dev");

  React.useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const commands = {
    npm: `npx shadcn@latest add ${origin}/r/px-home.json`,
    pnpm: `pnpm dlx shadcn@latest add ${origin}/r/px-home.json`,
    bun: `bunx --bun shadcn@latest add ${origin}/r/px-home.json`,
    yarn: `yarn dlx shadcn@latest add ${origin}/r/px-home.json`,
  };

  const copyCommand = async (cmd: string, pkg: string) => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopied(pkg);
      toast.success(`Copied ${pkg} command to clipboard!`);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      toast.error("Failed to copy command.");
    }
  };

  return (
    <section id="registry" className="py-20 border-b border-border bg-background">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-border bg-card rounded-full font-mono text-xs text-foreground shadow-2xs">
            <PXIconTerminal size={14} className="text-primary" />
            <span>Official shadcn/ui Distribution Contract</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-serif font-normal tracking-tight text-foreground">
            Install icons directly into your codebase.
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto font-sans leading-relaxed">
            Every PXUI icon is served as a deterministic shadcn registry component. Use the standard CLI to add icons straight to your project.
          </p>
        </div>

        {/* Command Terminal Box (Dark Surface #181715) */}
        <div className="border border-[#2e2c28] bg-[#181715] text-[#faf9f5] rounded-xl shadow-xl overflow-hidden">
          <Tabs defaultValue="npm" className="w-full">
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#252320] bg-[#1f1e1b]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#363430] inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#363430] inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#363430] inline-block" />
                <span className="text-xs font-mono text-[#a09d96] ml-2">shadcn-cli</span>
              </div>

              <TabsList className="bg-[#181715] h-7.5 p-0.5 gap-1 border border-[#2e2c28] rounded-md">
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

            {/* Terminal Command View */}
            {(["npm", "pnpm", "bun", "yarn"] as const).map((pkg) => (
              <TabsContent key={pkg} value={pkg} className="m-0 p-6 font-mono text-xs flex items-center justify-between gap-4 bg-[#181715]">
                <div className="flex items-center gap-3 overflow-x-auto select-all">
                  <span className="text-primary font-bold select-none text-sm">$</span>
                  <span className="text-[#faf9f5] font-mono text-sm">{commands[pkg]}</span>
                </div>
                <Button
                  size="sm"
                  onClick={() => copyCommand(commands[pkg], pkg)}
                  className="rounded-md h-9 px-4 font-sans text-xs bg-primary text-primary-foreground hover:bg-[#a9583e] shrink-0 gap-1.5 shadow-2xs"
                >
                  {copied === pkg ? <PXIconCheck size={14} className="text-white" /> : <PXIconCopy size={14} />}
                  {copied === pkg ? "Copied" : "Copy"}
                </Button>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Info Footnote Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 border border-border bg-card rounded-lg shadow-2xs space-y-1.5">
            <span className="text-foreground font-sans font-semibold text-xs block">
              01. Single Source of Truth
            </span>
            <p className="text-xs text-muted-foreground font-sans leading-relaxed">
              Compiled deterministically from canonical icon geometry with automated QA assertions.
            </p>
          </div>
          <div className="p-5 border border-border bg-card rounded-lg shadow-2xs space-y-1.5">
            <span className="text-foreground font-sans font-semibold text-xs block">
              02. Pure Tree-Shaking
            </span>
            <p className="text-xs text-muted-foreground font-sans leading-relaxed">
              Only the icons imported by your components ever enter your client production bundle.
            </p>
          </div>
          <div className="p-5 border border-border bg-card rounded-lg shadow-2xs space-y-1.5">
            <span className="text-foreground font-sans font-semibold text-xs block">
              03. Zero External Dependencies
            </span>
            <p className="text-xs text-muted-foreground font-sans leading-relaxed">
              Pure SVG components rendered directly. No external icons runtime or bloated packages.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
