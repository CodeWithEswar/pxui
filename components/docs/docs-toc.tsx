"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TocItem {
  id: string;
  title: string;
}

interface DocsTocProps {
  items: TocItem[];
  className?: string;
}

export function DocsToc({ items, className }: DocsTocProps) {
  const [activeId, setActiveId] = React.useState<string>(items[0]?.id || "");

  React.useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0.1 }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <aside className={cn("w-56 shrink-0 hidden xl:block font-mono text-xs select-none sticky top-24", className)}>
      <div className="text-[10px] font-bold uppercase tracking-wider text-[#8e8b82] mb-3">
        ON THIS PAGE
      </div>
      <ul className="space-y-1.5 border-l border-[#e6dfd8] dark:border-[#252320] pl-3">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  "block text-[11px] font-sans transition-colors truncate py-0.5",
                  isActive
                    ? "text-[#cc785c] font-bold"
                    : "text-[#8e8b82] hover:text-[#141413] dark:hover:text-[#faf9f5]"
                )}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
