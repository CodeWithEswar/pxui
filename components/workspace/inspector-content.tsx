"use client";

import * as React from "react";
import { IconDefinition } from "@/lib/icons/schema";
import { toPXComponentName, generateSvgString, generateReactNativeCode } from "@/lib/compiler";
import { PXIconBase } from "@/components/icons/px-icon-base";
import { ICONS_CATALOG } from "@/lib/icons/catalog";
import { cn } from "@/lib/utils";
import {
  PXIconCheck,
  PXIconCopy,
  PXIconPlay,
  PXIconPause,
  PXIconRefresh,
  PXIconSparkles,
  PXIconExternalLink,
  PXIconSun,
  PXIconMoon,
} from "@/components/icons";
import { SyntaxHighlighter, CodeWrapButton } from "@/components/ui/syntax-highlighter";
import { useTheme } from "next-themes";
import { InspectorTab } from "./hooks/use-icon-selection";

interface InspectorContentProps {
  icon: IconDefinition;
  activeTab: InspectorTab;
  onSelectIcon?: (icon: IconDefinition) => void;
  className?: string;
}

export function InspectorContent({
  icon,
  activeTab,
  onSelectIcon,
  className,
}: InspectorContentProps) {
  const componentName = toPXComponentName(icon.name);
  const hasFilled = Boolean(icon.filled && icon.filled.length > 0);
  const hasAnimation = Boolean(icon.animation);
  const animationFrames = [1, 2, 3, 4, 5];

  // Global theme awareness
  const { resolvedTheme } = useTheme();

  // Specimen tooling state
  const [filled, setFilled] = React.useState(false);
  const [animated, setAnimated] = React.useState(Boolean(icon.animation));
  const [showGrid, setShowGrid] = React.useState(true);
  const [showBounds, setShowBounds] = React.useState(true);
  const [showAxes, setShowAxes] = React.useState(true);
  const [showBaseline, setShowBaseline] = React.useState(false);
  const [copiedAction, setCopiedAction] = React.useState<string | null>(null);

  // Preview stage theme: dark or light (deterministic default to prevent SSR mismatch)
  const [stageTheme, setStageTheme] = React.useState<"dark" | "light">("dark");
  // Code block theme: dark or light (deterministic default to prevent SSR mismatch)
  const [codeTheme, setCodeTheme] = React.useState<"dark" | "light">("dark");
  const [codeWrap, setCodeWrap] = React.useState(false);
  const [pathsWrap, setPathsWrap] = React.useState(false);
  const userSelectedStageRef = React.useRef(false);
  const userSelectedCodeRef = React.useRef(false);

  // Synchronize specimen stage & code themes when global app theme changes
  React.useEffect(() => {
    if (resolvedTheme === "light" || resolvedTheme === "dark") {
      if (!userSelectedStageRef.current) setStageTheme(resolvedTheme);
      if (!userSelectedCodeRef.current) setCodeTheme(resolvedTheme);
    }
  }, [resolvedTheme]);

  // Animation timeline state
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [activeFrame, setActiveFrame] = React.useState<number | null>(null);

  // Code tab state
  const [codeLang, setCodeLang] = React.useState<"react" | "react-native" | "registry" | "svg">("react");

  // Reset toggles when icon changes
  React.useEffect(() => {
    setFilled(false);
    setAnimated(Boolean(icon.animation));
    setActiveFrame(null);
    setIsPlaying(true);
  }, [icon.name]);

  const [origin, setOrigin] = React.useState("https://pxui.dev");
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAction(id);
      setTimeout(() => setCopiedAction(null), 1800);
    } catch {
      // quiet fail
    }
  };

  const registryCmd = `npx shadcn@latest add ${origin}/r/px-${icon.name}.json`;

  const reactSnippet = `import { ${componentName} } from "@pxui/react";

export function Example() {
  return (
    <${componentName}
      size={24}${filled ? "\n      filled" : ""}${animated ? "\n      animated" : ""}
      className="text-primary"
    />
  );
}`;

  const reactNativeSnippet = generateReactNativeCode(icon);
  const svgSnippet = generateSvgString(icon, filled);

  // Related sibling icons in the same category
  const relatedIcons = React.useMemo(() => {
    return ICONS_CATALOG.filter(
      (i) => i.name !== icon.name && (i.category === icon.category || i.tags.some((t) => icon.tags.includes(t)))
    ).slice(0, 4);
  }, [icon]);

  return (
    <div
      className={cn(
        "min-h-0 flex-1 overflow-y-auto workspace-scrollbar p-3.5 sm:p-5 space-y-4 sm:space-y-6 text-[#141413] dark:text-[#faf9f5] touch-pan-y overscroll-contain",
        className
      )}
    >
      {/* TAB A: SPECIMEN VIEW */}
      {activeTab === "specimen" && (
        <div className="space-y-3 sm:space-y-4">
          {/* Specimen Stage (24x24 integer grid) - Supports Dark & Light Themes */}
          <div
            className={cn(
              "relative w-full h-44 sm:h-56 md:aspect-square md:h-auto max-h-[220px] sm:max-h-[280px] md:max-h-none rounded-xl border flex items-center justify-center overflow-hidden shadow-xl transition-colors duration-200 touch-pan-y",
              stageTheme === "dark"
                ? "border-[#2e2c28] bg-[#141413] text-[#faf9f5]"
                : "border-[#e6dfd8] bg-white text-[#141413] shadow-inner"
            )}
          >
            {/* 24x24 pixel grid overlay */}
            {showGrid && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    stageTheme === "dark"
                      ? "linear-gradient(to right, rgba(250,249,245,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(250,249,245,0.18) 1px, transparent 1px)"
                      : "linear-gradient(to right, rgba(20,20,19,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,20,19,0.1) 1px, transparent 1px)",
                  backgroundSize: "4.166667% 4.166667%", // 100% / 24
                }}
              />
            )}

            {/* Centered Optical Bounding Box 20x20 safe boundary marker */}
            {showBounds && (
              <div
                className={cn(
                  "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-xs border border-dashed transition-all",
                  "w-[76px] h-[76px] sm:w-[124px] sm:h-[124px]",
                  stageTheme === "dark" ? "border-primary/45" : "border-primary/65"
                )}
              />
            )}

            {/* Optical center crosshair axes */}
            {showAxes && (
              <>
                <div
                  className={cn(
                    "absolute left-0 right-0 top-1/2 h-[1px] pointer-events-none",
                    stageTheme === "dark" ? "bg-primary/25" : "bg-primary/35"
                  )}
                />
                <div
                  className={cn(
                    "absolute top-0 bottom-0 left-1/2 w-[1px] pointer-events-none",
                    stageTheme === "dark" ? "bg-primary/25" : "bg-primary/35"
                  )}
                />
              </>
            )}

            {/* Baseline Indicator */}
            {showBaseline && (
              <div
                className={cn(
                  "absolute left-6 right-6 top-1/2 translate-y-[26px] sm:translate-y-[44px] h-[1px] pointer-events-none",
                  stageTheme === "dark" ? "bg-[#5db8a6]/40" : "bg-[#2e7d6b]/50"
                )}
              />
            )}

            {/* Optically Centered Scaled Icon */}
            <div
              className={cn(
                "relative z-10 transition-colors duration-200 flex items-center justify-center",
                stageTheme === "dark" ? "text-[#faf9f5]" : "text-[#141413]"
              )}
            >
              {/* Mobile: 72px (3x canonical scale) */}
              <div className="sm:hidden">
                <PXIconBase
                  definition={icon}
                  size={72}
                  filled={filled}
                  animated={animated && isPlaying}
                />
              </div>
              {/* Desktop: 120px (5x canonical scale) */}
              <div className="hidden sm:block">
                <PXIconBase
                  definition={icon}
                  size={120}
                  filled={filled}
                  animated={animated && isPlaying}
                />
              </div>
            </div>

            {/* Bottom Specimen Technical Metadata Readout */}
            <div
              className={cn(
                "absolute bottom-2 left-2.5 sm:bottom-2.5 sm:left-3 font-mono text-[8px] sm:text-[9px] tracking-wider flex items-center gap-1.5 sm:gap-2",
                stageTheme === "dark" ? "text-[#8e8b82]" : "text-[#6c6a64]"
              )}
            >
              <span>GRID 24×24</span>
              <span className="opacity-40">·</span>
              <span className="sm:hidden">SCALE 3×</span>
              <span className="hidden sm:inline">SCALE 5×</span>
              <span className="opacity-40">·</span>
              <span>VIEWBOX 0 0 24 24</span>
            </div>

            {/* Stage theme badge indicator */}
            <div
              className={cn(
                "absolute top-2 right-2.5 sm:top-2.5 sm:right-3 font-mono text-[8px] sm:text-[9px] uppercase tracking-wider font-semibold",
                stageTheme === "dark" ? "text-[#8e8b82]" : "text-[#6c6a64]"
              )}
            >
              {stageTheme} THEME
            </div>
          </div>

          {/* Overlays & Style Controls Toolbar with Dark/Light Switcher */}
          <div className="flex items-center justify-between gap-1.5 py-0.5 text-xs font-mono overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => setShowGrid(!showGrid)}
                className={cn(
                  "h-7 px-2 rounded text-[10px] font-mono border transition-all cursor-pointer",
                  showGrid
                    ? "bg-[#ede8e1] dark:bg-[#282622] border-[#d8d3cb] dark:border-[#3d3a34] text-[#141413] dark:text-[#faf9f5] font-semibold shadow-2xs"
                    : "border-[#e6dfd8] dark:border-[#252320] bg-white dark:bg-transparent text-[#6c6a64] dark:text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5]"
                )}
              >
                Grid
              </button>
              <button
                type="button"
                onClick={() => setShowAxes(!showAxes)}
                className={cn(
                  "h-7 px-2 rounded text-[10px] font-mono border transition-all cursor-pointer",
                  showAxes
                    ? "bg-[#ede8e1] dark:bg-[#282622] border-[#d8d3cb] dark:border-[#3d3a34] text-[#141413] dark:text-[#faf9f5] font-semibold shadow-2xs"
                    : "border-[#e6dfd8] dark:border-[#252320] bg-white dark:bg-transparent text-[#6c6a64] dark:text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5]"
                )}
              >
                Axes
              </button>
              <button
                type="button"
                onClick={() => setShowBounds(!showBounds)}
                className={cn(
                  "h-7 px-2 rounded text-[10px] font-mono border transition-all cursor-pointer",
                  showBounds
                    ? "bg-[#ede8e1] dark:bg-[#282622] border-[#d8d3cb] dark:border-[#3d3a34] text-[#141413] dark:text-[#faf9f5] font-semibold shadow-2xs"
                    : "border-[#e6dfd8] dark:border-[#252320] bg-white dark:bg-transparent text-[#6c6a64] dark:text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5]"
                )}
              >
                Bounds
              </button>
              <button
                type="button"
                onClick={() => setShowBaseline(!showBaseline)}
                className={cn(
                  "h-7 px-2 rounded text-[10px] font-mono border transition-all cursor-pointer",
                  showBaseline
                    ? "bg-[#ede8e1] dark:bg-[#282622] border-[#d8d3cb] dark:border-[#3d3a34] text-[#141413] dark:text-[#faf9f5] font-semibold shadow-2xs"
                    : "border-[#e6dfd8] dark:border-[#252320] bg-white dark:bg-transparent text-[#6c6a64] dark:text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5]"
                )}
              >
                Base
              </button>
            </div>

            {/* Right Controls: Theme Switcher & Style */}
            <div className="flex items-center gap-1.5 shrink-0 ml-auto">
              {/* Preview Stage Theme Toggle */}
              <div className="flex items-center gap-0.5 border border-[#e6dfd8] dark:border-[#2e2c28] rounded p-0.5 bg-white dark:bg-[#181715] h-7">
                <button
                  type="button"
                  onClick={() => {
                    userSelectedStageRef.current = true;
                    setStageTheme("dark");
                  }}
                  className={cn(
                    "flex items-center gap-1 h-full px-1.5 rounded text-[10px] font-mono transition-all cursor-pointer",
                    stageTheme === "dark"
                      ? "bg-[#282622] text-[#faf9f5] font-bold shadow-2xs"
                      : "text-[#6c6a64] dark:text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5]"
                  )}
                  title="Dark preview background"
                >
                  <PXIconMoon size={11} />
                  <span className="hidden xs:inline">Dark</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    userSelectedStageRef.current = true;
                    setStageTheme("light");
                  }}
                  className={cn(
                    "flex items-center gap-1 h-full px-1.5 rounded text-[10px] font-mono transition-all cursor-pointer",
                    stageTheme === "light"
                      ? "bg-[#ede8e1] dark:bg-[#faf9f5] text-[#141413] font-bold shadow-2xs"
                      : "text-[#6c6a64] dark:text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5]"
                  )}
                  title="Light paper preview background"
                >
                  <PXIconSun size={11} />
                  <span className="hidden xs:inline">Light</span>
                </button>
              </div>

              {hasFilled && (
                <button
                  type="button"
                  onClick={() => setFilled(!filled)}
                  className={cn(
                    "h-7 px-2 rounded text-[10px] font-mono border transition-all cursor-pointer",
                    filled
                      ? "bg-primary text-white border-primary font-bold shadow-2xs"
                      : "border-[#e6dfd8] dark:border-[#2e2c28] bg-white dark:bg-[#22201d] text-[#6c6a64] dark:text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5]"
                  )}
                >
                  Filled
                </button>
              )}
            </div>
          </div>

          {/* Stepped Pixel Animation Timeline Sequencer */}
          {hasAnimation && (
            <div className="p-3.5 rounded-lg border border-[#e6dfd8] dark:border-[#2e2c28] bg-[#faf9f5] dark:bg-[#1d1b18] space-y-2.5">
              <div className="flex items-center justify-between text-xs font-sans font-medium text-[#141413] dark:text-[#faf9f5]">
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#e8a55a]">
                  <PXIconSparkles size={13} className="text-[#e8a55a]" />
                  <span>STEPPED FRAME SEQUENCER</span>
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1 rounded hover:bg-[#ede8e1] dark:hover:bg-[#282622] text-[#6c6a64] dark:text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5] cursor-pointer"
                    title={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <PXIconPause size={12} /> : <PXIconPlay size={12} />}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveFrame(null);
                      setIsPlaying(true);
                    }}
                    className="p-1 rounded hover:bg-[#ede8e1] dark:hover:bg-[#282622] text-[#6c6a64] dark:text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5] cursor-pointer"
                    title="Reset timeline"
                  >
                    <PXIconRefresh size={12} />
                  </button>
                </div>
              </div>

              {/* Pixel-Frame Timeline */}
              <div className="grid grid-cols-5 gap-1.5 pt-1">
                {animationFrames.map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => {
                      setActiveFrame(f);
                      setIsPlaying(false);
                    }}
                    className={cn(
                      "py-1 rounded font-mono text-[10px] border transition-all text-center cursor-pointer",
                      activeFrame === f
                        ? "bg-primary text-white border-primary font-bold shadow-xs"
                        : "border-[#e6dfd8] dark:border-[#2e2c28] bg-white dark:bg-[#181715] text-[#6c6a64] dark:text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5] hover:border-[#d8d3cb] dark:hover:border-[#3d3a34]"
                    )}
                  >
                    0{f} ■
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB B: OPTICAL SIZES VIEW */}
      {activeTab === "sizes" && (
        <div className="space-y-4">
          <div className="text-[11px] font-mono text-[#6c6a64] dark:text-[#8e8b82] uppercase tracking-wider font-semibold">
            OPTICAL SCALING AT CANONICAL RESOLUTIONS
          </div>

          <div className="space-y-3">
            {[
              { size: 16, label: "16px Micro (UI Badges, Breadcrumbs)" },
              { size: 20, label: "20px Dense (Compact Actions, Tables)" },
              { size: 24, label: "24px Standard (Primary Buttons, Nav)" },
              { size: 32, label: "32px Emphasized (Feature Headings)" },
              { size: 48, label: "48px Display (Foundry Specimen)" },
            ].map((spec) => (
              <div
                key={spec.size}
                className="p-3 rounded-lg border border-[#e6dfd8] dark:border-[#2e2c28] bg-white dark:bg-[#141413] flex items-center justify-between gap-4 shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 flex items-center justify-center text-foreground">
                    <PXIconBase definition={icon} size={spec.size} filled={filled} />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-[#141413] dark:text-[#faf9f5] font-medium">
                      {spec.size}×{spec.size} px
                    </div>
                    <div className="font-sans text-[11px] text-[#6c6a64] dark:text-[#8e8b82]">
                      {spec.label}
                    </div>
                  </div>
                </div>

                <span className="font-mono text-[10px] text-[#8e8b82] dark:text-[#6c6a64] uppercase border border-[#e6dfd8] dark:border-[#252320] px-1.5 py-0.5 rounded">
                  1:1 INTEGER
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB C: GEOMETRY VIEW */}
      {activeTab === "geometry" && (
        <div className="space-y-4">
          <div className="text-[11px] font-mono text-[#6c6a64] dark:text-[#8e8b82] uppercase tracking-wider font-semibold">
            INTEGER VECTOR COORDINATES
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-3 rounded-lg border border-[#e6dfd8] dark:border-[#2e2c28] bg-white dark:bg-[#141413] shadow-2xs">
              <span className="text-[#6c6a64] dark:text-[#8e8b82] block text-[10px]">VIEWBOX</span>
              <span className="text-[#141413] dark:text-[#faf9f5] font-semibold text-sm">0 0 24 24</span>
            </div>
            <div className="p-3 rounded-lg border border-[#e6dfd8] dark:border-[#2e2c28] bg-white dark:bg-[#141413] shadow-2xs">
              <span className="text-[#6c6a64] dark:text-[#8e8b82] block text-[10px]">PATH COMMANDS</span>
              <span className="text-[#141413] dark:text-[#faf9f5] font-semibold text-sm">{icon.paths.length} Paths</span>
            </div>
          </div>

          {/* Path Definition Code Box */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between font-mono text-[10px] text-[#6c6a64] dark:text-[#8e8b82] uppercase tracking-wider font-semibold">
              <span>Vector Definition (d-attributes)</span>
              <CodeWrapButton
                wrapped={pathsWrap}
                onToggle={() => setPathsWrap(!pathsWrap)}
                theme={stageTheme}
                size="sm"
              />
            </div>
            <pre
              className={cn(
                "p-3 rounded-lg border border-[#e6dfd8] dark:border-[#2e2c28] bg-white dark:bg-[#141413] text-[10px] font-mono text-[#b45309] dark:text-[#ce9178] leading-relaxed max-h-40 select-text shadow-2xs",
                pathsWrap ? "whitespace-pre-wrap break-all" : "overflow-x-auto whitespace-pre"
              )}
            >
              {icon.paths.map((p, idx) => (
                <div key={idx} className={pathsWrap ? "break-all" : "truncate"}>
                  d="{p.d}"
                </div>
              ))}
            </pre>
          </div>
        </div>
      )}

      {/* TAB D: CODE VIEW */}
      {activeTab === "code" && (
        <div className="space-y-3 font-mono">
          {/* Lang Sub-Tabs */}
          <div className="flex items-center gap-1 border border-[#e6dfd8] dark:border-[#2e2c28] p-1 rounded-md bg-[#faf9f5] dark:bg-[#141413]">
            {[
              { id: "react", label: "React 19" },
              { id: "react-native", label: "Native" },
              { id: "registry", label: "Registry" },
              { id: "svg", label: "SVG" },
            ].map((lang) => (
              <button
                key={lang.id}
                type="button"
                onClick={() => setCodeLang(lang.id as any)}
                className={cn(
                  "flex-1 py-1 rounded text-[11px] font-mono transition-all cursor-pointer",
                  codeLang === lang.id
                    ? "bg-white dark:bg-[#282622] text-[#141413] dark:text-[#faf9f5] font-semibold border border-[#e6dfd8] dark:border-[#3d3a34] shadow-2xs"
                    : "text-[#6c6a64] dark:text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5]"
                )}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {/* Syntax-Highlighted Code Card with Dark/Light Support & Wrap */}
          <div
            className={cn(
              "relative rounded-lg border p-4 text-xs shadow-2xl transition-colors duration-200",
              codeTheme === "dark"
                ? "border-[#2e2c28] bg-[#141413] text-[#faf9f5]"
                : "border-[#e6dfd8] bg-white text-[#141413]"
            )}
          >
            <div
              className={cn(
                "flex items-center justify-between pb-2 mb-2 border-b text-[10px]",
                codeTheme === "dark" ? "border-[#252320] text-[#8e8b82]" : "border-[#e6dfd8] text-[#6c6a64]"
              )}
            >
              <span className="font-semibold truncate mr-2">
                {codeLang === "react" && "@pxui/react (TypeScript)"}
                {codeLang === "react-native" && "@pxui/react-native"}
                {codeLang === "registry" && "shadcn CLI"}
                {codeLang === "svg" && "Raw 24×24 SVG"}
              </span>

              <div className="flex items-center gap-2 shrink-0">
                {/* Code theme toggle */}
                <div
                  className={cn(
                    "flex items-center gap-0.5 border rounded p-0.5 text-[9px]",
                    codeTheme === "dark" ? "border-[#2e2c28] bg-[#1d1b18]" : "border-[#e6dfd8] bg-[#faf9f5]"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => {
                      userSelectedCodeRef.current = true;
                      setCodeTheme("dark");
                    }}
                    className={cn(
                      "flex items-center gap-1 px-1.5 py-0.5 rounded transition-all cursor-pointer",
                      codeTheme === "dark"
                        ? "bg-[#282622] text-[#faf9f5] font-bold shadow-2xs"
                        : "text-[#8e8b82] hover:text-[#faf9f5]"
                    )}
                    title="Dark code syntax"
                  >
                    <PXIconMoon size={10} />
                    <span>Dark</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      userSelectedCodeRef.current = true;
                      setCodeTheme("light");
                    }}
                    className={cn(
                      "flex items-center gap-1 px-1.5 py-0.5 rounded transition-all cursor-pointer",
                      codeTheme === "light"
                        ? "bg-white text-[#141413] font-bold shadow-2xs border border-[#e6dfd8]"
                        : "text-[#6c6a64] hover:text-[#141413]"
                    )}
                    title="Light paper code syntax"
                  >
                    <PXIconSun size={10} />
                    <span>Light</span>
                  </button>
                </div>

                {/* Wrap / Unwrap Toggle */}
                <CodeWrapButton
                  wrapped={codeWrap}
                  onToggle={() => setCodeWrap(!codeWrap)}
                  theme={codeTheme}
                  size="sm"
                />

                <button
                  type="button"
                  onClick={() => {
                    const text =
                      codeLang === "react"
                        ? reactSnippet
                        : codeLang === "react-native"
                        ? reactNativeSnippet
                        : codeLang === "registry"
                        ? registryCmd
                        : svgSnippet;
                    handleCopy(text, codeLang);
                  }}
                  className="flex items-center gap-1 text-primary hover:underline transition-colors font-mono cursor-pointer"
                >
                  {copiedAction === codeLang ? (
                    <>
                      <PXIconCheck size={12} className="text-[#3e8a50] dark:text-[#5db872]" />
                      <span className="text-[#3e8a50] dark:text-[#5db872] text-[11px]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <PXIconCopy size={12} />
                      <span className="text-[11px]">Copy Snippet</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="max-h-56 overflow-y-auto workspace-scrollbar">
              <SyntaxHighlighter
                code={
                  codeLang === "react"
                    ? reactSnippet
                    : codeLang === "react-native"
                    ? reactNativeSnippet
                    : codeLang === "registry"
                    ? registryCmd
                    : svgSnippet
                }
                language={codeLang === "registry" ? "bash" : codeLang === "svg" ? "svg" : "tsx"}
                theme={codeTheme}
                showLineNumbers={false}
                wrap={codeWrap}
                onWrapChange={setCodeWrap}
              />
            </div>
          </div>
        </div>
      )}

      {/* COMMON FOOTER: STRUCTURED TAXONOMY & METADATA */}
      <div className="pt-4 border-t border-[#e6dfd8] dark:border-[#252320] space-y-2.5 font-mono text-xs">
        <div className="text-[11px] uppercase tracking-[0.08em] text-[#6c6a64] dark:text-[#8e8b82] font-semibold">
          TAXONOMY & METADATA
        </div>
        <div className="space-y-1.5 text-[11px]">
          <div className="flex items-center justify-between py-1 border-b border-[#f0ece5] dark:border-[#201e1b]">
            <span className="text-[#6c6a64] dark:text-[#8e8b82]">Family</span>
            <span className="text-[#141413] dark:text-[#faf9f5] font-sans font-medium capitalize">
              {icon.name.split("-")[0]}
            </span>
          </div>
          <div className="flex items-center justify-between py-1 border-b border-[#f0ece5] dark:border-[#201e1b]">
            <span className="text-[#6c6a64] dark:text-[#8e8b82]">Category</span>
            <span className="text-[#141413] dark:text-[#faf9f5] font-sans">{icon.category}</span>
          </div>
          {icon.aliases && icon.aliases.length > 0 && (
            <div className="flex items-start justify-between gap-2 py-1 border-b border-[#f0ece5] dark:border-[#201e1b]">
              <span className="text-[#6c6a64] dark:text-[#8e8b82] shrink-0">Aliases</span>
              <span className="text-[#b45309] dark:text-[#ce9178] text-right truncate max-w-[180px]">
                {icon.aliases.join(", ")}
              </span>
            </div>
          )}
          <div className="flex items-start justify-between gap-2 py-1 border-b border-[#f0ece5] dark:border-[#201e1b]">
            <span className="text-[#6c6a64] dark:text-[#8e8b82] shrink-0">Tags</span>
            <span className="text-[#2563eb] dark:text-[#9cdcfe] text-right truncate max-w-[180px]">
              {icon.tags.slice(0, 4).join(", ")}
            </span>
          </div>
          <div className="flex items-center justify-between py-1 border-b border-[#f0ece5] dark:border-[#201e1b]">
            <span className="text-[#6c6a64] dark:text-[#8e8b82]">Status</span>
            <span className="text-[#3e8a50] dark:text-[#5db872] font-semibold">
              Stable (v{icon.introducedVersion || "1.0"})
            </span>
          </div>
        </div>
      </div>

      {/* SIBLING SPECIMENS */}
      {relatedIcons.length > 0 && (
        <div className="pt-3 border-t border-[#e6dfd8] dark:border-[#252320] space-y-2">
          <div className="text-[11px] font-mono uppercase tracking-[0.08em] text-[#6c6a64] dark:text-[#8e8b82] font-semibold">
            RELATED SPECIMENS
          </div>
          <div className="grid grid-cols-4 gap-2">
            {relatedIcons.map((rel) => (
              <button
                key={rel.name}
                type="button"
                onClick={() => onSelectIcon?.(rel)}
                className="p-2.5 rounded-md border border-[#e6dfd8] dark:border-[#2e2c28] bg-white dark:bg-[#141413] hover:bg-[#f5f0e8] dark:hover:bg-[#201e1b] hover:border-[#d8d3cb] dark:hover:border-[#3d3a34] flex flex-col items-center justify-center gap-1.5 transition-all text-center group cursor-pointer shadow-2xs"
                title={`Inspect ${toPXComponentName(rel.name)}`}
              >
                <PXIconBase
                  definition={rel}
                  size={20}
                  className="text-[#6c6a64] dark:text-[#8e8b82] group-hover:text-[#141413] dark:group-hover:text-[#faf9f5] transition-colors"
                />
                <span className="font-mono text-[9px] text-[#6c6a64] dark:text-[#8e8b82] truncate w-full group-hover:text-[#141413] dark:group-hover:text-[#faf9f5]">
                  {rel.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* DEDICATED CANONICAL SPECIFICATION WORKSPACE LINK */}
      <div className="pt-2 pb-1">
        <a
          href={`/icons/px-${icon.name}`}
          onClick={() => {
            if (typeof window !== "undefined") {
              sessionStorage.setItem("pxui_catalog_query", window.location.search);
            }
          }}
          className="h-8 w-full inline-flex items-center justify-center gap-2 px-3 rounded-md border border-[#e6dfd8] dark:border-[#2e2c28] bg-white dark:bg-[#1d1b18] hover:bg-[#f5f0e8] dark:hover:bg-[#252320] text-xs font-mono font-medium text-[#141413] dark:text-[#faf9f5] transition-all shadow-2xs hover:border-primary/50"
        >
          <span>Open in Specification</span>
          <PXIconExternalLink size={12} className="text-primary" />
        </a>
      </div>
    </div>
  );
}
