"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ICONS_CATALOG } from "@/lib/icons/catalog";
import { IconDefinition } from "@/lib/icons/schema";
import { toPXComponentName, generateSvgString } from "@/lib/compiler";
import { PXIconBase } from "@/components/icons/px-icon-base";
import {
  PXIconSearch,
  PXIconSparkles,
  PXIconX,
  PXIconCheck,
  PXIconCopy,
  PXIconTerminal,
  PXIconArrowRight,
  PXIconSliders,
  PXIconCode,
  PXIconSun,
  PXIconMoon,
} from "@/components/icons";
import { PXUIMark } from "@/components/brand";
import { copyToClipboard } from "@/lib/clipboard";
import { cn } from "@/lib/utils";

interface CommandSearchProps {
  onSelectIcon?: (icon: IconDefinition) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "actions", label: "Actions" },
  { id: "navigation", label: "Navigation" },
  { id: "system", label: "System" },
  { id: "media", label: "Media" },
  { id: "communication", label: "Communication" },
  { id: "animated", label: "Animated ✨" },
] as const;

export function CommandSearch({
  onSelectIcon,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: CommandSearchProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const setOpen = React.useCallback(
    (nextOpen: boolean | ((prev: boolean) => boolean)) => {
      const resolved = typeof nextOpen === "function" ? nextOpen(open) : nextOpen;
      if (isControlled && setControlledOpen) {
        setControlledOpen(resolved);
      } else {
        setInternalOpen(resolved);
      }
    },
    [isControlled, open, setControlledOpen]
  );

  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [stageTheme, setStageTheme] = React.useState<"dark" | "light">("dark");
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);
  const [mounted, setMounted] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);
  const itemRefs = React.useRef<Map<number, HTMLDivElement>>(new Map());

  const [origin, setOrigin] = React.useState("https://pxui.dev");
  React.useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  // Global hotkeys: ⌘K, Ctrl+K, and '/'
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement as HTMLElement | null;
      const isInput =
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          activeEl.isContentEditable);

      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !isInput)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [setOpen]);

  // Focus search input on open & reset selection
  React.useEffect(() => {
    if (open) {
      setSelectedIndex(0);
      setSearchQuery("");
      setSelectedCategory("all");
      setCopiedId(null);
      setToastMessage(null);
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Filter and sort catalog
  const filteredIcons = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return ICONS_CATALOG.filter((icon) => {
      // Category filter
      if (selectedCategory === "animated") {
        if (!icon.animation) return false;
      } else if (selectedCategory !== "all") {
        if (icon.category?.toLowerCase() !== selectedCategory) return false;
      }

      if (!query) return true;

      const compName = toPXComponentName(icon.name).toLowerCase();
      const rawName = icon.name.toLowerCase();
      const title = (icon.title || "").toLowerCase();
      const desc = (icon.description || "").toLowerCase();
      const aliases = (icon.aliases || []).map((a) => a.toLowerCase());
      const tags = (icon.tags || []).map((t) => t.toLowerCase());

      return (
        rawName.includes(query) ||
        compName.includes(query) ||
        title.includes(query) ||
        desc.includes(query) ||
        aliases.some((a) => a.includes(query)) ||
        tags.some((t) => t.includes(query))
      );
    }).sort((a, b) => {
      if (!query) return 0;
      const aComp = toPXComponentName(a.name).toLowerCase();
      const bComp = toPXComponentName(b.name).toLowerCase();
      const aExact = a.name.toLowerCase() === query || aComp === query;
      const bExact = b.name.toLowerCase() === query || bComp === query;
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;

      const aStarts = a.name.toLowerCase().startsWith(query) || aComp.startsWith(query);
      const bStarts = b.name.toLowerCase().startsWith(query) || bComp.startsWith(query);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;

      return 0;
    });
  }, [searchQuery, selectedCategory]);

  // Ensure selectedIndex is always within bounds
  React.useEffect(() => {
    if (selectedIndex >= filteredIcons.length) {
      setSelectedIndex(Math.max(0, filteredIcons.length - 1));
    }
  }, [filteredIcons.length, selectedIndex]);

  const activeIcon = filteredIcons[selectedIndex] || filteredIcons[0] || null;

  // Auto-scroll active item into view
  React.useEffect(() => {
    if (!open) return;
    const el = itemRefs.current.get(selectedIndex);
    if (el) {
      el.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [selectedIndex, open]);

  const handleSelect = React.useCallback(
    (icon: IconDefinition) => {
      setOpen(false);
      if (onSelectIcon) {
        onSelectIcon(icon);
      } else {
        router.push(`/icons/px-${icon.name}`);
      }
    },
    [onSelectIcon, router, setOpen]
  );

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2000);
  };

  const handleCopySnippet = async (icon: IconDefinition, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const compName = toPXComponentName(icon.name);
    const code = `<${compName} size={24} />`;
    const ok = await copyToClipboard(code);
    if (ok) {
      setCopiedId("react");
      showToast(`Copied <${compName} /> snippet`);
      setTimeout(() => setCopiedId(null), 1800);
    }
  };

  const handleCopySvg = async (icon: IconDefinition, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const svg = generateSvgString(icon, false);
    const ok = await copyToClipboard(svg);
    if (ok) {
      setCopiedId("svg");
      showToast(`Copied px-${icon.name}.svg`);
      setTimeout(() => setCopiedId(null), 1800);
    }
  };

  const handleCopyCli = async (icon: IconDefinition, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const cmd = `npx shadcn@latest add ${origin}/r/px-${icon.name}.json`;
    const ok = await copyToClipboard(cmd);
    if (ok) {
      setCopiedId("cli");
      showToast(`Copied shadcn CLI command`);
      setTimeout(() => setCopiedId(null), 1800);
    }
  };

  // Keyboard navigation inside modal
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredIcons.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredIcons.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIcon) handleSelect(activeIcon);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Cycle categories
      const currentIndex = CATEGORIES.findIndex((c) => c.id === selectedCategory);
      const nextIndex = (currentIndex + 1) % CATEGORIES.length;
      setSelectedCategory(CATEGORIES[nextIndex].id);
      setSelectedIndex(0);
    }
  };

  const triggerButton = (
    /* Global Header Trigger Button (Technical Command Control) */
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="relative group hidden sm:flex items-center justify-between w-48 md:w-64 h-[38px] px-3.5 text-xs font-sans text-muted-foreground bg-white/80 dark:bg-[#181715]/80 hover:bg-white dark:hover:bg-[#201e1b] border border-[#e6dfd8] dark:border-[#282622] rounded-md transition-all hover:border-[#cc785c]/40 shadow-2xs overflow-hidden outline-none cursor-pointer"
      title="Open Command Center (⌘K / Ctrl+K)"
      aria-label="Open Command Center"
    >
      {/* Subtle technical corner activation indicator */}
      <span
        aria-hidden="true"
        className="absolute top-0 right-0 w-2.5 h-[2px] bg-[#cc785c] opacity-0 group-hover:opacity-100 transition-opacity"
      />
      <span
        aria-hidden="true"
        className="absolute top-0 right-0 h-2.5 w-[2px] bg-[#cc785c] opacity-0 group-hover:opacity-100 transition-opacity"
      />

      <span className="inline-flex items-center gap-2">
        <PXIconSearch className="h-3.5 w-3.5 text-[#8e8b82] group-hover:text-[#cc785c] transition-colors" size={14} />
        <span className="truncate text-muted-foreground group-hover:text-foreground">
          Search catalog…
        </span>
      </span>
      <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-0.5 rounded border border-[#e6dfd8] dark:border-[#2e2c28] bg-[#faf9f5] dark:bg-[#201e1b] px-1.5 font-mono text-[10px] text-[#8e8b82] group-hover:text-foreground">
        <span>⌘</span>K
      </kbd>
    </button>
  );

  if (!open || !mounted) {
    return triggerButton;
  }

  return (
    <>
      {triggerButton}
      {createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label="PXUI Command Center"
          className="fixed inset-0 z-[9999] flex items-start justify-center p-2.5 sm:p-4 md:p-6 pt-4 sm:pt-8 md:pt-12 bg-black/65 dark:bg-black/85 backdrop-blur-md animate-in fade-in duration-150 select-none overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div
            className="w-full max-w-4xl lg:max-w-5xl rounded-2xl border border-[#e6dfd8] dark:border-[#282622] bg-[#faf9f5] dark:bg-[#141312] text-[#141413] dark:text-[#faf9f5] shadow-[0_25px_70px_rgba(0,0,0,0.45),0_0_0_1px_rgba(204,120,92,0.25)] overflow-hidden flex flex-col h-[520px] sm:h-[580px] max-h-[calc(100vh-2rem)] transition-all my-auto"
            onClick={(e) => e.stopPropagation()}
          >
        {/* Top Architectural Banner */}
        <div className="px-4 sm:px-6 py-3 border-b border-[#e6dfd8] dark:border-[#252320] bg-white/70 dark:bg-[#181715]/70 backdrop-blur-md flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <PXUIMark size={20} variant="coral" className="shrink-0" />
            <div className="flex items-center gap-2">
              <span className="font-sans text-xs font-bold tracking-tight text-[#141413] dark:text-[#faf9f5]">
                COMMAND PALETTE
              </span>
              <span className="font-mono text-[10px] text-[#8e8b82] uppercase tracking-wider hidden sm:inline">
                · TECHNICAL DRAFTING CATALOG
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#cc785c]/10 text-[#cc785c] border border-[#cc785c]/25 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#cc785c] animate-pulse" />
              {filteredIcons.length} SPECIMENS
            </span>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-2 py-1 rounded-md border border-[#e6dfd8] dark:border-[#2e2c28] bg-white dark:bg-[#201e1b] hover:bg-[#f5f0e8] dark:hover:bg-[#282622] text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5] text-[10px] font-mono transition-colors cursor-pointer flex items-center gap-1"
              title="Close palette (Esc)"
            >
              <span>ESC</span>
              <PXIconX size={12} />
            </button>
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="p-3 sm:p-4 border-b border-[#e6dfd8] dark:border-[#252320] bg-white dark:bg-[#181715] shrink-0">
          <div className="relative flex items-center">
            <div className="absolute left-3.5 flex items-center pointer-events-none text-[#cc785c]">
              <PXIconSearch size={18} />
            </div>

            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleInputKeyDown}
              placeholder="Search 100+ icons by name, alias (e.g. 'delete', 'pencil', 'magnifier')..."
              className="w-full h-12 pl-11 pr-24 rounded-xl bg-[#faf9f5] dark:bg-[#201e1b] border border-[#e6dfd8] dark:border-[#2e2c28] font-sans text-sm text-[#141413] dark:text-[#faf9f5] placeholder:text-[#8e8b82]/70 outline-none focus:border-[#cc785c] focus:ring-2 focus:ring-[#cc785c]/15 transition-all shadow-inner"
            />

            <div className="absolute right-3 flex items-center gap-1.5">
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    inputRef.current?.focus();
                  }}
                  className="w-6 h-6 rounded-md hover:bg-[#e6dfd8] dark:hover:bg-[#2e2c28] text-[#8e8b82] flex items-center justify-center transition-colors cursor-pointer"
                  title="Clear query"
                >
                  <PXIconX size={12} />
                </button>
              )}
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono text-[#8e8b82] bg-white dark:bg-[#141312] border border-[#e6dfd8] dark:border-[#2e2c28]">
                ↵ OPEN
              </span>
            </div>
          </div>

          {/* Quick Category Filter Pills */}
          <div className="flex items-center gap-1.5 mt-2.5 overflow-x-auto no-scrollbar py-0.5">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setSelectedIndex(0);
                    inputRef.current?.focus();
                  }}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all shrink-0 cursor-pointer",
                    isActive
                      ? "bg-[#141413] dark:bg-[#faf9f5] text-[#faf9f5] dark:text-[#141413] font-bold shadow-xs"
                      : "bg-[#faf9f5] dark:bg-[#201e1b] border border-[#e6dfd8] dark:border-[#2e2c28] text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5] hover:border-[#cc785c]/40"
                  )}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dual-Pane Workstation Area */}
        <div className="flex-1 min-h-0 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[#e6dfd8] dark:divide-[#252320] overflow-hidden">
          {/* Left Column: Icon Specimen List */}
          <div
            ref={listRef}
            className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-1 h-full min-h-0 focus:outline-none overscroll-contain"
          >
            {filteredIcons.length === 0 ? (
              <div className="py-14 text-center space-y-2 font-mono">
                <div className="w-10 h-10 mx-auto rounded-xl bg-[#cc785c]/10 text-[#cc785c] flex items-center justify-center font-bold text-lg border border-[#cc785c]/20">
                  ?
                </div>
                <div className="text-xs font-bold text-[#141413] dark:text-[#faf9f5]">
                  No matching specimens found
                </div>
                <div className="text-[11px] text-[#8e8b82]">
                  Try searching for another keyword, alias (e.g. &apos;bin&apos;, &apos;pencil&apos;), or reset filters.
                </div>
              </div>
            ) : (
              filteredIcons.map((icon, idx) => {
                const isSelected = idx === selectedIndex;
                const compName = toPXComponentName(icon.name);

                return (
                  <div
                    key={icon.name}
                    ref={(node) => {
                      if (node) itemRefs.current.set(idx, node);
                      else itemRefs.current.delete(idx);
                    }}
                    onClick={() => handleSelect(icon)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={cn(
                      "group relative flex items-center justify-between gap-3 p-2.5 rounded-xl transition-all cursor-pointer select-none",
                      isSelected
                        ? "bg-[#cc785c]/10 dark:bg-[#cc785c]/15 text-[#141413] dark:text-[#faf9f5] border border-[#cc785c]/40 shadow-xs"
                        : "hover:bg-white dark:hover:bg-[#181715] text-[#141413] dark:text-[#faf9f5] border border-transparent"
                    )}
                  >
                    {/* Left edge selection indicator line */}
                    {isSelected && (
                      <span className="absolute left-0 top-2 bottom-2 w-1 bg-[#cc785c] rounded-r-full" />
                    )}

                    <div className="flex items-center gap-3 min-w-0 flex-1 pl-1">
                      {/* Micro 24x24 Drafting Plate */}
                      <div
                        className={cn(
                          "w-9 h-9 rounded-lg flex items-center justify-center border shrink-0 transition-colors relative overflow-hidden",
                          isSelected
                            ? "border-[#cc785c]/50 bg-white dark:bg-[#121110] text-[#cc785c]"
                            : "border-[#e6dfd8] dark:border-[#2e2c28] bg-white dark:bg-[#181715] text-[#141413] dark:text-[#faf9f5]"
                        )}
                      >
                        {/* 24x24 Drafting Grid background */}
                        <div
                          className="absolute inset-0 pointer-events-none opacity-15"
                          style={{
                            backgroundImage:
                              "linear-gradient(to right, rgba(142,139,130,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(142,139,130,0.4) 1px, transparent 1px)",
                            backgroundSize: "8.33% 8.33%",
                          }}
                        />
                        <PXIconBase definition={icon} size={20} className="pixel-crisp" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-sans font-bold text-xs text-[#141413] dark:text-[#faf9f5] truncate">
                            {compName}
                          </span>
                          <span className="font-mono text-[10px] text-[#8e8b82]">
                            px-{icon.name}
                          </span>
                          {icon.animation && (
                            <span className="inline-flex items-center gap-0.5 px-1 py-0 rounded text-[9px] font-mono bg-[#cc785c]/15 text-[#cc785c] border border-[#cc785c]/30 font-semibold">
                              <PXIconSparkles size={8} />
                              anim
                            </span>
                          )}
                        </div>

                        <div className="font-mono text-[10px] text-[#8e8b82] truncate mt-0.5">
                          {icon.aliases && icon.aliases.length > 0
                            ? `aliases: ${icon.aliases.join(", ")} · `
                            : ""}
                          {icon.description || icon.title}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="hidden sm:inline-block font-mono text-[10px] uppercase px-1.5 py-0.5 rounded bg-[#faf9f5] dark:bg-[#201e1b] border border-[#e6dfd8] dark:border-[#2e2c28] text-[#8e8b82]">
                        {icon.category}
                      </span>
                      <span className="font-mono text-xs opacity-0 group-hover:opacity-100 text-[#cc785c] transition-opacity">
                        ↵
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Column: Live Technical Hologram & Quick Actions Inspector (Desktop only) */}
          {activeIcon && (
            <div className="hidden md:flex md:w-80 lg:w-96 shrink-0 bg-white/60 dark:bg-[#181715]/60 p-4 sm:p-5 flex-col justify-between overflow-y-auto">
              <div className="space-y-4">
                {/* Stage Header */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold tracking-widest text-[#8e8b82] uppercase">
                    SPECIMEN INSPECTION
                  </span>
                  <div className="flex items-center gap-1 bg-[#faf9f5] dark:bg-[#201e1b] p-0.5 rounded-md border border-[#e6dfd8] dark:border-[#2e2c28]">
                    <button
                      type="button"
                      onClick={() => setStageTheme("dark")}
                      className={cn(
                        "p-1 rounded text-xs transition-colors cursor-pointer",
                        stageTheme === "dark"
                          ? "bg-[#141413] text-white shadow-xs"
                          : "text-[#8e8b82] hover:text-[#141413]"
                      )}
                      title="Preview on dark surface"
                    >
                      <PXIconMoon size={11} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setStageTheme("light")}
                      className={cn(
                        "p-1 rounded text-xs transition-colors cursor-pointer",
                        stageTheme === "light"
                          ? "bg-white text-black shadow-xs"
                          : "text-[#8e8b82] hover:text-[#141413]"
                      )}
                      title="Preview on light surface"
                    >
                      <PXIconSun size={11} />
                    </button>
                  </div>
                </div>

                {/* Live Drafting Plate with 24x24 Coordinates */}
                <div
                  className={cn(
                    "relative w-full h-28 rounded-xl border flex items-center justify-center transition-colors shadow-inner overflow-hidden shrink-0",
                    stageTheme === "dark"
                      ? "bg-[#0f0e0d] border-[#252320] text-white"
                      : "bg-[#faf9f5] border-[#e6dfd8] text-[#141413]"
                  )}
                >
                  {/* Drafting Grid with Crosshairs */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, rgba(142,139,130,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(142,139,130,0.4) 1px, transparent 1px)",
                      backgroundSize: "4.16% 4.16%",
                    }}
                  />
                  {/* Subtle 24x24 optical boundary */}
                  <div className="absolute w-20 h-20 border border-dashed border-[#cc785c]/35 rounded-xs pointer-events-none" />

                  <PXIconBase
                    definition={activeIcon}
                    size={44}
                    className="pixel-crisp drop-shadow-md relative z-10"
                  />

                  <div className="absolute bottom-1.5 left-2 font-mono text-[9px] text-[#8e8b82]/80">
                    24×24 INTEGER
                  </div>
                  <div className="absolute bottom-1.5 right-2 font-mono text-[9px] text-[#cc785c]">
                    v{activeIcon.introducedVersion || "1.0"}
                  </div>
                </div>

                {/* Identity & Technical Specs */}
                <div className="space-y-0.5">
                  <div className="font-sans font-bold text-sm text-[#141413] dark:text-[#faf9f5] flex items-center justify-between">
                    <span>{toPXComponentName(activeIcon.name)}</span>
                    <span className="font-mono text-[10px] text-[#cc785c]">
                      px-{activeIcon.name}
                    </span>
                  </div>
                  <p className="font-sans text-[11px] text-[#8e8b82] line-clamp-1">
                    {activeIcon.description || activeIcon.title}
                  </p>
                </div>

                {/* Blueprint Code Preview */}
                <div className="p-2 rounded-md bg-[#faf9f5] dark:bg-[#201e1b] border border-[#e6dfd8] dark:border-[#2e2c28] font-mono text-[10px] text-[#141413] dark:text-[#faf9f5] truncate">
                  <span className="text-[#8e8b82]">import </span>
                  <span className="text-[#cc785c] font-bold">
                    {"{"} {toPXComponentName(activeIcon.name)} {"}"}
                  </span>
                  <span className="text-[#8e8b82]"> from </span>
                  <span className="text-[#5db872]">&quot;@pxui/react&quot;</span>;
                </div>
              </div>

              {/* Instant Actions Grid */}
              <div className="space-y-1.5 mt-3 pt-2.5 border-t border-[#e6dfd8] dark:border-[#252320]">
                {/* Primary: Open Specification */}
                <button
                  type="button"
                  onClick={() => handleSelect(activeIcon)}
                  className="w-full h-8 rounded-lg bg-[#141413] dark:bg-[#faf9f5] text-[#faf9f5] dark:text-[#141413] hover:opacity-90 font-mono text-xs font-bold transition-all flex items-center justify-between px-3 cursor-pointer shadow-xs active:scale-[0.98]"
                >
                  <span className="flex items-center gap-1.5">
                    <PXIconSliders size={13} />
                    <span>Open Specification</span>
                  </span>
                  <span className="text-[10px] opacity-70">↵</span>
                </button>

                {/* Quick Copy Action Buttons */}
                <div className="grid grid-cols-3 gap-1.5 font-mono text-[10px]">
                  <button
                    type="button"
                    onClick={(e) => handleCopySnippet(activeIcon, e)}
                    className="h-7 rounded-md border border-[#e6dfd8] dark:border-[#2e2c28] bg-white dark:bg-[#201e1b] hover:bg-[#faf9f5] dark:hover:bg-[#282622] hover:border-[#cc785c]/40 text-[#141413] dark:text-[#faf9f5] transition-all flex items-center justify-center gap-1 cursor-pointer"
                    title="Copy React snippet"
                  >
                    {copiedId === "react" ? (
                      <PXIconCheck size={10} className="text-[#5db872]" />
                    ) : (
                      <PXIconCopy size={10} className="text-[#8e8b82]" />
                    )}
                    <span>React</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleCopySvg(activeIcon, e)}
                    className="h-7 rounded-md border border-[#e6dfd8] dark:border-[#2e2c28] bg-white dark:bg-[#201e1b] hover:bg-[#faf9f5] dark:hover:bg-[#282622] hover:border-[#cc785c]/40 text-[#141413] dark:text-[#faf9f5] transition-all flex items-center justify-center gap-1 cursor-pointer"
                    title="Copy Raw SVG"
                  >
                    {copiedId === "svg" ? (
                      <PXIconCheck size={10} className="text-[#5db872]" />
                    ) : (
                      <PXIconCode size={10} className="text-[#8e8b82]" />
                    )}
                    <span>SVG</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleCopyCli(activeIcon, e)}
                    className="h-7 rounded-md border border-[#e6dfd8] dark:border-[#2e2c28] bg-white dark:bg-[#201e1b] hover:bg-[#faf9f5] dark:hover:bg-[#282622] hover:border-[#cc785c]/40 text-[#141413] dark:text-[#faf9f5] transition-all flex items-center justify-center gap-1 cursor-pointer"
                    title="Copy shadcn add command"
                  >
                    {copiedId === "cli" ? (
                      <PXIconCheck size={10} className="text-[#5db872]" />
                    ) : (
                      <PXIconTerminal size={10} className="text-[#cc785c]" />
                    )}
                    <span>CLI</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Technical Command Dock */}
        <div className="px-4 sm:px-6 py-2.5 border-t border-[#e6dfd8] dark:border-[#252320] bg-[#faf9f5] dark:bg-[#181715] flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] text-[#8e8b82] shrink-0">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-[#201e1b] border border-[#e6dfd8] dark:border-[#2e2c28] font-bold">↑↓</kbd> Navigate
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-[#201e1b] border border-[#e6dfd8] dark:border-[#2e2c28] font-bold">↵</kbd> Select
            </span>
            <span className="hidden sm:inline">
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-[#201e1b] border border-[#e6dfd8] dark:border-[#2e2c28] font-bold">Tab</kbd> Filter
            </span>
            <span className="hidden md:inline">
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-[#201e1b] border border-[#e6dfd8] dark:border-[#2e2c28] font-bold">ESC</kbd> Close
            </span>
          </div>

          <div className="flex items-center gap-2">
            {toastMessage ? (
              <span className="text-[#cc785c] font-bold animate-pulse">
                {toastMessage}
              </span>
            ) : (
              <span className="text-[#8e8b82]">
                PXUI SPECIFICATION ENGINE · 0.2ms
              </span>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  )}
</>
);
}
