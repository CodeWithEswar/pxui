import { defineIcon } from "../../schemas/icon.schema";

export const refreshRight = defineIcon({
  name: "PXIconRefreshRight",
  slug: "px-refresh-right",
  title: "Refresh Right",
  description: "Pixel icon for refresh; right-oriented variant.",
  category: "actions-controls",
  family: "refresh",
  aliases: ['reload-right', 'refresh-cw'],
  tags: ['refresh', 'right', 'action', 'control', 'ui'],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M16 11h2V9h2v2h2v2h-2v2h-2v-2h-2v-2z M8 7h4v2H8V7zm-1-1h2v2H7V6zm-2 1h3v2H5V7zm2 1h2v2H7V8z M12 9h2v5h-2V9zm-2 5h2v2h-2v-2zm-4 2h4v2H6v-2zm-2-2h2v2H4v-2zm-2-4h2v4H2v-4z",
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

export default refreshRight;
