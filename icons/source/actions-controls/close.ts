import { defineIcon } from "../../schemas/icon.schema";

export const close = defineIcon({
  name: "PXIconClose",
  slug: "px-close",
  title: "Close",
  description: "Closes, dismisses, cancels, or clears the current surface or context.",
  category: "actions-controls",
  family: "close",
  aliases: ["dismiss", "cancel", "x", "exit", "clear"],
  tags: ["action", "dismiss", "cancel", "close", "clear", "dialog"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M4 4h3v1h1v1h1v1h1v1h2V7h1V6h1V5h1V4h3v3h-1v1h-1v1h-1v1h-1v2h1v1h1v1h1v1h1v3h-3v-1h-1v-1h-1v-1h-1v-1h-2v1h-1v1h-1v1h-1v1H4v-3h1v-1h1v-1h1v-1h1v-2H7V9H6V8H5V7H4V4z",
      },
    ],
    bounds: {
      minX: 4,
      minY: 4,
      maxX: 20,
      maxY: 20,
    },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default close;
