import { defineIcon } from "../../schemas/icon.schema";

export const addSquare = defineIcon({
  name: "PXIconAddSquare",
  slug: "px-add-square",
  title: "Add Square",
  description: "Add action contained within a square module or bounded interface region.",
  category: "actions-controls",
  family: "add",
  aliases: ["plus-square", "create-square", "new-box"],
  tags: ["action", "square", "container", "create", "add"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M5 3h14v2h2v14h-2v2H5v-2H3V5h2V3z M11 7h2v3h4v2h-4v3h-2v-3H7v-2h4V7z",
        fillRule: "evenodd",
      },
    ],
    bounds: {
      minX: 3,
      minY: 3,
      maxX: 21,
      maxY: 21,
    },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default addSquare;
