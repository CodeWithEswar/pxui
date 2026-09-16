import { defineIcon } from "../../schemas/icon.schema";

export const refreshDown = defineIcon({
  name: "PXIconRefreshDown",
  slug: "px-refresh-down",
  title: "Refresh Down",
  description: "Pixel icon for refresh; down-oriented variant.",
  category: "actions-controls",
  family: "refresh",
  aliases: ['reload-down', 'refresh-vertical-down'],
  tags: ['refresh', 'down', 'action', 'control', 'ui'],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M11 16v2H9v2h2v2h2v-2h2v-2h-2v-2h-2z M9 4h5v2h-5z M7 6h2v2h-2z M5 8h2v5h-2z M7 13h2v2h-2z M9 15h4v2h-4z M13 13h2v2h-2z M15 10h2v3h-2z M16 7h2v2h-2z M15 6h2v2h-2z M16 4h2v2h-2z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 5, minY: 4, maxX: 18, maxY: 22 },
  },
  animation: {
    type: "spin",
    family: "loop",
    trigger: "always",
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default refreshDown;
