import { defineIcon } from "../../schemas/icon.schema";

export const shareLarge = defineIcon({
  name: "PXIconShareLarge",
  slug: "px-share-large",
  title: "Share Large",
  description: "Pixel icon for share; large-emphasis variant.",
  category: "actions-controls",
  family: "share",
  aliases: ['send-large', 'share-expanded'],
  tags: ['share', 'large', 'action', 'control', 'ui'],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M2 9h5v5H2V9zm15-7h5v5h-5V2zm0 15h5v5h-5v-5z M7 10h2v2H7v-2zm2-2h2v2H9V8zm2-2h2v2h-2V6zm2-2h2v2h-2V4zm2-2h2v2h-2V2z M7 12h2v2H7v-2zm2 2h2v2H9v-2zm2 2h2v2h-2v-2zm2 2h2v2h-2v-2zm2 2h2v2h-2v-2z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 2, minY: 2, maxX: 22, maxY: 22 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default shareLarge;
