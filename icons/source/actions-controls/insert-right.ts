import { defineIcon } from "../../schemas/icon.schema";

export const insertRight = defineIcon({
  name: "PXIconInsertRight",
  slug: "px-insert-right",
  title: "Insert Right",
  description: "Inserts an element immediately after or to the right of an existing element.",
  category: "actions-controls",
  family: "insert",
  aliases: ["append", "insert-after", "add-right"],
  tags: ["insert", "layout", "right", "after", "append"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M4 4h6v1h1v14h-1v1H4v-1H3V5h1V4z M16 8h2v3h3v2h-3v3h-2v-3h-3v-2h3V8z",
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

export default insertRight;
