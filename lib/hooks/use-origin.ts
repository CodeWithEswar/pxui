"use client";

import * as React from "react";

function subscribe() {
  return () => {};
}

function getSnapshot(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "https://pxui.dev";
}

function getServerSnapshot(): string {
  return process.env.NEXT_PUBLIC_REGISTRY_BASE_URL || "https://pxui.dev";
}

/**
 * SSR-safe hook to retrieve the current window origin without synchronous setState in useEffect.
 */
export function useOrigin(): string {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function getRegistryBaseUrl(): string {
  return process.env.NEXT_PUBLIC_REGISTRY_BASE_URL || (typeof window !== "undefined" ? window.location.origin : "https://pxui.dev");
}
