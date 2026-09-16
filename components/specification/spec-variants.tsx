"use client";

import * as React from "react";
import { IconDefinition } from "@/lib/icons/schema";
import { PXIconBase } from "@/components/icons/px-icon-base";

interface SpecVariantsProps {
  icon: IconDefinition;
}

export function SpecVariants({ icon }: SpecVariantsProps) {
  const hasFilled = Boolean(icon.filled && icon.filled.length > 0);

  return (
    <section id="variants" className="scroll-mt-24 space-y-6">
      <div className="space-y-1">
        <h2 className="font-sans text-2xl font-bold tracking-tight text-[#141413] dark:text-[#faf9f5]">
          Variants
        </h2>
        <p className="font-mono text-xs text-[#8e8b82]">
          Canonical stylistic treatments authored on the identical 24×24 integer coordinate system.
        </p>
      </div>

      {hasFilled ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Outline / Monoline variant */}
          <div className="border border-[#e6dfd8] dark:border-[#252320] rounded-xl bg-white dark:bg-[#181715] p-6 flex flex-col items-center justify-between gap-6 shadow-xs">
            <div className="w-full flex items-center justify-between font-mono text-xs text-[#8e8b82] border-b border-[#e6dfd8] dark:border-[#252320] pb-3">
              <span className="font-bold text-[#141413] dark:text-[#faf9f5]">MONOLINE OUTLINE</span>
              <span>DEFAULT</span>
            </div>

            <div className="relative w-36 h-36 flex items-center justify-center bg-[#faf9f5] dark:bg-[#141413] border border-[#e6dfd8] dark:border-[#252320] rounded-lg">
              <PXIconBase
                definition={icon}
                size={72}
                filled={false}
                className="text-[#141413] dark:text-[#faf9f5]"
              />
            </div>

            <div className="w-full text-center font-mono text-xs text-[#8e8b82]">
              Standard monoline geometry for lightweight UI chrome.
            </div>
          </div>

          {/* Solid Filled variant */}
          <div className="border border-[#e6dfd8] dark:border-[#252320] rounded-xl bg-white dark:bg-[#181715] p-6 flex flex-col items-center justify-between gap-6 shadow-xs">
            <div className="w-full flex items-center justify-between font-mono text-xs text-[#8e8b82] border-b border-[#e6dfd8] dark:border-[#252320] pb-3">
              <span className="font-bold text-[#cc785c]">SOLID FILLED</span>
              <span>ACTIVE / SELECTED</span>
            </div>

            <div className="relative w-36 h-36 flex items-center justify-center bg-[#faf9f5] dark:bg-[#141413] border border-[#e6dfd8] dark:border-[#252320] rounded-lg">
              <PXIconBase
                definition={icon}
                size={72}
                filled={true}
                className="text-[#141413] dark:text-[#faf9f5]"
              />
            </div>

            <div className="w-full text-center font-mono text-xs text-[#8e8b82]">
              Pass <code className="text-[#cc785c] font-bold">filled</code> prop for high-emphasis selection states.
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 rounded-xl border border-dashed border-[#e6dfd8] dark:border-[#252320] bg-white/50 dark:bg-[#181715]/50 text-center font-mono text-xs space-y-2">
          <div className="text-[#141413] dark:text-[#faf9f5] font-semibold">
            Single Canonical Monoline Representation
          </div>
          <p className="text-[#8e8b82] max-w-md mx-auto">
            No secondary filled or duotone variants are specified in PXUI v1.0 for this icon. The single monoline form maintains optimal contrast at small sizes.
          </p>
        </div>
      )}
    </section>
  );
}
