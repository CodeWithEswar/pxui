import type { Metadata } from "next";
import Link from "next/link";
import { DocsToc } from "@/components/docs/docs-toc";
import { SyntaxHighlighter } from "@/components/ui/syntax-highlighter";
import { PXIconArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Getting Started — PXUI",
  description:
    "Get up and running with PXUI pixel-native icons in minutes via npm package or shadcn Registry workflow.",
};

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "choose-method", title: "Choose Method" },
  { id: "npm-package", title: "NPM Package Installation" },
  { id: "registry-workflow", title: "shadcn Registry Workflow" },
  { id: "first-component", title: "Your First Icon Component" },
  { id: "next-steps", title: "Next Steps" },
];

export default function GettingStartedPage() {
  return (
    <div className="flex items-start gap-12">
      <article className="flex-1 min-w-0 space-y-10 font-sans pb-16">
        {/* Header */}
        <div id="overview" className="space-y-3 border-b border-[#e6dfd8] dark:border-[#252320] pb-6">
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#cc785c]">
            GETTING STARTED
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#141413] dark:text-[#faf9f5]">
            Quick Start Guide
          </h1>
          <p className="text-base sm:text-lg text-[#6c6a64] dark:text-[#8e8b82] leading-relaxed">
            The shortest route from zero to rendered PXUI icons. Choose between the standard npm package or the shadcn Registry workflow.
          </p>
        </div>

        {/* 1. Choose Method */}
        <section id="choose-method" className="space-y-4">
          <h2 className="text-2xl font-bold text-[#141413] dark:text-[#faf9f5]">
            1. Choose Your Installation Path
          </h2>
          <p className="text-sm text-[#6c6a64] dark:text-[#8e8b82] leading-relaxed">
            PXUI supports two distinct consumption models designed to accommodate different team architectures:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-[#e6dfd8] dark:border-[#252320] bg-white dark:bg-[#181715] space-y-2">
              <div className="font-mono text-xs font-bold text-[#cc785c]">METHOD A: NPM PACKAGE</div>
              <h3 className="font-bold text-base text-[#141413] dark:text-[#faf9f5]">@pxui/react</h3>
              <p className="text-xs text-[#6c6a64] dark:text-[#8e8b82] leading-relaxed">
                Standard library dependency. Fast updates, full TypeScript types, automatic barrel tree-shaking, and zero configuration required.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-[#e6dfd8] dark:border-[#252320] bg-white dark:bg-[#181715] space-y-2">
              <div className="font-mono text-xs font-bold text-[#5db872]">METHOD B: SHADCN REGISTRY</div>
              <h3 className="font-bold text-base text-[#141413] dark:text-[#faf9f5]">Local Source Ownership</h3>
              <p className="text-xs text-[#6c6a64] dark:text-[#8e8b82] leading-relaxed">
                Add pure TSX files directly into <code className="font-mono text-[11px] text-[#cc785c]">components/pxui/</code>. Zero runtime packages, pure local ownership.
              </p>
            </div>
          </div>
        </section>

        {/* 2. NPM Package */}
        <section id="npm-package" className="space-y-4">
          <h2 className="text-2xl font-bold text-[#141413] dark:text-[#faf9f5]">
            2. Install via Package Manager
          </h2>
          <p className="text-sm text-[#6c6a64] dark:text-[#8e8b82]">
            Install the React package using your preferred package manager:
          </p>

          <div className="rounded-xl border border-[#2e2c28] bg-[#141413] p-4 text-[#faf9f5] font-mono text-xs">
            <SyntaxHighlighter code="npm install @pxui/react" language="bash" theme="dark" showWrapToggle={true} />
          </div>

          <div className="flex items-center gap-3 text-xs text-[#8e8b82] font-mono">
            <span>Also works with:</span>
            <code>pnpm add @pxui/react</code>
            <span>·</span>
            <code>yarn add @pxui/react</code>
            <span>·</span>
            <code>bun add @pxui/react</code>
          </div>
        </section>

        {/* 3. Registry Workflow */}
        <section id="registry-workflow" className="space-y-4">
          <h2 className="text-2xl font-bold text-[#141413] dark:text-[#faf9f5]">
            3. Or Add via shadcn Registry
          </h2>
          <p className="text-sm text-[#6c6a64] dark:text-[#8e8b82]">
            If you use the shadcn/ui component workflow, add individual icons directly:
          </p>

          <div className="rounded-xl border border-[#2e2c28] bg-[#141413] p-4 text-[#faf9f5] font-mono text-xs">
            <SyntaxHighlighter
              code="npx shadcn@latest add https://pxui.dev/r/px-home.json"
              language="bash"
              theme="dark"
              showWrapToggle={true}
            />
          </div>

          <p className="text-xs text-[#8e8b82] font-mono">
            This creates <code className="text-[#cc785c]">components/pxui/px-icon-home.tsx</code> and <code className="text-[#cc785c]">components/pxui/px-icon-base.tsx</code> in your repository.
          </p>
        </section>

        {/* 4. First Component */}
        <section id="first-component" className="space-y-4">
          <h2 className="text-2xl font-bold text-[#141413] dark:text-[#faf9f5]">
            4. Render Your First Component
          </h2>
          <p className="text-sm text-[#6c6a64] dark:text-[#8e8b82]">
            Import the canonical component name and render it in your React or Next.js tree:
          </p>

          <div className="rounded-xl border border-[#2e2c28] bg-[#141413] p-4 text-[#faf9f5] font-mono text-xs">
            <SyntaxHighlighter
              code={`import { PXIconHome } from "@pxui/react";

export function Header() {
  return (
    <nav className="flex items-center gap-4">
      <PXIconHome size={24} className="text-primary" />
      <span>Home</span>
    </nav>
  );
}`}
              language="tsx"
              theme="dark"
              showWrapToggle={true}
            />
          </div>
        </section>

        {/* 5. Next Steps */}
        <section id="next-steps" className="space-y-4 pt-6 border-t border-[#e6dfd8] dark:border-[#252320]">
          <h2 className="text-2xl font-bold text-[#141413] dark:text-[#faf9f5]">
            Next Steps
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            <Link
              href="/docs/react"
              className="p-4 rounded-xl border border-[#e6dfd8] dark:border-[#252320] bg-white dark:bg-[#181715] hover:border-[#cc785c] flex items-center justify-between transition-colors"
            >
              <div>
                <div className="font-bold text-[#141413] dark:text-[#faf9f5]">React Integration</div>
                <div className="text-[11px] text-[#8e8b82]">Props, sizing, tree shaking</div>
              </div>
              <PXIconArrowRight size={14} className="text-[#cc785c]" />
            </Link>

            <Link
              href="/docs/react-native"
              className="p-4 rounded-xl border border-[#e6dfd8] dark:border-[#252320] bg-white dark:bg-[#181715] hover:border-[#cc785c] flex items-center justify-between transition-colors"
            >
              <div>
                <div className="font-bold text-[#141413] dark:text-[#faf9f5]">React Native & Expo</div>
                <div className="text-[11px] text-[#8e8b82]">Cross-platform native setup</div>
              </div>
              <PXIconArrowRight size={14} className="text-[#cc785c]" />
            </Link>
          </div>
        </section>
      </article>

      <DocsToc items={tocItems} />
    </div>
  );
}
