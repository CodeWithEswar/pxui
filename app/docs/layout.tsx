import * as React from "react";
import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/navigation/footer";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { DocsMobileNav } from "@/components/docs/docs-mobile-sheet";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Header />
      <div className="flex-1 container mx-auto px-4 sm:px-6 max-w-7xl py-8">
        <DocsMobileNav />
        <div className="flex items-start gap-12">
          {/* Left Desktop Sidebar */}
          <aside className="hidden lg:block shrink-0 sticky top-24 border-r border-[#e6dfd8] dark:border-[#252320] pr-6 pb-12">
            <DocsSidebar />
          </aside>

          {/* Center Main Article Document */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
