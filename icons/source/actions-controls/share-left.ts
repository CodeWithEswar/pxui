import { defineIcon } from "../../schemas/icon.schema";

export const shareLeft = defineIcon({
  name: "PXIconShareLeft",
  slug: "px-share-left",
  title: "Share Left",
  description: "Pixel icon for share; left-oriented variant.",
  category: "actions-controls",
  family: "share",
  aliases: ['send-left', 'share-reverse'],
  tags: ['share', 'left', 'action', 'control', 'ui'],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M8 11H6V9H4v2H2v2h2v2h2v-2h2v-2z M10 10h3v3h-3z M19 6h3v3h-3z M19 15h3v3h-3z M13 9h2v2h-2z M15 8h2v2h-2z M17 6h2v2h-2z M13 12h2v2h-2z M15 13h2v2h-2z M17 15h2v2h-2z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 2, minY: 6, maxX: 22, maxY: 18 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default shareLeft;
