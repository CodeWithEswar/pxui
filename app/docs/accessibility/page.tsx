import type { Metadata } from "next";
import { DocsToc } from "@/components/docs/docs-toc";
import { SyntaxHighlighter } from "@/components/ui/syntax-highlighter";

export const metadata: Metadata = {
  title: "Accessibility Standards — PXUI",
  description:
    "Standards and best practices for using PXUI icons in accessible interfaces, screen readers, and icon buttons.",
};

const tocItems = [
  { id: "overview", title: "Accessibility Standards" },
  { id: "decorative", title: "Decorative Icons" },
  { id: "icon-buttons", title: "Accessible Icon Buttons" },
  { id: "standalone", title: "Semantic Standalone Icons" },
  { id: "contrast", title: "Color & Contrast" },
];

export default function AccessibilityDocsPage() {
  return (
    <div className="flex items-start gap-12">
      <article className="flex-1 min-w-0 space-y-10 font-sans pb-16">
        {/* Header */}
        <div id="overview" className="space-y-3 border-b border-[#e6dfd8] dark:border-[#252320] pb-6">
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#cc785c]">
            ACCESSIBILITY
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#141413] dark:text-[#faf9f5]">
            Accessible Icon Interfaces
          </h1>
          <p className="text-base sm:text-lg text-[#6c6a64] dark:text-[#8e8b82] leading-relaxed">
            Visual presence alone does not make an interface accessible. Learn how to configure decorative and semantic icons for assistive technologies.
          </p>
        </div>

        {/* 1. Decorative Icons */}
        <section id="decorative" className="space-y-4">
          <h2 className="text-2xl font-bold text-[#141413] dark:text-[#faf9f5]">
            Decorative Icons
          </h2>
          <p className="text-sm text-[#6c6a64] dark:text-[#8e8b82] leading-relaxed">
            When an icon is accompanied by adjacent visible text that already communicates its meaning, the icon must be hidden from screen readers to prevent redundant announcements:
          </p>

          <div className="rounded-xl border border-[#2e2c28] bg-[#141413] p-4 text-[#faf9f5] font-mono text-xs">
            <SyntaxHighlighter
              code={`// Decorative icon adjacent to visible label
<button className="flex items-center gap-2">
  <PXIconSearch aria-hidden="true" size={18} />
  <span>Search catalog</span>
</button>`}
              language="tsx"
              theme="dark"
              showWrapToggle={true}
            />
          </div>

          <p className="text-xs text-[#8e8b82] font-mono">
            PXUI automatically adds <code className="text-[#cc785c]">aria-hidden=&quot;true&quot;</code> whenever neither <code className="text-[#cc785c]">aria-label</code> nor <code className="text-[#cc785c]">title</code> is passed.
          </p>
        </section>

        {/* 2. Icon Buttons */}
        <section id="icon-buttons" className="space-y-4">
          <h2 className="text-2xl font-bold text-[#141413] dark:text-[#faf9f5]">
            Icon Buttons
          </h2>
          <p className="text-sm text-[#6c6a64] dark:text-[#8e8b82] leading-relaxed">
            Buttons that contain only an icon with no visible text MUST have an accessible name provided on the parent <code className="font-mono text-xs text-[#cc785c]">&lt;button&gt;</code> element:
          </p>

          <div className="rounded-xl border border-[#2e2c28] bg-[#141413] p-4 text-[#faf9f5] font-mono text-xs">
            <SyntaxHighlighter
              code={`// CORRECT: Accessible name on interactive button element
<button type="button" aria-label="Close modal dialog">
  <PXIconX size={18} aria-hidden="true" />
</button>

// INCORRECT: Screen readers will announce an empty button!
<button type="button">
  <PXIconX size={18} />
</button>`}
              language="tsx"
              theme="dark"
              showWrapToggle={true}
            />
          </div>
        </section>

        {/* 3. Standalone Icons */}
        <section id="standalone" className="space-y-4">
          <h2 className="text-2xl font-bold text-[#141413] dark:text-[#faf9f5]">
            Semantic Standalone Icons
          </h2>
          <p className="text-sm text-[#6c6a64] dark:text-[#8e8b82] leading-relaxed">
            When an icon conveys meaning without any adjacent text (e.g. status indicators, notification pills), pass an explicit <code className="font-mono text-xs text-[#cc785c]">aria-label</code>:
          </p>

          <div className="rounded-xl border border-[#2e2c28] bg-[#141413] p-4 text-[#faf9f5] font-mono text-xs">
            <SyntaxHighlighter
              code={`// Standalone status icon
<PXIconCheck
  size={20}
  aria-label="Deployment successful"
  className="text-emerald-500"
/>`}
              language="tsx"
              theme="dark"
              showWrapToggle={true}
            />
          </div>
        </section>

        {/* 4. Contrast */}
        <section id="contrast" className="space-y-4">
          <h2 className="text-2xl font-bold text-[#141413] dark:text-[#faf9f5]">
            Color & Contrast
          </h2>
          <p className="text-sm text-[#6c6a64] dark:text-[#8e8b82] leading-relaxed">
            Under WCAG 2.1 Level AA (Criterion 1.4.11), non-text graphical objects that convey meaningful information must maintain at least a <strong className="text-[#141413] dark:text-[#faf9f5]">3:1 contrast ratio</strong> against their adjacent background.
          </p>
        </section>
      </article>

      <DocsToc items={tocItems} />
    </div>
  );
}
