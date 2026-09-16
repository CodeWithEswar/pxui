"use client";

import * as React from "react";
import type { IconDefinition } from "@/lib/icons/schema";
import type { PXIconDefinition } from "@pxui/core";

export type IconPathItem = {
  d: string;
  fillRule?: "nonzero" | "evenodd" | "inherit";
  clipRule?: "nonzero" | "evenodd" | "inherit";
};

export interface PixelIconBaseProps extends Omit<React.SVGProps<SVGSVGElement>, "ref"> {
  definition: IconDefinition | PXIconDefinition;
  size?: number | string;
  color?: string;
  strokeWidth?: number | string;
  filled?: boolean;
  animated?: boolean;
  animation?: {
    cssClass?: string;
    frames?: readonly { durationMs: number; transform?: string; opacity?: number }[];
  };
  duration?: number;
  delay?: number;
  loop?: boolean;
  trigger?: "auto" | "hover" | "click";
  title?: string;
  "aria-label"?: string;
}

export const PixelIconBase = React.forwardRef<SVGSVGElement, PixelIconBaseProps>(
  (
    {
      definition,
      size = 24,
      color = "currentColor",
      strokeWidth,
      filled = false,
      animated = false,
      animation,
      duration,
      delay,
      loop = true,
      trigger = "auto",
      className = "",
      title,
      "aria-label": ariaLabel,
      style,
      ...restProps
    },
    ref
  ) => {
    // Resolve width/height from number or string (e.g. 24, "24px", "1.5rem")
    const dimension = typeof size === "number" ? `${size}px` : size;

    const def = definition as unknown as {
      geometry?: { paths?: readonly IconPathItem[]; filled?: readonly IconPathItem[] };
      paths?: readonly IconPathItem[];
      filled?: readonly IconPathItem[];
      animation?: { cssClass?: string };
    };

    const rawPaths: readonly IconPathItem[] = def.geometry?.paths || def.paths || [];
    const rawFilled: readonly IconPathItem[] | undefined = def.geometry?.filled || def.filled;
    const paths: readonly IconPathItem[] =
      filled && rawFilled && rawFilled.length > 0 ? rawFilled : rawPaths;

    const activeAnimation = animation || def.animation;
    const hasAnimation = animated && Boolean(activeAnimation);
    const animationClass = hasAnimation ? activeAnimation?.cssClass || "" : "";

    const isMeaningful = Boolean(ariaLabel || title);

    const animationStyle: React.CSSProperties = {};
    if (hasAnimation) {
      if (duration !== undefined) {
        animationStyle.animationDuration = `${duration}ms`;
      }
      if (delay !== undefined) {
        animationStyle.animationDelay = `${delay}ms`;
      }
      if (loop === false) {
        animationStyle.animationIterationCount = "1";
      }
    }

    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={dimension}
        height={dimension}
        fill={color}
        strokeWidth={strokeWidth}
        data-trigger={trigger !== "auto" ? trigger : undefined}
        className={`pixel-crisp inline-block shrink-0 select-none ${animationClass} ${className}`.trim()}
        role={isMeaningful ? "img" : undefined}
        aria-hidden={isMeaningful ? undefined : true}
        aria-label={ariaLabel}
        style={{
          color,
          shapeRendering: "crispEdges",
          ...animationStyle,
          ...style,
        }}
        {...restProps}
      >
        {title ? <title>{title}</title> : null}
        {paths.map((p, idx) => (
          <path
            key={idx}
            d={p.d}
            fillRule={p.fillRule}
            clipRule={p.clipRule}
          />
        ))}
      </svg>
    );
  }
);

PixelIconBase.displayName = "PixelIconBase";

// Backward-compatibility exports
export const PXIconBase = PixelIconBase;
export type PXIconBaseProps = PixelIconBaseProps;
