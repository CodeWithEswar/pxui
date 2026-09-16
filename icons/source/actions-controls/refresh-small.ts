import { defineIcon } from "../../schemas/icon.schema";

export const refreshSmall = defineIcon({
  name: "PXIconRefreshSmall",
  slug: "px-refresh-small",
  title: "Refresh Small",
  description: "Pixel icon for refresh; compact variant.",
  category: "actions-controls",
  family: "refresh",
  aliases: ['reload-small', 'refresh-compact'],
  tags: ['refresh', 'small', 'action', 'control', 'ui'],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M8 5h4v2H8V5zm3-1h2v2h-2V4zm1 1h3v2h-3V5zm-1 1h2v2h-2V6z M6 7h2v7H6V7zm2 7h2v2H8v-2zm2 2h4v2h-4v-2zm4-2h2v2h-2v-2zm2-5h2v5h-2v-5z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 6, minY: 4, maxX: 18, maxY: 18 },
  },
  animation: {
    type: "spin",
    family: "loop",
    trigger: "always",
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default refreshSmall;
