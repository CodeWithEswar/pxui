import { defineIcon } from "../../schemas/icon.schema";

export const remove = defineIcon({
  name: "PXIconRemove",
  slug: "px-remove",
  title: "Remove",
  description: "Removes, subtracts, or decreases an item or value.",
  category: "actions-controls",
  family: "remove",
  aliases: ["minus", "subtract", "decrease", "delete"],
  tags: ["action", "subtraction", "control", "remove", "delete"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M4 10h16v4H4v-4z",
      },
    ],
    bounds: {
      minX: 4,
      minY: 10,
      maxX: 20,
      maxY: 14,
    },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default remove;
