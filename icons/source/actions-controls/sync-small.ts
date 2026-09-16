import { defineIcon } from "../../schemas/icon.schema";

export const syncSmall = defineIcon({
  name: "PXIconSyncSmall",
  slug: "px-sync-small",
  title: "Sync Small",
  description: "Pixel icon for sync; compact variant.",
  category: "actions-controls",
  family: "sync",
  aliases: ['sync-compact', 'synchronize-small'],
  tags: ['sync', 'small', 'action', 'control', 'ui'],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M6 8h2v3H6V8zm2-2h5v2H8V6zm4-2h2v2h-2V4zm1 1h3v2h-3V5zm-1 1h2v2h-2V6z M16 13h2v3h-2v-3zm-7 3h5v2H9v-2zm-1 2h2v2H8v-2zm-2-1h2v2H6v-2zm2-1h2v2H8v-2z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 6, minY: 4, maxX: 18, maxY: 20 },
  },
  animation: {
    type: "spin",
    family: "loop",
    trigger: "always",
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default syncSmall;
