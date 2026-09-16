import { defineIcon } from "../../schemas/icon.schema";

export const refreshUp = defineIcon({
  name: "PXIconRefreshUp",
  slug: "px-refresh-up",
  title: "Refresh Up",
  description: "Pixel icon for refresh; up-oriented variant.",
  category: "actions-controls",
  family: "refresh",
  aliases: ['reload-up', 'refresh-vertical-up'],
  tags: ['refresh', 'up', 'action', 'control', 'ui'],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M11 8V6H9V4h2V2h2v2h2v2h-2v2h-2z M9 18h5v2h-5z M7 16h2v2h-2z M5 11h2v5h-2z M7 9h2v2h-2z M9 7h4v2h-4z M13 9h2v2h-2z M15 11h2v3h-2z M16 15h2v2h-2z M15 16h2v2h-2z M16 18h2v2h-2z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 5, minY: 2, maxX: 18, maxY: 20 },
  },
  animation: {
    type: "spin",
    family: "loop",
    trigger: "always",
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default refreshUp;
