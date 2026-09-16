import type { Metadata } from "next";
import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/navigation/footer";
import { RegistryWorkbench } from "@/components/registry/registry-workbench";

export const metadata: Metadata = {
  title: "Registry — PXUI",
  description:
    "Add PXUI pixel-native icons directly into your repository through the canonical shadcn Registry workflow. Zero runtime dependencies and instant local code ownership.",
  openGraph: {
    title: "Registry — PXUI",
    description:
      "Add PXUI pixel-native icons directly into your repository through the canonical shadcn Registry workflow.",
  },
};

export default function RegistryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Header />
      <main className="flex-1 container mx-auto px-4 sm:px-6 max-w-6xl">
        <RegistryWorkbench />
      </main>
      <Footer />
    </div>
  );
}
