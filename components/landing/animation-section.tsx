"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  PXIconBell,
  PXIconRefresh,
  PXIconHeart,
  PXIconDownload,
  PXIconPlay,
  PXIconPause,
} from "@/components/icons";

const ANIM_SPECIMENS = [
  { id: "bell", title: "Notification Ring", component: PXIconBell, family: "attention", frames: 4, timing: "0.5s steps(4)" },
  { id: "refresh", title: "Sync Rotate", component: PXIconRefresh, family: "loop", frames: 4, timing: "0.8s steps(4)" },
  { id: "heart", title: "Like Pulse", component: PXIconHeart, family: "attention", frames: 2, timing: "0.6s steps(2)" },
  { id: "download", title: "Download Advance", component: PXIconDownload, family: "directional", frames: 3, timing: "0.6s steps(3)" },
];

export function AnimationSection() {
  const [activeSpecimenIdx, setActiveSpecimenIdx] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [selectedFrame, setSelectedFrame] = React.useState(1);

  const activeSpecimen = ANIM_SPECIMENS[activeSpecimenIdx];
  const ActiveIcon = activeSpecimen.component;

  return (
    <section id="animated" className="py-20 md:py-28 border-b border-[#2e2c28] bg-[#181715] text-[#faf9f5]">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl space-y-12">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight text-[#faf9f5]">
            Motion with <span className="text-primary italic">meaning</span>.
          </h2>
          <p className="text-sm sm:text-base text-[#a09d96] font-sans leading-relaxed">
            Animations communicate state, never decoration.
            PXUI rejects smooth vector easing curves that distort pixel grids. Every motion is executed via discrete keyframe steps (<code className="text-[#5db8a6]">steps()</code>) to preserve silhouette integrity.
          </p>
        </div>

        {/* Technical Animation Workbench Card */}
        <div className="rounded-xl border border-[#2e2c28] bg-[#1f1e1b] overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12">
          {/* Left: Interactive Canvas & Frame Timeline */}
          <div className="lg:col-span-7 p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-[#252320] flex flex-col items-center justify-between gap-8 bg-[#181715]/60">
            {/* Specimen View Box */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-xl border border-[#2e2c28] bg-[#1f1e1b] flex items-center justify-center shadow-inner">
              {/* Grid backdrop */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, #faf9f5 1px, transparent 1px),
                    linear-gradient(to bottom, #faf9f5 1px, transparent 1px)
                  `,
                  backgroundSize: "16px 16px",
                }}
              />

              <div className="relative z-10 text-primary">
                <ActiveIcon
                  size={96}
                  animated={isPlaying}
                  className="transition-transform"
                />
              </div>

              {/* Status pill */}
              <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#252320] border border-[#2e2c28] font-mono text-[9px] text-[#5db8a6]">
                {isPlaying ? "LIVE STEPPING" : "PAUSED"}
              </div>
            </div>

            {/* Signature Pixel Frame Timeline */}
            <div className="w-full space-y-3 font-mono">
              <div className="flex items-center justify-between text-xs text-[#a09d96]">
                <span>FRAME TIMELINE ({activeSpecimen.frames} STEPS)</span>
                <span className="text-[#5db8a6]">{activeSpecimen.timing}</span>
              </div>

              {/* Step indicator blocks */}
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: activeSpecimen.frames }).map((_, fIdx) => {
                  const frameNum = fIdx + 1;
                  const isSelected = selectedFrame === frameNum;
                  return (
                    <button
                      key={frameNum}
                      type="button"
                      onClick={() => {
                        setSelectedFrame(frameNum);
                        setIsPlaying(false);
                      }}
                      className={`p-2 rounded border text-center transition-all ${
                        isSelected
                          ? "bg-primary border-primary text-white font-bold"
                          : "bg-[#181715] border-[#2e2c28] text-[#a09d96] hover:text-[#faf9f5] hover:border-[#3a3834]"
                      }`}
                    >
                      <div className="text-[10px]">FRAME {String(frameNum).padStart(2, "0")}</div>
                      <div className="text-sm">■</div>
                    </button>
                  );
                })}
              </div>

              {/* Play / Pause / Replay Controls */}
              <div className="flex items-center justify-center gap-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="h-8 text-xs font-mono rounded-md border-[#2e2c28] bg-[#252320] hover:bg-[#2e2c28] text-[#faf9f5] gap-1.5 px-4"
                >
                  {isPlaying ? <PXIconPause size={12} /> : <PXIconPlay size={12} />}
                  <span>{isPlaying ? "Pause Stepping" : "Play Stepping"}</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Right: Specimen Switcher & Specs */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 font-mono text-xs">
            <div className="space-y-4">
              <span className="text-[10px] text-[#a09d96] uppercase tracking-wider block border-b border-[#252320] pb-2">
                ANIMATED SPECIMENS
              </span>

              <div className="space-y-2">
                {ANIM_SPECIMENS.map((spec, idx) => {
                  const isSelected = idx === activeSpecimenIdx;
                  const SpecIcon = spec.component;
                  return (
                    <button
                      key={spec.id}
                      type="button"
                      onClick={() => {
                        setActiveSpecimenIdx(idx);
                        setSelectedFrame(1);
                        setIsPlaying(true);
                      }}
                      className={`w-full p-3 rounded-lg border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? "bg-[#252320] border-primary text-[#faf9f5]"
                          : "bg-[#181715] border-[#2e2c28] text-[#a09d96] hover:text-[#faf9f5]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <SpecIcon size={20} animated={isSelected && isPlaying} className="text-primary" />
                        <div>
                          <div className="text-sm font-sans font-medium text-[#faf9f5]">{spec.title}</div>
                          <div className="text-[10px] text-[#a09d96]">px-{spec.id}</div>
                        </div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#141413] border border-[#2e2c28] uppercase">
                        {spec.family}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Accessibility & Reduce Motion Guarantee */}
            <div className="p-3.5 bg-[#141413] border border-[#2e2c28] rounded-lg text-xs font-sans text-[#a09d96] space-y-1">
              <span className="font-semibold text-[#5db8a6] block font-mono text-[11px]">
                ACCESSIBILITY CONTRACT
              </span>
              <p className="text-[11px] leading-relaxed">
                All animations are automatically suppressed when the operating system requests <code className="text-[#faf9f5]">prefers-reduced-motion</code>. Icons remain completely functional in their static resting state.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
