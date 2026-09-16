"use client";

import * as React from "react";
import type { PXIconProps } from "@pxui/core";

export type IconPathItem = {
  d: string;
  fillRule?: "nonzero" | "evenodd" | "inherit";
  clipRule?: "nonzero" | "evenodd" | "inherit";
};

export interface PXIconBaseProps extends PXIconProps {
  definition: {
    paths?: readonly IconPathItem[];
    filled?: readonly IconPathItem[];
    geometry?: {
      paths?: readonly IconPathItem[];
      filled?: readonly IconPathItem[];
    };
    animation?: {
      cssClass?: string;
      frames?: readonly { durationMs: number; transform?: string; opacity?: number }[];
    };
    grid?: number;
  };
  strokeWidth?: number | string;
  duration?: number;
  delay?: number;
  loop?: boolean;
  trigger?: string;
  style?: React.CSSProperties;
}

export const PXIconBase = React.forwardRef<SVGSVGElement, PXIconBaseProps>(
  (
    {
      definition,
      size = 24,
      color = "currentColor",
      strokeWidth,
      filled = false,
      animated = false,
      duration,
      delay,
      loop = true,
      className = "",
      title,
      "aria-label": ariaLabel,
      style,
      ...restProps
    },
    ref
  ) => {
    const dimension = typeof size === "number" ? `${size}px` : size;

    const rawPaths: readonly IconPathItem[] =
      definition.geometry?.paths || definition.paths || [];
    const rawFilled: readonly IconPathItem[] | undefined =
      definition.geometry?.filled || definition.filled;
    const paths: readonly IconPathItem[] =
      filled && rawFilled && rawFilled.length > 0 ? rawFilled : rawPaths;

    const hasAnimation = animated && Boolean(definition.animation);
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
        className={`pixel-crisp inline-block shrink-0 select-none ${className}`.trim()}
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

PXIconBase.displayName = "PXIconBase";
export const PixelIconBase = PXIconBase;
export type PixelIconBaseProps = PXIconBaseProps;
