"use client";

import * as React from "react";
import Link from "next/link";
import { ICONS_CATALOG } from "@/lib/icons/catalog";
import { toPXComponentName } from "@/lib/compiler";
import { PXIconBase } from "@/components/icons/px-icon-base";
import {
  PXIconSparkles,
  PXIconPlay,
  PXIconPause,
  PXIconRefresh,
  PXIconCopy,
  PXIconCheck,
  PXIconArrowRight,
  PXIconSun,
  PXIconMoon,
} from "@/components/icons";
import { SyntaxHighlighter, CodeWrapButton } from "@/components/ui/syntax-highlighter";
import { cn } from "@/lib/utils";

const MOTION_CATEGORIES = [
  { id: "all", label: "All Motion", count: 6 },
  { id: "loop", label: "Loop & Progress", count: 2 },
  { id: "attention", label: "Attention & Alert", count: 2 },
  { id: "directional", label: "Directional & Transfer", count: 1 },
  { id: "reveal", label: "Reveal & Signals", count: 1 },
] as const;

type MotionCategory = (typeof MOTION_CATEGORIES)[number]["id"];

function getFramePose(animType: string, frame: number): {
  label: string;
  style: React.CSSProperties;
} {
  switch (animType) {
    case "spin": {
      const angles = [0, 90, 180, 270, 360];
      const deg = angles[frame - 1] ?? 0;
      return {
        label: `${deg}°`,
        style: { transform: `rotate(${deg}deg)` },
      };
    }
    case "pulse": {
      const scales = [1, 1.08, 1.16, 1.08, 1];
      const scale = scales[frame - 1] ?? 1;
      return {
        label: `${scale}×`,
        style: { transform: `scale(${scale})` },
      };
    }
    case "bounce": {
      const offsets = [0, 1.5, 3, 1.5, 0];
      const y = offsets[frame - 1] ?? 0;
      return {
        label: `+${y}px`,
        style: { transform: `translateY(${y}px)` },
      };
    }
    case "wiggle": {
      const wiggles = [0, -12, 0, 12, 0];
      const deg = wiggles[frame - 1] ?? 0;
      return {
        label: `${deg > 0 ? "+" : ""}${deg}°`,
        style: { transform: `rotate(${deg}deg)` },
      };
    }
    case "blink": {
      const opacities = [1, 0.6, 0.2, 0.6, 1];
      const op = opacities[frame - 1] ?? 1;
      return {
        label: `${Math.round(op * 100)}%`,
        style: { opacity: op },
      };
    }
    default: {
      return {
        label: `0${frame}`,
        style: { transform: `translateY(${frame % 2 === 0 ? 2 : 0}px)` },
      };
    }
  }
}

export function AnimatedWorkbench() {
  const animatedIcons = React.useMemo(() => {
    return ICONS_CATALOG.filter((i) => Boolean(i.animation));
  }, []);

  const [selectedCategory, setSelectedCategory] = React.useState<MotionCategory>("all");
  const [selectedIconName, setSelectedIconName] = React.useState(animatedIcons[0]?.name || "refresh");
  const [hoveredIconName, setHoveredIconName] = React.useState<string | null>(null);

  // Inspector playback controls
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [activeFrame, setActiveFrame] = React.useState<number | null>(null);
  const [speed, setSpeed] = React.useState<1 | 0.5 | 2>(1);
  const [reducedMotion, setReducedMotion] = React.useState(false);
  const [stageTheme, setStageTheme] = React.useState<"auto" | "dark" | "light">("auto");
  const [copied, setCopied] = React.useState(false);
  const [codeWrapped, setCodeWrapped] = React.useState(false);

  const selectedIcon = React.useMemo(() => {
    return animatedIcons.find((i) => i.name === selectedIconName) || animatedIcons[0];
  }, [animatedIcons, selectedIconName]);

  const filteredIcons = React.useMemo(() => {
    if (selectedCategory === "all") return animatedIcons;
    return animatedIcons.filter((i) => i.animation?.family === selectedCategory);
  }, [animatedIcons, selectedCategory]);

  const animType = selectedIcon?.animation?.type || "spin";
  const baseDuration = selectedIcon?.animation?.duration || 600;
  const activeDuration = Math.round(baseDuration / speed);
  const currentPose = activeFrame ? getFramePose(animType, activeFrame) : null;
  const frames = [1, 2, 3, 4, 5];

  const componentName = toPXComponentName(selectedIcon.name);
  const codeSnippet = `import { ${componentName} } from "@pxui/react";

export function Example() {
  return (
    <${componentName}
      size={24}
      animated${selectedIcon.animation?.trigger === "hover" ? ' trigger="hover"' : ""}
    />
  );
}`;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // quiet fail
    }
  };

  return (
    <div className="space-y-12 py-8 select-none">
      {/* 1. Header & Philosophy */}
      <section className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#cc785c]/10 text-[#cc785c] font-mono text-xs font-bold uppercase tracking-wider border border-[#cc785c]/20">
          <PXIconSparkles size={14} />
          <span>PXUI MOTION SYSTEM</span>
        </div>

        <h1 className="font-sans text-4xl sm:text-5xl font-bold tracking-tight text-[#141413] dark:text-[#faf9f5]">
          Motion communicates state.
        </h1>

        <p className="font-sans text-base sm:text-lg text-[#6c6a64] dark:text-[#8e8b82] leading-relaxed">
          PXUI motion is not decorative ambiance. Every animation is authored with discrete integer steps, preserving pixel edge alignment and providing meaningful feedback for system transitions.
        </p>
      </section>

      {/* 2. Main 3-Column Motion Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: Motion Categories Rail */}
        <div className="lg:col-span-3 space-y-2 font-mono text-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#8e8b82] px-3 py-1">
            MOTION FAMILIES
          </div>
          <div className="space-y-1">
            {MOTION_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "w-full px-3 py-2.5 rounded-lg flex items-center justify-between text-left transition-all cursor-pointer",
                  selectedCategory === cat.id
                    ? "bg-[#cc785c] text-white font-bold shadow-xs"
                    : "bg-white dark:bg-[#181715] hover:bg-[#f5f0e8] dark:hover:bg-[#201e1b] text-[#141413] dark:text-[#faf9f5] border border-[#e6dfd8] dark:border-[#252320]"
                )}
              >
                <span>{cat.label}</span>
                <span className="text-[10px] opacity-75">{cat.count}</span>
              </button>
            ))}
          </div>

          <div className="p-4 rounded-xl border border-[#e6dfd8] dark:border-[#252320] bg-white dark:bg-[#181715] mt-6 space-y-2">
            <div className="font-bold text-[11px] text-[#cc785c] uppercase">
              CARD BEHAVIOR CONTRACT
            </div>
            <p className="font-sans text-xs text-[#6c6a64] dark:text-[#8e8b82] leading-relaxed">
              Cards remain static by default to preserve visual calm. Hovering triggers a single playback cycle; clicking activates the full live inspector.
            </p>
          </div>
        </div>

        {/* CENTER: Animated Icon Grid */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between font-mono text-xs text-[#8e8b82]">
            <span>ANIMATED CATALOG ({filteredIcons.length})</span>
            <span>CLICK TO INSPECT</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {filteredIcons.map((item) => {
              const isSelected = item.name === selectedIcon.name;
              const isHovered = hoveredIconName === item.name;
              return (
                <div
                  key={item.name}
                  onClick={() => {
                    setSelectedIconName(item.name);
                    setActiveFrame(null);
                    setIsPlaying(true);
                  }}
                  onMouseEnter={() => setHoveredIconName(item.name)}
                  onMouseLeave={() => setHoveredIconName(null)}
                  className={cn(
                    "p-5 rounded-xl border flex flex-col items-center justify-between gap-4 text-center cursor-pointer transition-all",
                    isSelected
                      ? "bg-white dark:bg-[#181715] border-[#cc785c] shadow-md ring-2 ring-[#cc785c]/30"
                      : "bg-white dark:bg-[#181715] border-[#e6dfd8] dark:border-[#252320] hover:border-[#cc785c]"
                  )}
                >
                  <div className="w-full flex items-center justify-between font-mono text-[10px] text-[#8e8b82]">
                    <span className="uppercase text-[#cc785c] font-bold">
                      {item.animation?.family}
                    </span>
                    <span>{item.animation?.trigger || "auto"}</span>
                  </div>

                  {/* Icon Viewport */}
                  <div className="w-16 h-16 rounded-lg bg-[#faf9f5] dark:bg-[#141413] border border-[#e6dfd8] dark:border-[#252320] flex items-center justify-center relative overflow-hidden">
                    <PXIconBase
                      definition={item}
                      size={32}
                      animated={isSelected || isHovered}
                      className="text-[#141413] dark:text-[#faf9f5] transition-transform"
                    />
                  </div>

                  <div className="space-y-0.5 w-full">
                    <div className="font-sans font-bold text-xs text-[#141413] dark:text-[#faf9f5]">
                      {toPXComponentName(item.name)}
                    </div>
                    <div className="font-mono text-[10px] text-[#8e8b82]">
                      px-{item.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredIcons.length === 0 && (
            <div className="p-8 rounded-xl border border-dashed border-[#e6dfd8] dark:border-[#252320] text-center font-mono text-xs text-[#8e8b82]">
              No animated icons match this category filter.
            </div>
          )}
        </div>

        {/* RIGHT: Motion Inspector */}
        <div className="lg:col-span-4 space-y-5 font-mono text-xs">
          <div className="rounded-2xl border border-[#e6dfd8] dark:border-[#2e2c28] bg-white dark:bg-[#181715] text-[#141413] dark:text-[#faf9f5] p-6 space-y-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#e6dfd8] dark:border-[#2e2c28] pb-3">
              <div>
                <div className="text-[10px] text-[#cc785c] font-bold uppercase">MOTION INSPECTOR</div>
                <div className="font-sans font-bold text-lg text-[#141413] dark:text-[#faf9f5]">
                  {toPXComponentName(selectedIcon.name)}
                </div>
              </div>

              {/* Stage Theme Toggle */}
              <div className="flex items-center gap-0.5 border border-[#e6dfd8] dark:border-[#2e2c28] rounded-md bg-[#faf9f5] dark:bg-[#201e1b] p-0.5">
                <button
                  type="button"
                  onClick={() => setStageTheme("dark")}
                  className={cn(
                    "px-1.5 py-0.5 rounded text-[10px] cursor-pointer",
                    stageTheme === "dark" ? "bg-[#141413] text-[#faf9f5] font-bold" : "text-[#8e8b82]"
                  )}
                  title="Force dark stage"
                >
                  <PXIconMoon size={10} />
                </button>
                <button
                  type="button"
                  onClick={() => setStageTheme("light")}
                  className={cn(
                    "px-1.5 py-0.5 rounded text-[10px] cursor-pointer",
                    stageTheme === "light" ? "bg-white text-[#141413] font-bold shadow-2xs" : "text-[#8e8b82]"
                  )}
                  title="Force light stage"
                >
                  <PXIconSun size={10} />
                </button>
                <button
                  type="button"
                  onClick={() => setStageTheme("auto")}
                  className={cn(
                    "px-1.5 py-0.5 rounded text-[10px] uppercase cursor-pointer",
                    stageTheme === "auto" ? "bg-[#cc785c] text-white font-bold" : "text-[#8e8b82]"
                  )}
                  title="Auto theme"
                >
                  Auto
                </button>
              </div>
            </div>

            {/* Live Controlled Specimen Viewport */}
            <div
              className={cn(
                "w-full h-48 rounded-xl border flex flex-col items-center justify-center relative overflow-hidden transition-colors",
                stageTheme === "dark"
                  ? "bg-[#141413] text-[#faf9f5] border-[#2e2c28]"
                  : stageTheme === "light"
                  ? "bg-[#faf9f5] text-[#141413] border-[#e6dfd8]"
                  : "bg-[#faf9f5] dark:bg-[#141413] text-[#141413] dark:text-[#faf9f5] border-[#e6dfd8] dark:border-[#2e2c28]"
              )}
            >
              {/* Grid overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-15"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                  backgroundSize: "4.166667% 4.166667%",
                }}
              />

              <PXIconBase
                definition={selectedIcon}
                size={80}
                animated={!reducedMotion && isPlaying && activeFrame === null}
                duration={activeDuration}
                style={currentPose?.style}
                className="relative z-10 transition-transform duration-100"
              />

              <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[9px] opacity-70">
                <span>{selectedIcon.animation?.cssClass}</span>
                <span>
                  {activeFrame ? `FRAME 0${activeFrame} (${currentPose?.label})` : `${activeDuration}ms`}
                </span>
              </div>
            </div>

            {/* Stepped Frame Breakdown */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] text-[#8e8b82]">
                <span>STEPPED FRAME BREAKDOWN</span>
                <span className="text-[#cc785c] font-bold">
                  {activeFrame ? `FRAME 0${activeFrame} / 05 · ${currentPose?.label}` : "PLAYING"}
                </span>
              </div>

              <div className="grid grid-cols-5 gap-1.5">
                {frames.map((f) => {
                  const pose = getFramePose(animType, f);
                  const isSelected = activeFrame === f;
                  return (
                    <button
                      key={f}
                      type="button"
                      onClick={() => {
                        if (isSelected) {
                          setActiveFrame(null);
                          setIsPlaying(true);
                        } else {
                          setActiveFrame(f);
                          setIsPlaying(false);
                        }
                      }}
                      className={cn(
                        "p-1.5 rounded border flex flex-col items-center justify-between gap-1 transition-all cursor-pointer",
                        isSelected
                          ? "border-[#cc785c] bg-[#cc785c]/15 text-[#cc785c] font-bold shadow-xs ring-1 ring-[#cc785c]"
                          : "border-[#e6dfd8] dark:border-[#2e2c28] bg-[#faf9f5] dark:bg-[#201e1b] hover:border-[#cc785c] text-[#6c6a64] dark:text-[#8e8b82]"
                      )}
                    >
                      <span className="text-[9px]">0{f}</span>
                      <div className="w-5 h-5 flex items-center justify-center my-0.5">
                        <PXIconBase
                          definition={selectedIcon}
                          size={14}
                          animated={false}
                          style={pose.style}
                          className="text-current"
                        />
                      </div>
                      <span className="text-[8px] opacity-70">{pose.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Player Controls */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-lg border border-[#e6dfd8] dark:border-[#2e2c28] bg-[#faf9f5] dark:bg-[#201e1b]">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    if (activeFrame !== null) {
                      setActiveFrame(null);
                      setIsPlaying(true);
                    } else {
                      setIsPlaying(!isPlaying);
                    }
                  }}
                  className="h-8 w-8 inline-flex items-center justify-center p-0 rounded-md bg-white dark:bg-[#282622] hover:bg-[#eae4dc] dark:hover:bg-[#33302a] text-[#141413] dark:text-[#faf9f5] border border-[#e6dfd8] dark:border-transparent transition-colors cursor-pointer box-border shrink-0 shadow-2xs"
                  title={isPlaying && activeFrame === null ? "Pause" : "Play"}
                  aria-label={isPlaying && activeFrame === null ? "Pause" : "Play"}
                >
                  {isPlaying && activeFrame === null ? <PXIconPause size={13} /> : <PXIconPlay size={13} />}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveFrame(null);
                    setIsPlaying(true);
                  }}
                  className="h-8 w-8 inline-flex items-center justify-center p-0 rounded-md bg-white dark:bg-[#282622] hover:bg-[#eae4dc] dark:hover:bg-[#33302a] text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5] border border-[#e6dfd8] dark:border-transparent transition-colors cursor-pointer box-border shrink-0 shadow-2xs"
                  title="Replay"
                  aria-label="Replay"
                >
                  <PXIconRefresh size={13} />
                </button>
              </div>

              <div className="flex items-center gap-2">
                {/* Speed Buttons */}
                <div className="h-8 inline-flex items-stretch gap-0.5 border border-[#e6dfd8] dark:border-[#2e2c28] rounded-md bg-white dark:bg-[#181715] p-0.5 box-border shrink-0 shadow-2xs font-mono text-xs">
                  {([0.5, 1, 2] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSpeed(s)}
                      className={cn(
                        "inline-flex items-center justify-center px-2 rounded text-[10px] font-mono transition-colors cursor-pointer self-stretch",
                        speed === s
                          ? "bg-[#cc785c] text-white font-bold"
                          : "text-[#8e8b82] hover:text-foreground"
                      )}
                    >
                      {s}×
                    </button>
                  ))}
                </div>

                {/* Reduced Motion */}
                <button
                  type="button"
                  onClick={() => setReducedMotion(!reducedMotion)}
                  className={cn(
                    "h-8 px-2.5 inline-flex items-center justify-center rounded-md text-xs font-mono font-bold uppercase transition-colors cursor-pointer box-border shrink-0 shadow-2xs border",
                    reducedMotion
                      ? "bg-[#5db872] text-[#141413] border-[#5db872]"
                      : "bg-white dark:bg-[#181715] border-[#e6dfd8] dark:border-[#2e2c28] text-[#8e8b82] hover:text-foreground"
                  )}
                  title="Toggle Reduced Motion"
                >
                  {reducedMotion ? "Reduced" : "Full"}
                </button>
              </div>
            </div>

            {/* Code Export */}
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-[#e6dfd8] dark:border-[#2e2c28] pb-2 text-[10px]">
                <span className="font-bold uppercase tracking-wider text-[#cc785c]">
                  REACT USAGE
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
                    onClick={handleCopyCode}
                    className="text-[#cc785c] hover:underline flex items-center gap-1 cursor-pointer font-mono"
                  >
                    {copied ? (
                      <>
                        <PXIconCheck size={10} className="text-[#5db872]" />
                        <span className="text-[#5db872]">Copied!</span>
                      </>
                    ) : (
                      <>
                        <PXIconCopy size={10} />
                        <span>Copy JSX</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className={cn("p-3 rounded-lg border border-[#2e2c28] bg-[#141413] text-[#faf9f5]", codeWrapped ? "overflow-x-hidden" : "overflow-x-auto workspace-scrollbar")}>
                <SyntaxHighlighter
                  code={codeSnippet}
                  language="tsx"
                  theme="dark"
                  showLineNumbers={false}
                  wrap={codeWrapped}
                  onWrapChange={setCodeWrapped}
                />
              </div>
            </div>

            {/* Link to Specification */}
            <Link
              href={`/icons/px-${selectedIcon.name}`}
              className="w-full py-2 px-3 rounded-lg border border-[#e6dfd8] dark:border-[#2e2c28] hover:border-[#cc785c] flex items-center justify-center gap-2 text-center text-[#141413] dark:text-[#faf9f5] font-semibold text-xs transition-colors"
            >
              <span>Open in Full Specification</span>
              <PXIconArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
