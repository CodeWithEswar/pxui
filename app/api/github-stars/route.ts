import { NextResponse } from "next/server";

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  const repo = process.env.GITHUB_REPO || process.env.NEXT_PUBLIC_GITHUB_REPO || "pxui/pxui";
  const defaultRepoUrl = `https://github.com/${repo}`;

  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "PXUI-Icon-Workspace",
    };

    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      headers,
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      // Gracefully handle rate limit, 404, or private repo: return null stars
      return NextResponse.json(
        { stars: null, repoUrl: defaultRepoUrl },
        {
          headers: {
            "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
          },
        }
      );
    }

    const data = await res.json();
    const stars = typeof data.stargazers_count === "number" ? data.stargazers_count : null;

    return NextResponse.json(
      {
        stars,
        repoUrl: data.html_url || defaultRepoUrl,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch {
    // Graceful offline/network failure: return null stars (never fake 0)
    return NextResponse.json(
      { stars: null, repoUrl: defaultRepoUrl },
      {
        headers: {
          "Cache-Control": "public, s-maxage=1800",
        },
      }
    );
  }
}
