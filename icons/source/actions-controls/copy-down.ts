import { defineIcon } from "../../schemas/icon.schema";

export const copyDown = defineIcon({
  name: "PXIconCopyDown",
  slug: "px-copy-down",
  title: "Copy Down",
  description: "Pixel icon for copy; down-oriented variant.",
  category: "actions-controls",
  family: "copy",
  aliases: ["duplicate-down", "clone-down", "copy-below"],
  tags: ["copy", "down", "action", "control", "ui"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M11 16v2H9v2h2v2h2v-2h2v-2h-2v-2h-2z M9 14h10V6h-4v2h2v4h-6v-2H9v4z M5 10h10V2H5v8zm2-2V4h6v4H7z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 5, minY: 2, maxX: 19, maxY: 22 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default copyDown;
