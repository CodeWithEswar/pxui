import * as React from "react";

export const PXIconWrap = React.forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement> & { size?: number | string }
>(({ size = 24, ...props }, ref) => {
  return (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      shapeRendering="crispEdges"
      {...props}
    >
      <path d="M4 5h16v2H4V5zm0 4h10v2H4V9zm0 4h10v2H4v-2zm0 4h16v2H4v-2zm12-7h2v5h-4v2l-3-3 3-3v2h2v-3z" />
    </svg>
  );
});

PXIconWrap.displayName = "PXIconWrap";
