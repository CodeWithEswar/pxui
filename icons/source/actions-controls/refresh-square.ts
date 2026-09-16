import { defineIcon } from "../../schemas/icon.schema";

export const refreshSquare = defineIcon({
  name: "PXIconRefreshSquare",
  slug: "px-refresh-square",
  title: "Refresh Square",
  description: "Pixel icon for refresh; square container.",
  category: "actions-controls",
  family: "refresh",
  aliases: ['reload-square', 'renew-square'],
  tags: ['refresh', 'square', 'action', 'control', 'ui'],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M5 3h14v2h2v14h-2v2H5v-2H3V5h2V3z M9 7h4v2H9V7zm3-1h2v2h-2V6zm1 1h3v2h-3V7zm-1 1h2v2h-2V8z M7 9h2v5H7V9zm2 5h2v2H9v-2zm2 2h4v2h-4v-2zm4-2h2v2h-2v-2zm2-4h2v4h-2v-4z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 3, minY: 3, maxX: 21, maxY: 21 },
  },
  animation: {
    type: "spin",
    family: "loop",
    trigger: "always",
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default refreshSquare;
