import { defineIcon } from "../../schemas/icon.schema";

export const shareSquare = defineIcon({
  name: "PXIconShareSquare",
  slug: "px-share-square",
  title: "Share Square",
  description: "Pixel icon for share; square container.",
  category: "actions-controls",
  family: "share",
  aliases: ['send-square', 'forward-square', 'share-box'],
  tags: ['share', 'square', 'action', 'control', 'ui'],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M5 3h14v2h2v14h-2v2H5v-2H3V5h2V3z M7 10h3v3H7z M14 6h3v3h-3z M14 15h3v3h-3z M10 9h2v2h-2z M12 7h2v2h-2z M10 12h2v2h-2z M12 14h2v2h-2z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 3, minY: 3, maxX: 21, maxY: 21 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default shareSquare;
