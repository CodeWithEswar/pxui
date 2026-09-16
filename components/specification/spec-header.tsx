"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconDefinition } from "@/lib/icons/schema";
import { toPXComponentName } from "@/lib/compiler";
import {
  PXIconArrowLeft,
  PXIconCheck,
  PXIconCopy,
  PXIconTerminal,
  PXIconMaximize,
  PXIconSliders,
  PXIconShare,
  PXIconDownload,
  PXIconCode,
  PXIconSearch,
} from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { PXUIMark } from "@/components/brand";
import { copyToClipboard as safeCopyToClipboard } from "@/lib/clipboard";
import { IconCopyDialog, type CopyDialogTab } from "@/components/icons";
import { CommandSearch } from "@/components/navigation/command-search";
import { cn } from "@/lib/utils";

interface SpecHeaderProps {
  icon: IconDefinition;
  onOpenFullscreen?: () => void;
  onOpenCompare?: () => void;
  onOpenFamilyProof?: () => void;
  onOpenCopyDialog?: (tab?: CopyDialogTab) => void;
}

export function SpecHeader({
  icon,
  onOpenFullscreen,
  onOpenCompare,
  onOpenFamilyProof,
  onOpenCopyDialog,
}: SpecHeaderProps) {
  const router = useRouter();
  const componentName = toPXComponentName(icon.name);
  const [copiedAction, setCopiedAction] = React.useState<string | null>(null);
  const [isMoreOpen, setIsMoreOpen] = React.useState(false);
  const [isCopyDialogOpen, setIsCopyDialogOpen] = React.useState(false);
  const [copyDialogTab, setCopyDialogTab] = React.useState<CopyDialogTab>("react");
  const [searchModalOpen, setSearchModalOpen] = React.useState(false);
  const moreRef = React.useRef<HTMLDivElement>(null);

  const [origin, setOrigin] = React.useState("https://pxui.dev");
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  // Handle back to catalog while restoring preserved context
  const handleBackToCatalog = React.useCallback(() => {
    if (typeof window !== "undefined") {
      const savedQuery = sessionStorage.getItem("pxui_catalog_query");
      if (savedQuery) {
        router.push(`/icons${savedQuery}`);
        return;
      }
    }
    router.push("/icons");
  }, [router]);

  const copyToClipboard = async (text: string, id: string) => {
    const success = await safeCopyToClipboard(text);
    if (success) {
      setCopiedAction(id);
      setTimeout(() => setCopiedAction(null), 1800);
    }
  };

  // Close more menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const componentSnippet = `<${componentName} size={24} />`;
  const importSnippet = `import { ${componentName} } from "@pxui/react";`;
  const registryCmd = `npx shadcn@latest add ${origin}/r/px-${icon.name}.json`;
  const rawSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">${icon.paths.map((p) => `<path d="${p.d}"${p.fillRule ? ` fill-rule="${p.fillRule}" clip-rule="${p.fillRule}"` : ""}/>`).join("")}</svg>`;

  const handleDownloadSvg = () => {
    const blob = new Blob([rawSvg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `px-${icon.name}.svg`;
    a.click();
    URL.revokeObjectURL(url);
    setIsMoreOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 h-16 w-full border-b border-[#e6dfd8] dark:border-[#252320] bg-[#faf9f5]/90 dark:bg-[#181715]/90 backdrop-blur-md select-none transition-colors">
      <div className="mx-auto flex h-full items-center justify-between px-4 sm:px-6 max-w-[1600px]">
        {/* Left: Brand mark + quiet back to icons */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="group h-8 inline-flex items-center gap-2.5 cursor-pointer"
            aria-label="PXUI — Home"
          >
            <PXUIMark
              size={22}
              variant="coral"
              className="group-hover:scale-105 transition-transform shrink-0"
            />
            <span className="font-serif text-[19px] font-normal tracking-tight text-foreground group-hover:text-primary transition-colors hidden sm:inline">
              PXUI
            </span>
          </Link>

          <span className="text-[#e6dfd8] dark:text-[#2e2c28] font-mono">/</span>

          <button
            type="button"
            onClick={handleBackToCatalog}
            className="h-8 px-2.5 inline-flex items-center justify-center gap-1.5 rounded-md border border-[#e6dfd8] dark:border-[#2e2c28] bg-white dark:bg-[#201e1b] hover:bg-[#f5f0e8] dark:hover:bg-[#282622] text-xs font-mono text-[#141413] dark:text-[#faf9f5] transition-all cursor-pointer box-border shrink-0 shadow-2xs"
            title="Return to catalog with preserved filters and scroll position"
          >
            <PXIconArrowLeft size={13} className="shrink-0" />
            <span>Icons</span>
          </button>
        </div>

        {/* Center: Developer identity */}
        <div className="hidden md:flex items-center gap-2.5">
          <span className="w-2 h-2 bg-[#cc785c] rounded-xs shrink-0" />
          <span className="font-sans font-bold text-sm text-[#141413] dark:text-[#faf9f5]">
            {componentName}
          </span>
          <span className="font-mono text-xs text-[#8e8b82] bg-[#f5f0e8] dark:bg-[#201e1b] px-1.5 py-0.5 rounded border border-[#e6dfd8] dark:border-[#2e2c28]">
            px-{icon.name}
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-[#5db872]/15 text-[#5db872] border border-[#5db872]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5db872]" />
            Stable
          </span>
        </div>

        {/* Right: Quick actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Global Command Search (⌘K / Ctrl+K) */}
          <CommandSearch
            open={searchModalOpen}
            onOpenChange={setSearchModalOpen}
          />

          {/* Mobile Search Button (<640px) */}
          <button
            type="button"
            onClick={() => setSearchModalOpen(true)}
            aria-label="Search icons (⌘K)"
            title="Search icons (⌘K)"
            className="sm:hidden h-8 w-8 inline-flex items-center justify-center rounded-md border border-[#e6dfd8] dark:border-[#2e2c28] bg-white dark:bg-[#201e1b] text-foreground shadow-2xs cursor-pointer"
          >
            <PXIconSearch size={14} className="text-[#cc785c]" />
          </button>

          {/* Copy Component */}
          <button
            type="button"
            onClick={() => {
              if (onOpenCopyDialog) {
                onOpenCopyDialog("react");
              } else {
                setCopyDialogTab("react");
                setIsCopyDialogOpen(true);
              }
            }}
            className="h-8 inline-flex items-center justify-center gap-1.5 rounded-md border text-xs font-mono transition-all cursor-pointer box-border shrink-0 shadow-2xs px-2 sm:px-2.5 border-[#e6dfd8] dark:border-[#2e2c28] bg-white dark:bg-[#201e1b] hover:bg-[#f5f0e8] dark:hover:bg-[#282622] text-[#141413] dark:text-[#faf9f5]"
            title="Export & Copy Icon (React, Native, shadcn, SVG) (Press 'C')"
            aria-label="Export & Copy Icon"
          >
            <PXIconCopy size={13} className="text-[#8e8b82] shrink-0" />
            <span className="hidden xs:inline">Copy</span>
          </button>

          {/* Install shadcn */}
          <button
            type="button"
            onClick={() => {
              if (onOpenCopyDialog) {
                onOpenCopyDialog("shadcn");
              } else {
                setCopyDialogTab("shadcn");
                setIsCopyDialogOpen(true);
              }
            }}
            className="hidden md:inline-flex items-center justify-center gap-1.5 h-8 px-2.5 rounded-md border text-xs font-mono transition-all cursor-pointer box-border shrink-0 shadow-2xs border-[#e6dfd8] dark:border-[#2e2c28] bg-white dark:bg-[#201e1b] hover:bg-[#f5f0e8] dark:hover:bg-[#282622] text-[#141413] dark:text-[#faf9f5]"
            title="Copy shadcn Registry install command"
            aria-label="Install via Registry"
          >
            <PXIconTerminal size={13} className="text-[#cc785c] shrink-0" />
            <span>Install</span>
          </button>

          {/* Compare Mode */}
          {onOpenCompare && (
            <button
              type="button"
              onClick={onOpenCompare}
              className="h-8 inline-flex items-center justify-center gap-1.5 px-2 lg:px-2.5 rounded-md border border-[#e6dfd8] dark:border-[#2e2c28] bg-white dark:bg-[#201e1b] hover:bg-[#f5f0e8] dark:hover:bg-[#282622] text-xs font-mono text-[#141413] dark:text-[#faf9f5] cursor-pointer box-border shrink-0 shadow-2xs"
              title="Compare side-by-side with related icons"
              aria-label="Compare icon"
            >
              <PXIconSliders size={13} className="text-[#cc785c] shrink-0" />
              <span className="hidden lg:inline">Compare</span>
            </button>
          )}

          {/* Fullscreen Specimen */}
          {onOpenFullscreen && (
            <button
              type="button"
              onClick={onOpenFullscreen}
              className="h-8 w-8 inline-flex items-center justify-center p-0 rounded-md border border-[#e6dfd8] dark:border-[#2e2c28] bg-white dark:bg-[#201e1b] hover:bg-[#f5f0e8] dark:hover:bg-[#282622] text-[#141413] dark:text-[#faf9f5] cursor-pointer box-border shrink-0 shadow-2xs"
              title="Open distraction-free fullscreen specimen (Esc to exit)"
              aria-label="Fullscreen specimen"
            >
              <PXIconMaximize size={14} className="shrink-0" />
            </button>
          )}

          {/* More Dropdown */}
          <div className="relative shrink-0" ref={moreRef}>
            <button
              type="button"
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className="h-8 px-2.5 inline-flex items-center justify-center gap-1 rounded-md border border-[#e6dfd8] dark:border-[#2e2c28] bg-white dark:bg-[#201e1b] hover:bg-[#f5f0e8] dark:hover:bg-[#282622] text-xs font-mono text-[#141413] dark:text-[#faf9f5] cursor-pointer box-border shrink-0 shadow-2xs"
              title="More actions"
              aria-expanded={isMoreOpen}
            >
              <span>More ▾</span>
            </button>

            {isMoreOpen && (
              <div className="absolute right-0 mt-1.5 w-56 rounded-md border border-[#e6dfd8] dark:border-[#2e2c28] bg-white dark:bg-[#1d1b18] p-1.5 shadow-xl text-xs font-mono z-50">
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenCopyDialog) {
                      onOpenCopyDialog("react");
                    } else {
                      setCopyDialogTab("react");
                      setIsCopyDialogOpen(true);
                    }
                    setIsMoreOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded hover:bg-[#f5f0e8] dark:hover:bg-[#282622] text-[#141413] dark:text-[#faf9f5] text-left cursor-pointer"
                >
                  <span className="flex items-center gap-2 text-primary font-semibold">
                    <PXIconCopy size={13} />
                    Export &amp; Copy Dialog...
                  </span>
                </button>
                <div className="my-1 border-t border-[#e6dfd8] dark:border-[#252320]" />
                <button
                  type="button"
                  onClick={() => {
                    copyToClipboard(registryCmd, "install-cmd");
                    setIsMoreOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded hover:bg-[#f5f0e8] dark:hover:bg-[#282622] text-[#141413] dark:text-[#faf9f5] text-left cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <PXIconTerminal size={13} className="text-[#cc785c]" />
                    Copy Registry Command
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    copyToClipboard(importSnippet, "import");
                    setIsMoreOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded hover:bg-[#f5f0e8] dark:hover:bg-[#282622] text-[#141413] dark:text-[#faf9f5] text-left cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <PXIconCode size={13} className="text-[#8e8b82]" />
                    Copy Import
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    copyToClipboard(rawSvg, "svg");
                    setIsMoreOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded hover:bg-[#f5f0e8] dark:hover:bg-[#282622] text-[#141413] dark:text-[#faf9f5] text-left cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <PXIconCopy size={13} className="text-[#8e8b82]" />
                    Copy Raw SVG
                  </span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadSvg}
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded hover:bg-[#f5f0e8] dark:hover:bg-[#282622] text-[#141413] dark:text-[#faf9f5] text-left cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <PXIconDownload size={13} className="text-[#8e8b82]" />
                    Download SVG
                  </span>
                </button>
                {onOpenFamilyProof && (
                  <button
                    type="button"
                    onClick={() => {
                      onOpenFamilyProof();
                      setIsMoreOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 rounded hover:bg-[#f5f0e8] dark:hover:bg-[#282622] text-[#141413] dark:text-[#faf9f5] text-left cursor-pointer"
                  >
                    <span className="flex items-center gap-2 text-[#cc785c]">
                      <PXIconSliders size={13} />
                      Family Proof Sheet
                    </span>
                  </button>
                )}
                <div className="my-1 border-t border-[#e6dfd8] dark:border-[#252320]" />
                <button
                  type="button"
                  onClick={() => {
                    copyToClipboard(window.location.href, "share");
                    setIsMoreOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded hover:bg-[#f5f0e8] dark:hover:bg-[#282622] text-[#141413] dark:text-[#faf9f5] text-left cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <PXIconShare size={13} className="text-[#8e8b82]" />
                    Copy Specification Link
                  </span>
                </button>
              </div>
            )}
          </div>

          <ThemeToggle className="h-8 w-8 rounded-md border border-[#e6dfd8] dark:border-[#2e2c28] bg-white dark:bg-[#201e1b] hover:bg-[#f5f0e8] dark:hover:bg-[#282622] text-[#141413] dark:text-[#faf9f5] shrink-0 box-border p-0 inline-flex items-center justify-center shadow-2xs transition-all" />
        </div>
      </div>
    </header>
  );
}
