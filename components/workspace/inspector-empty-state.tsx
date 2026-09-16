"use client";

import * as React from "react";
import { PXIconSliders } from "@/components/icons";
import { PXUIMark } from "@/components/brand";

export function InspectorEmptyState() {
  return (
    <div className="w-full h-full p-6 flex flex-col items-center justify-center text-center select-none text-[#6c6a64] dark:text-[#8e8b82] bg-[#faf9f5] dark:bg-[#181715]">
      {/* Subtle PXUI Grid Mark */}
      <div className="w-14 h-14 rounded-lg border border-dashed border-[#d8d3cb] dark:border-[#3d3a34] bg-white dark:bg-[#141413] flex items-center justify-center mb-4 relative shadow-inner">
        <PXUIMark size={24} variant="monochrome" className="opacity-40" />
      </div>

      <div className="font-mono text-xs uppercase tracking-wider font-semibold text-[#141413] dark:text-[#faf9f5] mb-1.5">
        SELECT A SPECIMEN
      </div>

      <div className="font-sans text-xs text-[#6c6a64] dark:text-[#8e8b82] max-w-[220px] leading-relaxed">
        Choose an icon from the catalog to inspect geometry, optical sizes, metadata, and code.
      </div>

      {/* Subtle technical annotation */}
      <div className="mt-6 pt-4 border-t border-[#e6dfd8] dark:border-[#252320] font-mono text-[10px] text-[#8e8b82] dark:text-[#6c6a64] uppercase tracking-widest">
        24×24 INTEGER WORKBENCH
      </div>
    </div>
  );
}
