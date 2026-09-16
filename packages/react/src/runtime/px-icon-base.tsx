"use client";

import * as React from "react";
import type { PXIconProps } from "@pxui/core";

export interface PXIconBaseProps extends PXIconProps {
  definition: {
    paths: { d: string; fillRule?: string; clipRule?: string }[];
    filled?: { d: string; fillRule?: string; clipRule?: string }[];
    animation?: any;
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

    const rawPaths: Array<{ d: string; fillRule?: any; clipRule?: any }> =
      (definition as any)?.geometry?.paths || (definition as any)?.paths || [];
    const rawFilled: Array<{ d: string; fillRule?: any; clipRule?: any }> | undefined =
      (definition as any)?.geometry?.filled || (definition as any)?.filled;
    const paths: Array<{ d: string; fillRule?: any; clipRule?: any }> =
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
            fillRule={p.fillRule as any}
            clipRule={p.clipRule as any}
          />
        ))}
      </svg>
    );
  }
);

PXIconBase.displayName = "PXIconBase";
export const PixelIconBase = PXIconBase;
export type PixelIconBaseProps = PXIconBaseProps;
