import { defineIcon } from "../../schemas/icon.schema";

export const copyLeft = defineIcon({
  name: "PXIconCopyLeft",
  slug: "px-copy-left",
  title: "Copy Left",
  description: "Pixel icon for copy; left-oriented variant.",
  category: "actions-controls",
  family: "copy",
  aliases: ["duplicate-left", "clone-left", "copy-before"],
  tags: ["copy", "left", "action", "control", "ui"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M8 11H6V9H4v2H2v2h2v2h2v-2h2v-2z M14 5h8v10h-4v-2h2V7h-4v2h-2V5z M10 9h8v10h-8V9zm2 2v6h4v-6h-4z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 2, minY: 5, maxX: 22, maxY: 19 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default copyLeft;
