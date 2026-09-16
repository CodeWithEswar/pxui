import { defineIcon } from "../../schemas/icon.schema";

export const shareUp = defineIcon({
  name: "PXIconShareUp",
  slug: "px-share-up",
  title: "Share Up",
  description: "Pixel icon for share; up-oriented variant.",
  category: "actions-controls",
  family: "share",
  aliases: ['send-up', 'share-above'],
  tags: ['share', 'up', 'action', 'control', 'ui'],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M11 8V6H9V4h2V2h2v2h2v2h-2v2h-2z M10 19h3v3h-3z M6 10h3v3H6z M15 10h3v3h-3z M9 17h2v2H9z M8 15h2v2H8z M6 13h2v2H6z M12 17h2v2h-2z M13 15h2v2h-2z M15 13h2v2h-2z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 6, minY: 2, maxX: 18, maxY: 22 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default shareUp;
