"use client";

import * as React from "react";
import Link from "next/link";
import { ICONS_CATALOG } from "@/lib/icons/catalog";
import { toPXComponentName } from "@/lib/compiler";
import { PXIconBase } from "@/components/icons/px-icon-base";
import {
  PXIconTerminal,
  PXIconCopy,
  PXIconCheck,
  PXIconSearch,
  PXIconArrowRight,
  PackageManagerSwitcher,
  HighlightedShadcnCommand,
  getShadcnAddCommand,
  usePreferredPackageManager,
  type PackageManager,
} from "@/components/icons";
import { SyntaxHighlighter, CodeWrapButton } from "@/components/ui/syntax-highlighter";
import { copyToClipboard } from "@/lib/clipboard";
import { useTheme } from "next-themes";
import { useOrigin } from "@/lib/hooks/use-origin";
import { cn } from "@/lib/utils";

export function RegistryWorkbench() {
  const { resolvedTheme } = useTheme();
  const workbenchTheme = resolvedTheme === "light" ? "light" : "dark";
  const [selectedIconName, setSelectedIconName] = React.useState("home");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [showRawJson, setShowRawJson] = React.useState(false);
  const [jsonWrapped, setJsonWrapped] = React.useState(false);
  const [installMethod, setInstallMethod] = React.useState<"single" | "multi" | "bundle">("single");
  const [packageManager, setPackageManager] = usePreferredPackageManager();

  const origin = useOrigin();

  const handleSelectPkg = (pkg: PackageManager) => {
    setPackageManager(pkg);
  };

  const selectedIcon = React.useMemo(() => {
    return ICONS_CATALOG.find((i) => i.name === selectedIconName) || ICONS_CATALOG[0];
  }, [selectedIconName]);

  const filteredIcons = React.useMemo(() => {
    if (!searchQuery.trim()) return ICONS_CATALOG.slice(0, 16);
    const q = searchQuery.toLowerCase().trim();
    return ICONS_CATALOG.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        (i.title && i.title.toLowerCase().includes(q)) ||
        i.tags.some((t) => t.toLowerCase().includes(q))
    ).slice(0, 24);
  }, [searchQuery]);

  const handleCopy = async (text: string, id: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
    }
  };

  const heroCommand = getShadcnAddCommand(packageManager, `${origin}/r/px-home.json`);
  const singleCommand = getShadcnAddCommand(packageManager, `${origin}/r/px-${selectedIcon.name}.json`);
  const multiUrls = [
    `${origin}/r/px-home.json`,
    `${origin}/r/px-search.json`,
    `${origin}/r/px-settings.json`,
  ];
  const multiCommand = getShadcnAddCommand(
    packageManager,
    multiUrls.join(" ")
  );
  const bundleCommand = getShadcnAddCommand(packageManager, `${origin}/r/icons-core.json`);

  const rawRegistryJson = JSON.stringify(
    {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name: `px-${selectedIcon.name}`,
      type: "registry:ui",
      title: selectedIcon.title || selectedIcon.name,
      description: selectedIcon.description,
      dependencies: [],
      registryDependencies: [],
      files: [
        {
          path: `components/pxui/px-icon-${selectedIcon.name}.tsx`,
          type: "registry:ui",
          target: `components/pxui/px-icon-${selectedIcon.name}.tsx`,
        },
      ],
      meta: {
        category: selectedIcon.category,
        grid: 24,
        version: selectedIcon.introducedVersion || "1.0.0",
      },
    },
    null,
    2
  );

  return (
    <div className="space-y-16 py-8 select-none">
      {/* 1. TECHNICAL HERO */}
      <section className="space-y-6 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#cc785c]/10 text-[#cc785c] font-mono text-xs font-bold uppercase tracking-wider border border-[#cc785c]/20">
          <PXIconTerminal size={14} />
          <span>SHADCN REGISTRY ARCHITECTURE</span>
        </div>

        <h1 className="font-sans text-4xl sm:text-5xl font-bold tracking-tight text-[#141413] dark:text-[#faf9f5] leading-tight">
          Own the code you install.
        </h1>

        <p className="font-sans text-lg text-[#6c6a64] dark:text-[#8e8b82] leading-relaxed max-w-2xl">
          Add PXUI icons directly into your repository through the canonical shadcn Registry workflow.
          Zero runtime bloat, no third-party bundle lock-in, and instant local component ownership.
        </p>

        {/* Primary Hero Command Surface */}
        <div className="rounded-xl border border-[#2e2c28] bg-[#141413] text-[#faf9f5] p-4 sm:p-5 shadow-xl space-y-3 font-mono">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-[#8e8b82] border-b border-[#2e2c28] pb-2 gap-2">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-xs bg-[#5db872]" />
              PRIMARY REGISTRY COMMAND
            </span>
            <PackageManagerSwitcher
              activePkg={packageManager}
              onSelect={handleSelectPkg}
              theme="dark"
              size="sm"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            <div className="overflow-x-auto workspace-scrollbar py-1">
              <HighlightedShadcnCommand
                pkg={packageManager}
                url={`${origin}/r/px-home.json`}
                theme="dark"
                className="text-xs sm:text-sm"
              />
            </div>

            <button
              type="button"
              onClick={() => handleCopy(heroCommand, "hero-cmd")}
              className={cn(
                "h-8 inline-flex items-center justify-center gap-1.5 px-3.5 rounded-lg text-xs font-semibold shrink-0 transition-all cursor-pointer box-border shadow-xs",
                copiedId === "hero-cmd"
                  ? "bg-[#5db872] text-[#141413]"
                  : "bg-[#282622] hover:bg-[#33302a] text-[#faf9f5] border border-[#3d3a34]"
              )}
            >
              {copiedId === "hero-cmd" ? (
                <>
                  <PXIconCheck size={14} />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <PXIconCopy size={14} className="text-[#8e8b82]" />
                  <span>Copy Command</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* 2. THREE CORE PRINCIPLES */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl border border-[#e6dfd8] dark:border-[#252320] bg-white dark:bg-[#181715] space-y-3">
          <div className="w-8 h-8 rounded-lg bg-[#cc785c]/10 text-[#cc785c] flex items-center justify-center font-mono font-bold text-xs">
            01
          </div>
          <h3 className="font-sans font-bold text-base text-[#141413] dark:text-[#faf9f5]">
            Source in Your Repo
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#6c6a64] dark:text-[#8e8b82] leading-relaxed">
            The CLI downloads the pure TSX file straight into <code className="font-mono text-xs text-[#cc785c]">components/pxui/</code>. You can inspect, modify, and style it without external library boundaries.
          </p>
        </div>

        <div className="p-6 rounded-xl border border-[#e6dfd8] dark:border-[#252320] bg-white dark:bg-[#181715] space-y-3">
          <div className="w-8 h-8 rounded-lg bg-[#5db872]/10 text-[#5db872] flex items-center justify-center font-mono font-bold text-xs">
            02
          </div>
          <h3 className="font-sans font-bold text-base text-[#141413] dark:text-[#faf9f5]">
            Zero Dependencies
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#6c6a64] dark:text-[#8e8b82] leading-relaxed">
            Standard icons have no runtime packages or peer dependencies. They render native React SVG elements with pure integer paths and currentColor fills.
          </p>
        </div>

        <div className="p-6 rounded-xl border border-[#e6dfd8] dark:border-[#252320] bg-white dark:bg-[#181715] space-y-3">
          <div className="w-8 h-8 rounded-lg bg-[#79c0ff]/10 text-[#79c0ff] flex items-center justify-center font-mono font-bold text-xs">
            03
          </div>
          <h3 className="font-sans font-bold text-base text-[#141413] dark:text-[#faf9f5]">
            Strict Schema Gate
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#6c6a64] dark:text-[#8e8b82] leading-relaxed">
            Every Registry item is verified by automated contract tests against the official shadcn Registry item schema with full CORS support.
          </p>
        </div>
      </section>

      {/* 3. INTERACTIVE REGISTRY EXPLORER */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e6dfd8] dark:border-[#252320] pb-4">
          <div>
            <h2 className="font-sans text-2xl font-bold tracking-tight text-[#141413] dark:text-[#faf9f5]">
              Registry Explorer
            </h2>
            <p className="font-mono text-xs text-[#6c6a64] dark:text-[#8e8b82]">
              Select any canonical icon to preview its generated file path, dependencies, and command artifact.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-64 font-mono text-xs">
              <PXIconSearch
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8e8b82]"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter icons..."
                className="w-full h-8 pl-9 pr-3 rounded-lg border border-[#e6dfd8] dark:border-[#2e2c28] bg-white dark:bg-[#141413] text-[#141413] dark:text-[#faf9f5] focus:outline-none focus:ring-1 focus:ring-[#cc785c] box-border text-xs"
              />
            </div>
          </div>
        </div>

        {/* Quick icon selector chips */}
        <div className="flex items-center gap-2 overflow-x-auto workspace-scrollbar pb-2">
          {filteredIcons.map((item) => {
            const isSelected = item.name === selectedIcon.name;
            return (
              <button
                key={item.name}
                type="button"
                onClick={() => setSelectedIconName(item.name)}
                className={cn(
                  "h-8 inline-flex items-center gap-2 px-3 rounded-lg border text-xs font-mono shrink-0 transition-all cursor-pointer box-border shadow-2xs",
                  isSelected
                    ? "bg-[#cc785c] text-white border-[#cc785c] font-bold shadow-xs"
                    : "bg-white dark:bg-[#181715] border-[#e6dfd8] dark:border-[#252320] text-[#141413] dark:text-[#faf9f5] hover:border-[#cc785c]"
                )}
              >
                <PXIconBase definition={item} size={16} />
                <span>px-{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* Explorer Inspector Card */}
        <div className="rounded-2xl border border-[#e6dfd8] dark:border-[#2e2c28] bg-white dark:bg-[#181715] p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Specimen & Identity */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 rounded-xl bg-[#faf9f5] dark:bg-[#141413] border border-[#e6dfd8] dark:border-[#252320] text-center space-y-4">
              <div className="w-24 h-24 rounded-lg bg-white dark:bg-[#1d1b18] border border-[#e6dfd8] dark:border-[#2e2c28] flex items-center justify-center shadow-xs">
                <PXIconBase definition={selectedIcon} size={56} className="text-[#cc785c]" />
              </div>

              <div>
                <div className="font-mono text-xs text-[#8e8b82]">COMPONENT</div>
                <div className="font-sans font-bold text-xl text-[#141413] dark:text-[#faf9f5]">
                  {toPXComponentName(selectedIcon.name)}
                </div>
                <div className="font-mono text-xs text-[#cc785c] mt-0.5">
                  px-{selectedIcon.name}
                </div>
              </div>

              <Link
                href={`/icons/px-${selectedIcon.name}`}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#8e8b82] hover:text-[#cc785c] transition-colors"
              >
                <span>View Full Specification</span>
                <PXIconArrowRight size={12} />
              </Link>
            </div>

            {/* Right: Technical Metadata & Commands */}
            <div className="lg:col-span-7 space-y-5 font-mono text-xs">
              {/* Properties Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg border border-[#e6dfd8] dark:border-[#2e2c28] bg-[#faf9f5] dark:bg-[#201e1b]">
                  <span className="text-[10px] text-[#8e8b82] uppercase block">TARGET FILE</span>
                  <span className="font-bold text-[#141413] dark:text-[#faf9f5] truncate block mt-0.5" title={`components/pxui/px-icon-${selectedIcon.name}.tsx`}>
                    px-icon-{selectedIcon.name}.tsx
                  </span>
                </div>

                <div className="p-3 rounded-lg border border-[#e6dfd8] dark:border-[#2e2c28] bg-[#faf9f5] dark:bg-[#201e1b]">
                  <span className="text-[10px] text-[#8e8b82] uppercase block">DEPENDENCIES</span>
                  <span className="font-bold text-[#5db872] block mt-0.5">
                    None (0 pkgs)
                  </span>
                </div>

                <div className="p-3 rounded-lg border border-[#e6dfd8] dark:border-[#2e2c28] bg-[#faf9f5] dark:bg-[#201e1b]">
                  <span className="text-[10px] text-[#8e8b82] uppercase block">STATUS</span>
                  <span className="font-bold text-[#5db872] block mt-0.5">
                    Verified 1.0.0
                  </span>
                </div>
              </div>

              {/* Copy Command Bar with Package Manager Switcher */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-[10px] text-[#8e8b82] uppercase tracking-wider font-semibold">
                    INSTALLATION COMMAND
                  </span>
                  <PackageManagerSwitcher
                    activePkg={packageManager}
                    onSelect={handleSelectPkg}
                    theme="dark"
                    size="sm"
                  />
                </div>

                <div className="p-3 rounded-lg border border-[#2e2c28] bg-[#141413] text-[#faf9f5] flex items-center justify-between gap-3">
                  <div className="overflow-x-auto workspace-scrollbar py-0.5">
                    <HighlightedShadcnCommand
                      pkg={packageManager}
                      url={`${origin}/r/px-${selectedIcon.name}.json`}
                      theme="dark"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(singleCommand, "explorer-cmd")}
                    className={cn(
                      "h-8 w-8 inline-flex items-center justify-center p-0 rounded-md transition-all cursor-pointer shrink-0 box-border shadow-2xs",
                      copiedId === "explorer-cmd"
                        ? "bg-[#5db872] text-[#141413]"
                        : "bg-[#282622] hover:bg-[#33302a] text-[#faf9f5] border border-[#383530]"
                    )}
                    title="Copy command"
                    aria-label="Copy command"
                  >
                    {copiedId === "explorer-cmd" ? <PXIconCheck size={14} /> : <PXIconCopy size={14} />}
                  </button>
                </div>
              </div>

              {/* View Raw JSON Accordion */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setShowRawJson(!showRawJson)}
                    className="text-xs text-[#cc785c] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    <span>{showRawJson ? "Hide Registry JSON" : "View Raw Registry JSON Artifact (px-" + selectedIcon.name + ".json)"}</span>
                  </button>

                  {showRawJson && (
                    <div className="flex items-center gap-2">
                      <CodeWrapButton
                        wrapped={jsonWrapped}
                        onToggle={() => setJsonWrapped(!jsonWrapped)}
                        theme={workbenchTheme}
                        size="md"
                      />
                      <button
                        type="button"
                        onClick={() => handleCopy(rawRegistryJson, "raw-json")}
                        className={cn(
                          "h-8 inline-flex items-center justify-center gap-1.5 px-3 rounded-md border text-xs font-mono transition-all cursor-pointer box-border shadow-2xs",
                          copiedId === "raw-json"
                            ? "bg-[#5db872]/20 border-[#5db872]/50 text-[#3e8a50] dark:text-[#5db872] font-semibold"
                            : "bg-white hover:bg-[#f5f0e8] dark:bg-[#201e1b] dark:hover:bg-[#282622] border-[#e6dfd8] dark:border-[#2e2c28] text-[#141413] dark:text-[#faf9f5]"
                        )}
                      >
                        {copiedId === "raw-json" ? (
                          <>
                            <PXIconCheck size={12} className="text-[#3e8a50] dark:text-[#5db872]" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <PXIconCopy size={12} className="text-[#8e8b82]" />
                            <span>Copy JSON</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {showRawJson && (
                  <div className={cn("rounded-xl border border-[#e6dfd8] dark:border-[#2e2c28] bg-[#faf9f5] dark:bg-[#141413] p-4 max-h-80 shadow-2xs", jsonWrapped ? "overflow-x-hidden" : "overflow-x-auto workspace-scrollbar")}>
                    <SyntaxHighlighter
                      code={rawRegistryJson}
                      language="json"
                      theme={workbenchTheme}
                      showLineNumbers={true}
                      wrap={jsonWrapped}
                      onWrapChange={setJsonWrapped}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INSTALLATION PATTERNS */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <h2 className="font-sans text-2xl font-bold tracking-tight text-[#141413] dark:text-[#faf9f5]">
              Installation Patterns
            </h2>
            <p className="font-mono text-xs text-[#6c6a64] dark:text-[#8e8b82]">
              Choose between individual icon additions, multi-icon commands, or bundle schemas.
            </p>
          </div>
          <PackageManagerSwitcher
            activePkg={packageManager}
            onSelect={handleSelectPkg}
            size="sm"
          />
        </div>

        <div className="rounded-xl border border-[#e6dfd8] dark:border-[#252320] bg-white dark:bg-[#181715] overflow-hidden">
          {/* Method Tabs */}
          <div className="h-8 inline-flex items-stretch p-0.5 border-b border-[#e6dfd8] dark:border-[#252320] bg-[#faf9f5] dark:bg-[#141413] font-mono text-xs box-border overflow-x-auto max-w-full">
            {(
              [
                { id: "single", label: "Single Icon" },
                { id: "multi", label: "Multiple Icons" },
                { id: "bundle", label: "Core Bundle" },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setInstallMethod(t.id)}
                className={cn(
                  "h-full px-3.5 inline-flex items-center justify-center rounded-md font-medium transition-all cursor-pointer self-stretch text-xs shrink-0",
                  installMethod === t.id
                    ? "bg-white dark:bg-[#252320] text-[#141413] dark:text-[#faf9f5] font-bold shadow-xs"
                    : "text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5]"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="p-6 space-y-4">
            {installMethod === "single" && (
              <div className="space-y-2">
                <p className="font-sans text-sm text-[#6c6a64] dark:text-[#8e8b82]">
                  Add only the exact icon you need. The CLI creates a single self-contained TSX component file.
                </p>
                <div className="p-3 rounded-lg border border-[#2e2c28] bg-[#141413] text-[#faf9f5] flex items-center justify-between font-mono text-xs gap-3">
                  <div className="overflow-x-auto workspace-scrollbar py-0.5">
                    <HighlightedShadcnCommand
                      pkg={packageManager}
                      url={`${origin}/r/px-home.json`}
                      theme="dark"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(heroCommand, "tab-single")}
                    className="h-8 w-8 inline-flex items-center justify-center p-0 rounded-md bg-[#252320] hover:bg-[#2e2c28] border border-[#383530] text-[#faf9f5] cursor-pointer shrink-0 box-border"
                    title="Copy single command"
                    aria-label="Copy command"
                  >
                    {copiedId === "tab-single" ? <PXIconCheck size={14} className="text-[#5db872]" /> : <PXIconCopy size={14} />}
                  </button>
                </div>
              </div>
            )}

            {installMethod === "multi" && (
              <div className="space-y-2">
                <p className="font-sans text-sm text-[#6c6a64] dark:text-[#8e8b82]">
                  Supply space-separated URLs to install multiple icons simultaneously in a single command.
                </p>
                <div className="p-3 rounded-lg border border-[#2e2c28] bg-[#141413] text-[#faf9f5] flex items-center justify-between font-mono text-xs gap-3">
                  <div className="overflow-x-auto workspace-scrollbar py-0.5">
                    <HighlightedShadcnCommand
                      pkg={packageManager}
                      urls={multiUrls}
                      theme="dark"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(multiCommand, "tab-multi")}
                    className="h-8 w-8 inline-flex items-center justify-center p-0 rounded-md bg-[#252320] hover:bg-[#2e2c28] border border-[#383530] text-[#faf9f5] cursor-pointer shrink-0 box-border"
                    title="Copy multi command"
                    aria-label="Copy command"
                  >
                    {copiedId === "tab-multi" ? <PXIconCheck size={14} className="text-[#5db872]" /> : <PXIconCopy size={14} />}
                  </button>
                </div>
              </div>
            )}

            {installMethod === "bundle" && (
              <div className="space-y-2">
                <p className="font-sans text-sm text-[#6c6a64] dark:text-[#8e8b82]">
                  Add the foundational set of primary application icons (navigation, controls, files, status).
                </p>
                <div className="p-3 rounded-lg border border-[#2e2c28] bg-[#141413] text-[#faf9f5] flex items-center justify-between font-mono text-xs gap-3">
                  <div className="overflow-x-auto workspace-scrollbar py-0.5">
                    <HighlightedShadcnCommand
                      pkg={packageManager}
                      url={`${origin}/r/icons-core.json`}
                      theme="dark"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(bundleCommand, "tab-bundle")}
                    className="h-8 w-8 inline-flex items-center justify-center p-0 rounded-md bg-[#252320] hover:bg-[#2e2c28] border border-[#383530] text-[#faf9f5] cursor-pointer shrink-0 box-border"
                    title="Copy bundle command"
                    aria-label="Copy command"
                  >
                    {copiedId === "tab-bundle" ? <PXIconCheck size={14} className="text-[#5db872]" /> : <PXIconCopy size={14} />}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. CONFIGURATION & DESTINATION */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-6 sm:p-8 rounded-2xl border border-[#e6dfd8] dark:border-[#252320] bg-white dark:bg-[#181715] space-y-4">
          <h3 className="font-sans text-lg font-bold text-[#141413] dark:text-[#faf9f5]">
            Where does the code go?
          </h3>
          <p className="font-sans text-sm text-[#6c6a64] dark:text-[#8e8b82] leading-relaxed">
            By default, the shadcn CLI creates your icons under your configured components alias, specifically in <code className="font-mono text-xs text-[#cc785c]">components/pxui/</code>.
          </p>

          <div className="p-4 rounded-xl bg-[#faf9f5] dark:bg-[#141413] border border-[#e6dfd8] dark:border-[#252320] font-mono text-xs space-y-1.5">
            <div className="text-[#8e8b82] text-[11px]">DIRECTORY STRUCTURE</div>
            <div className="text-[#141413] dark:text-[#faf9f5]">your-project/</div>
            <div className="text-[#8e8b82] pl-4">└── components/</div>
            <div className="text-[#8e8b82] pl-8">└── pxui/</div>
            <div className="text-[#cc785c] font-bold pl-12">├── px-icon-home.tsx</div>
            <div className="text-[#cc785c] font-bold pl-12">├── px-icon-search.tsx</div>
            <div className="text-[#8e8b82] pl-12">└── px-icon-base.tsx</div>
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl border border-[#e6dfd8] dark:border-[#252320] bg-white dark:bg-[#181715] space-y-4">
          <h3 className="font-sans text-lg font-bold text-[#141413] dark:text-[#faf9f5]">
            How do I update installed icons?
          </h3>
          <p className="font-sans text-sm text-[#6c6a64] dark:text-[#8e8b82] leading-relaxed">
            To update an icon to a new release or optical refinement, pass the <code className="font-mono text-xs text-[#cc785c]">-o</code> (overwrite) flag to the CLI command:
          </p>

          <div className="p-4 rounded-xl bg-[#141413] border border-[#2e2c28] font-mono text-xs text-[#faf9f5] space-y-2">
            <div className="flex items-center justify-between text-[#8e8b82] text-[11px] gap-2">
              <span>OVERWRITE / UPDATE COMMAND</span>
              <button
                type="button"
                onClick={() => handleCopy(`${heroCommand} -o`, "update-cmd")}
                className="h-6.5 px-2 inline-flex items-center justify-center gap-1 rounded bg-[#252320] hover:bg-[#2e2c28] border border-[#383530] text-[#faf9f5] text-[11px] cursor-pointer transition-colors"
                title="Copy update command"
              >
                {copiedId === "update-cmd" ? (
                  <>
                    <PXIconCheck size={12} className="text-[#5db872]" />
                    <span className="text-[#5db872]">Copied!</span>
                  </>
                ) : (
                  <>
                    <PXIconCopy size={12} className="text-[#8e8b82]" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <div className="overflow-x-auto workspace-scrollbar py-0.5 select-all">
              <code>{getShadcnAddCommand(packageManager, `${origin}/r/px-home.json`)} -o</code>
            </div>
          </div>

          <p className="font-sans text-xs text-[#8e8b82]">
            Because you own the code, Git diffs will clearly display any geometry refinements before you commit.
          </p>
        </div>
      </section>
    </div>
  );
}
