import type { Metadata } from "next";
import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/navigation/footer";

export const metadata: Metadata = {
  title: "License — PXUI",
  description:
    "Open-source software license and asset terms governing PXUI packages, compiler, and icon assets.",
};

export default function LicensePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Header />
      <main className="flex-1 container mx-auto px-4 sm:px-6 max-w-4xl py-12 space-y-8 font-sans">
        <div className="space-y-2 border-b border-[#e6dfd8] dark:border-[#252320] pb-6">
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#cc785c]">
            LEGAL & GOVERNANCE
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#141413] dark:text-[#faf9f5]">
            Open Source License
          </h1>
          <p className="text-base text-[#6c6a64] dark:text-[#8e8b82]">
            Terms governing the use of PXUI software code, component packages, and icon assets.
          </p>
        </div>

        {/* MIT License Box */}
        <div className="p-6 sm:p-8 rounded-2xl border border-[#e6dfd8] dark:border-[#252320] bg-white dark:bg-[#181715] font-mono text-xs text-[#3d3d3a] dark:text-[#d4d0c8] space-y-4 shadow-xs">
          <div className="text-sm font-bold text-[#141413] dark:text-[#faf9f5]">
            MIT License
          </div>
          <p className="text-[#8e8b82]">
            Copyright (c) {new Date().getFullYear()} PXUI Team and Contributors.
          </p>
          <p className="leading-relaxed">
            Permission is hereby granted, free of charge, to any person obtaining a copy
            of this software and associated documentation files (the &quot;Software&quot;), to deal
            in the Software without restriction, including without limitation the rights
            to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
            copies of the Software, and to permit persons to whom the Software is
            furnished to do so, subject to the following conditions:
          </p>
          <p className="leading-relaxed">
            The above copyright notice and this permission notice shall be included in all
            copies or substantial portions of the Software.
          </p>
          <p className="leading-relaxed uppercase text-[#8e8b82]">
            THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
            IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
            FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
            AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
            LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
            OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
            SOFTWARE.
          </p>
        </div>

        {/* Commercial & Usage Rights */}
        <div className="space-y-4 pt-4">
          <h2 className="text-xl font-bold text-[#141413] dark:text-[#faf9f5]">
            Commercial Use & Modification
          </h2>
          <ul className="space-y-2 text-sm text-[#6c6a64] dark:text-[#8e8b82] list-disc list-inside leading-relaxed">
            <li>You may freely use PXUI in commercial projects, SaaS products, internal tools, and open-source applications.</li>
            <li>You may customize icon geometry, stroke widths, and animations directly in your installed registry files.</li>
            <li>No attribution is required in user-facing applications (though greatly appreciated in repository credits).</li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
