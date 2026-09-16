"use client";

import * as React from "react";
import { IconDefinition } from "@/lib/icons/schema";
import { toPXComponentName } from "@/lib/compiler";
import { PXIconBase, PXIconCopy, PXIconTerminal, PXIconX, IconCopyDialog, type CopyDialogTab } from "@/components/icons";
import { cn } from "@/lib/utils";

interface InspectorIdentityProps {
  icon: IconDefinition;
  onClose?: () => void;
  className?: string;
}

export function InspectorIdentity({ icon, onClose, className }: InspectorIdentityProps) {
  const componentName = toPXComponentName(icon.name);
  const [isCopyDialogOpen, setIsCopyDialogOpen] = React.useState(false);
  const [dialogTab, setDialogTab] = React.useState<CopyDialogTab>("react");

  const openCopyDialog = (tab: CopyDialogTab = "react") => {
    setDialogTab(tab);
    setIsCopyDialogOpen(true);
  };

  return (
    <div
      className={cn(
        "p-3.5 sm:p-4 border-b border-[#e6dfd8] dark:border-[#252320] bg-[#faf9f5] dark:bg-[#1d1b18] text-[#141413] dark:text-[#faf9f5] shrink-0 select-none",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        {/* Left: Thumbnail Micro-Specimen + Title & Slug */}
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="w-8 h-8 rounded-lg border border-[#e6dfd8] dark:border-[#2e2c28] bg-white dark:bg-[#141413] flex items-center justify-center shrink-0 shadow-2xs text-[#141413] dark:text-[#faf9f5]">
            <PXIconBase definition={icon} size={18} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-primary rounded-xs animate-pulse shrink-0" />
              <h2 className="font-sans text-base sm:text-lg font-bold tracking-tight text-[#141413] dark:text-[#faf9f5] truncate">
                {componentName}
              </h2>
            </div>
            <div className="font-mono text-[11px] text-[#6c6a64] dark:text-[#8e8b82] truncate">
              px-{icon.name}
            </div>
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-md text-[#6c6a64] dark:text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5] hover:bg-[#ede8e1] dark:hover:bg-[#252320] transition-colors cursor-pointer shrink-0"
            aria-label="Close inspector"
          >
            <PXIconX size={15} />
          </button>
        )}
      </div>

      {/* Technical Taxonomy & Status Sub-line */}
      <div className="mt-2.5 pt-2 border-t border-[#e6dfd8]/80 dark:border-[#252320] flex items-center justify-between text-[10px] font-mono text-[#6c6a64] dark:text-[#8e8b82]">
        <div className="flex items-center gap-1.5 uppercase tracking-wider truncate">
          <span>{icon.category}</span>
          <span className="text-[#c5c0b8] dark:text-[#3d3a34]">·</span>
          <span className="text-primary font-medium">{icon.name.toUpperCase()}</span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 text-[#3e8a50] dark:text-[#5db872]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3e8a50] dark:bg-[#5db872]" />
          <span>Stable / v{icon.introducedVersion || "1.0"}</span>
        </div>
      </div>

      {/* Top Quick Actions in 1 Row: Copy, Install, and Specification */}
      <div className="mt-2.5 grid grid-cols-3 gap-1.5 font-mono text-xs">
        {/* Copy Component Button - Opens Modal Dialog with React, Native, shadcn, SVG */}
        <button
          type="button"
          onClick={() => openCopyDialog("react")}
          className="h-8 flex items-center justify-center gap-1.5 px-2 rounded-md border text-xs font-medium transition-all cursor-pointer shadow-2xs bg-white hover:bg-[#f5f0e8] dark:bg-[#252320] dark:hover:bg-[#2d2b27] border-[#e6dfd8] dark:border-[#383530] text-[#141413] dark:text-[#faf9f5] active:scale-[0.98]"
          title="Export & Copy Icon (React, Native, shadcn, SVG)"
        >
          <PXIconCopy size={12} className="text-[#6c6a64] dark:text-[#8e8b82]" />
          <span>Copy</span>
        </button>

        {/* Install Registry Button - Opens Modal Dialog on shadcn/ui tab */}
        <button
          type="button"
          onClick={() => openCopyDialog("shadcn")}
          className="h-8 flex items-center justify-center gap-1.5 px-2 rounded-md border text-xs font-medium transition-all cursor-pointer shadow-2xs bg-white hover:bg-[#f5f0e8] dark:bg-[#252320] dark:hover:bg-[#2d2b27] border-[#e6dfd8] dark:border-[#383530] text-[#141413] dark:text-[#faf9f5] active:scale-[0.98]"
          title="Install via shadcn CLI"
        >
          <PXIconTerminal size={12} className="text-primary" />
          <span>Install</span>
        </button>

        {/* Open Specification Workspace Link */}
        <a
          href={`/icons/px-${icon.name}`}
          onClick={() => {
            if (typeof window !== "undefined") {
              sessionStorage.setItem("pxui_catalog_query", window.location.search);
            }
          }}
          className="h-8 flex items-center justify-center gap-1 px-2 rounded-md border border-[#e6dfd8] dark:border-[#383530] bg-white dark:bg-[#22201d] hover:bg-[#f5f0e8] dark:hover:bg-[#2a2824] hover:border-primary/60 text-xs font-medium font-mono text-[#141413] dark:text-[#faf9f5] transition-all shadow-2xs active:scale-[0.98]"
          title="Open in Canonical Specification Workspace"
        >
          <span>Spec</span>
          <span className="text-primary text-[11px] font-bold">↗</span>
        </a>
      </div>

      {/* Interactive Export & Copy Dialog */}
      <IconCopyDialog
        icon={icon}
        isOpen={isCopyDialogOpen}
        onClose={() => setIsCopyDialogOpen(false)}
        initialTab={dialogTab}
      />
    </div>
  );
}
