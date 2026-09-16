"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type PackageManager = "npm" | "pnpm" | "bun" | "yarn";

export interface PackageManagerOption {
  id: PackageManager;
  label: string;
  icon: React.ComponentType<{ size?: number; colored?: boolean; className?: string }>;
}

export interface PackageManagerIconProps {
  size?: number;
  colored?: boolean;
  className?: string;
}

/**
 * Pixel-native NPM logo icon with official npm red (#cb3837)
 */
export function PXIconNpm({ size = 14, colored = true, className = "" }: PackageManagerIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill={colored ? "#cb3837" : "currentColor"}
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1 2h14v12H1V2zm2 2v8h3V6h2v6h2V4H3zm8 2v6h2V6h-2z"
      />
    </svg>
  );
}

/**
 * Pixel-native PNPM stepped cubes logo icon with official multi-tone orange/amber palette
 */
export function PXIconPnpm({ size = 14, colored = true, className = "" }: PackageManagerIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill={colored ? undefined : "currentColor"}
      className={className}
      aria-hidden="true"
    >
      {/* Top row */}
      <rect x="2" y="2" width="3.2" height="3.2" rx="0.5" fill={colored ? "#f97316" : "currentColor"} />
      <rect x="6.4" y="2" width="3.2" height="3.2" rx="0.5" fill={colored ? "#f97316" : "currentColor"} />
      {/* Middle row */}
      <rect x="6.4" y="6.4" width="3.2" height="3.2" rx="0.5" fill={colored ? "#f59e0b" : "currentColor"} />
      <rect x="10.8" y="6.4" width="3.2" height="3.2" rx="0.5" fill={colored ? "#f59e0b" : "currentColor"} />
      {/* Bottom row */}
      <rect x="2" y="10.8" width="3.2" height="3.2" rx="0.5" fill={colored ? "#ea580c" : "currentColor"} />
      <rect x="6.4" y="10.8" width="3.2" height="3.2" rx="0.5" fill={colored ? "#ea580c" : "currentColor"} />
      <rect x="10.8" y="10.8" width="3.2" height="3.2" rx="0.5" fill={colored ? "#ea580c" : "currentColor"} />
    </svg>
  );
}

/**
 * Pixel-native Bun steamed dumpling logo icon with golden bao dough color (#f59e0b)
 */
export function PXIconBun({ size = 14, colored = true, className = "" }: PackageManagerIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill={colored ? "#f59e0b" : "currentColor"}
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 1h2v2h1v1h2v1h1v1h1v4h-1v2h-1v1h-2v1H6v-1H4v-1H3v-2H2V7h1V6h1V5h2V4h1V1z M5 8h2v2H5V8zm4 0h2v2H9V8z"
      />
    </svg>
  );
}

/**
 * Pixel-native Yarn ball of yarn logo icon with official Yarn cyan-blue (#2c8ebb)
 */
export function PXIconYarn({ size = 14, colored = true, className = "" }: PackageManagerIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill={colored ? "#2c8ebb" : "currentColor"}
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 2h6v1h2v2h1v6h-1v2h-2v1H5v-1H3v-2H2V5h1V3h2V2zm1 3h4v1H6V5zm-2 3h8v1H4V8zm2 3h4v1H6v-1zm7 2h2v1h-2v-1z"
      />
    </svg>
  );
}

export const PACKAGE_MANAGERS: PackageManagerOption[] = [
  { id: "npm", label: "npm", icon: PXIconNpm },
  { id: "pnpm", label: "pnpm", icon: PXIconPnpm },
  { id: "bun", label: "bun", icon: PXIconBun },
  { id: "yarn", label: "yarn", icon: PXIconYarn },
];

export function getShadcnAddCommand(pkg: PackageManager, target: string): string {
  switch (pkg) {
    case "pnpm":
      return `pnpm dlx shadcn@latest add ${target}`;
    case "bun":
      return `bunx --bun shadcn@latest add ${target}`;
    case "yarn":
      return `npx shadcn@latest add ${target}`;
    case "npm":
    default:
      return `npx shadcn@latest add ${target}`;
  }
}

export interface PackageManagerSwitcherProps {
  activePkg: PackageManager;
  onSelect: (pkg: PackageManager) => void;
  size?: "sm" | "md";
  theme?: "dark" | "light";
  coloredIcons?: boolean;
  className?: string;
}

export function PackageManagerSwitcher({
  activePkg,
  onSelect,
  theme = "dark",
  coloredIcons = true,
  className = "",
}: PackageManagerSwitcherProps) {
  const isLight = theme === "light";

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 p-1 rounded-lg border transition-colors shadow-2xs",
        isLight
          ? "bg-[#f0ebe1] border-[#e6dfd8]"
          : "bg-[#141413] border-[#2e2c28]",
        className
      )}
    >
      {PACKAGE_MANAGERS.map((pm) => {
        const isActive = activePkg === pm.id;
        const Icon = pm.icon;

        return (
          <button
            key={pm.id}
            type="button"
            onClick={() => onSelect(pm.id)}
            className={cn(
              "inline-flex items-center gap-1.5 font-mono text-xs px-2.5 py-1 rounded-md transition-all cursor-pointer select-none",
              isActive
                ? isLight
                  ? "bg-white text-[#141413] font-semibold border border-[#e6dfd8] shadow-2xs"
                  : "bg-[#252320] text-[#faf9f5] font-semibold border border-[#383530] shadow-2xs"
                : isLight
                ? "text-[#6c6a64] hover:text-[#141413] hover:bg-[#e6dfd8]/50 border border-transparent"
                : "text-[#8e8b82] hover:text-[#faf9f5] hover:bg-[#201e1b] border border-transparent"
            )}
          >
            <Icon size={13} colored={coloredIcons} className={isActive ? "opacity-100" : "opacity-80"} />
            <span className="font-semibold">{pm.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export interface HighlightedShadcnCommandProps {
  pkg: PackageManager;
  url?: string;
  urls?: string[];
  theme?: "dark" | "light";
  className?: string;
}

export function HighlightedShadcnCommand({
  pkg,
  url,
  urls,
  theme = "dark",
  className = "",
}: HighlightedShadcnCommandProps) {
  const target = urls && urls.length > 0 ? urls.join(" ") : url || "";
  const isLight = theme === "light";

  let runner = "npx";
  const pkgAction = "shadcn@latest add";

  if (pkg === "pnpm") {
    runner = "pnpm dlx";
  } else if (pkg === "bun") {
    runner = "bunx --bun";
  } else if (pkg === "yarn") {
    runner = "npx";
  }

  return (
    <div
      className={cn(
        "font-mono text-xs select-all flex items-center gap-2 flex-wrap min-w-0 py-0.5",
        className
      )}
    >
      <span
        className={cn(
          "font-bold select-none shrink-0",
          isLight ? "text-[#cc785c]" : "text-[#cc785c]"
        )}
      >
        $
      </span>
      <span
        className={cn(
          "font-bold shrink-0",
          isLight ? "text-[#b35c00]" : "text-[#e8a55a]"
        )}
      >
        {runner}
      </span>
      <span
        className={cn(
          "font-semibold shrink-0",
          isLight ? "text-[#2e7d32]" : "text-[#5db872]"
        )}
      >
        {pkgAction}
      </span>
      <span
        className={cn(
          "break-all font-medium",
          isLight ? "text-[#141413]" : "text-[#faf9f5]"
        )}
      >
        {target}
      </span>
    </div>
  );
}

const PM_STORAGE_KEY = "pxui_preferred_pm";
const PM_EVENT = "pxui:pm-change";

function subscribePm(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }
  window.addEventListener("storage", callback);
  window.addEventListener(PM_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(PM_EVENT, callback);
  };
}

function getPmSnapshot(): PackageManager {
  if (typeof window === "undefined") return "pnpm";
  try {
    const saved = localStorage.getItem(PM_STORAGE_KEY) as PackageManager | null;
    if (saved && (saved === "pnpm" || saved === "npm" || saved === "yarn" || saved === "bun")) {
      return saved;
    }
  } catch {
    // quiet fail
  }
  return "pnpm";
}

function getPmServerSnapshot(): PackageManager {
  return "pnpm";
}

export function usePreferredPackageManager(): [PackageManager, (pm: PackageManager) => void] {
  const pm = React.useSyncExternalStore(subscribePm, getPmSnapshot, getPmServerSnapshot);

  const setPm = React.useCallback((next: PackageManager) => {
    try {
      localStorage.setItem(PM_STORAGE_KEY, next);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event(PM_EVENT));
      }
    } catch {
      // quiet fail
    }
  }, []);

  return [pm, setPm];
}

