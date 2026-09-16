"use client";

import * as React from "react";
import { IconDefinition } from "@/lib/icons/schema";
import { ICONS_CATALOG } from "@/lib/icons/catalog";
import { toPixelComponentName, toPXComponentName, generateSvgString, generateReactNativeCode } from "@/lib/compiler";
import { PXIconBase } from "@/components/icons/px-icon-base";
import { PixelGridPreview } from "./pixel-grid-preview";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { PXIconCopy, PXIconCheck, PXIconSparkles } from "@/components/icons";
import { SyntaxHighlighter, CodeWrapButton } from "@/components/ui/syntax-highlighter";
import { cn } from "@/lib/utils";

interface IconInspectorProps {
  icon: IconDefinition | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectIcon?: (icon: IconDefinition) => void;
}

export function IconInspector({ icon, open, onOpenChange, onSelectIcon }: IconInspectorProps) {
  const [filled, setFilled] = React.useState(false);
  const [animated, setAnimated] = React.useState(false);
  const [simulateReducedMotion, setSimulateReducedMotion] = React.useState(false);
  const [qaMode, setQaMode] = React.useState(false);
  const [previewSize, setPreviewSize] = React.useState<16 | 20 | 24 | 32 | 48 | 64>(24);
  const [copiedTab, setCopiedTab] = React.useState<string | null>(null);
  const [codeWrapped, setCodeWrapped] = React.useState(false);

  // Reset states when icon changes
  React.useEffect(() => {
    setFilled(false);
    setAnimated(false);
    setSimulateReducedMotion(false);
  }, [icon?.name]);

  if (!icon) return null;

  const componentName = toPXComponentName(icon.name);
  const hasFilled = Boolean(icon.filled && icon.filled.length > 0);
  const hasAnimation = Boolean(icon.animation);
  const isEffectivelyAnimated = animated && !simulateReducedMotion;

  // Dynamic origin or configurable registry base URL with stable initial state
  const [origin, setOrigin] = React.useState("https://pxui.dev");
  React.useEffect(() => {
    setOrigin(window.location.origin);
  }, []);
  const registryBase = process.env.NEXT_PUBLIC_REGISTRY_BASE_URL || origin;
  const shadcnCmd = `npx shadcn@latest add ${registryBase}/r/px-${icon.name}.json`;

  const reactImportCode = `import { ${componentName} } from "@pxui/react";

export default function Example() {
  return (
    <${componentName}
      size={${previewSize}}
      color="currentColor"${filled ? '\n      filled' : ''}${isEffectivelyAnimated ? '\n      animated' : ''}
    />
  );
}`;

  const reactNativeCode = generateReactNativeCode(icon);
  const svgCode = generateSvgString(icon, filled);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedTab(label);
      toast.success(`Copied ${label} to clipboard!`);
      setTimeout(() => setCopiedTab(null), 2000);
    } catch {
      toast.error("Failed to copy to clipboard.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl rounded-xl border border-border p-0 overflow-hidden bg-card shadow-2xl">
        {/* Header */}
        <DialogHeader className="p-6 pb-4 border-b border-border bg-card">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <DialogTitle className="text-2xl font-serif font-normal tracking-tight flex items-center gap-2.5">
                  <span className="text-primary font-mono text-xl">{componentName}</span>
                  <span className="text-muted-foreground text-xs font-mono font-normal">px-{icon.name}</span>
                </DialogTitle>
                <Badge variant="pill" className="text-[10px] font-mono capitalize">
                  {icon.category}
                </Badge>
              </div>
              <DialogDescription className="text-xs text-muted-foreground mt-1.5 font-sans">
                {icon.description || "Pixel-native icon for modern web and mobile user interfaces."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Left Column: Interactive Previews */}
          <div className="md:col-span-6 p-6 border-b md:border-b-0 md:border-r border-border flex flex-col items-center justify-between gap-6 bg-background/50">
            {/* 24x24 Pixel Grid Canvas */}
            <PixelGridPreview icon={icon} filled={filled} animated={isEffectivelyAnimated} />

            {/* Representative Sizes Strip: 16, 20, 24, 32, 48, 64 */}
            <div className="w-full space-y-2">
              <div className="text-[11px] font-sans font-medium uppercase tracking-wider text-muted-foreground text-center">
                Visual Review at Native Sizes
              </div>
              <div className="flex items-center justify-center gap-2 sm:gap-3 p-3 bg-background border border-border rounded-md flex-wrap shadow-2xs">
                {([16, 20, 24, 32, 48, 64] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setPreviewSize(s)}
                    className={`flex flex-col items-center gap-1 p-1 rounded-sm transition-all ${
                      previewSize === s
                        ? "text-primary border-b-2 border-primary bg-card font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    title={`Preview at ${s}px`}
                  >
                    <PXIconBase
                      definition={icon}
                      size={s}
                      filled={filled}
                      animated={isEffectivelyAnimated}
                      color="currentColor"
                    />
                    <span className="text-[9px] font-mono">{s}px</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Capability Controls */}
            <div className="flex items-center gap-2 flex-wrap justify-center w-full">
              {hasFilled && (
                <Button
                  variant={filled ? "default" : "outline"}
                  size="sm"
                  className="rounded-md font-sans text-xs h-8 px-3"
                  onClick={() => setFilled(!filled)}
                >
                  Variant: {filled ? "Filled" : "Outline"}
                </Button>
              )}

              {hasAnimation ? (
                <>
                  <Button
                    variant={animated ? "default" : "outline"}
                    size="sm"
                    className="rounded-md font-sans text-xs h-8 px-3"
                    onClick={() => setAnimated(!animated)}
                  >
                    <PXIconSparkles size={12} className="mr-1 inline-block" />
                    Motion: {animated ? "ON" : "OFF"}
                  </Button>

                  {animated && (
                    <Button
                      variant={simulateReducedMotion ? "secondary" : "outline"}
                      size="sm"
                      className="rounded-md font-sans text-[10px] h-8 px-2.5 border-dashed"
                      onClick={() => setSimulateReducedMotion(!simulateReducedMotion)}
                      title="Simulate prefers-reduced-motion"
                    >
                      Reduced Motion: {simulateReducedMotion ? "ON (Suppressed)" : "OFF"}
                    </Button>
                  )}
                </>
              ) : null}

              <Button
                variant={qaMode ? "default" : "outline"}
                size="sm"
                className="rounded-md font-sans text-[10px] h-8 px-2.5 text-muted-foreground hover:text-foreground"
                onClick={() => setQaMode(!qaMode)}
                title="Toggle developer QA diagnostics mode"
              >
                QA Mode: {qaMode ? "ON" : "OFF"}
              </Button>
            </div>
          </div>

          {/* Right Column: Metadata & Code Export */}
          <div className="md:col-span-6 p-6 flex flex-col justify-between gap-4 bg-card">
            {/* QA Diagnostics Mode (Section 5.38) */}
            {qaMode && (
              <div className="p-3 bg-[#181715] text-[#5db8a6] border border-[#5db8a6]/40 font-mono text-[10px] space-y-1 rounded-md shadow-xs">
                <div className="flex items-center justify-between text-[#5db8a6] font-bold border-b border-[#252320] pb-1">
                  <span>QA HARNESS DIAGNOSTICS</span>
                  <Badge variant="outline" className="text-[8px] border-[#5db8a6] text-[#5db8a6]">MAINTAINER</Badge>
                </div>
                <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 pt-1">
                  <div>Canonical ID: <span className="text-[#faf9f5]">px-{icon.name}</span></div>
                  <div>Grid: <span className="text-[#faf9f5]">24×24 integer safe</span></div>
                  <div>Paths: <span className="text-[#faf9f5]">{icon.paths.length} path(s)</span></div>
                  <div>Filled: <span className="text-[#faf9f5]">{hasFilled ? "Supported" : "Outline only"}</span></div>
                  <div>Family: <span className="text-[#faf9f5]">{icon.animation?.family || "None"}</span></div>
                  <div>Registry: <span className="text-[#faf9f5]">/r/px-{icon.name}.json</span></div>
                </div>
              </div>
            )}

            {/* Structured Metadata (Section 7.43) */}
            <div className="space-y-3">
              <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                Architecture & Contract Metadata
              </div>

              {/* Classification & Identity Matrix */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2 border border-border/80 bg-background rounded-md shadow-2xs">
                  <span className="text-muted-foreground block text-[9px] uppercase tracking-wider font-sans font-medium">Classification</span>
                  <span className="font-semibold capitalize text-foreground">{icon.category}</span>
                  <span className="text-[10px] text-muted-foreground block capitalize">{icon.family || icon.name} family</span>
                </div>
                <div className="p-2 border border-border/80 bg-background rounded-md shadow-2xs">
                  <span className="text-muted-foreground block text-[9px] uppercase tracking-wider font-sans font-medium">Lifecycle & Grid</span>
                  <span className="font-semibold text-primary capitalize">{icon.introducedVersion ? `v${icon.introducedVersion}` : "v1.0.0"} · Stable</span>
                  <span className="text-[10px] text-muted-foreground block">{icon.grid}×{icon.grid} Integer Grid</span>
                </div>
              </div>

              {/* Platforms */}
              <div className="p-2 border border-border/80 bg-background rounded-md shadow-2xs space-y-1">
                <span className="text-muted-foreground block text-[9px] uppercase tracking-wider font-sans font-medium">Platforms</span>
                <div className="flex items-center gap-1.5 flex-wrap font-mono text-[10px]">
                  <Badge variant="outline" className="text-[9px] px-1.5 py-0 bg-card">React</Badge>
                  <Badge variant="outline" className="text-[9px] px-1.5 py-0 bg-card">React Native</Badge>
                  <Badge variant="outline" className="text-[9px] px-1.5 py-0 bg-card">shadcn Registry</Badge>
                  <Badge variant="outline" className="text-[9px] px-1.5 py-0 bg-card">Raw SVG</Badge>
                </div>
              </div>

              {/* Tags & Aliases */}
              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-wider font-sans text-muted-foreground font-medium block">
                  Search Vocabulary (Tags & Aliases):
                </span>
                <div className="flex flex-wrap gap-1">
                  {icon.tags.map((t) => (
                    <span
                      key={t}
                      className="px-1.5 py-0.5 text-[10px] font-mono bg-background border border-border rounded-xs text-foreground"
                    >
                      #{t}
                    </span>
                  ))}
                  {icon.aliases?.map((a) => (
                    <span
                      key={a}
                      className="px-1.5 py-0.5 text-[10px] font-mono bg-primary/10 border border-primary/30 text-primary rounded-xs"
                      title="Search Alias"
                    >
                      alias:{a}
                    </span>
                  ))}
                </div>
              </div>

              {/* Related Icons (Section 5.24) */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-sans text-muted-foreground block">
                  Related Icons:
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {ICONS_CATALOG.filter(
                    (other) =>
                      other.name !== icon.name &&
                      (other.category === icon.category || other.tags.some((t) => icon.tags.includes(t)))
                  )
                    .slice(0, 4)
                    .map((related) => (
                      <button
                        key={related.name}
                        type="button"
                        onClick={() => onSelectIcon && onSelectIcon(related)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-sans border border-border bg-background hover:bg-card text-muted-foreground hover:text-foreground rounded-md transition-colors shadow-2xs"
                        title={`Inspect ${related.title}`}
                      >
                        <PXIconBase definition={related} size={14} />
                        <span>px-{related.name}</span>
                      </button>
                    ))}
                </div>
              </div>
            </div>

            <Separator className="my-1" />

            {/* Code Export Tabs */}
            <div className="space-y-2">
              <div className="text-[11px] font-sans font-medium uppercase tracking-wider text-muted-foreground">
                Developer Export
              </div>

              <Tabs defaultValue="shadcn" className="w-full">
                <TabsList className="w-full grid grid-cols-4 rounded-md h-8.5 p-0.5 bg-background border border-border">
                  <TabsTrigger
                    value="shadcn"
                    className="text-xs font-sans rounded-sm data-[state=active]:bg-card data-[state=active]:font-medium data-[state=active]:shadow-2xs"
                  >
                    shadcn
                  </TabsTrigger>
                  <TabsTrigger
                    value="react"
                    className="text-xs font-sans rounded-sm data-[state=active]:bg-card data-[state=active]:font-medium data-[state=active]:shadow-2xs"
                  >
                    React
                  </TabsTrigger>
                  <TabsTrigger
                    value="native"
                    className="text-xs font-sans rounded-sm data-[state=active]:bg-card data-[state=active]:font-medium data-[state=active]:shadow-2xs"
                  >
                    Native
                  </TabsTrigger>
                  <TabsTrigger
                    value="svg"
                    className="text-xs font-sans rounded-sm data-[state=active]:bg-card data-[state=active]:font-medium data-[state=active]:shadow-2xs"
                  >
                    SVG
                  </TabsTrigger>
                </TabsList>

                {/* shadcn CLI */}
                <TabsContent value="shadcn" className="mt-2 space-y-2">
                  <div className={cn("relative p-3.5 bg-[#181715] border border-[#2e2c28] font-mono text-[11px] rounded-md select-all", codeWrapped ? "overflow-x-hidden" : "overflow-x-auto workspace-scrollbar")}>
                    <SyntaxHighlighter
                      code={shadcnCmd}
                      language="bash"
                      theme="dark"
                      wrap={codeWrapped}
                      onWrapChange={setCodeWrapped}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <CodeWrapButton
                      wrapped={codeWrapped}
                      onToggle={() => setCodeWrapped(!codeWrapped)}
                      theme="dark"
                      size="md"
                    />
                    <Button
                      size="sm"
                      className="flex-1 rounded-md font-sans text-xs gap-1.5 h-9 bg-primary text-primary-foreground hover:bg-[#a9583e]"
                      onClick={() => copyToClipboard(shadcnCmd, "shadcn CLI Command")}
                    >
                      {copiedTab === "shadcn CLI Command" ? <PXIconCheck size={14} className="text-white" /> : <PXIconCopy size={14} />}
                      Copy shadcn CLI Command
                    </Button>
                  </div>
                </TabsContent>

                {/* React */}
                <TabsContent value="react" className="mt-2 space-y-2">
                  <div className={cn("relative p-3.5 bg-[#181715] border border-[#2e2c28] font-mono text-[11px] rounded-md max-h-36 select-all", codeWrapped ? "overflow-x-hidden overflow-y-auto" : "overflow-x-auto overflow-y-auto workspace-scrollbar")}>
                    <SyntaxHighlighter
                      code={reactImportCode}
                      language="tsx"
                      theme="dark"
                      wrap={codeWrapped}
                      onWrapChange={setCodeWrapped}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <CodeWrapButton
                      wrapped={codeWrapped}
                      onToggle={() => setCodeWrapped(!codeWrapped)}
                      theme="dark"
                      size="md"
                    />
                    <Button
                      size="sm"
                      className="flex-1 rounded-md font-sans text-xs gap-1.5 h-9 bg-primary text-primary-foreground hover:bg-[#a9583e]"
                      onClick={() => copyToClipboard(reactImportCode, "React Component Code")}
                    >
                      {copiedTab === "React Component Code" ? <PXIconCheck size={14} className="text-white" /> : <PXIconCopy size={14} />}
                      Copy React Code
                    </Button>
                  </div>
                </TabsContent>

                {/* React Native */}
                <TabsContent value="native" className="mt-2 space-y-2">
                  <div className={cn("relative p-3.5 bg-[#181715] border border-[#2e2c28] font-mono text-[11px] rounded-md max-h-36 select-all", codeWrapped ? "overflow-x-hidden overflow-y-auto" : "overflow-x-auto overflow-y-auto workspace-scrollbar")}>
                    <SyntaxHighlighter
                      code={reactNativeCode}
                      language="tsx"
                      theme="dark"
                      wrap={codeWrapped}
                      onWrapChange={setCodeWrapped}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <CodeWrapButton
                      wrapped={codeWrapped}
                      onToggle={() => setCodeWrapped(!codeWrapped)}
                      theme="dark"
                      size="md"
                    />
                    <Button
                      size="sm"
                      className="flex-1 rounded-md font-sans text-xs gap-1.5 h-9 bg-primary text-primary-foreground hover:bg-[#a9583e]"
                      onClick={() => copyToClipboard(reactNativeCode, "React Native Code")}
                    >
                      {copiedTab === "React Native Code" ? <PXIconCheck size={14} className="text-white" /> : <PXIconCopy size={14} />}
                      Copy React Native Code
                    </Button>
                  </div>
                </TabsContent>

                {/* SVG */}
                <TabsContent value="svg" className="mt-2 space-y-2">
                  <div className={cn("relative p-3.5 bg-[#181715] border border-[#2e2c28] font-mono text-[11px] rounded-md max-h-36 select-all", codeWrapped ? "overflow-x-hidden overflow-y-auto" : "overflow-x-auto overflow-y-auto workspace-scrollbar")}>
                    <SyntaxHighlighter
                      code={svgCode}
                      language="svg"
                      theme="dark"
                      wrap={codeWrapped}
                      onWrapChange={setCodeWrapped}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <CodeWrapButton
                      wrapped={codeWrapped}
                      onToggle={() => setCodeWrapped(!codeWrapped)}
                      theme="dark"
                      size="md"
                    />
                    <Button
                      size="sm"
                      className="flex-1 rounded-md font-sans text-xs gap-1.5 h-9 bg-primary text-primary-foreground hover:bg-[#a9583e]"
                      onClick={() => copyToClipboard(svgCode, "SVG Markup")}
                    >
                      {copiedTab === "SVG Markup" ? <PXIconCheck size={14} className="text-white" /> : <PXIconCopy size={14} />}
                      Copy SVG Markup
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
