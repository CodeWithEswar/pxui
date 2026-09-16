import { defineIcon } from "../../schemas/icon.schema";

export const checkSquare = defineIcon({
  name: "PXIconCheckSquare",
  slug: "px-check-square",
  title: "Check Square",
  description: "Indicates confirmation or successful completion within a square-contained state.",
  category: "actions-controls",
  family: "check",
  aliases: ["success-square", "complete-square", "tick-square", "confirmed-square"],
  tags: ["confirmation", "success", "square", "status", "complete"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M5 3h14v2h2v14h-2v2H5v-2H3V5h2V3z M7 11h2v1h1v1h1v1h1v-1h1v-1h1v-1h1v-1h2v2h-1v1h-1v1h-1v1h-1v1h-1v1h-2v-1h-1v-1h-1v-1H7v-2z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 3, minY: 3, maxX: 21, maxY: 21 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default checkSquare;
