"use client";

import * as React from "react";
import { IconDefinition } from "@/lib/icons/schema";
import { ICONS_CATALOG } from "@/lib/icons/catalog";
import { searchIcons } from "@/lib/search/search-engine";

interface UseCatalogQueryOptions {
  initialCategory?: string;
  initialQuery?: string;
}

export function useCatalogQuery({
  initialCategory = "all",
  initialQuery = "",
}: UseCatalogQueryOptions = {}) {
  const [query, setQuery] = React.useState(initialQuery);
  const [category, setCategory] = React.useState(initialCategory);
  const [animatedOnly, setAnimatedOnly] = React.useState(false);
  const [filledOnly, setFilledOnly] = React.useState(false);
  const [tileScale, setTileScale] = React.useState<20 | 24 | 32>(24);

  // Sync category into URL query parameter
  const handleSelectCategory = React.useCallback((cat: string) => {
    setCategory(cat);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (cat === "all") {
        url.searchParams.delete("category");
      } else {
        url.searchParams.set("category", cat);
      }
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  // Filtered icons
  const filteredIcons = React.useMemo(() => {
    return searchIcons(ICONS_CATALOG, {
      query,
      category,
      animatedOnly,
      filledOnly,
    });
  }, [query, category, animatedOnly, filledOnly]);

  // Dynamic category counts that optionally reflect active query (Section 65)
  const categoryCounts = React.useMemo(() => {
    const map = new Map<string, number>();
    const baseList = query ? searchIcons(ICONS_CATALOG, { query, animatedOnly, filledOnly }) : ICONS_CATALOG;
    baseList.forEach((icon) => {
      map.set(icon.category, (map.get(icon.category) || 0) + 1);
    });
    return map;
  }, [query, animatedOnly, filledOnly]);

  const resetFilters = React.useCallback(() => {
    setQuery("");
    setCategory("all");
    setAnimatedOnly(false);
    setFilledOnly(false);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("category");
      url.searchParams.delete("search");
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  const totalCount = ICONS_CATALOG.length;
  const animatedCount = React.useMemo(
    () => ICONS_CATALOG.filter((i) => Boolean(i.animation)).length,
    []
  );
  const filledCount = React.useMemo(
    () => ICONS_CATALOG.filter((i) => Boolean(i.filled && i.filled.length > 0)).length,
    []
  );

  return {
    query,
    setQuery,
    category,
    setCategory: handleSelectCategory,
    animatedOnly,
    setAnimatedOnly,
    filledOnly,
    setFilledOnly,
    tileScale,
    setTileScale,
    filteredIcons,
    categoryCounts,
    totalCount,
    animatedCount,
    filledCount,
    resetFilters,
  };
}
