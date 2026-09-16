import { defineIcon } from "../../schemas/icon.schema";

export const shareDown = defineIcon({
  name: "PXIconShareDown",
  slug: "px-share-down",
  title: "Share Down",
  description: "Pixel icon for share; down-oriented variant.",
  category: "actions-controls",
  family: "share",
  aliases: ['send-down', 'share-below'],
  tags: ['share', 'down', 'action', 'control', 'ui'],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M11 16v2H9v2h2v2h2v-2h2v-2h-2v-2h-2z M10 2h3v3h-3z M6 11h3v3H6z M15 11h3v3h-3z M9 5h2v2H9z M8 7h2v2H8z M6 9h2v2H6z M12 5h2v2h-2z M13 7h2v2h-2z M15 9h2v2h-2z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 6, minY: 2, maxX: 18, maxY: 22 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default shareDown;
