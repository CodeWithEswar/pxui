import { defineIcon } from "../../schemas/icon.schema";

export const syncRight = defineIcon({
  name: "PXIconSyncRight",
  slug: "px-sync-right",
  title: "Sync Right",
  description: "Pixel icon for sync; right-oriented variant.",
  category: "actions-controls",
  family: "sync",
  aliases: ['sync-forward', 'exchange-right'],
  tags: ['sync', 'right', 'action', 'control', 'ui'],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M16 11h2V9h2v2h2v2h-2v2h-2v-2h-2v-2z M11 9h2v3h-2V9zm-4-2h4v2H7V7zm-1-1h2v2H6V6zm-2 1h3v2H4V7zm2 1h2v2H6V8z M3 12h2v3H3v-3zm4 3h4v2H7v-2zm3 1h2v2h-2v-2zm2-1h2v2h-2v-2zm-2-1h2v2h-2v-2z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 3, minY: 6, maxX: 22, maxY: 18 },
  },
  animation: {
    type: "spin",
    family: "loop",
    trigger: "always",
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default syncRight;
