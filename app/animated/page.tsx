import type { Metadata } from "next";
import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/navigation/footer";
import { AnimatedWorkbench } from "@/components/animated/animated-workbench";

export const metadata: Metadata = {
  title: "Animated Icons — PXUI",
  description:
    "Explore motion-enabled PXUI icons with stepped frame breakdown, state sequencers, reduced-motion controls, and zero-runtime-overhead React exports.",
  openGraph: {
    title: "Animated Icons — PXUI",
    description:
      "Explore motion-enabled PXUI icons with stepped frame breakdown and state sequencers.",
  },
};

export default function AnimatedPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Header />
      <main className="flex-1 container mx-auto px-4 sm:px-6 max-w-6xl">
        <AnimatedWorkbench />
      </main>
      <Footer />
    </div>
  );
}
