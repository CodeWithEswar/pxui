import { defineIcon } from "../../schemas/icon.schema";

export const sync = defineIcon({
  name: "PXIconSync",
  slug: "px-sync",
  title: "Sync",
  description: "Pixel icon for sync; base form.",
  category: "actions-controls",
  family: "sync",
  aliases: ['synchronize', 'synchronise', 'exchange', 'bidirectional'],
  tags: ['sync', 'action', 'control', 'ui'],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M4 8h2v4H4V8zm2-2h2v2H6V6zm2-2h7v2H8V4zm6-2h2v2h-2V2zm1 2h4v2h-4V4zm-1 2h2v2h-2V6z M18 12h2v4h-2v-4zm-2 4h2v2h-2v-2zm-7 2h7v2H9v-2zm-1 2h2v2H8v-2zm-3-2h4v2H5v-2zm3-2h2v2H8v-2z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 4, minY: 2, maxX: 20, maxY: 22 },
  },
  animation: {
    type: "spin",
    family: "loop",
    trigger: "always",
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default sync;
