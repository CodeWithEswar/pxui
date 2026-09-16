import { defineIcon } from "../../schemas/icon.schema";

export const shareRight = defineIcon({
  name: "PXIconShareRight",
  slug: "px-share-right",
  title: "Share Right",
  description: "Pixel icon for share; right-oriented variant.",
  category: "actions-controls",
  family: "share",
  aliases: ['send-right', 'share-forward'],
  tags: ['share', 'right', 'action', 'control', 'ui'],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M16 11h2V9h2v2h2v2h-2v2h-2v-2h-2v-2z M11 10h3v3h-3z M2 6h3v3H2z M2 15h3v3H2z M9 9h2v2H9z M7 8h2v2H7z M5 6h2v2H5z M9 12h2v2H9z M7 13h2v2H7z M5 15h2v2H5z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 2, minY: 6, maxX: 22, maxY: 18 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default shareRight;
