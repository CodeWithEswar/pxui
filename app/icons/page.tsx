import type { Metadata } from "next";
import { Header } from "@/components/navigation/header";
import { WorkspaceShell } from "@/components/workspace/workspace-shell";

export const metadata: Metadata = {
  title: "Icon Workspace & Catalog — PXUI",
  description: "Fixed-height precision workspace for discovering, inspecting, scaling, and installing 100+ PXUI pixel-native icons.",
};

export default async function IconsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string; icon?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="h-dvh max-h-dvh overflow-hidden flex flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Global Application Header (fixed 64px inside shell) */}
      <Header />

      {/* Primary Fixed Application Workspace Shell */}
      <main className="flex-1 min-h-0 min-w-0 overflow-hidden flex flex-col">
        <WorkspaceShell
          initialCategory={params.category || "all"}
          initialQuery={params.search || ""}
          initialIconName={params.icon}
        />
      </main>
    </div>
  );
}
