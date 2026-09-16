"use client";

import * as React from "react";

export type WorkspaceBreakpoint = "mobile" | "tablet" | "mediumDesktop" | "desktop";

export interface WorkspaceBreakpointState {
  breakpoint: WorkspaceBreakpoint;
  isMobile: boolean;
  isTablet: boolean;
  isMediumDesktop: boolean;
  isDesktop: boolean;
  width: number;
}

function getBreakpoint(width: number): WorkspaceBreakpoint {
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  if (width < 1280) return "mediumDesktop";
  return "desktop";
}

export function useWorkspaceBreakpoint(): WorkspaceBreakpointState {
  const [state, setState] = React.useState<WorkspaceBreakpointState>(() => {
    // Default to desktop for SSR to avoid layout shift on standard monitors
    return {
      breakpoint: "desktop",
      isMobile: false,
      isTablet: false,
      isMediumDesktop: false,
      isDesktop: true,
      width: 1440,
    };
  });

  React.useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const bp = getBreakpoint(w);
      setState({
        breakpoint: bp,
        isMobile: bp === "mobile",
        isTablet: bp === "tablet",
        isMediumDesktop: bp === "mediumDesktop",
        isDesktop: bp === "desktop",
        width: w,
      });
    };

    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return state;
}
