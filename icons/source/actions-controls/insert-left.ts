import { defineIcon } from "../../schemas/icon.schema";

export const insertLeft = defineIcon({
  name: "PXIconInsertLeft",
  slug: "px-insert-left",
  title: "Insert Left",
  description: "Inserts an element immediately before or to the left of an existing element.",
  category: "actions-controls",
  family: "insert",
  aliases: ["prepend", "insert-before", "add-left"],
  tags: ["insert", "layout", "left", "before", "prepend"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M6 8h2v3h3v2H8v3H6v-3H3v-2h3V8z M14 4h6v1h1v14h-1v1h-6v-1h-1V5h1V4z",
      },
    ],
    bounds: {
      minX: 3,
      minY: 4,
      maxX: 21,
      maxY: 20,
    },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default insertLeft;
