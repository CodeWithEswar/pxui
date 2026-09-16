"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { PXIconCopy, PXIconCheck, PXIconSearch, PXIconBell } from "@/components/icons";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const RAW_REACT_CODE = `import { PXIconSearch, PXIconBell } from "@pxui/react";

export function SearchBar() {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 border rounded-lg">
      <PXIconSearch size={18} className="text-muted-foreground" />
      <input type="text" placeholder="Search resources..." className="bg-transparent text-sm" />
      <PXIconBell size={18} animated className="text-primary" />
    </div>
  );
}`;

const RAW_NATIVE_CODE = `import React from "react";
import { View, TextInput } from "react-native";
import { PXIconSearch, PXIconBell } from "@pxui/react-native";

export function MobileSearchBar() {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", padding: 8 }}>
      <PXIconSearch size={20} color="#6c6a64" />
      <TextInput placeholder="Search..." style={{ flex: 1, marginHorizontal: 8 }} />
      <PXIconBell size={20} color="#cc785c" />
    </View>
  );
}`;

const RAW_CLI_CODE = `# Install core React package
pnpm add @pxui/react

# Or install shadcn-compatible recipe via PXUI CLI
npx @pxui/cli add search-bar`;

function WrapIcon({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M3 12h15a3 3 0 0 1 0 6h-4" />
      <polyline points="16 16 14 18 16 20" />
      <line x1="3" y1="18" x2="8" y2="18" />
    </svg>
  );
}

function CodeLine({
  num,
  isWrapped,
  children,
}: {
  num: number;
  isWrapped: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex items-start leading-relaxed font-mono text-[11px] sm:text-[13px] group hover:bg-[#201e1b] -mx-3 sm:-mx-4 px-3 sm:px-4 py-0.5 rounded transition-colors",
        isWrapped && "min-w-0"
      )}
    >
      <span className="w-6 sm:w-8 shrink-0 select-none text-right pr-2 sm:pr-4 text-[#524e47] group-hover:text-[#8e8b82] font-mono text-[10px] sm:text-[11px] leading-relaxed transition-colors border-r border-[#262420] mr-2 sm:mr-4 pt-[1px]">
        {String(num).padStart(2, "0")}
      </span>
      <span
        className={cn(
          "flex-1 min-w-0",
          isWrapped
            ? "whitespace-pre-wrap break-words leading-relaxed pl-2 sm:pl-3 -indent-2 sm:-indent-3"
            : "whitespace-pre overflow-x-visible"
        )}
      >
        {children}
      </span>
    </div>
  );
}

function ReactCodeHighlighted({ isWrapped }: { isWrapped: boolean }) {
  const lines = [
    <>
      <span className="text-[#ff7b72] font-medium">import</span> <span className="text-[#8b949e]">{'{'}</span> <span className="text-[#4ec9b0] font-medium">PXIconSearch</span><span className="text-[#8b949e]">,</span> <span className="text-[#4ec9b0] font-medium">PXIconBell</span> <span className="text-[#8b949e]">{'}'}</span> <span className="text-[#ff7b72] font-medium">from</span> <span className="text-[#ce9178]">"@pxui/react"</span><span className="text-[#8b949e]">;</span>
    </>,
    <>&nbsp;</>,
    <>
      <span className="text-[#ff7b72] font-medium">export</span> <span className="text-[#ff7b72] font-medium">function</span> <span className="text-[#dcdcaa] font-semibold">SearchBar</span><span className="text-[#8b949e]">() {'{'}</span>
    </>,
    <>
      {"  "}<span className="text-[#ff7b72] font-medium">return</span> <span className="text-[#8b949e]">(</span>
    </>,
    <>
      {"    "}<span className="text-[#808080]">&lt;</span><span className="text-[#569cd6]">div</span> <span className="text-[#9cdcfe]">className</span><span className="text-[#8b949e]">=</span><span className="text-[#ce9178]">"flex items-center gap-2 px-3 py-1.5 border rounded-lg"</span><span className="text-[#808080]">&gt;</span>
    </>,
    <>
      {"      "}<span className="text-[#808080]">&lt;</span><span className="text-[#4ec9b0] font-medium">PXIconSearch</span> <span className="text-[#9cdcfe]">size</span><span className="text-[#8b949e]">={'{'}</span><span className="text-[#b5cea8]">18</span><span className="text-[#8b949e]">{'}'}</span> <span className="text-[#9cdcfe]">className</span><span className="text-[#8b949e]">=</span><span className="text-[#ce9178]">"text-muted-foreground"</span> <span className="text-[#808080]">/&gt;</span>
    </>,
    <>
      {"      "}<span className="text-[#808080]">&lt;</span><span className="text-[#569cd6]">input</span> <span className="text-[#9cdcfe]">type</span><span className="text-[#8b949e]">=</span><span className="text-[#ce9178]">"text"</span> <span className="text-[#9cdcfe]">placeholder</span><span className="text-[#8b949e]">=</span><span className="text-[#ce9178]">"Search resources..."</span> <span className="text-[#9cdcfe]">className</span><span className="text-[#8b949e]">=</span><span className="text-[#ce9178]">"bg-transparent text-sm"</span> <span className="text-[#808080]">/&gt;</span>
    </>,
    <>
      {"      "}<span className="text-[#808080]">&lt;</span><span className="text-[#4ec9b0] font-medium">PXIconBell</span> <span className="text-[#9cdcfe]">size</span><span className="text-[#8b949e]">={'{'}</span><span className="text-[#b5cea8]">18</span><span className="text-[#8b949e]">{'}'}</span> <span className="text-[#9cdcfe] font-medium">animated</span> <span className="text-[#9cdcfe]">className</span><span className="text-[#8b949e]">=</span><span className="text-[#ce9178]">"text-primary"</span> <span className="text-[#808080]">/&gt;</span>
    </>,
    <>
      {"    "}<span className="text-[#808080]">&lt;/</span><span className="text-[#569cd6]">div</span><span className="text-[#808080]">&gt;</span>
    </>,
    <>
      {"  "}<span className="text-[#8b949e]">);</span>
    </>,
    <>
      <span className="text-[#8b949e]">{'}'}</span>
    </>,
  ];

  return (
    <div className="space-y-0.5">
      {lines.map((line, idx) => (
        <CodeLine key={idx} num={idx + 1} isWrapped={isWrapped}>
          {line}
        </CodeLine>
      ))}
    </div>
  );
}

function NativeCodeHighlighted({ isWrapped }: { isWrapped: boolean }) {
  const lines = [
    <>
      <span className="text-[#ff7b72] font-medium">import</span> <span className="text-[#4ec9b0] font-medium">React</span> <span className="text-[#ff7b72] font-medium">from</span> <span className="text-[#ce9178]">"react"</span><span className="text-[#8b949e]">;</span>
    </>,
    <>
      <span className="text-[#ff7b72] font-medium">import</span> <span className="text-[#8b949e]">{'{'}</span> <span className="text-[#4ec9b0] font-medium">View</span><span className="text-[#8b949e]">,</span> <span className="text-[#4ec9b0] font-medium">TextInput</span> <span className="text-[#8b949e]">{'}'}</span> <span className="text-[#ff7b72] font-medium">from</span> <span className="text-[#ce9178]">"react-native"</span><span className="text-[#8b949e]">;</span>
    </>,
    <>
      <span className="text-[#ff7b72] font-medium">import</span> <span className="text-[#8b949e]">{'{'}</span> <span className="text-[#4ec9b0] font-medium">PXIconSearch</span><span className="text-[#8b949e]">,</span> <span className="text-[#4ec9b0] font-medium">PXIconBell</span> <span className="text-[#8b949e]">{'}'}</span> <span className="text-[#ff7b72] font-medium">from</span> <span className="text-[#ce9178]">"@pxui/react-native"</span><span className="text-[#8b949e]">;</span>
    </>,
    <>&nbsp;</>,
    <>
      <span className="text-[#ff7b72] font-medium">export</span> <span className="text-[#ff7b72] font-medium">function</span> <span className="text-[#dcdcaa] font-semibold">MobileSearchBar</span><span className="text-[#8b949e]">() {'{'}</span>
    </>,
    <>
      {"  "}<span className="text-[#ff7b72] font-medium">return</span> <span className="text-[#8b949e]">(</span>
    </>,
    <>
      {"    "}<span className="text-[#808080]">&lt;</span><span className="text-[#4ec9b0] font-medium">View</span> <span className="text-[#9cdcfe]">style</span><span className="text-[#8b949e]">={'{'}{'{'}</span> <span className="text-[#9cdcfe]">flexDirection</span><span className="text-[#8b949e]">:</span> <span className="text-[#ce9178]">"row"</span><span className="text-[#8b949e]">,</span> <span className="text-[#9cdcfe]">alignItems</span><span className="text-[#8b949e]">:</span> <span className="text-[#ce9178]">"center"</span><span className="text-[#8b949e]">,</span> <span className="text-[#9cdcfe]">padding</span><span className="text-[#8b949e]">:</span> <span className="text-[#b5cea8]">8</span> <span className="text-[#8b949e]">{'}'}{'}'}</span><span className="text-[#808080]">&gt;</span>
    </>,
    <>
      {"      "}<span className="text-[#808080]">&lt;</span><span className="text-[#4ec9b0] font-medium">PXIconSearch</span> <span className="text-[#9cdcfe]">size</span><span className="text-[#8b949e]">={'{'}</span><span className="text-[#b5cea8]">20</span><span className="text-[#8b949e]">{'}'}</span> <span className="text-[#9cdcfe]">color</span><span className="text-[#8b949e]">=</span><span className="text-[#ce9178]">"#6c6a64"</span> <span className="text-[#808080]">/&gt;</span>
    </>,
    <>
      {"      "}<span className="text-[#808080]">&lt;</span><span className="text-[#4ec9b0] font-medium">TextInput</span> <span className="text-[#9cdcfe]">placeholder</span><span className="text-[#8b949e]">=</span><span className="text-[#ce9178]">"Search..."</span> <span className="text-[#9cdcfe]">style</span><span className="text-[#8b949e]">={'{'}{'{'}</span> <span className="text-[#9cdcfe]">flex</span><span className="text-[#8b949e]">:</span> <span className="text-[#b5cea8]">1</span><span className="text-[#8b949e]">,</span> <span className="text-[#9cdcfe]">marginHorizontal</span><span className="text-[#8b949e]">:</span> <span className="text-[#b5cea8]">8</span> <span className="text-[#8b949e]">{'}'}{'}'}</span> <span className="text-[#808080]">/&gt;</span>
    </>,
    <>
      {"      "}<span className="text-[#808080]">&lt;</span><span className="text-[#4ec9b0] font-medium">PXIconBell</span> <span className="text-[#9cdcfe]">size</span><span className="text-[#8b949e]">={'{'}</span><span className="text-[#b5cea8]">20</span><span className="text-[#8b949e]">{'}'}</span> <span className="text-[#9cdcfe]">color</span><span className="text-[#8b949e]">=</span><span className="text-[#ce9178]">"#cc785c"</span> <span className="text-[#808080]">/&gt;</span>
    </>,
    <>
      {"    "}<span className="text-[#808080]">&lt;/</span><span className="text-[#4ec9b0] font-medium">View</span><span className="text-[#808080]">&gt;</span>
    </>,
    <>
      {"  "}<span className="text-[#8b949e]">);</span>
    </>,
    <>
      <span className="text-[#8b949e]">{'}'}</span>
    </>,
  ];

  return (
    <div className="space-y-0.5">
      {lines.map((line, idx) => (
        <CodeLine key={idx} num={idx + 1} isWrapped={isWrapped}>
          {line}
        </CodeLine>
      ))}
    </div>
  );
}

function CliCodeHighlighted({ isWrapped }: { isWrapped: boolean }) {
  const lines = [
    <>
      <span className="text-[#6e7681] italic"># 1. Install core React icon package</span>
    </>,
    <>
      <span className="text-[#ff7b72] font-medium">pnpm</span> <span className="text-[#9cdcfe]">add</span> <span className="text-[#4ec9b0] font-medium">@pxui/react</span>
    </>,
    <>&nbsp;</>,
    <>
      <span className="text-[#6e7681] italic"># 2. Or add individual component recipes via CLI</span>
    </>,
    <>
      <span className="text-[#ff7b72] font-medium">npx</span> <span className="text-[#4ec9b0] font-medium">@pxui/cli</span> <span className="text-[#9cdcfe]">add</span> <span className="text-[#ce9178]">search-bar</span>
    </>,
    <>&nbsp;</>,
    <>
      <span className="text-[#6e7681] italic"># 3. Import and render with zero-bloat path primitives</span>
    </>,
    <>
      <span className="text-[#ff7b72] font-medium">import</span> <span className="text-[#8b949e]">{'{'}</span> <span className="text-[#4ec9b0] font-medium">PXIconSearch</span> <span className="text-[#8b949e]">{'}'}</span> <span className="text-[#ff7b72] font-medium">from</span> <span className="text-[#ce9178]">"@pxui/react"</span><span className="text-[#8b949e]">;</span>
    </>,
  ];

  return (
    <div className="space-y-0.5">
      {lines.map((line, idx) => (
        <CodeLine key={idx} num={idx + 1} isWrapped={isWrapped}>
          {line}
        </CodeLine>
      ))}
    </div>
  );
}

export function DeveloperSection() {
  const [activeTab, setActiveTab] = React.useState<"react" | "native" | "cli">("react");
  const [viewMode, setViewMode] = React.useState<"code" | "preview">("code");
  const [isWordWrap, setIsWordWrap] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isBellRinging, setIsBellRinging] = React.useState(false);
  const [bellRingCount, setBellRingCount] = React.useState(0);

  // Enable word-wrap by default on mobile screens (<768px)
  React.useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setIsWordWrap(true);
    }
  }, []);

  const getRawCode = () => {
    if (activeTab === "react") return RAW_REACT_CODE;
    if (activeTab === "native") return RAW_NATIVE_CODE;
    return RAW_CLI_CODE;
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(getRawCode());
      setCopied(true);
      toast.success("Copied snippet to clipboard");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // quiet fail
    }
  };

  const triggerBell = () => {
    setIsBellRinging(true);
    setBellRingCount((prev) => prev + 1);
    setTimeout(() => setIsBellRinging(false), 800);
  };

  return (
    <section id="developer" className="py-16 md:py-28 border-b border-[#2e2c28] bg-[#141413] text-[#faf9f5]">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl space-y-8 sm:space-y-12">
        {/* Section Header */}
        <div className="max-w-2xl space-y-2.5 sm:space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight text-[#faf9f5]">
            Designed for <span className="text-primary italic">code</span>.
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#a09d96] font-sans leading-relaxed">
            First-class TypeScript autocomplete, deterministic property contracts, and zero runtime bloat.
            Import only the standalone icons you need for pure tree-shaking in production builds.
          </p>
        </div>

        {/* Developer Code Editor Window */}
        <div className="rounded-xl border border-[#2e2c28] bg-[#181715] shadow-2xl overflow-hidden font-mono text-xs">
          {/* Top Window Navigation Bar - Responsive Stack on Mobile */}
          <div className="px-3.5 sm:px-5 py-2.5 sm:py-3 border-b border-[#252320] bg-[#1d1b18] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
            {/* Left: Window Dots & Language Tabs */}
            <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-3 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                {/* Refined Terminal / macOS Dots */}
                <div className="flex items-center gap-1.5 mr-1 sm:mr-2 shrink-0">
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]/40 shadow-xs inline-block" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]/40 shadow-xs inline-block" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27c93f] border border-[#1aab29]/40 shadow-xs inline-block" />
                </div>

                <div className="h-4 w-px bg-[#2e2c28] hidden sm:block shrink-0" />

                {/* Framework / Language Tabs */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("react");
                      setViewMode("code");
                    }}
                    className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-sm text-[11px] sm:text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeTab === "react" && viewMode === "code"
                        ? "bg-[#282622] text-[#faf9f5] border border-[#3d3a34] font-medium shadow-xs"
                        : "text-[#8e8b82] hover:text-[#faf9f5] hover:bg-[#22201d]"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4ec9b0]" />
                    <span className="hidden sm:inline">React 19 (Web)</span>
                    <span className="sm:hidden">React 19</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("native");
                      setViewMode("code");
                    }}
                    className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-sm text-[11px] sm:text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeTab === "native" && viewMode === "code"
                        ? "bg-[#282622] text-[#faf9f5] border border-[#3d3a34] font-medium shadow-xs"
                        : "text-[#8e8b82] hover:text-[#faf9f5] hover:bg-[#22201d]"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#569cd6]" />
                    <span className="hidden sm:inline">React Native (Svg)</span>
                    <span className="sm:hidden">Native</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("cli");
                      setViewMode("code");
                    }}
                    className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-sm text-[11px] sm:text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeTab === "cli" && viewMode === "code"
                        ? "bg-[#282622] text-[#faf9f5] border border-[#3d3a34] font-medium shadow-xs"
                        : "text-[#8e8b82] hover:text-[#faf9f5] hover:bg-[#22201d]"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e5c07b]" />
                    <span className="hidden sm:inline">CLI Install</span>
                    <span className="sm:hidden">CLI</span>
                  </button>
                </div>
              </div>

              {/* Code vs Live Preview Mode Switcher (Mobile placement inside top row) */}
              <div className="flex sm:hidden items-center p-0.5 rounded-sm bg-[#141413] border border-[#2e2c28] shrink-0">
                <button
                  type="button"
                  onClick={() => setViewMode("code")}
                  className={`px-2 py-0.5 text-[10px] font-mono rounded-xs transition-all cursor-pointer ${
                    viewMode === "code"
                      ? "bg-[#282622] text-[#faf9f5] font-medium shadow-xs border border-[#38352f]"
                      : "text-[#8e8b82]"
                  }`}
                >
                  Code
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("preview")}
                  className={`px-2 py-0.5 text-[10px] font-mono rounded-xs transition-all flex items-center gap-1 cursor-pointer ${
                    viewMode === "preview"
                      ? "bg-primary text-white font-medium shadow-xs"
                      : "text-[#8e8b82]"
                  }`}
                >
                  <span className={`w-1 h-1 rounded-full ${viewMode === "preview" ? "bg-white" : "bg-emerald-400"}`} />
                  <span>Preview</span>
                </button>
              </div>
            </div>

            {/* Right Controls: Desktop View Mode, Word-Wrap Toggle & Copy Button */}
            <div className="flex items-center justify-end gap-2 shrink-0">
              {/* Desktop Code vs Live Preview Switcher */}
              <div className="hidden sm:flex items-center p-0.5 rounded-sm bg-[#141413] border border-[#2e2c28]">
                <button
                  type="button"
                  onClick={() => setViewMode("code")}
                  className={`px-2.5 py-1 text-xs font-mono rounded-xs transition-all cursor-pointer ${
                    viewMode === "code"
                      ? "bg-[#282622] text-[#faf9f5] font-medium shadow-xs border border-[#38352f]"
                      : "text-[#8e8b82] hover:text-[#faf9f5]"
                  }`}
                >
                  Code
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("preview")}
                  className={`px-2.5 py-1 text-xs font-mono rounded-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                    viewMode === "preview"
                      ? "bg-primary text-white font-medium shadow-xs"
                      : "text-[#8e8b82] hover:text-[#faf9f5]"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${viewMode === "preview" ? "bg-white" : "bg-emerald-400 animate-pulse"}`} />
                  <span>Preview</span>
                </button>
              </div>

              {/* Word-Wrap Toggle Action */}
              {viewMode === "code" && (
                <button
                  type="button"
                  onClick={() => setIsWordWrap(!isWordWrap)}
                  title={isWordWrap ? "Disable word wrap" : "Enable word wrap"}
                  className={cn(
                    "h-7 px-2 sm:px-2.5 rounded-sm text-[11px] sm:text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer border",
                    isWordWrap
                      ? "bg-[#282622] text-[#faf9f5] border-[#3d3a34] shadow-2xs font-medium"
                      : "border-[#2e2c28] bg-[#252320] text-[#8e8b82] hover:text-[#faf9f5] hover:bg-[#282622]"
                  )}
                >
                  <WrapIcon className={cn("w-3 h-3 transition-colors", isWordWrap ? "text-primary" : "text-[#8e8b82]")} />
                  <span className="hidden xs:inline">Wrap</span>
                </button>
              )}

              {/* Copy Code Action Button */}
              <Button
                size="sm"
                variant="outline"
                onClick={copyCode}
                className="h-7 text-[11px] sm:text-xs font-mono rounded-sm border-[#2e2c28] bg-[#252320] hover:bg-[#2e2c28] text-[#faf9f5] gap-1.5 px-2.5 sm:px-3 shadow-xs transition-all cursor-pointer"
              >
                {copied ? (
                  <PXIconCheck size={13} className="text-[#5db872]" />
                ) : (
                  <PXIconCopy size={13} className="text-[#8e8b82]" />
                )}
                <span>{copied ? "Copied" : "Copy Code"}</span>
              </Button>
            </div>
          </div>

          {/* Sub-Header Breadcrumb / File Pill */}
          {viewMode === "code" && (
            <div className="px-3.5 sm:px-5 py-2 border-b border-[#211f1c] bg-[#151413] flex items-center justify-between text-[11px] font-mono text-[#737068]">
              <div className="flex items-center gap-2 min-w-0">
                <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#3178c6]/15 text-[#79c0ff] border border-[#3178c6]/30 shrink-0">
                  {activeTab === "cli" ? "BASH" : "TSX"}
                </span>
                <span className="text-[#a09d96] truncate text-[10px] sm:text-[11px]">
                  {activeTab === "react" ? (
                    <>
                      <span className="hidden sm:inline">src/components/</span>SearchBar.tsx
                    </>
                  ) : activeTab === "native" ? (
                    <>
                      <span className="hidden sm:inline">src/screens/</span>MobileSearchBar.tsx
                    </>
                  ) : (
                    "terminal/install.sh"
                  )}
                </span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {isWordWrap && (
                  <span className="text-[10px] text-primary/80 font-mono hidden xs:inline">
                    wrap: on
                  </span>
                )}
                <span className="text-[#524e47] text-[10px] sm:text-[11px] hidden sm:inline">
                  UTF-8 · LF
                </span>
              </div>
            </div>
          )}

          {/* Code Window with Rich Syntax Highlighting & Word-Wrap Support */}
          {viewMode === "code" ? (
            <div className="p-3.5 sm:p-5 md:p-6 overflow-x-auto select-text leading-relaxed bg-[#181715]">
              {activeTab === "react" && <ReactCodeHighlighted isWrapped={isWordWrap} />}
              {activeTab === "native" && <NativeCodeHighlighted isWrapped={isWordWrap} />}
              {activeTab === "cli" && <CliCodeHighlighted isWrapped={isWordWrap} />}
            </div>
          ) : (
            /* Interactive Live Preview Experience (Responsive on Mobile) */
            <div className="py-8 sm:py-12 px-3 sm:px-6 flex flex-col items-center justify-center min-h-[260px] sm:min-h-[300px] bg-gradient-to-b from-[#1c1b18] to-[#141413] relative">
              <div className="w-full max-w-md space-y-3 sm:space-y-4">
                <div className="text-center space-y-1">
                  <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary text-[11px] sm:text-xs font-mono font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                    Live React 19 Component
                  </div>
                  <p className="text-[11px] sm:text-xs text-[#8e8b82] font-mono">
                    Interactive rendered SearchBar with PXUI SVG primitives
                  </p>
                </div>

                {/* Rendered SearchBar */}
                <div className="flex items-center gap-2 px-3 py-2 sm:px-3.5 sm:py-2.5 border border-[#38352f] hover:border-primary/50 focus-within:border-primary bg-[#211f1c] rounded-lg shadow-xl transition-all duration-200 w-full">
                  <PXIconSearch size={18} className="text-[#8e8b82] shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search resources, icons, tokens..."
                    className="bg-transparent text-sm text-[#faf9f5] placeholder:text-[#6e6a62] outline-none flex-1 font-sans min-w-0"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="text-xs text-[#8e8b82] hover:text-[#faf9f5] font-mono px-1 transition-colors cursor-pointer"
                    >
                      esc
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={triggerBell}
                    title="Click to trigger stepped bell ring animation"
                    className="p-1 rounded hover:bg-[#2e2c28] transition-colors relative group cursor-pointer shrink-0"
                  >
                    <PXIconBell
                      size={18}
                      animated={isBellRinging}
                      className={`transition-all ${isBellRinging ? "text-primary scale-110" : "text-[#a09d96] group-hover:text-[#faf9f5]"}`}
                    />
                    {bellRingCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-primary text-white text-[9px] font-mono font-bold flex items-center justify-center rounded-full shadow-xs animate-in zoom-in-50">
                        {bellRingCount}
                      </span>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#6e6a62] px-1">
                  <span>Tap bell to test stepped animation</span>
                  <span className="text-[#8e8b82]">24×24 integer grid</span>
                </div>
              </div>
            </div>
          )}

          {/* Footer Architectural Annotations & IDE Status Bar */}
          <div className="px-3.5 sm:px-5 py-3 border-t border-[#252320] bg-[#141413] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-4 text-[11px] font-mono text-[#8e8b82]">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="flex items-center gap-1.5 text-[#faf9f5] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3178c6]" />
                TypeScript Strict
              </span>
              <span className="text-[#38352f]">·</span>
              <span className="hidden xs:inline">100% SVG path primitives</span>
              <span className="xs:hidden">SVG Primitives</span>
              <span className="text-[#38352f]">·</span>
              <span>Tree-shakeable</span>
            </div>

            <div className="flex items-center justify-between w-full sm:w-auto gap-3 pt-1.5 sm:pt-0 border-t border-[#252320]/60 sm:border-0">
              <span className="px-2 py-0.5 rounded bg-[#1d1b18] border border-[#2e2c28] text-[10px] text-[#5db872] font-mono">
                &lt; 1.1 kB gzip
              </span>
              <span className="text-primary font-mono flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                @pxui/{activeTab === "native" ? "react-native" : "react"} v1.0.0
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
