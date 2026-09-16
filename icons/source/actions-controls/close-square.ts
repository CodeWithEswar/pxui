import { defineIcon } from "../../schemas/icon.schema";

export const closeSquare = defineIcon({
  name: "PXIconCloseSquare",
  slug: "px-close-square",
  title: "Close Square",
  description: "Closes or dismisses content using a square-contained action symbol.",
  category: "actions-controls",
  family: "close",
  aliases: ["dismiss-square", "cancel-square", "x-square", "exit-square"],
  tags: ["close", "dismiss", "square", "control", "x", "module", "window"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M5 3h14v2h2v14h-2v2H5v-2H3V5h2V3z M8 8h2v1h1v1h2V9h1V8h2v2h-1v1h-1v2h1v1h1v2h-2v-1h-1v-1h-2v1h-1v1H8v-2h1v-1h1v-2H9V9H8V8z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 3, minY: 3, maxX: 21, maxY: 21 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default closeSquare;
