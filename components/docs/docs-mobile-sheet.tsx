"use client";

import * as React from "react";
import { DocsSidebar } from "./docs-sidebar";
import { PXIconMenu, PXIconX } from "@/components/icons";

export function DocsMobileNav() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="lg:hidden flex items-center justify-between py-3 border-b border-[#e6dfd8] dark:border-[#252320] mb-6 font-mono text-xs">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#e6dfd8] dark:border-[#2e2c28] bg-white dark:bg-[#181715] text-[#141413] dark:text-[#faf9f5]"
      >
        <PXIconMenu size={14} />
        <span>Docs Menu</span>
      </button>

      <span className="text-[#8e8b82] text-[11px]">PXUI DOCUMENTATION</span>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex bg-black/60 backdrop-blur-xs">
          <div className="w-72 max-w-[85vw] bg-white dark:bg-[#181715] border-r border-[#e6dfd8] dark:border-[#252320] h-full flex flex-col p-6 overflow-y-auto workspace-scrollbar">
            <div className="flex items-center justify-between pb-4 border-b border-[#e6dfd8] dark:border-[#252320] mb-4">
              <span className="font-bold text-xs text-[#cc785c]">DOCUMENTATION</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded hover:bg-[#f5f0e8] dark:hover:bg-[#252320] text-[#8e8b82]"
              >
                <PXIconX size={16} />
              </button>
            </div>
            <DocsSidebar onItemClick={() => setIsOpen(false)} />
          </div>
          <div className="flex-1" onClick={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  );
}
