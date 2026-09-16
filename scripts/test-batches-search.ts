import fs from "fs";
import path from "path";

const searchIndex = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../lib/search/search-index.json"), "utf-8")
);

const queries = [
  // Batch 01 queries
  { term: "plus", expectedSlug: "px-add" },
  { term: "create", expectedSlug: "px-add" },
  { term: "subtract", expectedSlug: "px-remove" },
  { term: "dismiss", expectedSlug: "px-close" },
  { term: "prepend", expectedSlug: "px-insert-left" },
  { term: "append", expectedSlug: "px-insert-right" },
  // Batch 02 queries
  { term: "decrement", expectedSlug: "px-subtract" },
  { term: "delete-row", expectedSlug: "px-remove-row" },
  { term: "delete-column", expectedSlug: "px-remove-column" },
  { term: "reset", expectedSlug: "px-clear" },
  { term: "destroy", expectedSlug: "px-delete" },
  { term: "discard", expectedSlug: "px-delete" },
  { term: "minus-square", expectedSlug: "px-remove-square" },
  { term: "reset-circle", expectedSlug: "px-clear-circle" },
  { term: "reset-square", expectedSlug: "px-clear-square" },
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

console.log("✅ All Batch 01 & 02 search validation checks passed!");
