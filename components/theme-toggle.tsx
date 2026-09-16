"use client";

import * as React from "react";
import { PXIconSun, PXIconMoon } from "@/components/icons";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps = {}) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-md border border-border/40 shrink-0"
        disabled
      >
        <span className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="icon-sm"
      className={className || "rounded-md border border-border/80 hover:border-foreground/40 bg-background hover:bg-card shadow-2xs transition-all"}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      title={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
    >
      {resolvedTheme === "dark" ? (
        <PXIconSun size={15} className="h-3.5 w-3.5 text-[#e8a55a]" />
      ) : (
        <PXIconMoon size={15} className="h-3.5 w-3.5 text-[#141413]" />
      )}
    </Button>
  );
}
