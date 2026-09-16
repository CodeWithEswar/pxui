import { defineIcon } from "../../schemas/icon.schema";

export const copyRight = defineIcon({
  name: "PXIconCopyRight",
  slug: "px-copy-right",
  title: "Copy Right",
  description: "Pixel icon for copy; right-oriented variant.",
  category: "actions-controls",
  family: "copy",
  aliases: ["duplicate-right", "clone-right", "copy-after"],
  tags: ["copy", "right", "action", "control", "ui"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M16 11h2V9h2v2h2v2h-2v2h-2v-2h-2v-2z M10 5H2v10h4v-2H4V7h4v2h2V5z M14 9H6v10h8V9zm-2 2v6H8v-6h4z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 2, minY: 5, maxX: 22, maxY: 19 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default copyRight;
