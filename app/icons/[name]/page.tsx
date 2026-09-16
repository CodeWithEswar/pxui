import type { Metadata } from "next";
import Link from "next/link";
import { ICONS_CATALOG } from "@/lib/icons/catalog";
import { toPXComponentName } from "@/lib/compiler";
import { SpecWorkspace } from "@/components/specification/spec-workspace";
import { PXIconArrowLeft, PXIconSearch } from "@/components/icons";

export async function generateStaticParams() {
  const params: { name: string }[] = [];
  for (const icon of ICONS_CATALOG) {
    // Support canonical px-[name] route
    params.push({ name: `px-${icon.name}` });
    // Support legacy [name] route
    params.push({ name: icon.name });
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const cleanName = name.replace(/^px-/, "");
  const icon = ICONS_CATALOG.find((i) => i.name === cleanName);

  if (!icon) {
    return {
      title: "Icon Not Found — PXUI",
      description: "The requested icon specification does not exist in the canonical PXUI catalog.",
    };
  }

  const componentName = toPXComponentName(icon.name);

  return {
    title: `${componentName} (px-${icon.name}) — PXUI Technical Specification`,
    description:
      icon.description ||
      `Inspect ${componentName} geometry, optical sizes (16-48px), React & Native usage, and shadcn Registry artifacts.`,
    keywords: [
      icon.name,
      `px-${icon.name}`,
      componentName,
      ...icon.tags,
      ...(icon.aliases || []),
      "pixel icon",
      "icon specification",
      "geometry lab",
      "shadcn registry",
    ],
    openGraph: {
      title: `${componentName} — PXUI Technical Specification`,
      description:
        icon.description ||
        `Canonical 24×24 integer specification for ${componentName} with live drafting plate, geometry lab, and optical sizes.`,
      type: "website",
    },
  };
}

export default async function IconSpecificationPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const cleanName = name.replace(/^px-/, "");
  const icon = ICONS_CATALOG.find((i) => i.name === cleanName);

  if (!icon) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#faf9f5] dark:bg-[#181715] text-[#141413] dark:text-[#faf9f5] font-mono text-center">
        <div className="w-12 h-12 bg-[#cc785c]/10 text-[#cc785c] rounded-xl flex items-center justify-center mb-6 text-xl font-bold border border-[#cc785c]/20">
          ?
        </div>
        <div className="text-[11px] font-bold text-[#cc785c] uppercase tracking-widest mb-1">
          SPECIFICATION ERROR 404
        </div>
        <h1 className="font-sans text-3xl font-bold tracking-tight mb-2">
          Icon Specification Not Found
        </h1>
        <p className="font-sans text-sm text-[#6c6a64] dark:text-[#8e8b82] max-w-md mb-8">
          The requested icon identifier <code className="font-mono text-[#cc785c] bg-[#f5f0e8] dark:bg-[#201e1b] px-1.5 py-0.5 rounded border border-[#e6dfd8] dark:border-[#2e2c28]">{name}</code> is not registered in the canonical PXUI v1.0 catalog.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/icons"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#141413] dark:bg-[#faf9f5] text-[#faf9f5] dark:text-[#141413] text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            <PXIconArrowLeft size={13} />
            <span>Return to Catalog Workspace</span>
          </Link>
          <Link
            href="/icons?search="
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#e6dfd8] dark:border-[#2e2c28] bg-white dark:bg-[#201e1b] text-xs hover:bg-[#f5f0e8] dark:hover:bg-[#282622] transition-colors"
          >
            <PXIconSearch size={13} />
            <span>Search 100+ Icons</span>
          </Link>
        </div>
      </div>
    );
  }

  return <SpecWorkspace icon={icon} allIcons={ICONS_CATALOG} />;
}
