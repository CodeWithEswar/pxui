"use client";

import * as React from "react";
import Link from "next/link";
import { IconDefinition } from "@/lib/icons/schema";
import { toPixelComponentName, toPXComponentName, generateSvgString, generateReactNativeCode } from "@/lib/compiler";
import { PXIconBase } from "@/components/icons/px-icon-base";
import { PixelGridPreview } from "./pixel-grid-preview";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PXIconCopy, PXIconCheck, PXIconArrowLeft } from "@/components/icons";
import { SyntaxHighlighter, CodeWrapButton } from "@/components/ui/syntax-highlighter";
import { cn } from "@/lib/utils";

interface IconDetailViewProps {
  icon: IconDefinition;
  relatedIcons: IconDefinition[];
}

export function IconDetailView({ icon, relatedIcons }: IconDetailViewProps) {
  const [filled, setFilled] = React.useState(false);
  const [animated, setAnimated] = React.useState(false);
  const [previewSize, setPreviewSize] = React.useState<16 | 20 | 24 | 32 | 48>(24);
  const [copiedTab, setCopiedTab] = React.useState<string | null>(null);
  const [codeWrapped, setCodeWrapped] = React.useState(false);

  const componentName = toPXComponentName(icon.name);
  const hasFilled = Boolean(icon.filled && icon.filled.length > 0);
  const hasAnimation = Boolean(icon.animation);

  const [origin, setOrigin] = React.useState("https://pxui.dev");
  React.useEffect(() => {
    setOrigin(window.location.origin);
  }, []);
  const shadcnCmd = `npx shadcn@latest add ${origin}/r/px-${icon.name}.json`;

  const reactImportCode = `import { ${componentName} } from "@pxui/react";

export default function Example() {
  return (
    <${componentName}
      size={${previewSize}}
      color="currentColor"${filled ? '\n      filled' : ''}${animated ? '\n      animated' : ''}
    />
  );
}`;

  const reactNativeCode = generateReactNativeCode(icon);
  const svgCode = generateSvgString(icon, filled);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedTab(label);
      setTimeout(() => setCopiedTab(null), 1800);
    } catch {
      // quiet fail
    }
  };

  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/icons"
          className="inline-flex items-center gap-2 text-xs font-sans text-muted-foreground hover:text-foreground transition-colors"
        >
          <PXIconArrowLeft size={14} />
          Back to Icons Workspace
        </Link>
        <Badge variant="pill" className="text-[10px] font-mono capitalize">
          {icon.category}
        </Badge>
      </div>

      {/* Main Detail Grid */}
      <div className="border border-border bg-card rounded-xl grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-md">
        {/* Preview Column */}
        <div className="lg:col-span-6 p-8 border-b lg:border-b-0 lg:border-r border-border bg-background/50 flex flex-col items-center justify-between gap-8">
          <PixelGridPreview icon={icon} filled={filled} animated={animated} />

          {/* Sizes strip */}
          <div className="w-full space-y-2">
            <div className="text-[11px] font-sans font-medium uppercase tracking-wider text-muted-foreground text-center">
              Visual Review at Native Sizes
            </div>
            <div className="flex items-center justify-center gap-4 p-3 bg-background border border-border rounded-md shadow-2xs">
              {([16, 20, 24, 32, 48] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setPreviewSize(s)}
                  className={`flex flex-col items-center gap-1 p-1.5 rounded-sm transition-all ${
                    previewSize === s
                      ? "text-primary border-b-2 border-primary bg-card font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <PXIconBase
                    definition={icon}
                    size={s}
                    filled={filled}
                    animated={animated}
                    color="currentColor"
                  />
                  <span className="text-[10px] font-mono">{s}px</span>
                </button>
              ))}
            </div>
          </div>

          {/* Variant Toggles */}
          <div className="flex items-center gap-2">
            {hasFilled && (
              <Button
                variant={filled ? "default" : "outline"}
                size="sm"
                className="rounded-md font-sans text-xs h-8 px-3"
                onClick={() => setFilled(!filled)}
              >
                Filled: {filled ? "ON" : "OFF"}
              </Button>
            )}
            {hasAnimation && (
              <Button
                variant={animated ? "default" : "outline"}
                size="sm"
                className="rounded-md font-sans text-xs h-8 px-3"
                onClick={() => setAnimated(!animated)}
              >
                Animated: {animated ? "ON" : "OFF"}
              </Button>
            )}
          </div>
        </div>

        {/* Info & Code Column */}
        <div className="lg:col-span-6 p-8 flex flex-col justify-between gap-6 bg-card">
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-serif font-normal tracking-tight text-foreground flex items-center gap-2.5">
                <span className="text-primary font-mono text-2xl">{componentName}</span>
                <span className="text-muted-foreground text-xs font-mono font-normal">px-{icon.name}</span>
              </h1>
              <p className="text-xs text-muted-foreground mt-1.5 font-sans">
                {icon.description || "Pixel-native icon for modern web and mobile user interfaces."}
              </p>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 border border-border/80 bg-background rounded-md shadow-2xs">
                <span className="text-muted-foreground block text-[10px] font-sans">Grid Geometry</span>
                <span className="font-semibold">{icon.grid}×{icon.grid} Integer Grid</span>
              </div>
              <div className="p-2.5 border border-border/80 bg-background rounded-md shadow-2xs">
                <span className="text-muted-foreground block text-[10px] font-sans">Introduced</span>
                <span className="font-semibold">{icon.introducedVersion}</span>
              </div>
              <div className="p-2.5 border border-border/80 bg-background rounded-md shadow-2xs">
                <span className="text-muted-foreground block text-[10px] font-sans">Motion State</span>
                <span className="font-semibold">
                  {icon.animation ? `${icon.animation.family} (${icon.animation.type})` : "Static Native"}
                </span>
              </div>
              <div className="p-2.5 border border-border/80 bg-background rounded-md shadow-2xs">
                <span className="text-muted-foreground block text-[10px] font-sans">Supported Platforms</span>
                <span className="font-semibold">Web · React · Native</span>
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-1">
              <span className="text-[10px] font-sans text-muted-foreground block">
                Tags & Aliases:
              </span>
              <div className="flex flex-wrap gap-1">
                {icon.tags.map((t) => (
                  <span key={t} className="px-2 py-0.5 text-[10px] font-mono bg-background border border-border rounded-sm">
                    #{t}
                  </span>
                ))}
                {icon.aliases?.map((a) => (
                  <span key={a} className="px-2 py-0.5 text-[10px] font-mono bg-primary/10 border border-primary/30 text-primary rounded-sm">
                    alias:{a}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Export Tabs */}
          <div className="space-y-2 pt-2 border-t border-border">
            <div className="text-[11px] font-sans font-medium uppercase tracking-wider text-muted-foreground">
              Code Export
            </div>

            <Tabs defaultValue="shadcn" className="w-full">
              <TabsList className="w-full grid grid-cols-4 rounded-md h-8.5 p-0.5 bg-background border border-border">
                <TabsTrigger value="shadcn" className="text-xs font-sans rounded-sm data-[state=active]:bg-card data-[state=active]:font-medium data-[state=active]:shadow-2xs">
                  shadcn
                </TabsTrigger>
                <TabsTrigger value="react" className="text-xs font-sans rounded-sm data-[state=active]:bg-card data-[state=active]:font-medium data-[state=active]:shadow-2xs">
                  React
                </TabsTrigger>
                <TabsTrigger value="native" className="text-xs font-sans rounded-sm data-[state=active]:bg-card data-[state=active]:font-medium data-[state=active]:shadow-2xs">
                  Native
                </TabsTrigger>
                <TabsTrigger value="svg" className="text-xs font-sans rounded-sm data-[state=active]:bg-card data-[state=active]:font-medium data-[state=active]:shadow-2xs">
                  SVG
                </TabsTrigger>
              </TabsList>

              <TabsContent value="shadcn" className="mt-2 space-y-2">
                <div className={cn("p-3.5 bg-[#181715] border border-[#2e2c28] font-mono text-[11px] select-all rounded-md", codeWrapped ? "overflow-x-hidden" : "overflow-x-auto workspace-scrollbar")}>
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

              <TabsContent value="react" className="mt-2 space-y-2">
                <div className={cn("p-3.5 bg-[#181715] border border-[#2e2c28] font-mono text-[11px] max-h-36 select-all rounded-md", codeWrapped ? "overflow-x-hidden overflow-y-auto" : "overflow-x-auto overflow-y-auto workspace-scrollbar")}>
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

              <TabsContent value="native" className="mt-2 space-y-2">
                <div className={cn("p-3.5 bg-[#181715] border border-[#2e2c28] font-mono text-[11px] max-h-36 select-all rounded-md", codeWrapped ? "overflow-x-hidden overflow-y-auto" : "overflow-x-auto overflow-y-auto workspace-scrollbar")}>
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

              <TabsContent value="svg" className="mt-2 space-y-2">
                <div className={cn("p-3.5 bg-[#181715] border border-[#2e2c28] font-mono text-[11px] max-h-36 select-all rounded-md", codeWrapped ? "overflow-x-hidden overflow-y-auto" : "overflow-x-auto overflow-y-auto workspace-scrollbar")}>
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

      {/* Related Icons Section */}
      {relatedIcons.length > 0 && (
        <div className="space-y-4 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-serif font-normal tracking-tight text-foreground">
              More icons in {icon.category}
            </h2>
            <Link
              href="/#explorer"
              className="text-xs font-sans text-muted-foreground hover:text-foreground transition-colors"
            >
              View catalog →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {relatedIcons.map((rel) => (
              <Link
                key={rel.name}
                href={`/icons/${rel.name}`}
                className="p-4 border border-border hover:border-foreground/30 bg-card rounded-lg flex flex-col items-center justify-center gap-2 group transition-all shadow-2xs"
              >
                <div className="h-10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <PXIconBase definition={rel} size={24} color="currentColor" />
                </div>
                <span className="text-xs font-sans font-medium truncate w-full text-center text-muted-foreground group-hover:text-primary transition-colors">
                  {rel.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
