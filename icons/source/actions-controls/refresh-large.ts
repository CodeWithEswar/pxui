import { defineIcon } from "../../schemas/icon.schema";

export const refreshLarge = defineIcon({
  name: "PXIconRefreshLarge",
  slug: "px-refresh-large",
  title: "Refresh Large",
  description: "Pixel icon for refresh; large-emphasis variant.",
  category: "actions-controls",
  family: "refresh",
  aliases: ['reload-large', 'refresh-expanded'],
  tags: ['refresh', 'large', 'action', 'control', 'ui'],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M6 4h10v2H6V4zm9-2h2v2h-2V2zm1 2h5v2h-5V4zm-1 2h2v2h-2V6z M4 6h2v2H4V6z M2 8h2v10H2V8zm2 10h2v2H4v-2zm2 2h12v2H6v-2zm12-2h2v2h-2v-2zm2-8h2v8h-2v-8z",
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

export default refreshLarge;
