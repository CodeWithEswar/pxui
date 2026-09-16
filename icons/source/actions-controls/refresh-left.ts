import { defineIcon } from "../../schemas/icon.schema";

export const refreshLeft = defineIcon({
  name: "PXIconRefreshLeft",
  slug: "px-refresh-left",
  title: "Refresh Left",
  description: "Pixel icon for refresh; left-oriented variant.",
  category: "actions-controls",
  family: "refresh",
  aliases: ['reload-left', 'refresh-ccw'],
  tags: ['refresh', 'left', 'action', 'control', 'ui'],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M8 11H6V9H4v2H2v2h2v2h2v-2h2v-2z M12 7h4v2h-4V7zm3-1h2v2h-2V6zm1 1h3v2h-3V7zm-1 1h2v2h-2V8z M10 9h2v5h-2V9zm2 5h2v2h-2v-2zm2 2h4v2h-4v-2zm4-2h2v2h-2v-2zm2-4h2v4h-2v-4z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 2, minY: 6, maxX: 22, maxY: 18 },
  },
  animation: {
    type: "spin",
    family: "loop",
    trigger: "always",
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default refreshLeft;
