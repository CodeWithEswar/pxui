import { defineIcon } from "../../schemas/icon.schema";

export const clearSquare = defineIcon({
  name: "PXIconClearSquare",
  slug: "px-clear-square",
  title: "Clear Square",
  description: "Clears or resets transient content within a square or modular interface context.",
  category: "actions-controls",
  family: "clear",
  aliases: ["reset-square", "cancel-square"],
  tags: ["clear", "square", "reset", "input", "state", "module", "erase"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M5 3h14v2h2v14h-2v2H5v-2H3V5h2V3z M7 7h2v1h1v1h1v1h1v1h1v1h1v1h1v1h2v2h-2v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1H7V7z",
        fillRule: "evenodd",
      },
    ],
    bounds: {
      minX: 3,
      minY: 3,
      maxX: 21,
      maxY: 21,
    },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default clearSquare;
