import type { Metadata } from "next";
import { DocsToc } from "@/components/docs/docs-toc";
import { SyntaxHighlighter } from "@/components/ui/syntax-highlighter";

export const metadata: Metadata = {
  title: "Animation System — PXUI",
  description:
    "Stepped motion philosophy, keyframe state transitions, triggers, and reduced-motion standards for PXUI icons.",
};

const tocItems = [
  { id: "overview", title: "Animation Philosophy" },
  { id: "stepped-keyframes", title: "Stepped Integer Motion" },
  { id: "triggers", title: "Animation Triggers" },
  { id: "reduced-motion", title: "Reduced Motion Compliance" },
  { id: "code-usage", title: "React Component API" },
];

export default function AnimationDocsPage() {
  return (
    <div className="flex items-start gap-12">
      <article className="flex-1 min-w-0 space-y-10 font-sans pb-16">
        {/* Header */}
        <div id="overview" className="space-y-3 border-b border-[#e6dfd8] dark:border-[#252320] pb-6">
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#cc785c]">
            MOTION SYSTEM
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#141413] dark:text-[#faf9f5]">
            Animation & State Transitions
          </h1>
          <p className="text-base sm:text-lg text-[#6c6a64] dark:text-[#8e8b82] leading-relaxed">
            Motion in PXUI is designed to communicate system state transitions rather than decorate interface chrome.
          </p>
        </div>

        {/* 1. Philosophy */}
        <section id="stepped-keyframes" className="space-y-4">
          <h2 className="text-2xl font-bold text-[#141413] dark:text-[#faf9f5]">
            Stepped Integer Motion
          </h2>
          <p className="text-sm text-[#6c6a64] dark:text-[#8e8b82] leading-relaxed">
            Unlike smoothed vector animation libraries that blur pixel silhouettes across subpixels during motion, PXUI uses <code className="font-mono text-xs text-[#cc785c]">steps()</code> timing functions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 rounded-xl border border-[#e6dfd8] dark:border-[#252320] bg-white dark:bg-[#181715] space-y-2">
              <span className="font-bold text-[#cc785c]">DISCRETE 90° ROTATIONS</span>
              <p className="font-sans text-xs text-[#6c6a64] dark:text-[#8e8b82]">
                Rotations step across 0°, 90°, 180°, and 270°. Every frame aligns perfectly with the 24×24 integer pixel coordinate system.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-[#e6dfd8] dark:border-[#252320] bg-white dark:bg-[#181715] space-y-2">
              <span className="font-bold text-[#5db872]">INTEGER TRANSLATIONS</span>
              <p className="font-sans text-xs text-[#6c6a64] dark:text-[#8e8b82]">
                Bounces and vertical shifts travel strictly along whole pixel intervals (e.g. 1px, 2px, 3px), eliminating anti-aliased fuzziness.
              </p>
            </div>
          </div>
        </section>

        {/* 2. Triggers */}
        <section id="triggers" className="space-y-4">
          <h2 className="text-2xl font-bold text-[#141413] dark:text-[#faf9f5]">
            Animation Triggers
          </h2>
          <p className="text-sm text-[#6c6a64] dark:text-[#8e8b82]">
            Icons support three canonical trigger modes:
          </p>

          <div className="rounded-xl border border-[#e6dfd8] dark:border-[#252320] divide-y divide-[#e6dfd8] dark:divide-[#252320] font-mono text-xs bg-white dark:bg-[#181715]">
            <div className="p-4 space-y-1">
              <div className="font-bold text-[#cc785c]">always (continuous loop)</div>
              <p className="font-sans text-xs text-[#6c6a64] dark:text-[#8e8b82]">
                Used for indefinite asynchronous wait states, e.g. <code className="font-mono text-[11px]">loader</code> and <code className="font-mono text-[11px]">refresh</code>.
              </p>
            </div>
            <div className="p-4 space-y-1">
              <div className="font-bold text-[#cc785c]">hover / focus</div>
              <p className="font-sans text-xs text-[#6c6a64] dark:text-[#8e8b82]">
                Plays a single state cycle when the cursor hovers or keyboard focuses on the element, e.g. <code className="font-mono text-[11px]">bell</code>.
              </p>
            </div>
            <div className="p-4 space-y-1">
              <div className="font-bold text-[#cc785c]">controlled</div>
              <p className="font-sans text-xs text-[#6c6a64] dark:text-[#8e8b82]">
                Triggered explicitly by application state transitions (e.g. download complete, error confirmation).
              </p>
            </div>
          </div>
        </section>

        {/* 3. Reduced Motion */}
        <section id="reduced-motion" className="space-y-4">
          <h2 className="text-2xl font-bold text-[#141413] dark:text-[#faf9f5]">
            Reduced Motion Compliance
          </h2>
          <p className="text-sm text-[#6c6a64] dark:text-[#8e8b82] leading-relaxed">
            PXUI strictly obeys operating system accessibility preferences. When <code className="font-mono text-xs text-[#cc785c]">prefers-reduced-motion: reduce</code> is active, all continuous looping and rapid translations are immediately suppressed in CSS:
          </p>

          <div className="rounded-xl border border-[#2e2c28] bg-[#141413] p-4 text-[#faf9f5] font-mono text-xs">
            <SyntaxHighlighter
              code={`@media (prefers-reduced-motion: reduce) {
  .animate-px-spin,
  .animate-px-pulse,
  .animate-px-bounce,
  .animate-px-wiggle,
  .animate-px-blink {
    animation: none !important;
    transform: none !important;
  }
}`}
              language="tsx"
              theme="dark"
              showWrapToggle={true}
            />
          </div>
        </section>

        {/* 4. Code Usage */}
        <section id="code-usage" className="space-y-4">
          <h2 className="text-2xl font-bold text-[#141413] dark:text-[#faf9f5]">
            React Component API
          </h2>
          <div className="rounded-xl border border-[#2e2c28] bg-[#141413] p-4 text-[#faf9f5] font-mono text-xs">
            <SyntaxHighlighter
              code={`import { PXIconBell, PXIconRefresh } from "@pxui/react";

// Continuous loop for loaders
<PXIconRefresh size={24} animated duration={800} />

// Hover trigger
<PXIconBell size={24} animated trigger="hover" />`}
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
