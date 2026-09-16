import { defineIcon } from "../../schemas/icon.schema";

export const syncDown = defineIcon({
  name: "PXIconSyncDown",
  slug: "px-sync-down",
  title: "Sync Down",
  description: "Pixel icon for sync; down-oriented variant.",
  category: "actions-controls",
  family: "sync",
  aliases: ['sync-vertical-down', 'exchange-down'],
  tags: ['sync', 'down', 'action', 'control', 'ui'],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M11 16v2H9v2h2v2h2v-2h2v-2h-2v-2h-2z M9 4h3v2H9V4zm-2 2h2v4H7V6zm-1 3h2v2H6V9zm1 1h2v2H7v-2zm1-1h2v2H8V9z M12 12h3v2h-3v-2zm3-5h2v3h-2V7zm1-1h2v2h-2V6zm-1-2h2v2h-2V4zm-1 2h2v2h-2V6z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 6, minY: 4, maxX: 18, maxY: 22 },
  },
  animation: {
    type: "spin",
    family: "loop",
    trigger: "always",
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default syncDown;
