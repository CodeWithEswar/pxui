import { defineIcon } from "../../schemas/icon.schema";

export const copyCircle = defineIcon({
  name: "PXIconCopyCircle",
  slug: "px-copy-circle",
  title: "Copy Circle",
  description: "Pixel icon for copy; circular container.",
  category: "actions-controls",
  family: "copy",
  aliases: ["duplicate-circle", "clone-circle", "copy-round"],
  tags: ["copy", "circle", "action", "control", "ui"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M8 2h8v1h2v1h2v1h1v3h1v8h-1v3h-1v1h-2v1h-2v1H8v-1H6v-1H4v-1H3v-3H2V8h1V5h1V4h2V3h2V2z M10 7h7v7h-3v-2h1V9h-3v1h-2V7z M7 10h7v7H7v-7zm2 2v3h3v-3H9z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 2, minY: 2, maxX: 22, maxY: 22 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default copyCircle;
