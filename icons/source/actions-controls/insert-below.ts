import { defineIcon } from "../../schemas/icon.schema";

export const insertBelow = defineIcon({
  name: "PXIconInsertBelow",
  slug: "px-insert-below",
  title: "Insert Below",
  description: "Inserts a new element below an existing element.",
  category: "actions-controls",
  family: "insert",
  aliases: ["insert-bottom", "insert-down", "add-below"],
  tags: ["insert", "layout", "below", "bottom", "down"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M5 4h14v1h1v6h-1v1H5v-1H4V5h1V4z M11 13h2v3h3v2h-3v3h-2v-3H8v-2h3v-3z",
      },
    ],
    bounds: {
      minX: 4,
      minY: 4,
      maxX: 20,
      maxY: 21,
    },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default insertBelow;
