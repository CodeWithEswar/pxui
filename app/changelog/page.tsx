import type { Metadata } from "next";
import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/navigation/footer";
import { ChangelogFeed } from "@/components/changelog/changelog-feed";

export const metadata: Metadata = {
  title: "Changelog — PXUI",
  description:
    "Review release changes, newly authored icons, optical refinements, animation additions, and compiler improvements across PXUI versions.",
  openGraph: {
    title: "Changelog — PXUI",
    description: "Review release changes and newly authored icons across PXUI versions.",
  },
};

export default function ChangelogPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Header />
      <main className="flex-1 container mx-auto px-4 sm:px-6 max-w-5xl">
        <ChangelogFeed />
      </main>
      <Footer />
    </div>
  );
}
