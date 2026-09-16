"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface GridSignalProps {
  className?: string;
  top?: number | string;
  left?: number | string;
  horizontalDistance?: number; // in pixels (multiple of 24)
  verticalDistance?: number;   // in pixels (multiple of 24)
  duration?: number;           // in seconds
  delay?: number;              // in seconds
}

export function GridSignal({
  className,
  top = 96,
  left = 0,
  horizontalDistance = 192,
  verticalDistance = 96,
  duration = 8,
  delay = 0,
}: GridSignalProps) {
  const stepsH = Math.max(1, Math.round(horizontalDistance / 24));
  const stepsV = Math.max(1, Math.round(verticalDistance / 24));

  return (
    <div
      aria-hidden="true"
      className={cn("absolute pointer-events-none z-0 hidden md:block", className)}
      style={{
        top,
        left,
      }}
    >
      {/* 1px horizontal guide wire */}
      <div
        className="absolute top-[2px] left-0 h-[1px] bg-primary/20"
        style={{ width: horizontalDistance }}
      />
      {/* 1px vertical guide wire */}
      <div
        className="absolute top-[2px] h-[1px] bg-primary/20"
        style={{
          left: horizontalDistance,
          height: verticalDistance,
          width: 1,
        }}
      />

      {/* Stepped pixel signal block (5x5 px warm coral) */}
      <div
        className="relative w-[5px] h-[5px] bg-primary shadow-[0_0_6px_rgba(204,120,92,0.4)]"
        style={{
          animationName: "px-signal-run",
          animationDuration: `${duration}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationDelay: `${delay}s`,
          ["--sig-h" as string]: `${horizontalDistance}px`,
          ["--sig-v" as string]: `${verticalDistance}px`,
          ["--steps-h" as string]: stepsH,
          ["--steps-v" as string]: stepsV,
        }}
      />
    </div>
  );
}
