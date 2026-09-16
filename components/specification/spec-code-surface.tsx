"use client";

import * as React from "react";
import { IconDefinition } from "@/lib/icons/schema";
import { toPXComponentName, generateReactNativeCode, generateSvgString } from "@/lib/compiler";
import { PXIconCheck, PXIconCopy, PXIconDownload, PXIconSun, PXIconMoon } from "@/components/icons";
import { SyntaxHighlighter, CodeWrapButton } from "@/components/ui/syntax-highlighter";
import { copyToClipboard } from "@/lib/clipboard";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface SpecCodeSurfaceProps {
  icon: IconDefinition;
}

type CodeTab = "react" | "native" | "registry" | "svg";

export function SpecCodeSurface({ icon }: SpecCodeSurfaceProps) {
  const { resolvedTheme } = useTheme();
  const [activeTab, setActiveTab] = React.useState<CodeTab>("react");
  const [copied, setCopied] = React.useState<string | null>(null);
  const [codeTheme, setCodeTheme] = React.useState<"dark" | "light">("dark");
  const [isWrapped, setIsWrapped] = React.useState(false);
  const userSelectedThemeRef = React.useRef(false);

  React.useEffect(() => {
    if (!userSelectedThemeRef.current && (resolvedTheme === "light" || resolvedTheme === "dark")) {
      setCodeTheme(resolvedTheme);
    }
  }, [resolvedTheme]);

  const componentName = toPXComponentName(icon.name);

  const [origin, setOrigin] = React.useState("https://pxui.dev");
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const reactSnippet = `import { ${componentName} } from "@pxui/react";

export function Example() {
  return (
    <${componentName}
      size={24}
      color="currentColor"${icon.filled ? "\n      filled={false}" : ""}
      aria-label="${icon.title || icon.name}"
    />
  );
}`;

  const nativeSnippet = generateReactNativeCode(icon);
  const registryCmd = `npx shadcn@latest add ${origin}/r/px-${icon.name}.json`;
  const rawSvg = generateSvgString(icon, false);

  const getActiveCode = () => {
    switch (activeTab) {
      case "react":
        return reactSnippet;
      case "native":
        return nativeSnippet;
      case "registry":
        return registryCmd;
      case "svg":
        return rawSvg;
    }
  };

  const copyCode = async () => {
    const success = await copyToClipboard(getActiveCode());
    if (success) {
      setCopied(activeTab);
      setTimeout(() => setCopied(null), 1800);
    }
  };

  const downloadSvg = () => {
    const blob = new Blob([rawSvg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `px-${icon.name}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="code"
      className={cn(
        "scroll-mt-24 space-y-4 rounded-xl border overflow-hidden select-none transition-colors duration-200",
        codeTheme === "dark"
          ? "bg-[#181715] text-[#faf9f5] border-[#2e2c28]"
          : "bg-white text-[#141413] border-[#e6dfd8] shadow-xs"
      )}
    >
      {/* Tab Header */}
      <div
        className={cn(
          "flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b font-mono text-xs",
          codeTheme === "dark"
            ? "bg-[#141413] border-[#2e2c28]"
            : "bg-[#f5f0e8] border-[#e6dfd8]"
        )}
      >
        <div className="flex items-center gap-1 overflow-x-auto workspace-scrollbar max-w-full pb-0.5">
          {(
            [
              { id: "react", label: "React" },
              { id: "native", label: "React Native" },
              { id: "registry", label: "Registry (shadcn)" },
              { id: "svg", label: "Raw SVG" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "h-8 px-3 inline-flex items-center justify-center rounded-md text-xs font-mono transition-colors cursor-pointer box-border shrink-0",
                activeTab === tab.id
                  ? codeTheme === "dark"
                    ? "bg-[#252320] text-[#faf9f5] font-semibold border border-[#383530]"
                    : "bg-white text-[#141413] font-semibold border border-[#e6dfd8] shadow-2xs"
                  : "text-[#8e8b82] hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Action buttons & Theme Switcher */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Theme Toggle */}
          <div
            className={cn(
              "h-8 inline-flex items-stretch gap-0.5 border rounded-md p-0.5 box-border shrink-0 text-[10px] font-mono",
              codeTheme === "dark" ? "border-[#2e2c28] bg-[#1d1b18]" : "border-[#e6dfd8] bg-white"
            )}
          >
            <button
              type="button"
              onClick={() => {
                userSelectedThemeRef.current = true;
                setCodeTheme("dark");
              }}
              className={cn(
                "inline-flex items-center justify-center gap-1 px-2 rounded transition-all cursor-pointer self-stretch",
                codeTheme === "dark"
                  ? "bg-[#282622] text-[#faf9f5] font-bold shadow-2xs"
                  : "text-[#8e8b82] hover:text-[#faf9f5]"
              )}
              title="Dark code style"
            >
              <PXIconMoon size={11} className="shrink-0" />
              <span>Dark</span>
            </button>
            <button
              type="button"
              onClick={() => {
                userSelectedThemeRef.current = true;
                setCodeTheme("light");
              }}
              className={cn(
                "inline-flex items-center justify-center gap-1 px-2 rounded transition-all cursor-pointer self-stretch",
                codeTheme === "light"
                  ? "bg-[#faf9f5] text-[#141413] font-bold shadow-2xs border border-[#e6dfd8]"
                  : "text-[#8e8b82] hover:text-[#141413]"
              )}
              title="Light paper code style"
            >
              <PXIconSun size={11} className="shrink-0" />
              <span>Light</span>
            </button>
          </div>

          {activeTab === "svg" && (
            <button
              type="button"
              onClick={downloadSvg}
              className={cn(
                "h-8 inline-flex items-center justify-center gap-1.5 px-2.5 rounded-md border text-xs font-mono transition-colors cursor-pointer box-border shrink-0 shadow-2xs",
                codeTheme === "dark"
                  ? "bg-[#201e1b] hover:bg-[#282622] border-[#2e2c28] text-[#faf9f5]"
                  : "bg-white hover:bg-[#f5f0e8] border-[#e6dfd8] text-[#141413]"
              )}
            >
              <PXIconDownload size={13} className="text-[#8e8b82] shrink-0" />
              <span>Download</span>
            </button>
          )}

          {/* Wrap Toggle */}
          <CodeWrapButton
            wrapped={isWrapped}
            onToggle={() => setIsWrapped(!isWrapped)}
            theme={codeTheme}
            size="md"
          />

          <button
            type="button"
            onClick={copyCode}
            className={cn(
              "h-8 inline-flex items-center justify-center gap-1.5 px-3 rounded-md border text-xs font-mono transition-all cursor-pointer box-border shrink-0 shadow-2xs",
              copied === activeTab
                ? "bg-[#5db872]/20 border-[#5db872]/50 text-[#5db872] font-semibold"
                : codeTheme === "dark"
                ? "bg-[#252320] hover:bg-[#2e2c28] border-[#383530] text-[#faf9f5]"
                : "bg-white hover:bg-[#f5f0e8] border-[#e6dfd8] text-[#141413]"
            )}
          >
            {copied === activeTab ? (
              <>
                <PXIconCheck size={13} className="text-[#5db872] shrink-0" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <PXIconCopy size={13} className="text-[#8e8b82] shrink-0" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Viewer with Syntax Highlighting */}
      <div className={cn("p-4 sm:p-5 max-h-80", isWrapped ? "overflow-x-hidden" : "overflow-x-auto workspace-scrollbar")}>
        <SyntaxHighlighter
          code={getActiveCode()}
          language={activeTab === "registry" ? "bash" : activeTab === "svg" ? "svg" : "tsx"}
          theme={codeTheme}
          showLineNumbers={true}
          wrap={isWrapped}
          onWrapChange={setIsWrapped}
        />
      </div>

      {/* Code Contract Footer */}
      <div
        className={cn(
          "px-4 py-2 border-t flex flex-wrap items-center justify-between text-[10px] font-mono",
          codeTheme === "dark"
            ? "bg-[#141413] border-[#2e2c28] text-[#8e8b82]"
            : "bg-[#f5f0e8] border-[#e6dfd8] text-[#6c6a64]"
        )}
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5db872]" />
          <span>TREE-SHAKEABLE PER-ICON EXPORT</span>
        </div>
        <div>NO RUNTIME DEPENDENCIES</div>
      </div>
    </section>
  );
}
