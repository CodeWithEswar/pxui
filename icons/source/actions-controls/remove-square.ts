import { defineIcon } from "../../schemas/icon.schema";

export const removeSquare = defineIcon({
  name: "PXIconRemoveSquare",
  slug: "px-remove-square",
  title: "Remove Square",
  description: "Removes or subtracts an item using a compact square-contained action symbol.",
  category: "actions-controls",
  family: "remove",
  aliases: ["minus-square", "subtract-square"],
  tags: ["remove", "control", "decrease", "square"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M5 3h14v2h2v14h-2v2H5v-2H3V5h2V3z M7 11h10v2H7v-2z",
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

export default removeSquare;
