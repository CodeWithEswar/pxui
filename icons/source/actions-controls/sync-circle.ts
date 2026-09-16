import { defineIcon } from "../../schemas/icon.schema";

export const syncCircle = defineIcon({
  name: "PXIconSyncCircle",
  slug: "px-sync-circle",
  title: "Sync Circle",
  description: "Pixel icon for sync; circular container.",
  category: "actions-controls",
  family: "sync",
  aliases: ['sync-round', 'synchronize-circle'],
  tags: ['sync', 'circle', 'action', 'control', 'ui'],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M8 2h8v1h2v1h2v1h1v3h1v8h-1v3h-1v1h-2v1h-2v1H8v-1H6v-1H4v-1H3v-3H2V8h1V5h1V4h2V3h2V2z M7 9h2v3H7V9zm2-2h4v2H9V7zm3-1h2v2h-2V6zm1 1h3v2h-3V7zm-1 1h2v2h-2V8z M15 12h2v3h-2v-3zm-6 3h4v2H9v-2zm-1 1h2v2H8v-2zm-3-1h3v2H5v-2zm3-1h2v2H8v-2z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 2, minY: 2, maxX: 22, maxY: 22 },
  },
  animation: {
    type: "spin",
    family: "loop",
    trigger: "always",
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default syncCircle;
