"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { IconDefinition } from "@/lib/icons/schema";
import {
  toPXComponentName,
  generateReactNativeCode,
  generateSvgString,
  generateRegistryItemJson,
} from "@/lib/compiler";
import {
  PXIconBase,
  PXIconCheck,
  PXIconCopy,
  PXIconDownload,
  PXIconTerminal,
  PXIconCode,
  PXIconX,
  PXIconSun,
  PXIconMoon,
  PXIconSmartphone,
  PXIconImage,
  PackageManagerSwitcher,
  HighlightedShadcnCommand,
  getShadcnAddCommand,
  usePreferredPackageManager,
  type PackageManager,
} from "@/components/icons";
import { SyntaxHighlighter, CodeWrapButton } from "@/components/ui/syntax-highlighter";
import { copyToClipboard } from "@/lib/clipboard";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useOrigin } from "@/lib/hooks/use-origin";

export type CopyDialogTab = "react" | "native" | "shadcn" | "svg";

export interface IconCopyDialogProps {
  icon: IconDefinition;
  isOpen: boolean;
  onClose: () => void;
  initialTab?: CopyDialogTab;
}

export function IconCopyDialog({
  icon,
  isOpen,
  onClose,
  initialTab = "react",
}: IconCopyDialogProps) {
  const { resolvedTheme } = useTheme();
  const [activeTab, setActiveTab] = React.useState<CopyDialogTab>(initialTab);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [selectedSize, setSelectedSize] = React.useState<number>(24);
  const [useFilled, setUseFilled] = React.useState(false);
  const [packageManager, setPackageManager] = usePreferredPackageManager();
  const [codeTheme, setCodeTheme] = React.useState<"dark" | "light">("dark");
  const [codeWrap, setCodeWrap] = React.useState(false);
  const userSelectedThemeRef = React.useRef(false);

  const componentName = toPXComponentName(icon.name);
  const origin = useOrigin();
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const [prevIsOpen, setPrevIsOpen] = React.useState(isOpen);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setActiveTab(initialTab);
      setCopiedId(null);
    }
  }

  // Synchronize code theme with resolvedTheme when user has not manually toggled
  React.useEffect(() => {
    if (!userSelectedThemeRef.current && (resolvedTheme === "light" || resolvedTheme === "dark")) {
      setCodeTheme(resolvedTheme);
    }
  }, [resolvedTheme]);

  // Keyboard accessibility: Escape to close
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSelectPkg = (pkg: PackageManager) => {
    setPackageManager(pkg);
  };

  const executeCopy = async (text: string, id: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
    }
  };

  const handleDownloadSvg = () => {
    const svgCode = generateSvgString(icon, useFilled);
    const blob = new Blob([svgCode], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `px-${icon.name}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setCopiedId("download-svg");
    setTimeout(() => setCopiedId(null), 1800);
  };

  if (!isOpen) return null;

  // React snippets
  const hasFilled = Boolean(icon.filled && icon.filled.length > 0);
  const reactComponentSnippet = `<${componentName} size={${selectedSize}}${useFilled && hasFilled ? " filled" : ""} />`;
  const reactImportSnippet = `import { ${componentName} } from "@pxui/react";`;
  const reactFullSnippet = `${reactImportSnippet}

export function Example() {
  return (
    <${componentName}
      size={${selectedSize}}${useFilled && hasFilled ? "\n      filled" : ""}
      color="currentColor"
      aria-label="${icon.title || icon.name}"
    />
  );
}`;

  // React Native snippet
  const nativeSnippet = generateReactNativeCode(icon);

  // shadcn CLI command and JSON artifact
  const registryUrl = `${origin}/r/px-${icon.name}.json`;
  const shadcnCmd = getShadcnAddCommand(packageManager, registryUrl);
  const registryArtifactJson = (() => {
    try {
      return JSON.stringify(generateRegistryItemJson(icon, origin), null, 2);
    } catch {
      return JSON.stringify(
        {
          name: `px-${icon.name}`,
          type: "registry:ui",
          files: [{ path: `components/icons/px-${icon.name}.tsx`, type: "registry:ui" }],
        },
        null,
        2
      );
    }
  })();

  // Raw SVG snippet & Data URI
  const rawSvgSnippet = generateSvgString(icon, useFilled);
  const svgDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(rawSvgSnippet)}`;

  const tabs: Array<{
    id: CopyDialogTab;
    fullLabel: string;
    mobileLabel: string;
    icon: React.ReactNode;
  }> = [
    {
      id: "react",
      fullLabel: "React",
      mobileLabel: "React",
      icon: <PXIconCode size={13} className="shrink-0" />,
    },
    {
      id: "native",
      fullLabel: "React Native",
      mobileLabel: "Native",
      icon: <PXIconSmartphone size={13} className="shrink-0" />,
    },
    {
      id: "shadcn",
      fullLabel: "shadcn/ui",
      mobileLabel: "shadcn",
      icon: <PXIconTerminal size={13} className="shrink-0 text-primary" />,
    },
    {
      id: "svg",
      fullLabel: "Raw SVG",
      mobileLabel: "SVG",
      icon: <PXIconImage size={13} className="shrink-0" />,
    },
  ];

  const isDarkCode = codeTheme === "dark";

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="copy-dialog-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-6 bg-black/60 dark:bg-black/80 backdrop-blur-md select-none animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="w-full max-w-2xl sm:max-w-3xl rounded-xl sm:rounded-2xl border border-[#e6dfd8] dark:border-[#2e2c28] bg-white dark:bg-[#181715] text-[#141413] dark:text-[#faf9f5] overflow-hidden shadow-2xl flex flex-col max-h-[94vh] sm:max-h-[90vh] transition-colors duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header: Thumbnail + Title + Responsive Theme Switcher + Close */}
        <div className="p-3 sm:p-4 border-b border-[#e6dfd8] dark:border-[#252320] bg-[#faf9f5] dark:bg-[#1d1b18] flex items-center justify-between gap-2.5 sm:gap-4 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
            {/* Specimen Thumbnail */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white dark:bg-[#141413] border border-[#e6dfd8] dark:border-[#2e2c28] flex items-center justify-center text-[#141413] dark:text-[#faf9f5] shadow-xs shrink-0">
              <PXIconBase definition={icon} size={20} filled={useFilled} />
            </div>

            <div className="space-y-0.5 min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <h2
                  id="copy-dialog-title"
                  className="font-sans text-sm sm:text-base font-bold tracking-tight text-[#141413] dark:text-[#faf9f5] truncate"
                >
                  Export &amp; Copy {componentName}
                </h2>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#5db872]/15 text-[#3e8a50] dark:text-[#5db872] border border-[#5db872]/30 shrink-0">
                  v{icon.introducedVersion || "1.0"}
                </span>
              </div>
              <div className="font-mono text-[11px] text-[#6c6a64] dark:text-[#8e8b82] flex items-center gap-1.5 truncate">
                <span>px-{icon.name}</span>
                <span>·</span>
                <span className="uppercase tracking-wider truncate">{icon.category}</span>
                <span>·</span>
                <span className="shrink-0">24×24</span>
              </div>
            </div>
          </div>

          {/* Right Header Actions: Theme Switcher & Close Button */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Theme Toggle Button */}
            <div
              className={cn(
                "h-7 inline-flex items-stretch gap-0.5 border rounded-md p-0.5 box-border shrink-0 text-[10px] font-mono",
                codeTheme === "dark"
                  ? "border-[#2e2c28] bg-[#1d1b18]"
                  : "border-[#e6dfd8] bg-white shadow-2xs"
              )}
            >
              <button
                type="button"
                onClick={() => {
                  userSelectedThemeRef.current = true;
                  setCodeTheme("dark");
                }}
                className={cn(
                  "inline-flex items-center justify-center gap-1 px-1.5 sm:px-2 rounded transition-all cursor-pointer",
                  codeTheme === "dark"
                    ? "bg-[#282622] text-[#faf9f5] font-bold shadow-2xs"
                    : "text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5]"
                )}
                title="Dark code theme"
              >
                <PXIconMoon size={11} className="shrink-0" />
                <span className="hidden xs:inline">Dark</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  userSelectedThemeRef.current = true;
                  setCodeTheme("light");
                }}
                className={cn(
                  "inline-flex items-center justify-center gap-1 px-1.5 sm:px-2 rounded transition-all cursor-pointer",
                  codeTheme === "light"
                    ? "bg-white text-[#141413] font-bold shadow-2xs border border-[#e6dfd8]"
                    : "text-[#8e8b82] hover:text-[#141413]"
                )}
                title="Light paper code theme"
              >
                <PXIconSun size={11} className="shrink-0" />
                <span className="hidden xs:inline">Light</span>
              </button>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="h-7 w-7 sm:h-8 sm:w-8 inline-flex items-center justify-center rounded-md text-[#6c6a64] dark:text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5] hover:bg-[#ede8e1] dark:hover:bg-[#252320] transition-colors cursor-pointer shrink-0"
              aria-label="Close dialog"
              title="Close (Esc)"
            >
              <PXIconX size={15} />
            </button>
          </div>
        </div>

        {/* Quick Actions 1-Click Bar (Clean Swipe / Wrap, Hidden Scrollbar) */}
        <div className="px-3 sm:px-4 py-2 bg-[#f5f0e8]/80 dark:bg-[#141413]/80 border-b border-[#e6dfd8] dark:border-[#252320] flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar shrink-0">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#8e8b82] shrink-0 font-semibold mr-0.5">
            Quick:
          </span>

          {/* Quick Copy React Component */}
          <button
            type="button"
            onClick={() => executeCopy(reactComponentSnippet, "quick-react")}
            className={cn(
              "h-6.5 sm:h-7 px-2 sm:px-2.5 inline-flex items-center gap-1 sm:gap-1.5 rounded-md border text-[11px] font-mono transition-all cursor-pointer shrink-0 shadow-2xs",
              copiedId === "quick-react"
                ? "bg-[#5db872]/20 border-[#5db872]/50 text-[#3e8a50] dark:text-[#5db872] font-semibold"
                : "bg-white hover:bg-[#faf9f5] dark:bg-[#201e1b] dark:hover:bg-[#282622] border-[#e6dfd8] dark:border-[#2e2c28] text-[#141413] dark:text-[#faf9f5]"
            )}
            title="Copy JSX Component tag"
          >
            {copiedId === "quick-react" ? (
              <>
                <PXIconCheck size={11} className="text-[#3e8a50] dark:text-[#5db872]" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <PXIconCopy size={11} className="text-[#8e8b82]" />
                <span>React</span>
              </>
            )}
          </button>

          {/* Quick Copy shadcn CLI */}
          <button
            type="button"
            onClick={() => executeCopy(shadcnCmd, "quick-shadcn")}
            className={cn(
              "h-6.5 sm:h-7 px-2 sm:px-2.5 inline-flex items-center gap-1 sm:gap-1.5 rounded-md border text-[11px] font-mono transition-all cursor-pointer shrink-0 shadow-2xs",
              copiedId === "quick-shadcn"
                ? "bg-[#5db872]/20 border-[#5db872]/50 text-[#3e8a50] dark:text-[#5db872] font-semibold"
                : "bg-white hover:bg-[#faf9f5] dark:bg-[#201e1b] dark:hover:bg-[#282622] border-[#e6dfd8] dark:border-[#2e2c28] text-[#141413] dark:text-[#faf9f5]"
            )}
            title="Copy shadcn add command"
          >
            {copiedId === "quick-shadcn" ? (
              <>
                <PXIconCheck size={11} className="text-[#3e8a50] dark:text-[#5db872]" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <PXIconTerminal size={11} className="text-primary" />
                <span>shadcn</span>
              </>
            )}
          </button>

          {/* Quick Copy SVG */}
          <button
            type="button"
            onClick={() => executeCopy(rawSvgSnippet, "quick-svg")}
            className={cn(
              "h-6.5 sm:h-7 px-2 sm:px-2.5 inline-flex items-center gap-1 sm:gap-1.5 rounded-md border text-[11px] font-mono transition-all cursor-pointer shrink-0 shadow-2xs",
              copiedId === "quick-svg"
                ? "bg-[#5db872]/20 border-[#5db872]/50 text-[#3e8a50] dark:text-[#5db872] font-semibold"
                : "bg-white hover:bg-[#faf9f5] dark:bg-[#201e1b] dark:hover:bg-[#282622] border-[#e6dfd8] dark:border-[#2e2c28] text-[#141413] dark:text-[#faf9f5]"
            )}
            title="Copy Raw SVG XML"
          >
            {copiedId === "quick-svg" ? (
              <>
                <PXIconCheck size={11} className="text-[#3e8a50] dark:text-[#5db872]" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <PXIconCopy size={11} className="text-[#8e8b82]" />
                <span>SVG</span>
              </>
            )}
          </button>

          {/* Quick Download SVG File */}
          <button
            type="button"
            onClick={handleDownloadSvg}
            className={cn(
              "h-6.5 sm:h-7 px-2 sm:px-2.5 inline-flex items-center gap-1 sm:gap-1.5 rounded-md border text-[11px] font-mono transition-all cursor-pointer shrink-0 shadow-2xs",
              copiedId === "download-svg"
                ? "bg-[#5db872]/20 border-[#5db872]/50 text-[#3e8a50] dark:text-[#5db872] font-semibold"
                : "bg-white hover:bg-[#faf9f5] dark:bg-[#201e1b] dark:hover:bg-[#282622] border-[#e6dfd8] dark:border-[#2e2c28] text-[#141413] dark:text-[#faf9f5]"
            )}
            title="Download px-[icon].svg"
          >
            {copiedId === "download-svg" ? (
              <>
                <PXIconCheck size={11} className="text-[#3e8a50] dark:text-[#5db872]" />
                <span>Saved!</span>
              </>
            ) : (
              <>
                <PXIconDownload size={11} className="text-[#8e8b82]" />
                <span>Download</span>
              </>
            )}
          </button>
        </div>

        {/* Tab Navigation Segmented Grid (100% Width on Mobile, Zero Scrollbars!) */}
        <div className="px-3 sm:px-4 pt-2.5 sm:pt-3 border-b border-[#e6dfd8] dark:border-[#252320] bg-white dark:bg-[#181715] shrink-0">
          <div className="grid grid-cols-4 gap-1 w-full" role="tablist" aria-label="Format options">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "h-8 sm:h-8.5 px-1 sm:px-3 inline-flex items-center justify-center gap-1 sm:gap-2 rounded-t-lg text-xs font-mono font-medium transition-all cursor-pointer border-b-2 -mb-[1px] w-full min-w-0",
                    isActive
                      ? "border-primary text-primary font-bold bg-[#f5f0e8]/80 dark:bg-[#22201d]"
                      : "border-transparent text-[#6c6a64] dark:text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5] hover:bg-[#faf9f5] dark:hover:bg-[#1f1d1a]"
                  )}
                >
                  {tab.icon}
                  <span className="hidden sm:inline truncate">{tab.fullLabel}</span>
                  <span className="sm:hidden truncate">{tab.mobileLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Scrollable Content Area */}
        <div className="p-3 sm:p-5 overflow-y-auto workspace-scrollbar flex-1 space-y-3 sm:space-y-4">
          {/* 1. REACT TAB */}
          {activeTab === "react" && (
            <div className="space-y-3 sm:space-y-4 font-mono text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2.5 bg-[#faf9f5] dark:bg-[#1d1b18] p-2.5 sm:p-3 rounded-xl border border-[#e6dfd8] dark:border-[#2e2c28]">
                {/* Size Selector */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-[11px] text-[#6c6a64] dark:text-[#8e8b82] font-semibold uppercase">
                    Size:
                  </span>
                  <div className="inline-flex items-center p-0.5 rounded-md border border-[#e6dfd8] dark:border-[#2e2c28] bg-white dark:bg-[#141413]">
                    {[16, 20, 24, 32, 48].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          "h-5.5 sm:h-6 px-1.5 sm:px-2 text-[11px] rounded transition-all cursor-pointer",
                          selectedSize === size
                            ? "bg-[#141413] text-white dark:bg-[#383530] dark:text-[#faf9f5] font-bold shadow-2xs"
                            : "text-[#6c6a64] dark:text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5]"
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filled Toggle if Available */}
                {hasFilled && (
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-[11px] text-[#6c6a64] dark:text-[#8e8b82] font-semibold uppercase">
                      Style:
                    </span>
                    <div className="inline-flex items-center p-0.5 rounded-md border border-[#e6dfd8] dark:border-[#2e2c28] bg-white dark:bg-[#141413]">
                      <button
                        type="button"
                        onClick={() => setUseFilled(false)}
                        className={cn(
                          "h-5.5 sm:h-6 px-2 text-[11px] rounded transition-all cursor-pointer",
                          !useFilled
                            ? "bg-[#141413] text-white dark:bg-[#383530] dark:text-[#faf9f5] font-bold shadow-2xs"
                            : "text-[#6c6a64] dark:text-[#8e8b82]"
                        )}
                      >
                        Line
                      </button>
                      <button
                        type="button"
                        onClick={() => setUseFilled(true)}
                        className={cn(
                          "h-5.5 sm:h-6 px-2 text-[11px] rounded transition-all cursor-pointer",
                          useFilled
                            ? "bg-[#141413] text-white dark:bg-[#383530] dark:text-[#faf9f5] font-bold shadow-2xs"
                            : "text-[#6c6a64] dark:text-[#8e8b82]"
                        )}
                      >
                        Fill
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Code Snippet Box (Fully Theme-Adaptive) */}
              <div
                className={cn(
                  "rounded-xl border overflow-hidden shadow-xs transition-colors duration-200",
                  isDarkCode
                    ? "border-[#2e2c28] bg-[#141413] text-[#faf9f5]"
                    : "border-[#e6dfd8] bg-[#faf9f5] text-[#141413]"
                )}
              >
                <div
                  className={cn(
                    "px-3 sm:px-4 py-2 border-b flex items-center justify-between text-[11px] font-semibold tracking-wider uppercase",
                    isDarkCode
                      ? "border-[#2e2c28] bg-[#1b1a17] text-[#8e8b82]"
                      : "border-[#e6dfd8] bg-[#f0ebe1] text-[#6c6a64]"
                  )}
                >
                  <span className="truncate">REACT TSX USAGE</span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="shrink-0 text-[10px]">@pxui/react</span>
                    <CodeWrapButton
                      wrapped={codeWrap}
                      onToggle={() => setCodeWrap(!codeWrap)}
                      theme={codeTheme}
                      size="sm"
                    />
                  </div>
                </div>
                <div className="p-3 sm:p-4 overflow-x-auto workspace-scrollbar max-h-48 sm:max-h-56 select-text">
                  <SyntaxHighlighter
                    code={reactFullSnippet}
                    language="tsx"
                    theme={codeTheme}
                    showLineNumbers={true}
                    wrap={codeWrap}
                    onWrapChange={setCodeWrap}
                  />
                </div>
              </div>

              {/* Action Buttons in One Row */}
              <div className="flex items-center gap-2 pt-1 w-full">
                <button
                  type="button"
                  onClick={() => executeCopy(reactComponentSnippet, "react-component")}
                  className={cn(
                    "h-8 flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3.5 rounded-md border text-xs font-mono transition-all cursor-pointer box-border shadow-2xs font-semibold min-w-0 truncate",
                    copiedId === "react-component"
                      ? "bg-[#5db872]/20 border-[#5db872]/50 text-[#3e8a50] dark:text-[#5db872]"
                      : "bg-[#141413] hover:bg-[#282622] text-white dark:bg-[#282622] dark:hover:bg-[#33302a] dark:text-[#faf9f5] border-[#141413] dark:border-[#383530]"
                  )}
                >
                  {copiedId === "react-component" ? (
                    <>
                      <PXIconCheck size={13} className="text-[#3e8a50] dark:text-[#5db872] shrink-0" />
                      <span className="truncate">Copied Tag!</span>
                    </>
                  ) : (
                    <>
                      <PXIconCopy size={13} className="text-[#8e8b82] shrink-0" />
                      <span className="hidden xs:inline truncate">Copy JSX Tag</span>
                      <span className="xs:hidden truncate">Copy Tag</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => executeCopy(reactFullSnippet, "react-full")}
                  className={cn(
                    "h-8 flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3.5 rounded-md border text-xs font-mono transition-all cursor-pointer box-border shadow-2xs min-w-0 truncate",
                    copiedId === "react-full"
                      ? "bg-[#5db872]/20 border-[#5db872]/50 text-[#3e8a50] dark:text-[#5db872] font-semibold"
                      : "bg-white hover:bg-[#f5f0e8] dark:bg-[#201e1b] dark:hover:bg-[#282622] border-[#e6dfd8] dark:border-[#2e2c28] text-[#141413] dark:text-[#faf9f5]"
                  )}
                >
                  {copiedId === "react-full" ? (
                    <>
                      <PXIconCheck size={13} className="text-[#3e8a50] dark:text-[#5db872] shrink-0" />
                      <span className="truncate">Copied Example!</span>
                    </>
                  ) : (
                    <>
                      <PXIconCode size={13} className="text-[#8e8b82] shrink-0" />
                      <span className="hidden xs:inline truncate">Copy Full File</span>
                      <span className="xs:hidden truncate">Full File</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* 2. REACT NATIVE TAB */}
          {activeTab === "native" && (
            <div className="space-y-3 sm:space-y-4 font-mono text-xs">
              <p className="font-sans text-xs text-[#6c6a64] dark:text-[#8e8b82] leading-relaxed">
                Native vector icon using <code className="text-primary font-mono font-semibold">react-native-svg</code> with identical integer coordinate paths for iOS &amp; Android.
              </p>

              {/* Code Snippet Box (Fully Theme-Adaptive) */}
              <div
                className={cn(
                  "rounded-xl border overflow-hidden shadow-xs transition-colors duration-200",
                  isDarkCode
                    ? "border-[#2e2c28] bg-[#141413] text-[#faf9f5]"
                    : "border-[#e6dfd8] bg-[#faf9f5] text-[#141413]"
                )}
              >
                <div
                  className={cn(
                    "px-3 sm:px-4 py-2 border-b flex items-center justify-between text-[11px] font-semibold tracking-wider uppercase",
                    isDarkCode
                      ? "border-[#2e2c28] bg-[#1b1a17] text-[#8e8b82]"
                      : "border-[#e6dfd8] bg-[#f0ebe1] text-[#6c6a64]"
                  )}
                >
                  <span className="truncate">REACT NATIVE SVG COMPONENT</span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="shrink-0 text-[10px]">@pxui/react-native</span>
                    <CodeWrapButton
                      wrapped={codeWrap}
                      onToggle={() => setCodeWrap(!codeWrap)}
                      theme={codeTheme}
                      size="sm"
                    />
                  </div>
                </div>
                <div className="p-3 sm:p-4 overflow-x-auto workspace-scrollbar max-h-48 sm:max-h-56 select-text">
                  <SyntaxHighlighter
                    code={nativeSnippet}
                    language="tsx"
                    theme={codeTheme}
                    showLineNumbers={true}
                    wrap={codeWrap}
                    onWrapChange={setCodeWrap}
                  />
                </div>
              </div>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => executeCopy(nativeSnippet, "rn-code")}
                  className={cn(
                    "h-8 w-full inline-flex items-center justify-center gap-1.5 px-3 rounded-md border text-xs font-mono transition-all cursor-pointer box-border shadow-2xs font-semibold",
                    copiedId === "rn-code"
                      ? "bg-[#5db872]/20 border-[#5db872]/50 text-[#3e8a50] dark:text-[#5db872]"
                      : "bg-[#141413] hover:bg-[#282622] text-white dark:bg-[#282622] dark:hover:bg-[#33302a] dark:text-[#faf9f5] border-[#141413] dark:border-[#383530]"
                  )}
                >
                  {copiedId === "rn-code" ? (
                    <>
                      <PXIconCheck size={13} className="text-[#3e8a50] dark:text-[#5db872]" />
                      <span>Copied Native Code!</span>
                    </>
                  ) : (
                    <>
                      <PXIconCopy size={13} className="text-[#8e8b82]" />
                      <span>Copy React Native Component</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* 3. SHADCN/UI REGISTRY TAB */}
          {activeTab === "shadcn" && (
            <div className="space-y-3 sm:space-y-4 font-mono text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-[#faf9f5] dark:bg-[#1d1b18] p-2.5 sm:p-3 rounded-xl border border-[#e6dfd8] dark:border-[#2e2c28]">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-[#6c6a64] dark:text-[#8e8b82] uppercase tracking-wider font-semibold block">
                    PACKAGE MANAGER
                  </span>
                  <p className="font-sans text-[11px] text-[#6c6a64] dark:text-[#8e8b82]">
                    Select your CLI command runner:
                  </p>
                </div>

                <PackageManagerSwitcher
                  activePkg={packageManager}
                  onSelect={handleSelectPkg}
                  theme={codeTheme}
                  size="sm"
                />
              </div>

              {/* Terminal Box (Fully Theme-Adaptive) */}
              <div
                className={cn(
                  "rounded-xl border overflow-hidden shadow-xs transition-colors duration-200",
                  isDarkCode
                    ? "border-[#2e2c28] bg-[#141413] text-[#faf9f5]"
                    : "border-[#e6dfd8] bg-[#faf9f5] text-[#141413]"
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-between px-3 sm:px-4 py-2 border-b",
                    isDarkCode
                      ? "bg-[#1b1a17] border-[#2e2c28]"
                      : "bg-[#f0ebe1] border-[#e6dfd8]"
                  )}
                >
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80 inline-block" />
                    <span className="ml-2 font-mono text-[10px] text-[#8e8b82] font-semibold uppercase tracking-wider truncate">
                      INSTALLATION TERMINAL
                    </span>
                  </div>
                </div>

                <div className="p-3 sm:p-4 overflow-x-auto workspace-scrollbar select-text">
                  <HighlightedShadcnCommand
                    pkg={packageManager}
                    url={registryUrl}
                    theme={codeTheme}
                  />
                </div>
              </div>

              {/* Action Buttons in One Row */}
              <div className="flex items-center gap-2 pt-1 w-full">
                <button
                  type="button"
                  onClick={() => executeCopy(shadcnCmd, "shadcn-cmd")}
                  className={cn(
                    "h-8 flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3.5 rounded-md border text-xs font-mono transition-all cursor-pointer box-border shadow-2xs font-semibold min-w-0 truncate",
                    copiedId === "shadcn-cmd"
                      ? "bg-[#5db872]/20 border-[#5db872]/50 text-[#3e8a50] dark:text-[#5db872]"
                      : "bg-[#141413] hover:bg-[#282622] text-white dark:bg-[#282622] dark:hover:bg-[#33302a] dark:text-[#faf9f5] border-[#141413] dark:border-[#383530]"
                  )}
                >
                  {copiedId === "shadcn-cmd" ? (
                    <>
                      <PXIconCheck size={13} className="text-[#3e8a50] dark:text-[#5db872] shrink-0" />
                      <span className="truncate">Copied CLI!</span>
                    </>
                  ) : (
                    <>
                      <PXIconTerminal size={13} className="text-primary shrink-0" />
                      <span className="hidden xs:inline truncate">Copy CLI Command</span>
                      <span className="xs:hidden truncate">Copy CLI</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => executeCopy(registryArtifactJson, "shadcn-json")}
                  className={cn(
                    "h-8 flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3.5 rounded-md border text-xs font-mono transition-all cursor-pointer box-border shadow-2xs min-w-0 truncate",
                    copiedId === "shadcn-json"
                      ? "bg-[#5db872]/20 border-[#5db872]/50 text-[#3e8a50] dark:text-[#5db872] font-semibold"
                      : "bg-white hover:bg-[#f5f0e8] dark:bg-[#201e1b] dark:hover:bg-[#282622] border-[#e6dfd8] dark:border-[#2e2c28] text-[#141413] dark:text-[#faf9f5]"
                  )}
                >
                  {copiedId === "shadcn-json" ? (
                    <>
                      <PXIconCheck size={13} className="text-[#3e8a50] dark:text-[#5db872] shrink-0" />
                      <span className="truncate">Copied JSON!</span>
                    </>
                  ) : (
                    <>
                      <PXIconCopy size={13} className="text-[#8e8b82] shrink-0" />
                      <span className="hidden xs:inline truncate">Copy Registry JSON</span>
                      <span className="xs:hidden truncate">Copy JSON</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* 4. RAW SVG TAB */}
          {activeTab === "svg" && (
            <div className="space-y-3 sm:space-y-4 font-mono text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2.5 bg-[#faf9f5] dark:bg-[#1d1b18] p-2.5 sm:p-3 rounded-xl border border-[#e6dfd8] dark:border-[#2e2c28]">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-[#6c6a64] dark:text-[#8e8b82] uppercase tracking-wider font-semibold block">
                    VECTOR SPECIFICATION
                  </span>
                  <p className="font-sans text-[11px] text-[#6c6a64] dark:text-[#8e8b82]">
                    Clean SVG with <code className="text-primary font-semibold">shape-rendering=&quot;crispEdges&quot;</code>.
                  </p>
                </div>

                {hasFilled && (
                  <div className="inline-flex items-center p-0.5 rounded-md border border-[#e6dfd8] dark:border-[#2e2c28] bg-white dark:bg-[#141413]">
                    <button
                      type="button"
                      onClick={() => setUseFilled(false)}
                      className={cn(
                        "h-5.5 sm:h-6 px-2 text-[11px] rounded transition-all cursor-pointer",
                        !useFilled
                          ? "bg-[#141413] text-white dark:bg-[#383530] dark:text-[#faf9f5] font-bold shadow-2xs"
                          : "text-[#6c6a64] dark:text-[#8e8b82]"
                      )}
                    >
                      Outline
                    </button>
                    <button
                      type="button"
                      onClick={() => setUseFilled(true)}
                      className={cn(
                        "h-5.5 sm:h-6 px-2 text-[11px] rounded transition-all cursor-pointer",
                        useFilled
                          ? "bg-[#141413] text-white dark:bg-[#383530] dark:text-[#faf9f5] font-bold shadow-2xs"
                          : "text-[#6c6a64] dark:text-[#8e8b82]"
                      )}
                    >
                      Filled
                    </button>
                  </div>
                )}
              </div>

              {/* Code Snippet Box (Fully Theme-Adaptive) */}
              <div
                className={cn(
                  "rounded-xl border overflow-hidden shadow-xs transition-colors duration-200",
                  isDarkCode
                    ? "border-[#2e2c28] bg-[#141413] text-[#faf9f5]"
                    : "border-[#e6dfd8] bg-[#faf9f5] text-[#141413]"
                )}
              >
                <div
                  className={cn(
                    "px-3 sm:px-4 py-2 border-b flex items-center justify-between text-[11px] font-semibold tracking-wider uppercase",
                    isDarkCode
                      ? "border-[#2e2c28] bg-[#1b1a17] text-[#8e8b82]"
                      : "border-[#e6dfd8] bg-[#f0ebe1] text-[#6c6a64]"
                  )}
                >
                  <span className="truncate">RAW SVG XML MARKUP</span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="shrink-0 text-[10px]">px-{icon.name}.svg</span>
                    <CodeWrapButton
                      wrapped={codeWrap}
                      onToggle={() => setCodeWrap(!codeWrap)}
                      theme={codeTheme}
                      size="sm"
                    />
                  </div>
                </div>
                <div className="p-3 sm:p-4 overflow-x-auto workspace-scrollbar max-h-48 sm:max-h-56 select-text">
                  <SyntaxHighlighter
                    code={rawSvgSnippet}
                    language="svg"
                    theme={codeTheme}
                    showLineNumbers={true}
                    wrap={codeWrap}
                    onWrapChange={setCodeWrap}
                  />
                </div>
              </div>

              {/* Action Buttons in One Row */}
              <div className="flex items-center gap-1.5 sm:gap-2 pt-1 w-full">
                <button
                  type="button"
                  onClick={() => executeCopy(rawSvgSnippet, "svg-markup")}
                  className={cn(
                    "h-8 flex-1 inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 rounded-md border text-xs font-mono transition-all cursor-pointer box-border shadow-2xs font-semibold min-w-0 truncate",
                    copiedId === "svg-markup"
                      ? "bg-[#5db872]/20 border-[#5db872]/50 text-[#3e8a50] dark:text-[#5db872]"
                      : "bg-[#141413] hover:bg-[#282622] text-white dark:bg-[#282622] dark:hover:bg-[#33302a] dark:text-[#faf9f5] border-[#141413] dark:border-[#383530]"
                  )}
                >
                  {copiedId === "svg-markup" ? (
                    <>
                      <PXIconCheck size={13} className="text-[#3e8a50] dark:text-[#5db872] shrink-0" />
                      <span className="truncate">Copied!</span>
                    </>
                  ) : (
                    <>
                      <PXIconCopy size={13} className="text-[#8e8b82] shrink-0" />
                      <span className="hidden xs:inline truncate">Copy SVG</span>
                      <span className="xs:hidden truncate">SVG</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleDownloadSvg}
                  className={cn(
                    "h-8 flex-1 inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 rounded-md border text-xs font-mono transition-all cursor-pointer box-border shadow-2xs min-w-0 truncate",
                    copiedId === "download-svg"
                      ? "bg-[#5db872]/20 border-[#5db872]/50 text-[#3e8a50] dark:text-[#5db872] font-semibold"
                      : "bg-white hover:bg-[#f5f0e8] dark:bg-[#201e1b] dark:hover:bg-[#282622] border-[#e6dfd8] dark:border-[#2e2c28] text-[#141413] dark:text-[#faf9f5]"
                  )}
                >
                  {copiedId === "download-svg" ? (
                    <>
                      <PXIconCheck size={13} className="text-[#3e8a50] dark:text-[#5db872] shrink-0" />
                      <span className="truncate">Saved!</span>
                    </>
                  ) : (
                    <>
                      <PXIconDownload size={13} className="text-[#8e8b82] shrink-0" />
                      <span className="hidden xs:inline truncate">Download .svg</span>
                      <span className="xs:hidden truncate">Download</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => executeCopy(svgDataUri, "svg-data-uri")}
                  className={cn(
                    "h-8 px-2 sm:px-2.5 inline-flex items-center justify-center gap-1 rounded-md border text-xs font-mono transition-all cursor-pointer box-border shadow-2xs shrink-0",
                    copiedId === "svg-data-uri"
                      ? "bg-[#5db872]/20 border-[#5db872]/50 text-[#3e8a50] dark:text-[#5db872] font-semibold"
                      : "bg-white hover:bg-[#f5f0e8] dark:bg-[#201e1b] dark:hover:bg-[#282622] border-[#e6dfd8] dark:border-[#2e2c28] text-[#141413] dark:text-[#faf9f5]"
                  )}
                  title="Copy Data URI for CSS background-image"
                >
                  {copiedId === "svg-data-uri" ? (
                    <>
                      <PXIconCheck size={13} className="text-[#3e8a50] dark:text-[#5db872] shrink-0" />
                      <span className="hidden xs:inline">URI!</span>
                    </>
                  ) : (
                    <span>Data URI</span>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-3 sm:px-6 py-2 bg-[#faf9f5] dark:bg-[#1d1b18] border-t border-[#e6dfd8] dark:border-[#252320] flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#6c6a64] dark:text-[#8e8b82] shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5db872] shrink-0" />
            <span className="truncate">Deterministic multi-platform geometry</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="hidden sm:inline">Press</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-[#141413] border border-[#e6dfd8] dark:border-[#2e2c28] text-[9px] sm:text-[10px] text-[#141413] dark:text-[#faf9f5]">
              Esc
            </kbd>
            <span className="hidden sm:inline">to close</span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
