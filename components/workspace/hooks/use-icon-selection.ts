"use client";

import * as React from "react";
import { IconDefinition } from "@/lib/icons/schema";
import { ICONS_CATALOG } from "@/lib/icons/catalog";

export type InspectorTab = "specimen" | "sizes" | "geometry" | "code";

interface UseIconSelectionOptions {
  initialIconName?: string;
  isMobile?: boolean;
}

export function useIconSelection({ initialIconName, isMobile = false }: UseIconSelectionOptions = {}) {
  // Resolve initial icon from prop or fallback to first icon
  const initialIcon = React.useMemo(() => {
    if (initialIconName) {
      const clean = initialIconName.replace(/^px-/, "");
      const match = ICONS_CATALOG.find((i) => i.name === clean);
      if (match) return match;
    }
    return ICONS_CATALOG[0] || null;
  }, [initialIconName]);

  const [selectedIcon, setSelectedIcon] = React.useState<IconDefinition | null>(initialIcon);
  // Persist Inspector Tab across icon switches (Section 60)
  const [activeTab, setActiveTab] = React.useState<InspectorTab>("specimen");
  // Mobile/Tablet Inspector Sheet state (automatically open if initialIconName was in URL on mobile)
  const [isMobileInspectorOpen, setIsMobileInspectorOpen] = React.useState<boolean>(
    Boolean(initialIconName && isMobile)
  );

  // Sync with URL query parameter when icon changes
  const updateUrlParam = React.useCallback((icon: IconDefinition | null) => {
    if (typeof window === "undefined") return;
    try {
      const url = new URL(window.location.href);
      if (icon) {
        url.searchParams.set("icon", `px-${icon.name}`);
      } else {
        url.searchParams.delete("icon");
      }
      window.history.replaceState({}, "", url.toString());
    } catch {
      // quiet fail
    }
  }, []);

  const selectIcon = React.useCallback(
    (icon: IconDefinition, openMobileSheet: boolean = true) => {
      setSelectedIcon(icon);
      updateUrlParam(icon);
      if (openMobileSheet) {
        setIsMobileInspectorOpen(true);
      }
    },
    [updateUrlParam]
  );

  const clearSelection = React.useCallback(() => {
    setSelectedIcon(null);
    updateUrlParam(null);
    setIsMobileInspectorOpen(false);
  }, [updateUrlParam]);

  return {
    selectedIcon,
    setSelectedIcon,
    selectIcon,
    clearSelection,
    activeTab,
    setActiveTab,
    isMobileInspectorOpen,
    setIsMobileInspectorOpen,
  };
}
