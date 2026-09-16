import { defineIcon } from "../../schemas/icon.schema";

export const refresh = defineIcon({
  name: "PXIconRefresh",
  slug: "px-refresh",
  title: "Refresh",
  description: "Pixel icon for refresh; base form.",
  category: "actions-controls",
  family: "refresh",
  aliases: ['reload', 'renew', 'retry', 'cycle', 'rotate'],
  tags: ['refresh', 'action', 'control', 'ui'],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M8 4h7v2H8V4zm6-2h2v2h-2V2zm1 2h4v2h-4V4zm-1 2h2v2h-2V6z M6 6h2v2H6V6z M4 8h2v8H4V8zm2 8h2v2H6v-2zm2 2h8v2H8v-2zm8-2h2v2h-2v-2zm2-6h2v6h-2v-6z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 4, minY: 2, maxX: 20, maxY: 20 },
  },
  animation: {
    type: "spin",
    family: "loop",
    trigger: "always",
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default refresh;
