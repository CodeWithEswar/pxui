import * as React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/navigation/footer";
import { PlaygroundWorkbench } from "@/components/playground/playground-workbench";

export const metadata: Metadata = {
  title: "Playground — PXUI",
  description:
    "Interactive developer playground for PXUI icons. Experiment with optical sizes, live state variations, context previews, and dynamic code generation.",
  openGraph: {
    title: "Playground — PXUI",
    description:
      "Interactive developer playground for PXUI icons with live context previews and dynamic code generation.",
  },
};

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Header />
      <main className="flex-1 container mx-auto px-4 sm:px-6 max-w-7xl">
        <React.Suspense
          fallback={
            <div className="py-24 text-center font-mono text-xs text-[#8e8b82]">
              Loading Playground workbench...
            </div>
          }
        >
          <PlaygroundWorkbench />
        </React.Suspense>
      </main>
      <Footer />
    </div>
  );
}
