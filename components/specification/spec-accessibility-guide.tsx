"use client";

import * as React from "react";
import { IconDefinition } from "@/lib/icons/schema";
import { toPXComponentName } from "@/lib/compiler";
import { PXIconCheck, PXIconCopy } from "@/components/icons";
import { SyntaxHighlighter, CodeWrapButton } from "@/components/ui/syntax-highlighter";
import { copyToClipboard } from "@/lib/clipboard";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface SpecAccessibilityGuideProps {
  icon: IconDefinition;
}

export function SpecAccessibilityGuide({ icon }: SpecAccessibilityGuideProps) {
  const componentName = toPXComponentName(icon.name);
  const { resolvedTheme } = useTheme();
  const [codeTheme, setCodeTheme] = React.useState<"dark" | "light">("dark");
  const [copiedSnippet, setCopiedSnippet] = React.useState<string | null>(null);
  const [wrapState, setWrapState] = React.useState<Record<string, boolean>>({});

  const isWrap = (id: string) => !!wrapState[id];
  const toggleWrap = (id: string) => setWrapState(prev => ({ ...prev, [id]: !prev[id] }));

  React.useEffect(() => {
    if (resolvedTheme === "light" || resolvedTheme === "dark") {
      setCodeTheme(resolvedTheme);
    }
  }, [resolvedTheme]);

  const decorativeSnippet = `<${componentName} aria-hidden="true" />`;
  const semanticSnippet = `<${componentName} aria-label="${icon.title || icon.name}" role="img" />`;
  const buttonSnippet = `<button type="button" aria-label="${icon.title || icon.name}">
  <${componentName} aria-hidden="true" />
</button>`;

  const handleCopy = async (code: string, id: string) => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopiedSnippet(id);
      setTimeout(() => setCopiedSnippet(null), 1800);
    }
  };

  return (
    <section id="accessibility" className="scroll-mt-24 space-y-6">
      <div className="space-y-1">
        <h2 className="font-sans text-2xl font-bold tracking-tight text-[#141413] dark:text-[#faf9f5]">
          Accessibility Contract
        </h2>
        <p className="font-mono text-xs text-[#8e8b82]">
          Deterministic screen-reader behavior conforming to Section 9.28 of the quality specification.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 font-mono text-xs">
        {/* 1. Decorative Usage */}
        <div className="border border-[#e6dfd8] dark:border-[#252320] hover:border-[#cc785c]/40 dark:hover:border-[#cc785c]/40 rounded-xl bg-white dark:bg-[#181715] p-5 flex flex-col justify-between space-y-4 shadow-xs hover:shadow-sm transition-all duration-200">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="font-bold text-[#141413] dark:text-[#faf9f5] text-xs">
                1. DECORATIVE USAGE
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#5db872]/15 text-[#3e8a50] dark:text-[#5db872] border border-[#5db872]/30">
                RECOMMENDED
              </span>
            </div>
            <p className="font-sans text-xs text-[#6c6a64] dark:text-[#8e8b82] leading-relaxed">
              Use when accompanied by visible adjacent text. Hides SVG from the accessibility tree to avoid stutter.
            </p>
          </div>

          <div className="space-y-2.5 pt-2">
            <div className={cn("p-3 rounded-lg bg-[#faf9f5] dark:bg-[#141413] border border-[#e6dfd8] dark:border-[#2e2c28] min-h-[76px] flex items-center select-text", isWrap("decorative") ? "overflow-x-hidden" : "overflow-x-auto overflow-y-auto workspace-scrollbar")}>
              <SyntaxHighlighter
                code={decorativeSnippet}
                language="tsx"
                theme={codeTheme}
                className="text-[11px]"
                wrap={isWrap("decorative")}
                onWrapChange={() => toggleWrap("decorative")}
              />
            </div>

            <div className="flex items-center gap-2">
              <CodeWrapButton
                wrapped={isWrap("decorative")}
                onToggle={() => toggleWrap("decorative")}
                theme={codeTheme}
                size="md"
              />
              <button
                type="button"
                onClick={() => handleCopy(decorativeSnippet, "decorative")}
                className={cn(
                  "flex-1 h-8 inline-flex items-center justify-center gap-1.5 px-3 rounded-md border text-xs font-mono transition-all cursor-pointer box-border shrink-0 shadow-2xs",
                  copiedSnippet === "decorative"
                    ? "bg-[#5db872]/20 border-[#5db872]/50 text-[#3e8a50] dark:text-[#5db872] font-semibold"
                    : "bg-white dark:bg-[#201e1b] hover:bg-[#f5f0e8] dark:hover:bg-[#282622] border-[#e6dfd8] dark:border-[#2e2c28] text-[#141413] dark:text-[#faf9f5]"
                )}
              >
                {copiedSnippet === "decorative" ? (
                  <>
                    <PXIconCheck size={13} className="text-[#3e8a50] dark:text-[#5db872]" />
                    <span>Copied Snippet!</span>
                  </>
                ) : (
                  <>
                    <PXIconCopy size={13} className="text-[#8e8b82]" />
                    <span>Copy Snippet</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 2. Semantic Standalone Usage */}
        <div className="border border-[#e6dfd8] dark:border-[#252320] hover:border-[#cc785c]/40 dark:hover:border-[#cc785c]/40 rounded-xl bg-white dark:bg-[#181715] p-5 flex flex-col justify-between space-y-4 shadow-xs hover:shadow-sm transition-all duration-200">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="font-bold text-[#141413] dark:text-[#faf9f5] text-xs">
                2. SEMANTIC STANDALONE
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#cc785c]/15 text-[#cc785c] border border-[#cc785c]/30">
                INFORMATIVE
              </span>
            </div>
            <p className="font-sans text-xs text-[#6c6a64] dark:text-[#8e8b82] leading-relaxed">
              Use when the icon conveys standalone information without visible text. Declares accessible image role.
            </p>
          </div>

          <div className="space-y-2.5 pt-2">
            <div className={cn("p-3 rounded-lg bg-[#faf9f5] dark:bg-[#141413] border border-[#e6dfd8] dark:border-[#2e2c28] min-h-[76px] flex items-center select-text", isWrap("semantic") ? "overflow-x-hidden" : "overflow-x-auto overflow-y-auto workspace-scrollbar")}>
              <SyntaxHighlighter
                code={semanticSnippet}
                language="tsx"
                theme={codeTheme}
                className="text-[11px]"
                wrap={isWrap("semantic")}
                onWrapChange={() => toggleWrap("semantic")}
              />
            </div>

            <div className="flex items-center gap-2">
              <CodeWrapButton
                wrapped={isWrap("semantic")}
                onToggle={() => toggleWrap("semantic")}
                theme={codeTheme}
                size="md"
              />
              <button
                type="button"
                onClick={() => handleCopy(semanticSnippet, "semantic")}
                className={cn(
                  "flex-1 h-8 inline-flex items-center justify-center gap-1.5 px-3 rounded-md border text-xs font-mono transition-all cursor-pointer box-border shrink-0 shadow-2xs",
                  copiedSnippet === "semantic"
                    ? "bg-[#5db872]/20 border-[#5db872]/50 text-[#3e8a50] dark:text-[#5db872] font-semibold"
                    : "bg-white dark:bg-[#201e1b] hover:bg-[#f5f0e8] dark:hover:bg-[#282622] border-[#e6dfd8] dark:border-[#2e2c28] text-[#141413] dark:text-[#faf9f5]"
                )}
              >
                {copiedSnippet === "semantic" ? (
                  <>
                    <PXIconCheck size={13} className="text-[#3e8a50] dark:text-[#5db872]" />
                    <span>Copied Snippet!</span>
                  </>
                ) : (
                  <>
                    <PXIconCopy size={13} className="text-[#8e8b82]" />
                    <span>Copy Snippet</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 3. Icon-Only Action Button */}
        <div className="border border-[#e6dfd8] dark:border-[#252320] hover:border-[#cc785c]/40 dark:hover:border-[#cc785c]/40 rounded-xl bg-white dark:bg-[#181715] p-5 flex flex-col justify-between space-y-4 shadow-xs hover:shadow-sm transition-all duration-200">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="font-bold text-[#141413] dark:text-[#faf9f5] text-xs">
                3. ICON-ONLY BUTTON
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#79c0ff]/15 text-[#0969da] dark:text-[#79c0ff] border border-[#79c0ff]/30">
                INTERACTIVE
              </span>
            </div>
            <p className="font-sans text-xs text-[#6c6a64] dark:text-[#8e8b82] leading-relaxed">
              Place accessible label on parent button. Inner icon remains decorative to avoid duplicate announcements.
            </p>
          </div>

          <div className="space-y-2.5 pt-2">
            <div className={cn("p-3 rounded-lg bg-[#faf9f5] dark:bg-[#141413] border border-[#e6dfd8] dark:border-[#2e2c28] min-h-[76px] flex items-start select-text", isWrap("button") ? "overflow-x-hidden" : "overflow-x-auto overflow-y-auto workspace-scrollbar")}>
              <SyntaxHighlighter
                code={buttonSnippet}
                language="tsx"
                theme={codeTheme}
                className="text-[11px]"
                wrap={isWrap("button")}
                onWrapChange={() => toggleWrap("button")}
              />
            </div>

            <div className="flex items-center gap-2">
              <CodeWrapButton
                wrapped={isWrap("button")}
                onToggle={() => toggleWrap("button")}
                theme={codeTheme}
                size="md"
              />
              <button
                type="button"
                onClick={() => handleCopy(buttonSnippet, "button")}
                className={cn(
                  "flex-1 h-8 inline-flex items-center justify-center gap-1.5 px-3 rounded-md border text-xs font-mono transition-all cursor-pointer box-border shrink-0 shadow-2xs",
                  copiedSnippet === "button"
                    ? "bg-[#5db872]/20 border-[#5db872]/50 text-[#3e8a50] dark:text-[#5db872] font-semibold"
                    : "bg-white dark:bg-[#201e1b] hover:bg-[#f5f0e8] dark:hover:bg-[#282622] border-[#e6dfd8] dark:border-[#2e2c28] text-[#141413] dark:text-[#faf9f5]"
                )}
              >
                {copiedSnippet === "button" ? (
                  <>
                    <PXIconCheck size={13} className="text-[#3e8a50] dark:text-[#5db872]" />
                    <span>Copied Snippet!</span>
                  </>
                ) : (
                  <>
                    <PXIconCopy size={13} className="text-[#8e8b82]" />
                    <span>Copy Snippet</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
