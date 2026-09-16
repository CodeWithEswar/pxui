"use client";

import * as React from "react";
import { IconDefinition } from "@/lib/icons/schema";
import { toPXComponentName, generateRegistryItemJson } from "@/lib/compiler";
import {
  PXIconCheck,
  PXIconCopy,
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

interface SpecRegistryDetailsProps {
  icon: IconDefinition;
}

export function SpecRegistryDetails({ icon }: SpecRegistryDetailsProps) {
  const { resolvedTheme } = useTheme();
  const [showJson, setShowJson] = React.useState(false);
  const [copiedCmd, setCopiedCmd] = React.useState(false);
  const [copiedJson, setCopiedJson] = React.useState(false);
  const [jsonWrapped, setJsonWrapped] = React.useState(false);
  const [packageManager, setPackageManager] = usePreferredPackageManager();

  const componentName = toPXComponentName(icon.name);
  const origin = useOrigin();

  const handleSelectPkg = (pkg: PackageManager) => {
    setPackageManager(pkg);
  };

  const registryCmd = getShadcnAddCommand(
    packageManager,
    `${origin}/r/px-${icon.name}.json`
  );

  // Compute actual generated registry artifact JSON
  const registryArtifact = React.useMemo(() => {
    try {
      return generateRegistryItemJson(icon, origin);
    } catch {
      return {
        name: `px-${icon.name}`,
        type: "registry:ui",
        files: [
          {
            path: `components/icons/px-${icon.name}.tsx`,
            type: "registry:ui",
          },
        ],
      };
    }
  }, [icon, origin]);

  const rawJsonString = React.useMemo(
    () => JSON.stringify(registryArtifact, null, 2),
    [registryArtifact]
  );

  const handleCopyCmd = async () => {
    const success = await copyToClipboard(registryCmd);
    if (success) {
      setCopiedCmd(true);
      setTimeout(() => setCopiedCmd(false), 1800);
    }
  };

  const handleCopyJson = async () => {
    const success = await copyToClipboard(rawJsonString);
    if (success) {
      setCopiedJson(true);
      setTimeout(() => setCopiedJson(false), 1800);
    }
  };

  return (
    <section id="registry" className="scroll-mt-24 space-y-6">
      <div className="space-y-1">
        <h2 className="font-sans text-2xl font-bold tracking-tight text-[#141413] dark:text-[#faf9f5]">
          shadcn Registry Artifact
        </h2>
        <p className="font-mono text-xs text-[#8e8b82]">
          Independent registry item consumable via the shadcn CLI without installing full library dependencies.
        </p>
      </div>

      <div className="rounded-xl border border-[#e6dfd8] dark:border-[#252320] bg-white dark:bg-[#181715] p-5 sm:p-6 space-y-6">
        {/* CLI Command Box with Package Manager Switcher & Authentic Colored Terminal Chassis */}
        <div className="rounded-xl border border-[#2e2c28] bg-[#141413] text-[#faf9f5] shadow-xs overflow-hidden">
          {/* Terminal Window Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-[#1b1a17] border-b border-[#2e2c28]">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80 inline-block" />
              </div>
              <span className="font-mono text-[11px] text-[#8e8b82] ml-2 tracking-wider font-semibold uppercase">
                INSTALLATION COMMAND
              </span>
            </div>

            <PackageManagerSwitcher
              activePkg={packageManager}
              onSelect={handleSelectPkg}
              theme="dark"
              size="sm"
            />
          </div>

          {/* Terminal Command Line with Full Syntax Colors */}
          <div className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
            <div className="overflow-x-auto workspace-scrollbar py-1">
              <HighlightedShadcnCommand
                pkg={packageManager}
                url={`${origin}/r/px-${icon.name}.json`}
                theme="dark"
              />
            </div>

            <button
              type="button"
              onClick={handleCopyCmd}
              className={cn(
                "h-8 w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 rounded-md border text-xs font-mono transition-all shrink-0 cursor-pointer box-border shadow-2xs",
                copiedCmd
                  ? "bg-[#5db872]/20 border-[#5db872]/50 text-[#5db872] font-semibold"
                  : "bg-[#252320] hover:bg-[#2e2c28] border-[#383530] text-[#faf9f5]"
              )}
            >
              {copiedCmd ? (
                <>
                  <PXIconCheck size={13} className="text-[#5db872]" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <PXIconCopy size={13} className="text-[#8e8b82]" />
                  <span>Copy Command</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Registry Metadata Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs pt-4 border-t border-[#e6dfd8] dark:border-[#252320]">
          <div>
            <span className="text-[10px] text-[#8e8b82] uppercase block">REGISTRY ITEM ID</span>
            <span className="font-semibold text-[#141413] dark:text-[#faf9f5]">
              px-{icon.name}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-[#8e8b82] uppercase block">COMPONENT EXPORT</span>
            <span className="font-semibold text-[#141413] dark:text-[#faf9f5]">
              {componentName}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-[#8e8b82] uppercase block">ENDPOINT</span>
            <a
              href={`/r/px-${icon.name}.json`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#cc785c] hover:underline font-semibold"
            >
              /r/px-{icon.name}.json ↗
            </a>
          </div>
        </div>

        {/* Collapsible JSON Artifact Viewer */}
        <div className="pt-2 space-y-3">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setShowJson(!showJson)}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#cc785c] hover:underline font-semibold cursor-pointer"
            >
              <span>{showJson ? "▼ Hide generated registry JSON artifact" : "▶ Inspect generated registry JSON artifact"}</span>
            </button>

            {showJson && (
              <div className="flex items-center gap-2">
                <CodeWrapButton
                  wrapped={jsonWrapped}
                  onToggle={() => setJsonWrapped(!jsonWrapped)}
                  theme={resolvedTheme === "light" ? "light" : "dark"}
                  size="md"
                />
                <button
                  type="button"
                  onClick={handleCopyJson}
                  className={cn(
                    "h-8 inline-flex items-center justify-center gap-1.5 px-3 rounded-md border text-xs font-mono transition-all cursor-pointer box-border shadow-2xs",
                    copiedJson
                      ? "bg-[#5db872]/20 border-[#5db872]/50 text-[#3e8a50] dark:text-[#5db872] font-semibold"
                      : "bg-white hover:bg-[#f5f0e8] dark:bg-[#201e1b] dark:hover:bg-[#282622] border-[#e6dfd8] dark:border-[#2e2c28] text-[#141413] dark:text-[#faf9f5]"
                  )}
                >
                  {copiedJson ? (
                    <>
                      <PXIconCheck size={13} className="text-[#3e8a50] dark:text-[#5db872]" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <PXIconCopy size={13} className="text-[#8e8b82]" />
                      <span>Copy JSON</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {showJson && (
            <div className={cn("p-4 rounded-xl border border-[#e6dfd8] dark:border-[#2e2c28] bg-[#faf9f5] dark:bg-[#141413] max-h-80 select-text transition-colors duration-200 shadow-2xs", jsonWrapped ? "overflow-x-hidden" : "overflow-x-auto workspace-scrollbar")}>
              <SyntaxHighlighter
                code={rawJsonString}
                language="json"
                theme={resolvedTheme === "light" ? "light" : "dark"}
                showLineNumbers={true}
                wrap={jsonWrapped}
                onWrapChange={setJsonWrapped}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
