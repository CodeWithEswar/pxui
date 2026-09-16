import { defineIcon } from "../../schemas/icon.schema";

export const copyUp = defineIcon({
  name: "PXIconCopyUp",
  slug: "px-copy-up",
  title: "Copy Up",
  description: "Pixel icon for copy; up-oriented variant.",
  category: "actions-controls",
  family: "copy",
  aliases: ["duplicate-up", "clone-up", "copy-above"],
  tags: ["copy", "up", "action", "control", "ui"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M11 8V6H9V4h2V2h2v2h2v2h-2v2h-2z M9 10h10v8h-4v-2h2v-4h-6v2H9v-4z M5 14h10v8H5v-8zm2 2v4h6v-4H7z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 5, minY: 2, maxX: 19, maxY: 22 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default copyUp;
