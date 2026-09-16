import { defineIcon } from "../../schemas/icon.schema";

export const copySquare = defineIcon({
  name: "PXIconCopySquare",
  slug: "px-copy-square",
  title: "Copy Square",
  description: "Pixel icon for copy; square container.",
  category: "actions-controls",
  family: "copy",
  aliases: ["duplicate-square", "clone-square", "copy-box"],
  tags: ["copy", "square", "action", "control", "ui"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M5 3h14v2h2v14h-2v2H5v-2H3V5h2V3z M10 7h7v7h-3v-2h1V9h-3v1h-2V7z M7 10h7v7H7v-7zm2 2v3h3v-3H9z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 3, minY: 3, maxX: 21, maxY: 21 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default copySquare;
