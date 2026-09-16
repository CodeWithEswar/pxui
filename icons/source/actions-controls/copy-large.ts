import { defineIcon } from "../../schemas/icon.schema";

export const copyLarge = defineIcon({
  name: "PXIconCopyLarge",
  slug: "px-copy-large",
  title: "Copy Large",
  description: "Pixel icon for copy; large-emphasis variant.",
  category: "actions-controls",
  family: "copy",
  aliases: ["duplicate-large", "clone-large", "copy-expanded"],
  tags: ["copy", "large", "action", "control", "ui"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M7 2h15v15h-5v-2h3V4H9v3H7V2z M2 7h15v15H2V7zm2 2v11h11V9H4z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 2, minY: 2, maxX: 22, maxY: 22 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default copyLarge;
