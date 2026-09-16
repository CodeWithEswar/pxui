import type { Metadata } from "next";
import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/navigation/footer";

export const metadata: Metadata = {
  title: "Brand Policy & Trademarks — PXUI",
  description:
    "Guidelines regarding the treatment of third-party brand marks, trademark ownership, and PXUI logo usage.",
};

export default function BrandPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Header />
      <main className="flex-1 container mx-auto px-4 sm:px-6 max-w-4xl py-12 space-y-8 font-sans">
        <div className="space-y-2 border-b border-[#e6dfd8] dark:border-[#252320] pb-6">
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#cc785c]">
            TRADEMARK POLICY
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#141413] dark:text-[#faf9f5]">
            Brand Policy & Trademarks
          </h1>
          <p className="text-base text-[#6c6a64] dark:text-[#8e8b82]">
            Guidelines regarding the treatment of third-party brand marks, trademark ownership, and PXUI logo usage.
          </p>
        </div>

        {/* Third-Party Disclaimer */}
        <div className="p-6 rounded-2xl border border-amber-500/30 bg-amber-500/5 space-y-3 font-mono text-xs text-amber-800 dark:text-amber-200">
          <div className="font-bold text-sm uppercase">Third-Party Trademark Notice</div>
          <p className="font-sans text-xs sm:text-sm leading-relaxed">
            All brand logos, product names, service marks, and registered trademarks featured in PXUI are the property of their respective owners. They are included solely for user identification, integration badges, and navigational assistance within developer software.
          </p>
          <p className="font-sans text-xs sm:text-sm leading-relaxed">
            Use of these brand marks does not imply any affiliation with, sponsorship by, or endorsement by the trademark holders.
          </p>
        </div>

        {/* Brand Modification & Color Rules */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[#141413] dark:text-[#faf9f5]">
            Brand Modification & Color Policy
          </h2>
          <p className="text-sm text-[#6c6a64] dark:text-[#8e8b82] leading-relaxed">
            When using third-party brand icons in your applications, adhere to each company&apos;s published brand guidelines:
          </p>
          <ul className="space-y-2 text-sm text-[#6c6a64] dark:text-[#8e8b82] list-disc list-inside leading-relaxed">
            <li>Do not alter official brand silhouettes, proportions, or orientation beyond canonical rendering.</li>
            <li>Render brand marks in monochrome (using your interface text color) or strictly in their officially approved brand colors.</li>
            <li>Do not combine third-party brand marks with PXUI interface modifiers in a manner that creates confusion regarding trademark origin.</li>
          </ul>
        </div>

        {/* PXUI Logo Usage */}
        <div className="space-y-4 pt-4 border-t border-[#e6dfd8] dark:border-[#252320]">
          <h2 className="text-xl font-bold text-[#141413] dark:text-[#faf9f5]">
            PXUI Logo & Branding
          </h2>
          <p className="text-sm text-[#6c6a64] dark:text-[#8e8b82] leading-relaxed">
            The PXUI wordmark, coral locator, and architectural square mark are identity assets of PXUI. You may use them to link to pxui.dev or mention PXUI in articles, documentation, and tutorials.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
