"use client";

import * as React from "react";

export type DensityMode = "compact" | "default" | "comfortable";

export interface DensityConfig {
  mode: DensityMode;
  label: string;
  minCellWidth: string; // CSS minmax width
  tileSizeClass: string;
}

export const DENSITY_CONFIGS: Record<DensityMode, DensityConfig> = {
  compact: {
    mode: "compact",
    label: "Compact",
    minCellWidth: "132px",
    tileSizeClass: "min-h-[132px]",
  },
  default: {
    mode: "default",
    label: "Default",
    minCellWidth: "152px",
    tileSizeClass: "min-h-[148px]",
  },
  comfortable: {
    mode: "comfortable",
    label: "Comfortable",
    minCellWidth: "176px",
    tileSizeClass: "min-h-[168px]",
  },
};

const STORAGE_KEY = "pxui_catalog_density";
const DENSITY_EVENT = "pxui:density-change";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }
  window.addEventListener("storage", callback);
  window.addEventListener(DENSITY_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(DENSITY_EVENT, callback);
  };
}

function getSnapshot(): DensityMode {
  if (typeof window === "undefined") return "default";
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as DensityMode | null;
    if (saved && (saved === "compact" || saved === "default" || saved === "comfortable")) {
      return saved;
    }
  } catch {
    // quiet fail
  }
  return "default";
}

function getServerSnapshot(): DensityMode {
  return "default";
}

export function useDensityPreference() {
  const density = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setDensity = React.useCallback((mode: DensityMode) => {
    try {
      localStorage.setItem(STORAGE_KEY, mode);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event(DENSITY_EVENT));
      }
    } catch {
      // quiet fail
    }
  }, []);

  return {
    density,
    setDensity,
    config: DENSITY_CONFIGS[density],
  };
}
