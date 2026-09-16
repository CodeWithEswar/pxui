import { defineIcon } from "../../schemas/icon.schema";

export const shareCircle = defineIcon({
  name: "PXIconShareCircle",
  slug: "px-share-circle",
  title: "Share Circle",
  description: "Pixel icon for share; circular container.",
  category: "actions-controls",
  family: "share",
  aliases: ['send-circle', 'forward-circle', 'share-round'],
  tags: ['share', 'circle', 'action', 'control', 'ui'],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M8 2h8v1h2v1h2v1h1v3h1v8h-1v3h-1v1h-2v1h-2v1H8v-1H6v-1H4v-1H3v-3H2V8h1V5h1V4h2V3h2V2z M7 10h3v3H7z M14 6h3v3h-3z M14 15h3v3h-3z M10 9h2v2h-2z M12 7h2v2h-2z M10 12h2v2h-2z M12 14h2v2h-2z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 2, minY: 2, maxX: 22, maxY: 22 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default shareCircle;
