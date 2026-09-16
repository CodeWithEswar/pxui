"use client";

import * as React from "react";
import Link from "next/link";
import { IconDefinition } from "@/lib/icons/schema";
import { toPXComponentName } from "@/lib/compiler";
import { PXIconBase } from "@/components/icons/px-icon-base";
import { PXIconArrowLeft, PXIconArrowRight } from "@/components/icons";
import { type CopyDialogTab } from "@/components/icons";
import { cn } from "@/lib/utils";

interface SpecFamilyStripProps {
  icon: IconDefinition;
  familyIcons: IconDefinition[];
  prevIcon: IconDefinition | null;
  nextIcon: IconDefinition | null;
  onOpenCopyDialog?: (tab?: CopyDialogTab) => void;
  onCloseModal?: () => void;
  isAnyModalOpen?: boolean;
}

export function SpecFamilyStrip({
  icon,
  familyIcons,
  prevIcon,
  nextIcon,
  onOpenCopyDialog,
  onCloseModal,
  isAnyModalOpen = false,
}: SpecFamilyStripProps) {
  const familyName = icon.family || icon.name.split("-")[0];

  return (
    <section id="family" className="scroll-mt-24 space-y-8">
      {/* Sibling Family Specimens */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="font-sans text-2xl font-bold tracking-tight text-[#141413] dark:text-[#faf9f5]">
              Family Specimens
            </h2>
            <p className="font-mono text-xs text-[#8e8b82]">
              Related icons sharing the <span className="text-[#cc785c] font-bold uppercase">{familyName}</span> geometric language.
            </p>
          </div>

          <span className="font-mono text-xs text-[#8e8b82]">
            {familyIcons.length} SPECIMENS
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {familyIcons.map((sibling) => {
            const isCurrent = sibling.name === icon.name;
            const sibComp = toPXComponentName(sibling.name);
            return (
              <Link
                key={sibling.name}
                href={`/icons/px-${sibling.name}`}
                className={`p-4 rounded-xl border flex flex-col items-center justify-between gap-3 text-center transition-all group ${
                  isCurrent
                    ? "border-[#cc785c] bg-[#cc785c]/5 dark:bg-[#cc785c]/10"
                    : "border-[#e6dfd8] dark:border-[#252320] bg-white dark:bg-[#181715] hover:border-[#cc785c]/50 hover:bg-[#faf9f5] dark:hover:bg-[#201e1b]"
                }`}
              >
                <div className="w-12 h-12 flex items-center justify-center relative">
                  {/* Subtle 24x24 drafting grid */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-15"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, rgba(142,139,130,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(142,139,130,0.3) 1px, transparent 1px)",
                      backgroundSize: "8.33% 8.33%",
                    }}
                  />
                  <PXIconBase
                    definition={sibling}
                    size={24}
                    className={`pixel-crisp transition-colors ${
                      isCurrent
                        ? "text-[#cc785c]"
                        : "text-[#141413] dark:text-[#faf9f5] group-hover:text-[#cc785c]"
                    }`}
                  />
                </div>

                <div className="font-mono text-[11px] space-y-0.5 w-full">
                  <div className="font-semibold text-[#141413] dark:text-[#faf9f5] truncate">
                    {sibComp}
                  </div>
                  <div className="text-[10px] text-[#8e8b82] truncate">
                    px-{sibling.name}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Sequential Previous / Next Navigation Strip */}
      <div className="pt-6 border-t border-[#e6dfd8] dark:border-[#252320] flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs">
        {prevIcon ? (
          <Link
            href={`/icons/px-${prevIcon.name}`}
            className="w-full md:w-auto inline-flex items-center gap-3 p-3 rounded-lg border border-[#e6dfd8] dark:border-[#252320] bg-white dark:bg-[#181715] hover:border-[#cc785c]/50 hover:bg-[#faf9f5] dark:hover:bg-[#201e1b] text-[#141413] dark:text-[#faf9f5] transition-all group shadow-2xs"
            title={`Previous icon: ${toPXComponentName(prevIcon.name)} (Left Arrow)`}
          >
            <PXIconArrowLeft size={15} className="text-[#8e8b82] group-hover:text-[#cc785c] group-hover:-translate-x-0.5 transition-all shrink-0" />
            <div className="text-left">
              <span className="text-[10px] text-[#8e8b82] group-hover:text-[#cc785c] transition-colors block font-semibold">PREVIOUS [←]</span>
              <span className="font-bold">{toPXComponentName(prevIcon.name)}</span>
            </div>
          </Link>
        ) : (
          <div className="hidden md:block w-36" aria-hidden="true" />
        )}

        {/* Tactile Keyboard & Interactive Shortcuts Dock */}
        <div className="w-full md:w-auto flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] text-[#8e8b82] py-2 px-3.5 rounded-xl bg-white/80 dark:bg-[#181715]/80 backdrop-blur-xs border border-[#e6dfd8] dark:border-[#252320] shadow-2xs">
          <span className="font-semibold text-[#8e8b82]">Shortcuts:</span>

          {/* Cycle icon shortcut */}
          <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#faf9f5] dark:bg-[#201e1b] border border-[#e6dfd8] dark:border-[#2e2c28]">
            {prevIcon ? (
              <Link
                href={`/icons/px-${prevIcon.name}`}
                className="px-1.5 py-0.5 rounded bg-white dark:bg-[#252320] border border-[#e6dfd8] dark:border-[#2e2c28] hover:border-[#cc785c] hover:text-[#cc785c] transition-all active:scale-90"
                title={`Cycle to previous: ${prevIcon.name} (←)`}
              >
                <kbd className="font-mono font-bold">←</kbd>
              </Link>
            ) : (
              <span className="px-1.5 py-0.5 rounded bg-white dark:bg-[#252320] border border-[#e6dfd8] dark:border-[#2e2c28] opacity-35">
                <kbd className="font-mono font-bold">←</kbd>
              </span>
            )}
            <span className="text-[#8e8b82]">/</span>
            {nextIcon ? (
              <Link
                href={`/icons/px-${nextIcon.name}`}
                className="px-1.5 py-0.5 rounded bg-white dark:bg-[#252320] border border-[#e6dfd8] dark:border-[#2e2c28] hover:border-[#cc785c] hover:text-[#cc785c] transition-all active:scale-90"
                title={`Cycle to next: ${nextIcon.name} (→)`}
              >
                <kbd className="font-mono font-bold">→</kbd>
              </Link>
            ) : (
              <span className="px-1.5 py-0.5 rounded bg-white dark:bg-[#252320] border border-[#e6dfd8] dark:border-[#2e2c28] opacity-35">
                <kbd className="font-mono font-bold">→</kbd>
              </span>
            )}
            <span className="hidden sm:inline text-[10px]">Cycle icon</span>
          </div>

          {/* Copy code shortcut & trigger */}
          <button
            type="button"
            onClick={() => onOpenCopyDialog?.("react")}
            className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#faf9f5] dark:bg-[#201e1b] border border-[#e6dfd8] dark:border-[#2e2c28] hover:border-[#cc785c] hover:text-[#cc785c] hover:bg-[#cc785c]/5 transition-all cursor-pointer group active:scale-95"
            title="Open Export & Copy Code modal (Press 'C')"
          >
            <kbd className="font-mono font-bold px-1.5 py-0.5 rounded bg-white dark:bg-[#252320] border border-[#e6dfd8] dark:border-[#2e2c28] text-[#cc785c] group-hover:scale-105 transition-transform">
              C
            </kbd>
            <span className="font-medium text-[#141413] dark:text-[#faf9f5] group-hover:text-[#cc785c] transition-colors">
              Copy code
            </span>
          </button>

          {/* Close modal shortcut & trigger */}
          <button
            type="button"
            onClick={() => onCloseModal?.()}
            disabled={!isAnyModalOpen}
            className={cn(
              "inline-flex items-center gap-1.5 px-2 py-1 rounded-md border transition-all text-[11px]",
              isAnyModalOpen
                ? "bg-[#cc785c]/15 text-[#cc785c] border-[#cc785c]/50 hover:bg-[#cc785c]/25 cursor-pointer active:scale-95 animate-pulse"
                : "bg-[#faf9f5] dark:bg-[#201e1b] border-[#e6dfd8] dark:border-[#2e2c28] text-[#8e8b82] opacity-75 cursor-default"
            )}
            title={isAnyModalOpen ? "Close open modal (Press 'Esc')" : "Press Esc to close any open modal"}
          >
            <kbd className="font-mono font-bold px-1.5 py-0.5 rounded bg-white dark:bg-[#252320] border border-[#e6dfd8] dark:border-[#2e2c28]">
              Esc
            </kbd>
            <span>Close modal</span>
          </button>
        </div>

        {nextIcon ? (
          <Link
            href={`/icons/px-${nextIcon.name}`}
            className="w-full md:w-auto inline-flex items-center justify-end gap-3 p-3 rounded-lg border border-[#e6dfd8] dark:border-[#252320] bg-white dark:bg-[#181715] hover:border-[#cc785c]/50 hover:bg-[#faf9f5] dark:hover:bg-[#201e1b] text-[#141413] dark:text-[#faf9f5] transition-all group shadow-2xs"
            title={`Next icon: ${toPXComponentName(nextIcon.name)} (Right Arrow)`}
          >
            <div className="text-right">
              <span className="text-[10px] text-[#8e8b82] group-hover:text-[#cc785c] transition-colors block font-semibold">NEXT [→]</span>
              <span className="font-bold">{toPXComponentName(nextIcon.name)}</span>
            </div>
            <PXIconArrowRight size={15} className="text-[#8e8b82] group-hover:text-[#cc785c] group-hover:translate-x-0.5 transition-all shrink-0" />
          </Link>
        ) : (
          <div className="hidden md:block w-36" aria-hidden="true" />
        )}
      </div>
    </section>
  );
}
