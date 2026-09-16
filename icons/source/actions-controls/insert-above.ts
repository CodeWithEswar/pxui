import { defineIcon } from "../../schemas/icon.schema";

export const insertAbove = defineIcon({
  name: "PXIconInsertAbove",
  slug: "px-insert-above",
  title: "Insert Above",
  description: "Inserts a new element above an existing element.",
  category: "actions-controls",
  family: "insert",
  aliases: ["insert-top", "insert-up", "add-above"],
  tags: ["insert", "layout", "above", "top", "up"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M11 3h2v3h3v2h-3v3h-2V8H8V6h3V3z M5 13h14v1h1v6h-1v1H5v-1H4v-6h1v-1z",
      },
    ],
    bounds: {
      minX: 4,
      minY: 3,
      maxX: 20,
      maxY: 21,
    },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default insertAbove;
