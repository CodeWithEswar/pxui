"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { ICONS_CATALOG } from "@/lib/icons/catalog";
import { toPXComponentName, generateReactNativeCode, generateSvgString } from "@/lib/compiler";
import { PXIconBase } from "@/components/icons/px-icon-base";
import {
  PXIconSliders,
  PXIconCopy,
  PXIconCheck,
  PXIconSearch,
  PXIconRefresh,
  PXIconPlus,
  PXIconMinus,
} from "@/components/icons";
import { SyntaxHighlighter, CodeWrapButton } from "@/components/ui/syntax-highlighter";
import { cn } from "@/lib/utils";

const COLOR_SWATCHES = [
  { id: "currentColor", label: "Inherit", value: "currentColor" },
  { id: "coral", label: "Coral", value: "#cc785c" },
  { id: "ink", label: "Ink", value: "#141413" },
  { id: "paper", label: "Paper", value: "#faf9f5" },
  { id: "emerald", label: "Emerald", value: "#5db872" },
  { id: "sapphire", label: "Sapphire", value: "#79c0ff" },
  { id: "amber", label: "Amber", value: "#e5c07b" },
];

const SURFACES = [
  { id: "paper", label: "Paper Canvas", bgClass: "bg-[#faf9f5] dark:bg-[#181715] text-[#141413] dark:text-[#faf9f5] border-[#e6dfd8] dark:border-[#252320]" },
  { id: "dark", label: "Dark Surface", bgClass: "bg-[#141413] text-[#faf9f5] border-[#2e2c28]" },
  { id: "white", label: "Pure White", bgClass: "bg-white text-[#141413] border-[#e6dfd8]" },
  { id: "coral", label: "Coral Brand", bgClass: "bg-[#cc785c] text-white border-[#b8694f]" },
] as const;

type SurfaceType = (typeof SURFACES)[number]["id"];
type PreviewContext = "standalone" | "button" | "input" | "nav" | "toolbar" | "badge";

export function PlaygroundWorkbench() {
  const searchParams = useSearchParams();

  // Initial state from URL parameters if available
  const initialIconParam = searchParams.get("icon")?.replace(/^px-/, "") || "search";
  const initialSizeParam = parseInt(searchParams.get("size") || "24", 10) || 24;
  const initialFilledParam = searchParams.get("filled") === "true";

  const [selectedIconName, setSelectedIconName] = React.useState(initialIconParam);
  const [size, setSize] = React.useState<number>(initialSizeParam);
  const [color, setColor] = React.useState<string>("currentColor");
  const [surface, setSurface] = React.useState<SurfaceType>("paper");
  const [filled, setFilled] = React.useState<boolean>(initialFilledParam);
  const [animated, setAnimated] = React.useState<boolean>(false);
  const [previewContext, setPreviewContext] = React.useState<PreviewContext>("standalone");
  const [outputTab, setOutputTab] = React.useState<"react" | "native" | "registry" | "svg">("react");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [copied, setCopied] = React.useState(false);
  const [codeWrapped, setCodeWrapped] = React.useState(false);

  const selectedIcon = React.useMemo(() => {
    return ICONS_CATALOG.find((i) => i.name === selectedIconName) || ICONS_CATALOG[0];
  }, [selectedIconName]);

  const hasFilled = Boolean(selectedIcon.filled && selectedIcon.filled.length > 0);
  const hasAnimation = Boolean(selectedIcon.animation);

  // Sync state into shareable URL query without page reloads
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams();
      params.set("icon", `px-${selectedIcon.name}`);
      params.set("size", size.toString());
      if (filled) params.set("filled", "true");
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState(null, "", newUrl);
    }
  }, [selectedIcon.name, size, filled]);

  const filteredIcons = React.useMemo(() => {
    if (!searchQuery.trim()) return ICONS_CATALOG.slice(0, 18);
    const q = searchQuery.toLowerCase().trim();
    return ICONS_CATALOG.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        (i.title && i.title.toLowerCase().includes(q)) ||
        i.tags.some((t) => t.toLowerCase().includes(q))
    ).slice(0, 30);
  }, [searchQuery]);

  const componentName = toPXComponentName(selectedIcon.name);

  // Dynamic code output
  const reactSnippet = `import { ${componentName} } from "@pxui/react";

export function Example() {
  return (
    <${componentName}
      size={${size}}${color !== "currentColor" ? `\n      color="${color}"` : ""}${filled ? `\n      filled` : ""}${animated ? `\n      animated` : ""}
      aria-label="${selectedIcon.title || selectedIcon.name}"
    />
  );
}`;

  const nativeSnippet = generateReactNativeCode(selectedIcon);
  const registryCmd = `npx shadcn@latest add https://pxui.dev/r/px-${selectedIcon.name}.json`;
  const rawSvg = generateSvgString(selectedIcon, filled);

  const getActiveCode = () => {
    switch (outputTab) {
      case "react":
        return reactSnippet;
      case "native":
        return nativeSnippet;
      case "registry":
        return registryCmd;
      case "svg":
        return rawSvg;
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getActiveCode());
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // quiet fail
    }
  };

  return (
    <div className="space-y-8 py-8 select-none">
      {/* Header */}
      <section className="space-y-2 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#cc785c]/10 text-[#cc785c] font-mono text-xs font-bold uppercase tracking-wider border border-[#cc785c]/20">
          <PXIconSliders size={14} />
          <span>DEVELOPER WORKBENCH</span>
        </div>

        <h1 className="font-sans text-4xl font-bold tracking-tight text-[#141413] dark:text-[#faf9f5]">
          Interactive Playground
        </h1>

        <p className="font-sans text-base text-[#6c6a64] dark:text-[#8e8b82]">
          Experiment with optical sizes, live state variations, context previews, and dynamic code generation.
        </p>
      </section>

      {/* 3-Column Playground Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* COLUMN 1: CONTROLS */}
        <div className="lg:col-span-4 rounded-2xl border border-[#e6dfd8] dark:border-[#2e2c28] bg-white dark:bg-[#181715] p-5 space-y-6 shadow-xs font-mono text-xs">
          <div className="flex items-center justify-between border-b border-[#e6dfd8] dark:border-[#2e2c28] pb-3">
            <span className="font-bold text-xs uppercase tracking-wider text-[#cc785c]">
              CONTROLS
            </span>
            <span className="text-[10px] text-[#8e8b82]">px-{selectedIcon.name}</span>
          </div>

          {/* 1. Icon Selection */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase text-[#8e8b82] font-bold block">
              SELECT ICON
            </label>
            <div className="relative">
              <PXIconSearch size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8e8b82]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search catalog..."
                className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-[#e6dfd8] dark:border-[#2e2c28] bg-[#faf9f5] dark:bg-[#141413] text-[#141413] dark:text-[#faf9f5] focus:outline-none focus:ring-1 focus:ring-[#cc785c]"
              />
            </div>

            {/* Quick Icon Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto workspace-scrollbar py-1 max-h-24 flex-wrap">
              {filteredIcons.map((i) => (
                <button
                  key={i.name}
                  type="button"
                  onClick={() => setSelectedIconName(i.name)}
                  className={cn(
                    "px-2 py-1 rounded text-[11px] border transition-all cursor-pointer inline-flex items-center gap-1",
                    selectedIcon.name === i.name
                      ? "bg-[#cc785c] text-white border-[#cc785c] font-bold"
                      : "bg-[#faf9f5] dark:bg-[#141413] border-[#e6dfd8] dark:border-[#2e2c28] text-[#141413] dark:text-[#faf9f5] hover:border-[#cc785c]"
                  )}
                >
                  <PXIconBase definition={i} size={12} />
                  <span>{i.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Optical Size Controls */}
          <div className="space-y-2 border-t border-[#e6dfd8] dark:border-[#2e2c28] pt-4">
            <div className="flex items-center justify-between text-[10px] uppercase text-[#8e8b82] font-bold">
              <span>OPTICAL SIZE</span>
              <span className="text-[#141413] dark:text-[#faf9f5] font-mono">{size}px</span>
            </div>

            <div className="grid grid-cols-5 gap-1.5">
              {[16, 20, 24, 32, 48].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={cn(
                    "py-1.5 rounded border text-center transition-all cursor-pointer",
                    size === s
                      ? "bg-[#141413] dark:bg-[#faf9f5] text-[#faf9f5] dark:text-[#141413] font-bold border-current"
                      : "bg-[#faf9f5] dark:bg-[#141413] border-[#e6dfd8] dark:border-[#2e2c28] text-[#6c6a64] dark:text-[#8e8b82] hover:text-foreground"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Color Swatches */}
          <div className="space-y-2 border-t border-[#e6dfd8] dark:border-[#2e2c28] pt-4">
            <label className="text-[10px] uppercase text-[#8e8b82] font-bold block">
              ICON COLOR
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {COLOR_SWATCHES.map((sw) => (
                <button
                  key={sw.id}
                  type="button"
                  onClick={() => setColor(sw.value)}
                  className={cn(
                    "flex items-center gap-1.5 px-2 py-1 rounded border text-[10px] transition-all cursor-pointer",
                    color === sw.value
                      ? "border-[#cc785c] bg-[#cc785c]/15 text-[#cc785c] font-bold ring-1 ring-[#cc785c]"
                      : "border-[#e6dfd8] dark:border-[#2e2c28] bg-[#faf9f5] dark:bg-[#141413] text-[#6c6a64] dark:text-[#8e8b82]"
                  )}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-black/20 shrink-0"
                    style={{ backgroundColor: sw.value === "currentColor" ? "#8e8b82" : sw.value }}
                  />
                  <span>{sw.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Surface Selector */}
          <div className="space-y-2 border-t border-[#e6dfd8] dark:border-[#2e2c28] pt-4">
            <label className="text-[10px] uppercase text-[#8e8b82] font-bold block">
              BACKGROUND STAGE
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {SURFACES.map((sf) => (
                <button
                  key={sf.id}
                  type="button"
                  onClick={() => setSurface(sf.id)}
                  className={cn(
                    "px-2.5 py-1.5 rounded border text-left text-[10px] transition-all cursor-pointer",
                    surface === sf.id
                      ? "border-[#cc785c] bg-[#cc785c]/10 text-[#cc785c] font-bold"
                      : "border-[#e6dfd8] dark:border-[#2e2c28] bg-[#faf9f5] dark:bg-[#141413] text-[#6c6a64] dark:text-[#8e8b82]"
                  )}
                >
                  {sf.label}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Variant & Animation Toggles */}
          <div className="space-y-2 border-t border-[#e6dfd8] dark:border-[#2e2c28] pt-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase text-[#8e8b82] font-bold">FILLED VARIANT</span>
              <button
                type="button"
                disabled={!hasFilled}
                onClick={() => setFilled(!filled)}
                className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer",
                  !hasFilled
                    ? "opacity-30 cursor-not-allowed text-[#8e8b82]"
                    : filled
                    ? "bg-[#cc785c] text-white"
                    : "bg-[#faf9f5] dark:bg-[#141413] border border-[#e6dfd8] dark:border-[#2e2c28] text-[#8e8b82]"
                )}
              >
                {hasFilled ? (filled ? "Active" : "Outline") : "No Variant"}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase text-[#8e8b82] font-bold">ANIMATION</span>
              <button
                type="button"
                disabled={!hasAnimation}
                onClick={() => setAnimated(!animated)}
                className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer",
                  !hasAnimation
                    ? "opacity-30 cursor-not-allowed text-[#8e8b82]"
                    : animated
                    ? "bg-[#5db872] text-[#141413]"
                    : "bg-[#faf9f5] dark:bg-[#141413] border border-[#e6dfd8] dark:border-[#2e2c28] text-[#8e8b82]"
                )}
              >
                {hasAnimation ? (animated ? "Playing" : "Static") : "Static"}
              </button>
            </div>
          </div>
        </div>

        {/* COLUMN 2: PREVIEWS & CONTEXTS */}
        <div className="lg:col-span-5 space-y-4 font-mono text-xs">
          {/* Context Previews Selector */}
          <div className="flex items-center gap-1 overflow-x-auto workspace-scrollbar p-1 rounded-xl bg-white dark:bg-[#181715] border border-[#e6dfd8] dark:border-[#2e2c28]">
            {(
              [
                { id: "standalone", label: "Standalone" },
                { id: "button", label: "Button" },
                { id: "input", label: "Input" },
                { id: "nav", label: "Navigation" },
                { id: "toolbar", label: "Toolbar" },
                { id: "badge", label: "Badge" },
              ] as const
            ).map((ctx) => (
              <button
                key={ctx.id}
                type="button"
                onClick={() => setPreviewContext(ctx.id)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all cursor-pointer",
                  previewContext === ctx.id
                    ? "bg-[#cc785c] text-white shadow-xs"
                    : "text-[#6c6a64] dark:text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5]"
                )}
              >
                {ctx.label}
              </button>
            ))}
          </div>

          {/* Active Surface Preview Canvas */}
          <div
            className={cn(
              "rounded-2xl border p-8 flex flex-col items-center justify-center min-h-[360px] relative overflow-hidden transition-colors duration-200 shadow-xs",
              SURFACES.find((s) => s.id === surface)?.bgClass
            )}
          >
            {/* Standalone Specimen */}
            {previewContext === "standalone" && (
              <div className="flex flex-col items-center justify-center space-y-6">
                <div className="relative p-8 rounded-xl border border-current/10 flex items-center justify-center">
                  <PXIconBase
                    definition={selectedIcon}
                    size={size}
                    color={color}
                    filled={filled}
                    animated={animated}
                    className="transition-all duration-150"
                  />
                </div>
                <div className="text-[10px] opacity-70 font-mono">
                  Canonical Render · {size}×{size}px
                </div>
              </div>
            )}

            {/* Context A: Icon Button */}
            {previewContext === "button" && (
              <div className="space-y-4 w-full max-w-xs text-center font-sans">
                <div className="text-[11px] font-mono opacity-60 uppercase">BUTTON CONTEXT</div>
                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#cc785c] text-white font-semibold text-xs shadow-md hover:bg-[#b8694f] transition-all cursor-pointer"
                  >
                    <PXIconBase definition={selectedIcon} size={18} color="currentColor" filled={filled} animated={animated} />
                    <span>Primary Action</span>
                  </button>

                  <button
                    type="button"
                    className="p-2.5 rounded-lg border border-current/30 hover:bg-current/10 transition-colors cursor-pointer"
                    title={selectedIcon.title || selectedIcon.name}
                  >
                    <PXIconBase definition={selectedIcon} size={18} color={color} filled={filled} animated={animated} />
                  </button>
                </div>
              </div>
            )}

            {/* Context B: Input Prefix */}
            {previewContext === "input" && (
              <div className="space-y-3 w-full max-w-sm font-sans">
                <div className="text-[11px] font-mono opacity-60 uppercase text-center">INPUT PREFIX CONTEXT</div>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-80">
                    <PXIconBase definition={selectedIcon} size={18} color={color} filled={filled} animated={animated} />
                  </div>
                  <input
                    type="text"
                    readOnly
                    value="Search repository or documents..."
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-current/20 bg-current/5 text-xs font-sans focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Context C: Navigation Item */}
            {previewContext === "nav" && (
              <div className="space-y-3 w-full max-w-xs font-sans">
                <div className="text-[11px] font-mono opacity-60 uppercase text-center">NAVIGATION CONTEXT</div>
                <div className="p-1 rounded-xl border border-current/15 bg-current/5 space-y-1">
                  <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#cc785c] text-white text-xs font-semibold shadow-xs">
                    <div className="flex items-center gap-2.5">
                      <PXIconBase definition={selectedIcon} size={16} color="currentColor" filled={filled} animated={animated} />
                      <span>Active Section</span>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/20">NEW</span>
                  </div>

                  <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs opacity-75 hover:opacity-100 transition-opacity">
                    <PXIconBase definition={selectedIcon} size={16} color={color} filled={filled} animated={animated} />
                    <span>Secondary Item</span>
                  </div>
                </div>
              </div>
            )}

            {/* Context D: Toolbar Group */}
            {previewContext === "toolbar" && (
              <div className="space-y-3 w-full max-w-xs font-sans text-center">
                <div className="text-[11px] font-mono opacity-60 uppercase">TOOLBAR GROUP CONTEXT</div>
                <div className="inline-flex items-center p-1 rounded-xl border border-current/20 bg-current/5 gap-1">
                  <button type="button" className="p-2 rounded-lg bg-current/15 text-current shadow-2xs">
                    <PXIconBase definition={selectedIcon} size={18} color={color} filled={filled} animated={animated} />
                  </button>
                  <button type="button" className="p-2 rounded-lg hover:bg-current/10 opacity-70">
                    <PXIconPlus size={18} />
                  </button>
                  <button type="button" className="p-2 rounded-lg hover:bg-current/10 opacity-70">
                    <PXIconMinus size={18} />
                  </button>
                  <button type="button" className="p-2 rounded-lg hover:bg-current/10 opacity-70">
                    <PXIconRefresh size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Context E: Status Badge */}
            {previewContext === "badge" && (
              <div className="space-y-4 w-full max-w-xs font-sans text-center">
                <div className="text-[11px] font-mono opacity-60 uppercase">STATUS BADGE CONTEXT</div>
                <div className="flex items-center justify-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                    <PXIconBase definition={selectedIcon} size={14} color="currentColor" filled={filled} animated={animated} />
                    <span>System Online</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#cc785c]/40 bg-[#cc785c]/10 text-[#cc785c] text-xs font-semibold">
                    <PXIconBase definition={selectedIcon} size={14} color="currentColor" filled={filled} animated={animated} />
                    <span>Feature Flag</span>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* COLUMN 3: OUTPUT */}
        <div className="lg:col-span-3 space-y-4 font-mono text-xs">
          <div className="rounded-2xl border border-[#e6dfd8] dark:border-[#2e2c28] bg-white dark:bg-[#181715] p-5 space-y-4 shadow-xs text-[#141413] dark:text-[#faf9f5]">
            <div className="flex items-center justify-between border-b border-[#e6dfd8] dark:border-[#2e2c28] pb-3">
              <span className="font-bold text-xs uppercase tracking-wider text-[#cc785c]">
                OUTPUT CODE
              </span>
              <div className="flex items-center gap-2">
                <CodeWrapButton
                  wrapped={codeWrapped}
                  onToggle={() => setCodeWrapped(!codeWrapped)}
                  theme="dark"
                  size="sm"
                />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="text-[#cc785c] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                >
                  {copied ? (
                    <>
                      <PXIconCheck size={12} className="text-[#5db872]" />
                      <span className="text-[#5db872]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <PXIconCopy size={12} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Target Output Tabs */}
            <div className="flex items-center gap-1 border-b border-[#e6dfd8] dark:border-[#2e2c28] pb-2 text-[11px]">
              {(
                [
                  { id: "react", label: "React" },
                  { id: "native", label: "Native" },
                  { id: "registry", label: "CLI" },
                  { id: "svg", label: "SVG" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setOutputTab(tab.id)}
                  className={cn(
                    "px-2 py-1 rounded transition-colors cursor-pointer",
                    outputTab === tab.id
                      ? "bg-[#cc785c] text-white font-bold"
                      : "text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5]"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Live Syntax-highlighted code output */}
            <div className={cn("rounded-xl border border-[#2e2c28] bg-[#141413] p-3 text-[#faf9f5] max-h-80 text-xs", codeWrapped ? "overflow-x-hidden" : "overflow-x-auto workspace-scrollbar")}>
              <SyntaxHighlighter
                code={getActiveCode()}
                language={outputTab === "registry" ? "bash" : outputTab === "svg" ? "svg" : "tsx"}
                theme="dark"
                showLineNumbers={false}
                wrap={codeWrapped}
                onWrapChange={setCodeWrapped}
              />
            </div>

            {/* Local Copy Actions Strip */}
            <div className="space-y-1.5 pt-2">
              <button
                type="button"
                onClick={handleCopy}
                className="w-full py-2 px-3 rounded-lg bg-[#cc785c] hover:bg-[#b8694f] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {copied ? <PXIconCheck size={14} /> : <PXIconCopy size={14} />}
                <span>{copied ? "Copied to Clipboard!" : "Copy Code Snippet"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
