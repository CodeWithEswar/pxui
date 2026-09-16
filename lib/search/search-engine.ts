import { IconDefinition } from "../icons/schema";

export interface SearchFilterOptions {
  query?: string;
  category?: string;
  animatedOnly?: boolean;
  filledOnly?: boolean;
}

export interface SearchResult {
  icon: IconDefinition;
  score: number;
  matchReason?: string;
}

/**
 * Hierarchical Search Engine matching Section 7.22:
 * 1. exact canonical name (100)
 * 2. exact title (90)
 * 3. exact alias (80)
 * 4. family (70)
 * 5. category (60)
 * 6. tags (50)
 * 7. description (40)
 */
export function searchIcons(
  icons: IconDefinition[],
  options: SearchFilterOptions = {}
): IconDefinition[] {
  const { query = "", category = "all", animatedOnly = false, filledOnly = false } = options;
  const q = query.trim().toLowerCase();

  const results: SearchResult[] = [];

  for (const icon of icons) {
    // Category filter
    if (category && category !== "all" && icon.category.toLowerCase() !== category.toLowerCase()) {
      continue;
    }

    // Animated filter
    if (animatedOnly && !icon.animation) {
      continue;
    }

    // Filled filter
    if (filledOnly && (!icon.filled || icon.filled.length === 0)) {
      continue;
    }

    if (!q) {
      results.push({ icon, score: 0 });
      continue;
    }

    let score = 0;
    let matchReason = "";

    const name = icon.name.toLowerCase();
    const cleanName = name.replace(/^(px-|pxicon)/, "");
    const title = (icon.title || "").toLowerCase();
    const family = (icon.family || "").toLowerCase();
    const cat = icon.category.toLowerCase();
    const aliases = (icon.aliases || []).map((a) => a.toLowerCase());
    const tags = (icon.tags || []).map((t) => t.toLowerCase());

    // 1. Exact canonical name match (Score: 100)
    if (cleanName === q || name === q || `px-${cleanName}` === q || `pxicon${cleanName}` === q) {
      score = 100;
      matchReason = "Exact canonical name";
    }
    // 2. Canonical name variant / prefix match with hyphen delimiter (Score: 95)
    // e.g. "add-circle", "add-square" for query "add"
    else if (cleanName.startsWith(q + "-") || name.startsWith(q + "-")) {
      score = 95;
      matchReason = "Canonical name variant";
    }
    // 3. Exact title match (Score: 90)
    else if (title === q) {
      score = 90;
      matchReason = "Exact title";
    }
    // 4. Title prefix match with word boundary (Score: 88)
    // e.g. "Add Circle" for "Add"
    else if (title.startsWith(q + " ")) {
      score = 88;
      matchReason = "Title prefix";
    }
    // 5. Exact alias match (Score: 80)
    // e.g. "plus" with alias "add", "trash" with alias "delete"
    else if (aliases.includes(q)) {
      score = 80;
      matchReason = `Exact alias: ${q}`;
    }
    // 6. Family exact match (Score: 75)
    else if (family && family === q) {
      score = 75;
      matchReason = `Family: ${icon.family}`;
    }
    // 7. Canonical name prefix without boundary (Score: 72)
    else if (cleanName.startsWith(q)) {
      score = 72;
      matchReason = "Prefix name";
    }
    // 8. Canonical name word-segment match (Score: 70)
    else if (cleanName.split("-").includes(q)) {
      score = 70;
      matchReason = "Name segment";
    }
    // 9. Canonical name or title substring (Score: 65)
    else if (cleanName.includes(q) || title.includes(q)) {
      score = 65;
      matchReason = "Partial name";
    }
    // 10. Alias word-segment match (Score: 60)
    // e.g. alias "add-left" matching word "add"
    else if (aliases.some((a) => a.split("-").includes(q) || a.startsWith(q + "-"))) {
      score = 60;
      matchReason = "Alias word";
    }
    // 11. General alias partial match (Score: 52)
    else if (aliases.some((a) => a.includes(q))) {
      score = 52;
      matchReason = "Partial alias";
    }
    // 12. Family partial match (Score: 48)
    else if (family && family.includes(q)) {
      score = 48;
      matchReason = `Family partial: ${icon.family}`;
    }
    // 13. Exact tag match (Score: 45)
    else if (tags.includes(q)) {
      score = 45;
      matchReason = "Matched tag";
    }
    // 14. Partial tag match (Score: 40)
    else if (tags.some((t) => t.includes(q))) {
      score = 40;
      matchReason = "Partial tag";
    }
    // 15. Category match (Score: 35)
    else if (cat === q || cat.includes(q)) {
      score = 35;
      matchReason = `Category: ${icon.category}`;
    }
    // 16. Description match (Score: 30)
    else if (icon.description && icon.description.toLowerCase().includes(q)) {
      score = 30;
      matchReason = "Description";
    }

    // 17. Multi-word query normalization (e.g. "x circle" -> "x-circle", "close sidebar" -> "close-sidebar-*")
    const qHyphen = q.replace(/\s+/g, "-");
    if (score === 0 && qHyphen !== q) {
      if (cleanName === qHyphen || name === qHyphen) {
        score = 100;
        matchReason = "Exact canonical name (hyphenated)";
      } else if (cleanName.startsWith(qHyphen + "-") || name.startsWith(qHyphen + "-")) {
        score = 95;
        matchReason = "Canonical name variant (hyphenated)";
      } else if (aliases.includes(qHyphen)) {
        score = 80;
        matchReason = `Exact alias: ${qHyphen}`;
      } else if (aliases.some((a) => a.startsWith(qHyphen + "-") || a.startsWith(qHyphen) || a.includes(qHyphen))) {
        score = 60;
        matchReason = `Alias match: ${qHyphen}`;
      } else {
        const qWords = q.split(/\s+/).filter(Boolean);
        const allMatch = qWords.every(
          (w) =>
            cleanName.includes(w) ||
            title.includes(w) ||
            aliases.some((a) => a.includes(w)) ||
            tags.some((t) => t.includes(w))
        );
        if (allMatch) {
          score = 50;
          matchReason = "Multi-word match";
        }
      }
    }

    if (score > 0) {
      results.push({ icon, score, matchReason });
    }
  }

  // Sort descending by score when query is present
  if (q) {
    results.sort((a, b) => b.score - a.score);
  }

  return results.map((r) => r.icon);
}
