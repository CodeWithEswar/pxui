import { defineIcon } from "../../schemas/icon.schema";

export const copyActive = defineIcon({
  name: "PXIconCopyActive",
  slug: "px-copy-active",
  title: "Copy Active",
  description: "Pixel icon for copy; active state.",
  category: "actions-controls",
  family: "copy",
  aliases: ["duplicate-active", "clone-active", "copy-on", "copied"],
  tags: ["copy", "active", "action", "control", "ui"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M8 4h12v12h-4v-2h2V6h-8v2H8V4z M4 8h12v12H4V8zm2 2v8h8v-8H6zm2 2h4v4H8v-4z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 4, minY: 4, maxX: 20, maxY: 20 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default copyActive;
