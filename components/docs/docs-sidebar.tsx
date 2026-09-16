"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export interface DocsNavGroup {
  title: string;
  items: Array<{
    title: string;
    href: string;
    badge?: string;
  }>;
}

export const DOCS_NAV: DocsNavGroup[] = [
  {
    title: "GETTING STARTED",
    items: [
      { title: "Introduction & Quick Start", href: "/docs/getting-started" },
    ],
  },
  {
    title: "FRAMEWORKS",
    items: [
      { title: "React Integration", href: "/docs/react" },
      { title: "React Native & Expo", href: "/docs/react-native" },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      { title: "Animation System", href: "/docs/animation", badge: "Live" },
      { title: "Accessibility Standards", href: "/docs/accessibility" },
      { title: "Design Principles", href: "/docs/design-principles" },
    ],
  },
  {
    title: "PROJECT",
    items: [
      { title: "Contributing Guide", href: "/docs/contributing" },
      { title: "Release Changelog", href: "/changelog" },
      { title: "License Terms", href: "/legal/license" },
      { title: "Brand Policy", href: "/legal/brand-policy" },
    ],
  },
];

interface DocsSidebarProps {
  className?: string;
  onItemClick?: () => void;
}

export function DocsSidebar({ className, onItemClick }: DocsSidebarProps) {
  const pathname = usePathname();

  return (
    <nav className={cn("w-64 space-y-6 font-mono text-xs select-none", className)}>
      {DOCS_NAV.map((group) => (
        <div key={group.title} className="space-y-2">
          <div className="text-[10px] font-bold tracking-wider text-[#8e8b82] uppercase px-3">
            {group.title}
          </div>

          <div className="space-y-0.5">
            {group.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onItemClick}
                  className={cn(
                    "flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-sans transition-colors",
                    isActive
                      ? "bg-[#cc785c]/10 text-[#cc785c] font-bold border border-[#cc785c]/30"
                      : "text-[#6c6a64] dark:text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5] hover:bg-[#f5f0e8] dark:hover:bg-[#201e1b]"
                  )}
                >
                  <span>{item.title}</span>
                  {item.badge && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#cc785c] text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}
