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

export function useDensityPreference() {
  const [density, setDensityState] = React.useState<DensityMode>("default");

  // Read saved preference after mount
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as DensityMode | null;
      if (saved && (saved === "compact" || saved === "default" || saved === "comfortable")) {
        setDensityState(saved);
      }
    } catch {
      // quiet fail for disabled localStorage
    }
  }, []);

  const setDensity = React.useCallback((mode: DensityMode) => {
    setDensityState(mode);
    try {
      localStorage.setItem(STORAGE_KEY, mode);
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
