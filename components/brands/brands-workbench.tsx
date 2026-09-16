"use client";

import * as React from "react";
import Link from "next/link";
import { IconDefinition } from "@/lib/icons/schema";
import { PXIconBase } from "@/components/icons/px-icon-base";
import {
  PXIconSearch,
  PXIconCopy,
  PXIconCheck,
  PXIconArrowRight,
  PXIconCode,
} from "@/components/icons";
import { SyntaxHighlighter, CodeWrapButton } from "@/components/ui/syntax-highlighter";
import { cn } from "@/lib/utils";

export interface BrandItem {
  id: string;
  name: string;
  brand: string;
  owner: string;
  officialReference: string;
  trademarkContext: string;
  colorPolicy: "monochrome-only" | "brand-color-permitted";
  officialColor: string;
  techCategory: "Developer Tools" | "Platforms" | "Design & Creative" | "Runtime & Languages";
  aliases: string[];
  introducedVersion: string;
  paths: Array<{ d: string }>;
}

export const BRAND_ITEMS: BrandItem[] = [
  {
    id: "github",
    name: "github",
    brand: "GitHub",
    owner: "GitHub, Inc. (Microsoft)",
    officialReference: "https://github.com/logos",
    trademarkContext: "Octocat and GitHub logo are registered trademarks of GitHub, Inc.",
    colorPolicy: "monochrome-only",
    officialColor: "#24292e",
    techCategory: "Developer Tools",
    aliases: ["git", "octocat", "repo", "vcs"],
    introducedVersion: "1.0.0",
    paths: [
      {
        d: "M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z",
      },
    ],
  },
  {
    id: "git",
    name: "git",
    brand: "Git",
    owner: "Software Freedom Conservancy",
    officialReference: "https://git-scm.com",
    trademarkContext: "Git and the Git logo are trademarks of Software Freedom Conservancy.",
    colorPolicy: "brand-color-permitted",
    officialColor: "#F05032",
    techCategory: "Developer Tools",
    aliases: ["vcs", "source", "version-control"],
    introducedVersion: "1.0.0",
    paths: [
      {
        d: "M19.4 10.6l-8-8a1.98 1.98 0 0 0-2.8 0L6.8 4.4l3.1 3.1a2.38 2.38 0 0 1 3 3l2.8 2.8a2.38 2.38 0 0 1 3.1 3.1 2 2 0 0 1-2.8 2.8 2.38 2.38 0 0 1-2.9-2.9l-2.7-2.7v5.2a2.38 2.38 0 0 1 .6 1.5 2 2 0 1 1-4-0c0-.6.2-1.1.6-1.5V9.4a2.38 2.38 0 0 1-.6-1.5 2 2 0 0 1 3.4-1.4l3.1-3.1L2.6 11.4a1.98 1.98 0 0 0 0 2.8l8 8a1.98 1.98 0 0 0 2.8 0l6-6a1.98 1.98 0 0 0 0-2.8l-8-8z",
      },
    ],
  },
  {
    id: "react",
    name: "react",
    brand: "React",
    owner: "Meta Platforms, Inc.",
    officialReference: "https://react.dev",
    trademarkContext: "React and the React logo are trademarks of Meta Platforms, Inc.",
    colorPolicy: "brand-color-permitted",
    officialColor: "#61DAFB",
    techCategory: "Runtime & Languages",
    aliases: ["facebook", "jsx", "framework", "frontend"],
    introducedVersion: "1.0.0",
    paths: [
      {
        d: "M12 9.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm0-7.5c-4.4 0-8 1.3-8 3 0 1.2 1.8 2.2 4.6 2.7-.4.9-.7 1.8-.8 2.8-2.6.2-4.8.9-5.8 1.9-1.3 1.3-.9 2.8.9 4.3 1.4 1.2 3.5 2.1 6.1 2.5.6.8 1.3 1.5 2 2.1-1.3 2.3-2.1 4.5-2.1 6 0 1.8 1.3 2.7 3.1 2.7 1.9 0 4-1 6-2.8.7.6 1.5 1.1 2.4 1.5 2.2.9 4.3.9 5.3-.1 1.2-1.3.8-2.8-1-4.3-1.4-1.1-3.4-2-5.9-2.4-.6-.8-1.2-1.6-1.9-2.3 1.4-2.4 2.2-4.6 2.2-6.1 0-1.8-1.4-2.7-3.2-2.7-1.9 0-4 1-5.9 2.7-.8-.6-1.6-1.1-2.5-1.5-2.2-.9-4.2-.9-5.2.1z",
      },
    ],
  },
  {
    id: "nextjs",
    name: "nextjs",
    brand: "Next.js",
    owner: "Vercel, Inc.",
    officialReference: "https://nextjs.org",
    trademarkContext: "Next.js and the Next.js logo are trademarks of Vercel, Inc.",
    colorPolicy: "monochrome-only",
    officialColor: "#000000",
    techCategory: "Developer Tools",
    aliases: ["vercel", "ssr", "react", "fullstack"],
    introducedVersion: "1.0.0",
    paths: [
      {
        d: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm3.5 14.5l-4.7-6.2v6.2H9.3V7.5h1.5l4.8 6.4V7.5h1.4v9h-1.5z",
      },
    ],
  },
  {
    id: "typescript",
    name: "typescript",
    brand: "TypeScript",
    owner: "Microsoft Corporation",
    officialReference: "https://www.typescriptlang.org",
    trademarkContext: "TypeScript is a registered trademark of Microsoft Corporation.",
    colorPolicy: "brand-color-permitted",
    officialColor: "#3178C6",
    techCategory: "Runtime & Languages",
    aliases: ["ts", "javascript", "typing", "compiler"],
    introducedVersion: "1.0.0",
    paths: [
      {
        d: "M3 3h18v18H3V3zm8.5 7.5h4v-2h-10v2h4v8h2v-8zm5.5 5.5c.6.6 1.4 1 2.3 1 1 0 1.7-.5 1.7-1.2 0-.8-.7-1.1-1.9-1.5-1.6-.6-2.6-1.3-2.6-2.8 0-1.6 1.3-2.7 3.3-2.7 1.4 0 2.4.4 3.1 1.1l-1.1 1.4c-.5-.5-1.2-.8-2-.8-1 0-1.5.5-1.5 1.1 0 .7.6 1 1.8 1.4 1.7.6 2.7 1.3 2.7 2.9 0 1.7-1.4 2.8-3.5 2.8-1.6 0-2.8-.5-3.6-1.4l1.3-1.3z",
      },
    ],
  },
  {
    id: "figma",
    name: "figma",
    brand: "Figma",
    owner: "Figma, Inc.",
    officialReference: "https://www.figma.com",
    trademarkContext: "Figma and the Figma logo are registered trademarks of Figma, Inc.",
    colorPolicy: "brand-color-permitted",
    officialColor: "#F24E1E",
    techCategory: "Design & Creative",
    aliases: ["design", "ui", "ux", "vector", "prototype"],
    introducedVersion: "1.0.0",
    paths: [
      {
        d: "M8.5 2H12v5H8.5a2.5 2.5 0 1 1 0-5zm0 5H12v5H8.5a2.5 2.5 0 1 1 0-5zm7-5a2.5 2.5 0 0 1 0 5H12V2h3.5zm0 5a2.5 2.5 0 0 1 0 5H12V7h3.5zm-7 5H12v2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 1.5-2.5z",
      },
    ],
  },
];

export function BrandsWorkbench() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const [selectedBrandId, setSelectedBrandId] = React.useState("github");
  const [copied, setCopied] = React.useState(false);
  const [codeWrapped, setCodeWrapped] = React.useState(false);

  const categories = ["All", "Developer Tools", "Platforms", "Design & Creative", "Runtime & Languages"];

  const filteredBrands = React.useMemo(() => {
    return BRAND_ITEMS.filter((item) => {
      const matchesCat = selectedCategory === "All" || item.techCategory === selectedCategory;
      if (!matchesCat) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        item.brand.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q) ||
        item.owner.toLowerCase().includes(q) ||
        item.aliases.some((a) => a.toLowerCase().includes(q))
      );
    });
  }, [selectedCategory, searchQuery]);

  const selectedBrand = React.useMemo(() => {
    return BRAND_ITEMS.find((b) => b.id === selectedBrandId) || BRAND_ITEMS[0];
  }, [selectedBrandId]);

  const reactSnippet = `import { PXIcon${selectedBrand.brand.replace(/[^a-zA-Z0-9]/g, "")} } from "@pxui/react";

export function BrandBadge() {
  return (
    <PXIcon${selectedBrand.brand.replace(/[^a-zA-Z0-9]/g, "")}
      size={24}
      aria-label="${selectedBrand.brand}"
    />
  );
}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(reactSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // quiet fail
    }
  };

  return (
    <div className="space-y-12 py-8 select-none">
      {/* 1. Brand Catalog Header & Trademark Legal Notice */}
      <section className="space-y-4 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#cc785c]/10 text-[#cc785c] font-mono text-xs font-bold uppercase tracking-wider border border-[#cc785c]/20">
          <PXIconCode size={14} />
          <span>THIRD-PARTY BRAND REGISTRY</span>
        </div>

        <h1 className="font-sans text-4xl sm:text-5xl font-bold tracking-tight text-[#141413] dark:text-[#faf9f5]">
          Brand Marks & Provenance
        </h1>

        <p className="font-sans text-base sm:text-lg text-[#6c6a64] dark:text-[#8e8b82] leading-relaxed">
          Curated technology brand marks authored on the PXUI 24×24 pixel grid. Clearly separated from original PXUI interface icons to ensure trademark transparency and compliance.
        </p>

        {/* Prominent Trademark Disclaimer per Section 11.12 & 11.51 */}
        <div className="p-4 rounded-xl border border-[#e6dfd8] dark:border-[#2e2c28] bg-white dark:bg-[#181715] font-mono text-xs text-[#6c6a64] dark:text-[#8e8b82] space-y-1.5 shadow-xs">
          <div className="flex items-center gap-2 text-[11px] text-[#cc785c] font-bold uppercase">
            <span>TRADEMARK & OWNERSHIP DISCLAIMER</span>
          </div>
          <p className="font-sans leading-relaxed text-xs">
            All third-party brand logos, trademarks, and registered marks remain the exclusive intellectual property of their respective owners. Their inclusion in PXUI is strictly for software identification, integration badges, and navigational reference. Inclusion does not imply endorsement, sponsorship, or affiliation.
          </p>
        </div>
      </section>

      {/* 2. Filters & Search Controls */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e6dfd8] dark:border-[#252320] pb-4">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto workspace-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-mono shrink-0 transition-all cursor-pointer",
                selectedCategory === cat
                  ? "bg-[#cc785c] text-white font-bold shadow-xs"
                  : "bg-white dark:bg-[#181715] border border-[#e6dfd8] dark:border-[#252320] text-[#6c6a64] dark:text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5]"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Brand Search */}
        <div className="relative w-full sm:w-72 font-mono text-xs">
          <PXIconSearch
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8e8b82]"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by brand, owner, alias..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#e6dfd8] dark:border-[#2e2c28] bg-white dark:bg-[#141413] text-[#141413] dark:text-[#faf9f5] focus:outline-none focus:ring-1 focus:ring-[#cc785c]"
          />
        </div>
      </section>

      {/* 3. Catalog Grid & Right-Hand Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Brand Cards Grid */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredBrands.map((item) => {
              const isSelected = item.id === selectedBrand.id;
              const pseudoDef: IconDefinition = {
                name: item.name,
                title: item.brand,
                introducedVersion: item.introducedVersion,
                paths: item.paths,
                grid: 24,
                category: "Brands & Technology",
                tags: item.aliases,
              };

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedBrandId(item.id)}
                  className={cn(
                    "p-5 rounded-xl border flex flex-col justify-between gap-4 cursor-pointer transition-all",
                    isSelected
                      ? "bg-white dark:bg-[#181715] border-[#cc785c] shadow-md ring-2 ring-[#cc785c]/25"
                      : "bg-white dark:bg-[#181715] border-[#e6dfd8] dark:border-[#252320] hover:border-[#cc785c]"
                  )}
                >
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className="px-1.5 py-0.5 rounded bg-[#cc785c]/10 text-[#cc785c] font-bold uppercase tracking-wider">
                      BRAND ICON
                    </span>
                    <span className="text-[#8e8b82]">{item.techCategory}</span>
                  </div>

                  <div className="flex items-center gap-4 py-2">
                    <div className="w-14 h-14 rounded-lg bg-[#faf9f5] dark:bg-[#141413] border border-[#e6dfd8] dark:border-[#252320] flex items-center justify-center shrink-0">
                      <PXIconBase
                        definition={pseudoDef}
                        size={28}
                        className="text-[#141413] dark:text-[#faf9f5]"
                      />
                    </div>

                    <div className="space-y-1 min-w-0">
                      <div className="font-sans font-bold text-base text-[#141413] dark:text-[#faf9f5] truncate">
                        {item.brand}
                      </div>
                      <div className="font-mono text-xs text-[#8e8b82] truncate">
                        {item.owner}
                      </div>
                    </div>
                  </div>

                  <div className="text-[10px] font-mono text-[#8e8b82] border-t border-[#e6dfd8] dark:border-[#252320] pt-2 flex items-center justify-between">
                    <span>{item.colorPolicy}</span>
                    <span>v{item.introducedVersion}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredBrands.length === 0 && (
            <div className="p-12 rounded-xl border border-dashed border-[#e6dfd8] dark:border-[#252320] text-center font-mono text-xs text-[#8e8b82] space-y-1">
              <div className="font-bold text-[#141413] dark:text-[#faf9f5]">No brand icons found</div>
              <div>Try searching by company name, technology keyword, or selecting &quot;All&quot;.</div>
            </div>
          )}
        </div>

        {/* Right: Brand Specification & Provenance Inspector */}
        <div className="lg:col-span-5 space-y-6 font-mono text-xs">
          <div className="rounded-2xl border border-[#e6dfd8] dark:border-[#2e2c28] bg-white dark:bg-[#181715] p-6 space-y-6 shadow-xs text-[#141413] dark:text-[#faf9f5]">
            <div className="flex items-center justify-between border-b border-[#e6dfd8] dark:border-[#2e2c28] pb-4">
              <div>
                <span className="text-[10px] text-[#cc785c] font-bold uppercase tracking-wider block">
                  PROVENANCE & METADATA
                </span>
                <h3 className="font-sans font-bold text-2xl text-[#141413] dark:text-[#faf9f5]">
                  {selectedBrand.brand}
                </h3>
              </div>

              <div className="w-12 h-12 rounded-lg bg-[#faf9f5] dark:bg-[#141413] border border-[#e6dfd8] dark:border-[#2e2c28] flex items-center justify-center">
                <PXIconBase
                  definition={{
                    name: selectedBrand.name,
                    title: selectedBrand.brand,
                    introducedVersion: selectedBrand.introducedVersion,
                    paths: selectedBrand.paths,
                    grid: 24,
                    category: "Brands & Technology",
                    tags: [],
                  }}
                  size={28}
                  className="text-[#cc785c]"
                />
              </div>
            </div>

            {/* Metadata Fields */}
            <div className="space-y-3 font-mono text-xs">
              <div>
                <span className="text-[10px] text-[#8e8b82] uppercase block">TRADEMARK OWNER</span>
                <span className="font-semibold text-[#141413] dark:text-[#faf9f5]">
                  {selectedBrand.owner}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-[#8e8b82] uppercase block">TRADEMARK CONTEXT</span>
                <p className="font-sans text-xs text-[#6c6a64] dark:text-[#8e8b82] leading-relaxed mt-0.5">
                  {selectedBrand.trademarkContext}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-2.5 rounded-lg border border-[#e6dfd8] dark:border-[#2e2c28] bg-[#faf9f5] dark:bg-[#201e1b]">
                  <span className="text-[10px] text-[#8e8b82] uppercase block">COLOR POLICY</span>
                  <span className="font-bold text-[11px] text-[#141413] dark:text-[#faf9f5] capitalize mt-0.5 block">
                    {selectedBrand.colorPolicy.replace("-", " ")}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg border border-[#e6dfd8] dark:border-[#2e2c28] bg-[#faf9f5] dark:bg-[#201e1b]">
                  <span className="text-[10px] text-[#8e8b82] uppercase block">OFFICIAL HUE</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span
                      className="w-3 h-3 rounded-xs border border-black/20 shrink-0"
                      style={{ backgroundColor: selectedBrand.officialColor }}
                    />
                    <span className="font-bold text-[11px] text-[#141413] dark:text-[#faf9f5]">
                      {selectedBrand.officialColor}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-[#8e8b82] uppercase block">OFFICIAL GUIDELINES</span>
                <a
                  href={selectedBrand.officialReference}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-[#cc785c] hover:underline truncate block mt-0.5"
                >
                  {selectedBrand.officialReference}
                </a>
              </div>
            </div>

            {/* Code Usage */}
            <div className="space-y-2 pt-2 border-t border-[#e6dfd8] dark:border-[#2e2c28]">
              <div className="flex items-center justify-between border-b border-[#e6dfd8] dark:border-[#2e2c28] pb-2 text-[10px]">
                <span className="font-bold uppercase tracking-wider text-[#cc785c]">
                  USAGE CODE
                </span>
                <div className="flex items-center gap-2">
                  <CodeWrapButton
                    wrapped={codeWrapped}
                    onToggle={() => setCodeWrapped(!codeWrapped)}
                    theme="dark"
                    size="sm"
                  />
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="text-[#cc785c] hover:underline flex items-center gap-1 cursor-pointer font-mono"
                  >
                    {copied ? (
                      <>
                        <PXIconCheck size={10} className="text-[#5db872]" />
                        <span className="text-[#5db872]">Copied!</span>
                      </>
                    ) : (
                      <>
                        <PXIconCopy size={10} />
                        <span>Copy Snippet</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className={cn("rounded-xl border border-[#2e2c28] bg-[#141413] p-3 text-[#faf9f5]", codeWrapped ? "overflow-x-hidden" : "overflow-x-auto workspace-scrollbar")}>
                <SyntaxHighlighter
                  code={reactSnippet}
                  language="tsx"
                  theme="dark"
                  showLineNumbers={false}
                  wrap={codeWrapped}
                  onWrapChange={setCodeWrapped}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
