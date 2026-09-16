"use client";

import * as React from "react";

export interface GitHubStarsData {
  stars: number | null;
  formattedStars: string | null;
  repoUrl: string;
  loading: boolean;
  hasStars: boolean;
}

function formatStarCount(stars: number): string {
  if (stars >= 1000) {
    return `${(stars / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return stars.toLocaleString();
}

export function useGitHubStars(): GitHubStarsData {
  const [data, setData] = React.useState<{ stars: number | null; repoUrl: string; loading: boolean }>({
    stars: null,
    repoUrl: "https://github.com/pxui/pxui",
    loading: true,
  });

  React.useEffect(() => {
    let cancelled = false;

    async function fetchStars() {
      try {
        const res = await fetch("/api/github-stars");
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        if (!cancelled) {
          setData({
            stars: typeof json.stars === "number" ? json.stars : null,
            repoUrl: json.repoUrl || "https://github.com/pxui/pxui",
            loading: false,
          });
        }
      } catch {
        if (!cancelled) {
          setData((prev) => ({
            ...prev,
            stars: null,
            loading: false,
          }));
        }
      }
    }

    fetchStars();
    return () => {
      cancelled = true;
    };
  }, []);

  const formattedStars = data.stars !== null ? formatStarCount(data.stars) : null;

  return {
    stars: data.stars,
    formattedStars,
    repoUrl: data.repoUrl,
    loading: data.loading,
    hasStars: data.stars !== null,
  };
}
