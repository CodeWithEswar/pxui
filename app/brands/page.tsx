import type { Metadata } from "next";
import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/navigation/footer";
import { BrandsWorkbench } from "@/components/brands/brands-workbench";

export const metadata: Metadata = {
  title: "Brand Icons — PXUI",
  description:
    "Curated third-party technology brand marks authored on the PXUI 24×24 pixel grid with transparent trademark context and usage guidelines.",
  openGraph: {
    title: "Brand Icons — PXUI",
    description:
      "Curated third-party technology brand marks authored on the PXUI 24×24 pixel grid.",
  },
};

export default function BrandsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Header />
      <main className="flex-1 container mx-auto px-4 sm:px-6 max-w-6xl">
        <BrandsWorkbench />
      </main>
      <Footer />
    </div>
  );
}
