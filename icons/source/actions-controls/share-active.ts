import { defineIcon } from "../../schemas/icon.schema";

export const shareActive = defineIcon({
  name: "PXIconShareActive",
  slug: "px-share-active",
  title: "Share Active",
  description: "Pixel icon for share; active state.",
  category: "actions-controls",
  family: "share",
  aliases: ['shared', 'share-on'],
  tags: ['share', 'active', 'action', 'control', 'ui'],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M4 10h4v4H4z M16 4h4v4h-4z M16 16h4v4h-4z M8 10h2v2H8z M10 8h2v2h-2z M12 6h2v2h-2z M14 4h2v2h-2z M8 12h2v2H8z M10 14h2v2h-2z M12 16h2v2h-2z M14 18h2v2h-2z M10 10h4v4h-4z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 4, minY: 4, maxX: 20, maxY: 20 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default shareActive;
