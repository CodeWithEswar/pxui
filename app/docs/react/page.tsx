import type { Metadata } from "next";
import { DocsToc } from "@/components/docs/docs-toc";
import { SyntaxHighlighter } from "@/components/ui/syntax-highlighter";

export const metadata: Metadata = {
  title: "React Integration — PXUI",
  description:
    "Complete reference for using PXUI icons in React 19, Next.js App Router, Server Components, and client bundles.",
};

const tocItems = [
  { id: "overview", title: "React Integration" },
  { id: "imports", title: "Imports & Tree Shaking" },
  { id: "props-reference", title: "Props Reference" },
  { id: "sizing-color", title: "Sizing & Color" },
  { id: "server-components", title: "Server Components & SSR" },
  { id: "typescript", title: "TypeScript Types" },
];

export default function ReactDocsPage() {
  return (
    <div className="flex items-start gap-12">
      <article className="flex-1 min-w-0 space-y-10 font-sans pb-16">
        {/* Header */}
        <div id="overview" className="space-y-3 border-b border-[#e6dfd8] dark:border-[#252320] pb-6">
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#cc785c]">
            FRAMEWORK REFERENCE
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#141413] dark:text-[#faf9f5]">
            React Integration
          </h1>
          <p className="text-base sm:text-lg text-[#6c6a64] dark:text-[#8e8b82] leading-relaxed">
            PXUI components are authored as pure React 19 forward-ref SVG primitives. They support tree shaking, Server Components, and zero runtime dependencies.
          </p>
        </div>

        {/* 1. Imports & Tree Shaking */}
        <section id="imports" className="space-y-4">
          <h2 className="text-2xl font-bold text-[#141413] dark:text-[#faf9f5]">
            Imports & Tree Shaking
          </h2>
          <p className="text-sm text-[#6c6a64] dark:text-[#8e8b82] leading-relaxed">
            Every PXUI component is packaged with <code className="font-mono text-xs text-[#cc785c]">&quot;sideEffects&quot;: false</code>. You can safely import directly from the root package without including the entire library in your bundle:
          </p>

          <div className="rounded-xl border border-[#2e2c28] bg-[#141413] p-4 text-[#faf9f5] font-mono text-xs">
            <SyntaxHighlighter
              code={`// Recommended: Named import from package root
import { PXIconHome, PXIconSearch, PXIconBell } from "@pxui/react";`}
              language="tsx"
              theme="dark"
              showWrapToggle={true}
            />
          </div>

          <p className="text-xs text-[#8e8b82] font-mono">
            Modern bundlers (Turbopack, Vite, Webpack 5, Rollup) automatically eliminate unused icons during production builds.
          </p>
        </section>

        {/* 2. Props Reference */}
        <section id="props-reference" className="space-y-4">
          <h2 className="text-2xl font-bold text-[#141413] dark:text-[#faf9f5]">
            Props Reference
          </h2>
          <p className="text-sm text-[#6c6a64] dark:text-[#8e8b82]">
            All icons accept standard SVG attributes along with the following PXUI props:
          </p>

          <div className="rounded-xl border border-[#e6dfd8] dark:border-[#252320] overflow-hidden font-mono text-xs">
            <table className="w-full text-left">
              <thead className="bg-[#faf9f5] dark:bg-[#141413] border-b border-[#e6dfd8] dark:border-[#252320] text-[#8e8b82]">
                <tr>
                  <th className="p-3">Prop</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Default</th>
                  <th className="p-3 font-sans">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e6dfd8] dark:divide-[#252320] bg-white dark:bg-[#181715]">
                <tr>
                  <td className="p-3 text-[#cc785c] font-bold">size</td>
                  <td className="p-3">number | string</td>
                  <td className="p-3">24</td>
                  <td className="p-3 font-sans text-[#6c6a64] dark:text-[#8e8b82]">Dimensions in pixels (width and height).</td>
                </tr>
                <tr>
                  <td className="p-3 text-[#cc785c] font-bold">color</td>
                  <td className="p-3">string</td>
                  <td className="p-3">&quot;currentColor&quot;</td>
                  <td className="p-3 font-sans text-[#6c6a64] dark:text-[#8e8b82]">Fill color of the icon paths.</td>
                </tr>
                <tr>
                  <td className="p-3 text-[#cc785c] font-bold">filled</td>
                  <td className="p-3">boolean</td>
                  <td className="p-3">false</td>
                  <td className="p-3 font-sans text-[#6c6a64] dark:text-[#8e8b82]">Renders solid filled variant when available.</td>
                </tr>
                <tr>
                  <td className="p-3 text-[#cc785c] font-bold">animated</td>
                  <td className="p-3">boolean</td>
                  <td className="p-3">false</td>
                  <td className="p-3 font-sans text-[#6c6a64] dark:text-[#8e8b82]">Activates stepped CSS animation.</td>
                </tr>
                <tr>
                  <td className="p-3 text-[#cc785c] font-bold">duration</td>
                  <td className="p-3">number</td>
                  <td className="p-3">600</td>
                  <td className="p-3 font-sans text-[#6c6a64] dark:text-[#8e8b82]">Animation cycle duration in milliseconds.</td>
                </tr>
                <tr>
                  <td className="p-3 text-[#cc785c] font-bold">aria-label</td>
                  <td className="p-3">string</td>
                  <td className="p-3">undefined</td>
                  <td className="p-3 font-sans text-[#6c6a64] dark:text-[#8e8b82]">Accessible label for semantic standalone icons.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 3. Sizing & Color */}
        <section id="sizing-color" className="space-y-4">
          <h2 className="text-2xl font-bold text-[#141413] dark:text-[#faf9f5]">
            Sizing & Color
          </h2>
          <p className="text-sm text-[#6c6a64] dark:text-[#8e8b82] leading-relaxed">
            By default, icons inherit text color through <code className="font-mono text-xs text-[#cc785c]">currentColor</code>. You can customize them using utility classes like Tailwind CSS:
          </p>

          <div className="rounded-xl border border-[#2e2c28] bg-[#141413] p-4 text-[#faf9f5] font-mono text-xs">
            <SyntaxHighlighter
              code={`// Sizing via prop or Tailwind classes
<PXIconSearch size={16} className="text-muted-foreground" />
<PXIconSearch size={24} className="text-[#cc785c]" />
<PXIconSearch size={32} className="text-emerald-500 hover:text-emerald-400" />`}
              language="tsx"
              theme="dark"
              showWrapToggle={true}
            />
          </div>
        </section>

        {/* 4. Server Components */}
        <section id="server-components" className="space-y-4">
          <h2 className="text-2xl font-bold text-[#141413] dark:text-[#faf9f5]">
            Server Components & SSR
          </h2>
          <p className="text-sm text-[#6c6a64] dark:text-[#8e8b82] leading-relaxed">
            PXUI static icons have no client state or browser APIs. They render seamlessly inside React Server Components (RSC) and generate zero hydration overhead on Next.js App Router:
          </p>

          <div className="rounded-xl border border-[#2e2c28] bg-[#141413] p-4 text-[#faf9f5] font-mono text-xs">
            <SyntaxHighlighter
              code={`// app/page.tsx (Server Component)
import { PXIconHome } from "@pxui/react";

export default function Page() {
  return (
    <header>
      <PXIconHome size={24} />
    </header>
  );
}`}
              language="tsx"
              theme="dark"
              showWrapToggle={true}
            />
          </div>
        </section>

        {/* 5. TypeScript */}
        <section id="typescript" className="space-y-4">
          <h2 className="text-2xl font-bold text-[#141413] dark:text-[#faf9f5]">
            TypeScript Types
          </h2>
          <p className="text-sm text-[#6c6a64] dark:text-[#8e8b82]">
            You can import component prop types and definition interfaces directly:
          </p>

          <div className="rounded-xl border border-[#2e2c28] bg-[#141413] p-4 text-[#faf9f5] font-mono text-xs">
            <SyntaxHighlighter
              code={`import type { PixelIconProps, IconDefinition } from "@pxui/react";

interface CustomButtonProps extends PixelIconProps {
  label: string;
}`}
              language="tsx"
              theme="dark"
              showWrapToggle={true}
            />
          </div>
        </section>
      </article>

      <DocsToc items={tocItems} />
    </div>
  );
}
