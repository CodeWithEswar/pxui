"use client";

import * as React from "react";
import { IconDefinition } from "@/lib/icons/schema";
import { toPXComponentName } from "@/lib/compiler";
import { SyntaxHighlighter, CodeWrapButton } from "@/components/ui/syntax-highlighter";
import { cn } from "@/lib/utils";

interface SpecMetadataTaxonomyProps {
  icon: IconDefinition;
}

export function SpecMetadataTaxonomy({ icon }: SpecMetadataTaxonomyProps) {
  const [showRaw, setShowRaw] = React.useState(false);
  const [rawWrapped, setRawWrapped] = React.useState(false);
  const componentName = toPXComponentName(icon.name);
  const codeTheme = "auto";

  return (
    <section id="metadata" className="scroll-mt-24 space-y-6">
      <div className="space-y-1">
        <h2 className="font-sans text-2xl font-bold tracking-tight text-[#141413] dark:text-[#faf9f5]">
          Taxonomy & Metadata
        </h2>
        <p className="font-mono text-xs text-[#8e8b82]">
          Authoritative catalog classification and discovery relationships.
        </p>
      </div>

      <div className="rounded-xl border border-[#e6dfd8] dark:border-[#252320] bg-white dark:bg-[#181715] p-5 sm:p-6 space-y-6 font-mono text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Identity */}
          <div className="space-y-3">
            <span className="text-[10px] text-[#cc785c] font-bold uppercase tracking-wider block">
              1. IDENTITY
            </span>
            <div className="space-y-1">
              <span className="text-[#8e8b82] text-[10px] block">CANONICAL</span>
              <span className="text-[#141413] dark:text-[#faf9f5] font-semibold">
                {icon.name}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-[#8e8b82] text-[10px] block">COMPONENT</span>
              <span className="text-[#141413] dark:text-[#faf9f5] font-semibold">
                {componentName}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-[#8e8b82] text-[10px] block">SLUG</span>
              <span className="text-[#141413] dark:text-[#faf9f5] font-semibold">
                px-{icon.name}
              </span>
            </div>
          </div>

          {/* Classification */}
          <div className="space-y-3">
            <span className="text-[10px] text-[#cc785c] font-bold uppercase tracking-wider block">
              2. CLASSIFICATION
            </span>
            <div className="space-y-1">
              <span className="text-[#8e8b82] text-[10px] block">CATEGORY</span>
              <span className="text-[#141413] dark:text-[#faf9f5] font-semibold">
                {icon.category}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-[#8e8b82] text-[10px] block">FAMILY</span>
              <span className="text-[#141413] dark:text-[#faf9f5] font-semibold capitalize">
                {icon.family || icon.name.split("-")[0]}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-[#8e8b82] text-[10px] block">GRID SPEC</span>
              <span className="text-[#141413] dark:text-[#faf9f5] font-semibold">
                24 × 24 Integer
              </span>
            </div>
          </div>

          {/* Discovery */}
          <div className="space-y-3">
            <span className="text-[10px] text-[#cc785c] font-bold uppercase tracking-wider block">
              3. DISCOVERY
            </span>
            <div className="space-y-1">
              <span className="text-[#8e8b82] text-[10px] block">ALIASES</span>
              <span className="text-[#141413] dark:text-[#faf9f5]">
                {icon.aliases && icon.aliases.length > 0
                  ? icon.aliases.join(", ")
                  : "None declared"}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-[#8e8b82] text-[10px] block">TAGS</span>
              <div className="flex flex-wrap gap-1 pt-0.5">
                {icon.tags.map((t) => (
                  <span
                    key={t}
                    className="px-1.5 py-0.2 rounded bg-[#f5f0e8] dark:bg-[#201e1b] border border-[#e6dfd8] dark:border-[#2e2c28] text-[10px] text-[#6c6a64] dark:text-[#8e8b82]"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Lifecycle */}
          <div className="space-y-3">
            <span className="text-[10px] text-[#cc785c] font-bold uppercase tracking-wider block">
              4. LIFECYCLE
            </span>
            <div className="space-y-1">
              <span className="text-[#8e8b82] text-[10px] block">STATUS</span>
              <span className="text-[#5db872] font-semibold">
                Stable
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-[#8e8b82] text-[10px] block">INTRODUCED</span>
              <span className="text-[#141413] dark:text-[#faf9f5]">
                v{icon.introducedVersion || "0.1"}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-[#8e8b82] text-[10px] block">PLATFORMS</span>
              <span className="text-[#141413] dark:text-[#faf9f5]">
                Web · iOS · Android
              </span>
            </div>
          </div>
        </div>

        {/* Collapsible raw metadata JSON */}
        <div className="pt-4 border-t border-[#e6dfd8] dark:border-[#252320] space-y-2">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setShowRaw(!showRaw)}
              className="inline-flex items-center gap-2 text-xs font-mono text-[#6c6a64] dark:text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5] cursor-pointer"
            >
              <span>{showRaw ? "▼ Hide raw metadata definition" : "▶ View raw metadata definition JSON"}</span>
            </button>

            {showRaw && (
              <CodeWrapButton
                wrapped={rawWrapped}
                onToggle={() => setRawWrapped(!rawWrapped)}
                theme={codeTheme}
                size="sm"
              />
            )}
          </div>

          {showRaw && (
            <div className={cn("p-4 rounded-xl bg-[#faf9f5] dark:bg-[#141413] font-mono text-xs border border-[#e6dfd8] dark:border-[#2e2c28] max-h-72 select-text shadow-2xs", rawWrapped ? "overflow-x-hidden" : "overflow-x-auto workspace-scrollbar")}>
              <SyntaxHighlighter
                code={JSON.stringify(icon, null, 2)}
                language="json"
                theme={codeTheme}
                showLineNumbers={true}
                wrap={rawWrapped}
                onWrapChange={setRawWrapped}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
