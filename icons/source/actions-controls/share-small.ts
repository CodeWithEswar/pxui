import { defineIcon } from "../../schemas/icon.schema";

export const shareSmall = defineIcon({
  name: "PXIconShareSmall",
  slug: "px-share-small",
  title: "Share Small",
  description: "Pixel icon for share; compact variant.",
  category: "actions-controls",
  family: "share",
  aliases: ['send-small', 'share-compact'],
  tags: ['share', 'small', 'action', 'control', 'ui'],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M6 10h3v3H6z M15 6h3v3h-3z M15 15h3v3h-3z M9 9h2v2H9z M11 8h2v2h-2z M13 6h2v2h-2z M9 12h2v2H9z M11 13h2v2h-2z M13 15h2v2h-2z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 6, minY: 6, maxX: 18, maxY: 18 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default shareSmall;
