import { defineIcon } from "../../schemas/icon.schema";

export const syncUp = defineIcon({
  name: "PXIconSyncUp",
  slug: "px-sync-up",
  title: "Sync Up",
  description: "Pixel icon for sync; up-oriented variant.",
  category: "actions-controls",
  family: "sync",
  aliases: ['sync-vertical-up', 'exchange-up'],
  tags: ['sync', 'up', 'action', 'control', 'ui'],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M11 8V6H9V4h2V2h2v2h2v2h-2v2h-2z M9 18h3v2H9v-2zm-2-4h2v4H7v-4zm-1-1h2v2H6v-2zm1-1h2v2H7v-2zm1 1h2v2H8v-2z M12 10h3v2h-3v-2zm3 4h2v3h-2v-3zm1 2h2v2h-2v-2zm-1 2h2v2h-2v-2zm-1-2h2v2h-2v-2z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 6, minY: 2, maxX: 18, maxY: 20 },
  },
  animation: {
    type: "spin",
    family: "loop",
    trigger: "always",
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default syncUp;
