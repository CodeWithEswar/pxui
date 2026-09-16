import { defineIcon } from "../../schemas/icon.schema";

export const copySmall = defineIcon({
  name: "PXIconCopySmall",
  slug: "px-copy-small",
  title: "Copy Small",
  description: "Pixel icon for copy; compact variant.",
  category: "actions-controls",
  family: "copy",
  aliases: ["duplicate-small", "clone-small", "copy-compact"],
  tags: ["copy", "small", "compact", "action", "control", "ui"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M9 6h9v9h-3v-2h1V8h-5v1H9V6z M6 9h9v9H6V9zm2 2v5h5v-5H8z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 6, minY: 6, maxX: 18, maxY: 18 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default copySmall;
