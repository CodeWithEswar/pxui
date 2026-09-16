import fs from "fs";
import path from "path";

const searchIndex = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../lib/search/search-index.json"), "utf-8")
);

const queries = [
  { term: "plus", expectedSlug: "px-add" },
  { term: "create", expectedSlug: "px-add" },
  { term: "subtract", expectedSlug: "px-remove" },
  { term: "dismiss", expectedSlug: "px-close" },
  { term: "prepend", expectedSlug: "px-insert-left" },
  { term: "append", expectedSlug: "px-insert-right" },
];

for (const q of queries) {
  const matches = searchIndex.filter((item: any) => {
    const term = q.term.toLowerCase();
    return (
      item.slug.includes(term) ||
      (item.name && item.name.toLowerCase().includes(term)) ||
      (item.canonicalName && item.canonicalName.toLowerCase().includes(term)) ||
      (item.title && item.title.toLowerCase().includes(term)) ||
      (item.aliases && item.aliases.some((a: string) => a.toLowerCase().includes(term))) ||
      (item.tags && item.tags.some((t: string) => t.toLowerCase().includes(term))) ||
      (item.description && item.description.toLowerCase().includes(term))
    );
  });

  const hasExpected = matches.some((m: any) => m.slug === q.expectedSlug);
  console.log(`Query "${q.term}": found ${matches.length} matches. Expected ${q.expectedSlug} present? ${hasExpected}`);
  if (!hasExpected) {
    throw new Error(`Search failed for ${q.term}: expected ${q.expectedSlug}`);
  }
}

console.log("✅ All search validation checks passed!");
