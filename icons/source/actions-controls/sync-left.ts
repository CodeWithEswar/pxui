import { defineIcon } from "../../schemas/icon.schema";

export const syncLeft = defineIcon({
  name: "PXIconSyncLeft",
  slug: "px-sync-left",
  title: "Sync Left",
  description: "Pixel icon for sync; left-oriented variant.",
  category: "actions-controls",
  family: "sync",
  aliases: ['sync-reverse', 'exchange-left'],
  tags: ['sync', 'left', 'action', 'control', 'ui'],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M8 11H6V9H4v2H2v2h2v2h2v-2h2v-2z M11 9h2v3h-2V9zm2-2h4v2h-4V7zm3-1h2v2h-2V6zm1 1h3v2h-3V7zm-1 1h2v2h-2V8z M19 12h2v3h-2v-3zm-6 3h4v2h-4v-2zm-1 1h2v2h-2v-2zm-2-1h2v2h-2v-2zm2-1h2v2h-2v-2z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 2, minY: 6, maxX: 21, maxY: 18 },
  },
  animation: {
    type: "spin",
    family: "loop",
    trigger: "always",
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default syncLeft;
