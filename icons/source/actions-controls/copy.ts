import { defineIcon } from "../../schemas/icon.schema";

export const copy = defineIcon({
  name: "PXIconCopy",
  slug: "px-copy",
  title: "Copy",
  description: "Pixel icon for copy; base form.",
  category: "actions-controls",
  family: "copy",
  aliases: ["duplicate", "clone", "replicate", "clipboard-copy"],
  tags: ["copy", "action", "control", "ui"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M8 4h12v12h-4v-2h2V6h-8v2H8V4z M4 8h12v12H4V8zm2 2v8h8v-8H6z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 4, minY: 4, maxX: 20, maxY: 20 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default copy;
