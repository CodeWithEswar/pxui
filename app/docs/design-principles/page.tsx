import type { Metadata } from "next";
import { DocsToc } from "@/components/docs/docs-toc";
import { PXIconPlay } from "@/components/icons";

export const metadata: Metadata = {
  title: "Design Principles — PXUI",
  description:
    "Foundational geometry, 24×24 canonical grid, optical correction, and silhouette standards for PXUI icons.",
};

const tocItems = [
  { id: "overview", title: "Design Principles" },
  { id: "canonical-grid", title: "24×24 Canonical Grid" },
  { id: "optical-correction", title: "Optical vs Mathematical Center" },
  { id: "filled-language", title: "Filled Geometry Language" },
  { id: "pixel-hygiene", title: "Pixel Hygiene Rules" },
];

export default function DesignPrinciplesDocsPage() {
  return (
    <div className="flex items-start gap-12">
      <article className="flex-1 min-w-0 space-y-10 font-sans pb-16">
        {/* Header */}
        <div id="overview" className="space-y-3 border-b border-[#e6dfd8] dark:border-[#252320] pb-6">
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#cc785c]">
            DESIGN FOUNDRY
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#141413] dark:text-[#faf9f5]">
            Icon Design Principles
          </h1>
          <p className="text-base sm:text-lg text-[#6c6a64] dark:text-[#8e8b82] leading-relaxed">
            The mathematical and optical rules governing PXUI geometry. Why our icons maintain razor-sharp clarity at dense display scales.
          </p>
        </div>

        {/* 1. Canonical Grid */}
        <section id="canonical-grid" className="space-y-4">
          <h2 className="text-2xl font-bold text-[#141413] dark:text-[#faf9f5]">
            24×24 Canonical Grid
          </h2>
          <p className="text-sm text-[#6c6a64] dark:text-[#8e8b82] leading-relaxed">
            Every icon in PXUI is constructed strictly within a 24×24 integer coordinate space. Subpixel floating coordinates (e.g. 10.37px) are strictly forbidden:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-5 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-2">
              <span className="font-bold text-emerald-600 dark:text-emerald-400">CORRECT: INTEGER ALIGNMENT</span>
              <p className="font-sans text-xs text-[#6c6a64] dark:text-[#8e8b82]">
                Path commands land squarely on whole numbers (e.g. M4 4h16v16H4z). Borders snap precisely to physical screen pixels with zero blurring.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-red-500/30 bg-red-500/5 space-y-2">
              <span className="font-bold text-red-600 dark:text-red-400">INCORRECT: FRACTIONAL OFFSETS</span>
              <p className="font-sans text-xs text-[#6c6a64] dark:text-[#8e8b82]">
                Coordinates like 12.33px force raster engines to blend color values across multiple pixels, causing fuzzy edges and washed-out contrast.
              </p>
            </div>
          </div>
        </section>

        {/* 2. Optical Correction */}
        <section id="optical-correction" className="space-y-4">
          <h2 className="text-2xl font-bold text-[#141413] dark:text-[#faf9f5]">
            Optical vs Mathematical Center
          </h2>
          <p className="text-sm text-[#6c6a64] dark:text-[#8e8b82] leading-relaxed">
            A bounding box centered mathematically at (12, 12) often looks visually misaligned if its visual mass is asymmetric:
          </p>

          <div className="p-6 rounded-xl border border-[#e6dfd8] dark:border-[#252320] bg-white dark:bg-[#181715] flex flex-col sm:flex-row items-center justify-around gap-6">
            <div className="text-center space-y-3">
              <div className="w-24 h-24 rounded-lg bg-[#faf9f5] dark:bg-[#141413] border border-red-500/40 relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-[1px] bg-red-500/30" />
                  <div className="h-full w-[1px] bg-red-500/30 absolute" />
                </div>
                <PXIconPlay size={32} className="text-[#8e8b82]" />
              </div>
              <div className="font-mono text-xs text-red-500 font-bold">Mathematical Center</div>
              <div className="text-[11px] text-[#8e8b82] max-w-[160px]">
                Appears shifted left due to light rightward triangle apex
              </div>
            </div>

            <div className="text-center space-y-3">
              <div className="w-24 h-24 rounded-lg bg-[#faf9f5] dark:bg-[#141413] border border-emerald-500/40 relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-[1px] bg-emerald-500/30" />
                  <div className="h-full w-[1px] bg-emerald-500/30 absolute" />
                </div>
                <div className="translate-x-1">
                  <PXIconPlay size={32} className="text-[#cc785c]" />
                </div>
              </div>
              <div className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                PXUI Optical Correction (+1px)
              </div>
              <div className="text-[11px] text-[#8e8b82] max-w-[160px]">
                Visual center of gravity lands precisely on the visual midpoint
              </div>
            </div>
          </div>
        </section>

        {/* 3. Filled Language */}
        <section id="filled-language" className="space-y-4">
          <h2 className="text-2xl font-bold text-[#141413] dark:text-[#faf9f5]">
            Filled Geometry Language
          </h2>
          <p className="text-sm text-[#6c6a64] dark:text-[#8e8b82] leading-relaxed">
            PXUI treats filled silhouettes not as thick stroke fills, but as deliberate solid silhouette blocks designed to maximize high-contrast recognition in dense UI environments.
          </p>
        </section>

        {/* 4. Pixel Hygiene Rules */}
        <section id="pixel-hygiene" className="space-y-4">
          <h2 className="text-2xl font-bold text-[#141413] dark:text-[#faf9f5]">
            Pixel Hygiene Rules
          </h2>
          <ul className="space-y-2 font-mono text-xs text-[#6c6a64] dark:text-[#8e8b82] list-disc list-inside">
            <li>Minimum stroke and gap thickness is 2px at 24×24.</li>
            <li>Diagonals use 45° stepped staircases preserving crisp square blocks.</li>
            <li>Negative space gaps maintain consistent 2px separation.</li>
            <li>No duplicate or overlapping path coordinates.</li>
          </ul>
        </section>
      </article>

      <DocsToc items={tocItems} />
    </div>
  );
}
