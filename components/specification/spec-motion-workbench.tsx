"use client";

import * as React from "react";
import { IconDefinition } from "@/lib/icons/schema";
import { PXIconBase } from "@/components/icons/px-icon-base";
import {
  PXIconPlay,
  PXIconPause,
  PXIconRefresh,
  PXIconSparkles,
  PXIconSun,
  PXIconMoon,
} from "@/components/icons";
import { cn } from "@/lib/utils";

interface SpecMotionWorkbenchProps {
  icon: IconDefinition;
}

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

export function SpecMotionWorkbench({ icon }: SpecMotionWorkbenchProps) {
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [activeFrame, setActiveFrame] = React.useState<number | null>(null);
  const [reducedMotion, setReducedMotion] = React.useState(false);
  const [speed, setSpeed] = React.useState<1 | 0.5 | 2>(1);
  const [stageTheme, setStageTheme] = React.useState<"auto" | "dark" | "light">("auto");

  if (!icon.animation) {
    return null;
  }

  const frames = [1, 2, 3, 4, 5];
  const animType = icon.animation.type || "spin";

  // Calculated duration based on speed
  const baseDuration = icon.animation.duration || 600;
  const activeDuration = Math.round(baseDuration / speed);

  const currentPose = activeFrame ? getFramePose(animType, activeFrame) : null;

  return (
    <section
      id="motion"
      className="scroll-mt-24 space-y-6 rounded-2xl bg-white dark:bg-[#181715] text-[#141413] dark:text-[#faf9f5] border border-[#e6dfd8] dark:border-[#2e2c28] p-6 sm:p-8 select-none shadow-xs transition-colors duration-200"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e6dfd8] dark:border-[#2e2c28] pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-mono text-xs text-[#cc785c] font-bold uppercase tracking-wider">
            <PXIconSparkles size={14} className="text-[#cc785c]" />
            <span>ANIMATION WORKBENCH</span>
          </div>
          <h2 className="font-sans text-2xl font-bold tracking-tight text-[#141413] dark:text-[#faf9f5]">
            Stepped Motion & State Sequencer
          </h2>
          <p className="font-mono text-xs text-[#6c6a64] dark:text-[#8e8b82]">
            Animation communicates state transitions rather than ambient decoration.
          </p>
        </div>

        {/* Action Toggles: Reduced Motion & Theme Switcher */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 self-start sm:self-auto">
          {/* Reduced Motion Toggle */}
          <div className="h-8 inline-flex items-center gap-2 font-mono text-xs bg-[#f5f0e8] dark:bg-[#201e1b] border border-[#e6dfd8] dark:border-[#2e2c28] rounded-md px-2.5 box-border shrink-0 shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-[#6c6a64] dark:text-[#8e8b82]">
              <span className="hidden xs:inline">REDUCED </span>MOTION:
            </span>
            <button
              type="button"
              onClick={() => setReducedMotion(!reducedMotion)}
              className={cn(
                "h-6 px-2 inline-flex items-center justify-center rounded text-[10px] uppercase font-bold transition-all cursor-pointer box-border",
                reducedMotion
                  ? "bg-[#5db872] text-[#141413] shadow-xs"
                  : "bg-white dark:bg-[#282622] text-[#6c6a64] dark:text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5] border border-[#e6dfd8] dark:border-transparent"
              )}
            >
              {reducedMotion ? "Active (Disabled)" : "Normal"}
            </button>
          </div>

          {/* Stage Theme Switcher */}
          <div className="h-8 inline-flex items-stretch gap-0.5 border border-[#e6dfd8] dark:border-[#2e2c28] rounded-md bg-white dark:bg-[#201e1b] p-0.5 font-mono text-xs box-border shrink-0 shadow-2xs">
            <button
              type="button"
              onClick={() => setStageTheme("dark")}
              className={cn(
                "inline-flex items-center justify-center gap-1 px-2 rounded text-[10px] font-mono transition-all cursor-pointer self-stretch",
                stageTheme === "dark"
                  ? "bg-[#141413] text-[#faf9f5] font-bold shadow-2xs"
                  : "text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5]"
              )}
              title="Dark animation stage"
            >
              <PXIconMoon size={11} className="shrink-0" />
              <span className="hidden xs:inline">Dark</span>
            </button>
            <button
              type="button"
              onClick={() => setStageTheme("light")}
              className={cn(
                "inline-flex items-center justify-center gap-1 px-2 rounded text-[10px] font-mono transition-all cursor-pointer self-stretch",
                stageTheme === "light"
                  ? "bg-[#faf9f5] text-[#141413] font-bold shadow-2xs border border-[#e6dfd8]"
                  : "text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5]"
              )}
              title="Light paper animation stage"
            >
              <PXIconSun size={11} className="shrink-0" />
              <span className="hidden xs:inline">Light</span>
            </button>
            <button
              type="button"
              onClick={() => setStageTheme("auto")}
              className={cn(
                "inline-flex items-center justify-center px-2 rounded text-[10px] uppercase font-mono transition-all cursor-pointer self-stretch",
                stageTheme === "auto"
                  ? "bg-[#cc785c] text-white font-bold"
                  : "text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5]"
              )}
              title="Follow system theme"
            >
              Auto
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Specimen Viewport */}
        <div
          className={cn(
            "lg:col-span-6 flex flex-col items-center justify-center p-8 rounded-xl relative overflow-hidden h-[280px] border transition-colors duration-200",
            stageTheme === "dark"
              ? "bg-[#141413] text-[#faf9f5] border-[#2e2c28]"
              : stageTheme === "light"
              ? "bg-[#faf9f5] text-[#141413] border-[#e6dfd8]"
              : "bg-[#faf9f5] dark:bg-[#141413] text-[#141413] dark:text-[#faf9f5] border-[#e6dfd8] dark:border-[#2e2c28]"
          )}
        >
          {/* 24x24 subtle grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-15"
            style={{
              backgroundImage:
                stageTheme === "dark"
                  ? "linear-gradient(to right, rgba(250,249,245,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(250,249,245,0.35) 1px, transparent 1px)"
                  : stageTheme === "light"
                  ? "linear-gradient(to right, rgba(20,20,19,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,20,19,0.2) 1px, transparent 1px)"
                  : "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
              backgroundSize: "4.166667% 4.166667%",
            }}
          />

          <PXIconBase
            definition={icon}
            size={96}
            animated={!reducedMotion && isPlaying && activeFrame === null}
            duration={activeDuration}
            style={currentPose?.style}
            className="relative z-10 transition-transform duration-100"
          />

          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between font-mono text-[10px] opacity-70">
            <span>CLASS: {icon.animation.cssClass}</span>
            <span>
              {activeFrame
                ? `FRAME 0${activeFrame} (${currentPose?.label})`
                : reducedMotion
                ? "REDUCED MOTION APPLIED"
                : `${activeDuration}ms DURATION`}
            </span>
          </div>
        </div>

        {/* Controls & Stepped Timeline */}
        <div className="lg:col-span-6 space-y-5 font-mono text-xs">
          {/* Metadata Badges */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-2.5 rounded bg-[#f5f0e8] dark:bg-[#201e1b] border border-[#e6dfd8] dark:border-[#2e2c28]">
              <span className="text-[10px] text-[#6c6a64] dark:text-[#8e8b82] uppercase block">TRIGGER</span>
              <span className="font-bold text-[#141413] dark:text-[#faf9f5] text-xs uppercase">
                {icon.animation.trigger || "auto"}
              </span>
            </div>
            <div className="p-2.5 rounded bg-[#f5f0e8] dark:bg-[#201e1b] border border-[#e6dfd8] dark:border-[#2e2c28]">
              <span className="text-[10px] text-[#6c6a64] dark:text-[#8e8b82] uppercase block">FAMILY</span>
              <span className="font-bold text-[#141413] dark:text-[#faf9f5] text-xs uppercase">
                {icon.animation.family}
              </span>
            </div>
          </div>

          {/* Player controls */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 p-3 bg-[#f5f0e8] dark:bg-[#201e1b] border border-[#e6dfd8] dark:border-[#2e2c28] rounded-lg">
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
                title={isPlaying && activeFrame === null ? "Pause" : "Play continuous"}
                aria-label={isPlaying && activeFrame === null ? "Pause" : "Play continuous"}
              >
                {isPlaying && activeFrame === null ? <PXIconPause size={14} /> : <PXIconPlay size={14} />}
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveFrame(null);
                  setIsPlaying(true);
                }}
                className="h-8 w-8 inline-flex items-center justify-center p-0 rounded-md bg-white dark:bg-[#282622] hover:bg-[#eae4dc] dark:hover:bg-[#33302a] text-[#6c6a64] dark:text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5] border border-[#e6dfd8] dark:border-transparent transition-colors cursor-pointer box-border shrink-0 shadow-2xs"
                title="Replay sequence"
                aria-label="Replay sequence"
              >
                <PXIconRefresh size={14} />
              </button>
            </div>

            <div className="hidden sm:block h-4 w-[1px] bg-[#e6dfd8] dark:bg-[#2e2c28] mx-0.5" />

            {/* Speed selection */}
            <div className="h-8 inline-flex items-stretch gap-0.5 border border-[#e6dfd8] dark:border-[#2e2c28] rounded-md bg-white dark:bg-[#201e1b] p-0.5 box-border shrink-0 shadow-2xs font-mono text-xs">
              <span className="text-[10px] text-[#6c6a64] dark:text-[#8e8b82] px-1.5 inline-flex items-center font-bold">SPEED:</span>
              {([0.5, 1, 2] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSpeed(s)}
                  className={cn(
                    "inline-flex items-center justify-center px-2 rounded text-[10px] font-mono transition-colors cursor-pointer self-stretch",
                    speed === s
                      ? "bg-[#cc785c] text-white font-bold"
                      : "text-[#6c6a64] dark:text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5]"
                  )}
                >
                  {s}×
                </button>
              ))}
            </div>
          </div>

          {/* Stepped Frame Strip */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[10px] text-[#6c6a64] dark:text-[#8e8b82]">
              <span>STEPPED FRAME BREAKDOWN</span>
              <span className="text-[#cc785c] font-bold">
                {activeFrame ? `FRAME 0${activeFrame} / 05 · ${currentPose?.label}` : "PLAYING"}
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2">
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
                      "p-2 rounded border flex flex-col items-center justify-between gap-1 transition-all cursor-pointer group",
                      isSelected
                        ? "border-[#cc785c] bg-[#cc785c]/15 text-[#cc785c] font-bold shadow-xs ring-1 ring-[#cc785c]"
                        : "border-[#e6dfd8] dark:border-[#2e2c28] bg-white dark:bg-[#201e1b] hover:border-[#cc785c] text-[#6c6a64] dark:text-[#8e8b82]"
                    )}
                    title={`Inspect frame 0${f} (${pose.label})`}
                  >
                    <div className="text-[10px] font-mono flex items-center justify-between w-full">
                      <span>0{f}</span>
                      <span className="text-[9px] opacity-75">{pose.label}</span>
                    </div>
                    {/* Mini pose preview */}
                    <div className="w-7 h-7 flex items-center justify-center my-0.5 pointer-events-none">
                      <PXIconBase
                        definition={icon}
                        size={18}
                        animated={false}
                        style={pose.style}
                        className="text-current transition-transform"
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
