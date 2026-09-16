"use client";

import * as React from "react";
import { useGitHubStars } from "./hooks/use-github-stars";
import { PXIconStar, PXIconGitBranch, PXIconExternalLink } from "@/components/icons";

export function CommunityPanel() {
  const { stars, formattedStars, repoUrl, loading, hasStars } = useGitHubStars();

  return (
    <div className="shrink-0 border-t border-border/80 bg-surface-soft/50 p-3.5 select-none text-xs">
      {/* Small mono section label with tiny coral locator */}
      <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.08em] text-muted-soft mb-2">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-primary rounded-xs shrink-0" aria-hidden="true" />
          <span className="font-semibold text-foreground/80">PXUI / OPEN SOURCE</span>
        </span>
        <span className="font-mono text-[9px] text-muted-soft">v0.1.0</span>
      </div>

      {/* Primary GitHub Repository & Real Star Counter */}
      <a
        href={repoUrl}
        target="_blank"
        rel="noreferrer"
        className="group flex items-center justify-between p-2 rounded-md border border-border/80 bg-card/60 hover:bg-card hover:border-foreground/25 transition-all text-foreground shadow-2xs cursor-pointer"
        title="View PXUI source repository on GitHub"
      >
        <div className="flex items-center gap-2 min-w-0">
          <PXIconGitBranch size={14} className="text-primary shrink-0" />
          <div className="truncate">
            <div className="font-sans text-[12px] font-medium text-foreground group-hover:text-primary transition-colors truncate leading-none">
              GitHub
            </div>
            <div className="font-mono text-[10px] text-muted-soft mt-0.5 leading-none">
              {hasStars ? `${stars?.toLocaleString()} stars` : "View repository"}
            </div>
          </div>
        </div>

        {/* Real Star Count Badge */}
        {loading ? (
          <span className="h-4 w-10 bg-muted/50 rounded-xs animate-pulse" />
        ) : hasStars ? (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-xs bg-surface-soft border border-border text-[11px] font-mono font-semibold text-foreground">
            <PXIconStar size={11} className="text-[#e8a55a] fill-[#e8a55a]" />
            <span>{formattedStars}</span>
          </span>
        ) : (
          <PXIconExternalLink size={12} className="text-muted-soft group-hover:text-foreground transition-colors shrink-0" />
        )}
      </a>

      {/* Footer Technical Metadata & Specimen Summary */}
      <div className="mt-2.5 pt-2 border-t border-border/40 flex items-center justify-between text-[10px] font-mono text-muted-soft">
        <span className="uppercase tracking-wider">100 REFERENCE ICONS</span>
        <span className="text-foreground/70 font-semibold">24×24 INT</span>
      </div>
    </div>
  );
}
