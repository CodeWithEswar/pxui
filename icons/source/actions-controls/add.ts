import { defineIcon } from "../../schemas/icon.schema";

export const add = defineIcon({
  name: "PXIconAdd",
  slug: "px-add",
  title: "Add",
  description: "Adds or creates a new item, record, element, or object.",
  category: "actions-controls",
  family: "add",
  aliases: ["plus", "create", "new", "insert"],
  tags: ["action", "creation", "control", "toolbar", "add"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M10 4h4v6h6v4h-6v6h-4v-6H4v-4h6V4z",
      },
    ],
    bounds: {
      minX: 4,
      minY: 4,
      maxX: 20,
      maxY: 20,
    },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default add;
