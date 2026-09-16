import { defineIcon } from "../../schemas/icon.schema";

export const removeCircle = defineIcon({
  name: "PXIconRemoveCircle",
  slug: "px-remove-circle",
  title: "Remove Circle",
  description: "Removal/subtraction action represented inside a circular container.",
  category: "actions-controls",
  family: "remove",
  aliases: ["minus-circle", "subtract-circle", "delete-circle"],
  tags: ["action", "circle", "container", "remove", "delete"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M8 2h8v1h2v1h2v1h1v3h1v8h-1v3h-1v1h-2v1h-2v1H8v-1H6v-1H4v-1H3v-3H2V8h1V5h1V4h2V3h2V2z M9 5h6v1h2v2h1v8h-1v2h-2v1H9v-1H7v-2H6V8h1V6h2V5z M8 11h8v2H8v-2z",
        fillRule: "evenodd",
      },
    ],
    bounds: {
      minX: 2,
      minY: 2,
      maxX: 22,
      maxY: 22,
    },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default removeCircle;
