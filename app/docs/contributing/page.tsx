import type { Metadata } from "next";
import { DocsToc } from "@/components/docs/docs-toc";
import { SyntaxHighlighter } from "@/components/ui/syntax-highlighter";

export const metadata: Metadata = {
  title: "Contributing Guide — PXUI",
  description:
    "How to contribute icons, maintain geometry hygiene, adhere to canonical source rules, and run quality gates.",
};

const tocItems = [
  { id: "overview", title: "Contributing to PXUI" },
  { id: "canonical-source-rule", title: "Canonical Source Rule" },
  { id: "naming-conventions", title: "Naming Standards" },
  { id: "validation-commands", title: "Validation Commands" },
  { id: "pull-request-flow", title: "Pull Request Checklist" },
];

export default function ContributingDocsPage() {
  return (
    <div className="flex items-start gap-12">
      <article className="flex-1 min-w-0 space-y-10 font-sans pb-16">
        {/* Header */}
        <div id="overview" className="space-y-3 border-b border-[#e6dfd8] dark:border-[#252320] pb-6">
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#cc785c]">
            DEVELOPER GOVERNANCE
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#141413] dark:text-[#faf9f5]">
            Contributing Guide
          </h1>
          <p className="text-base sm:text-lg text-[#6c6a64] dark:text-[#8e8b82] leading-relaxed">
            PXUI uses a compiler-governed release pipeline. Follow these strict contribution rules to ensure geometry integrity and multi-platform parity.
          </p>
        </div>

        {/* 1. Canonical Source Rule */}
        <section id="canonical-source-rule" className="space-y-4">
          <h2 className="text-2xl font-bold text-[#141413] dark:text-[#faf9f5]">
            1. Canonical Source Only
          </h2>
          <div className="p-4 rounded-xl border border-amber-500/40 bg-amber-500/10 font-mono text-xs text-amber-700 dark:text-amber-300 space-y-1">
            <span className="font-bold uppercase">CRITICAL CONTRIBUTION CONTRACT</span>
            <p className="font-sans text-xs leading-relaxed">
              Contributors must ONLY author icons in <code className="font-mono text-[11px]">icons/source/*.ts</code>. NEVER manually edit generated React components, Native wrappers, SVG output, search indices, or Registry JSON files. All artifacts are derived deterministically by the compiler.
            </p>
          </div>
        </section>

        {/* 2. Naming Standards */}
        <section id="naming-conventions" className="space-y-4">
          <h2 className="text-2xl font-bold text-[#141413] dark:text-[#faf9f5]">
            2. Naming Standards
          </h2>
          <p className="text-sm text-[#6c6a64] dark:text-[#8e8b82] leading-relaxed">
            PXUI enforces strict mathematical naming derivations across all packages:
          </p>

          <div className="rounded-xl border border-[#e6dfd8] dark:border-[#252320] divide-y divide-[#e6dfd8] dark:divide-[#252320] font-mono text-xs bg-white dark:bg-[#181715]">
            <div className="p-3 flex items-center justify-between">
              <span className="text-[#8e8b82]">Canonical Kebab Name</span>
              <code className="text-[#141413] dark:text-[#faf9f5] font-bold">calendar-clock</code>
            </div>
            <div className="p-3 flex items-center justify-between">
              <span className="text-[#8e8b82]">React Component Export</span>
              <code className="text-[#cc785c] font-bold">PXIconCalendarClock</code>
            </div>
            <div className="p-3 flex items-center justify-between">
              <span className="text-[#8e8b82]">Registry File Artifact</span>
              <code className="text-[#5db872] font-bold">px-calendar-clock.json</code>
            </div>
          </div>

          <p className="text-xs text-[#8e8b82] font-mono">
            Never author non-standard prefixes such as <code className="line-through text-red-500">PixelCalendarClock</code>, <code className="line-through text-red-500">PXCalendarClock</code>, or <code className="line-through text-red-500">CalendarClockIcon</code>.
          </p>
        </section>

        {/* 3. Validation Commands */}
        <section id="validation-commands" className="space-y-4">
          <h2 className="text-2xl font-bold text-[#141413] dark:text-[#faf9f5]">
            3. Validation Commands
          </h2>
          <p className="text-sm text-[#6c6a64] dark:text-[#8e8b82]">
            Before submitting a pull request, run the compiler and validation suites locally:
          </p>

          <div className="rounded-xl border border-[#2e2c28] bg-[#141413] p-4 text-[#faf9f5] font-mono text-xs">
            <SyntaxHighlighter
              code={`# 1. Run all automated tests and quality gates
npm test

# 2. Typecheck TypeScript across workspace
npx tsc --noEmit`}
              language="bash"
              theme="dark"
              showWrapToggle={true}
            />
          </div>
        </section>

        {/* 4. Pull Request Flow */}
        <section id="pull-request-flow" className="space-y-4">
          <h2 className="text-2xl font-bold text-[#141413] dark:text-[#faf9f5]">
            4. Pull Request Checklist
          </h2>
          <ul className="space-y-2 font-mono text-xs text-[#6c6a64] dark:text-[#8e8b82] list-disc list-inside">
            <li>Icon fits within 24×24 integer coordinate boundaries.</li>
            <li>No fractional coordinates or subpixel offsets.</li>
            <li>Contains accurate metadata: title, description, category, and search tags.</li>
            <li>All contract gate tests pass cleanly in CI.</li>
          </ul>
        </section>
      </article>

      <DocsToc items={tocItems} />
    </div>
  );
}
