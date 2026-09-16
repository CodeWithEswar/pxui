"use client";

import * as React from "react";
import { IconDefinition, PixelIconProps } from "@/lib/icons/schema";

export interface PixelIconBaseProps extends PixelIconProps {
  definition: IconDefinition;
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

    const rawPaths: Array<{ d: string; fillRule?: any; clipRule?: any }> =
      (definition as any)?.geometry?.paths || (definition as any)?.paths || [];
    const rawFilled: Array<{ d: string; fillRule?: any; clipRule?: any }> | undefined =
      (definition as any)?.geometry?.filled || (definition as any)?.filled;
    const paths: Array<{ d: string; fillRule?: any; clipRule?: any }> =
      filled && rawFilled && rawFilled.length > 0 ? rawFilled : rawPaths;

    const hasAnimation = animated && Boolean(definition.animation);
    const animationClass = hasAnimation ? definition.animation?.cssClass || "" : "";

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
