import { defineIcon } from "../../schemas/icon.schema";

export const clearCircle = defineIcon({
  name: "PXIconClearCircle",
  slug: "px-clear-circle",
  title: "Clear Circle",
  description: "Clears or resets a temporary value or state from a circular control context.",
  category: "actions-controls",
  family: "clear",
  aliases: ["reset-circle", "cancel-circle"],
  tags: ["clear", "circle", "reset", "dismiss", "input", "erase", "cancel"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M8 2h8v1h2v1h2v1h1v3h1v8h-1v3h-1v1h-2v1h-2v1H8v-1H6v-1H4v-1H3v-3H2V8h1V5h1V4h2V3h2V2z M9 5h6v1h2v2h1v8h-1v2h-2v1H9v-1H7v-2H6V8h1V6h2V5z M7 7h2v1h1v1h1v1h1v1h1v1h1v1h1v1h2v2h-2v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1H7V7z",
        fillRule: "evenodd",
      },
    ],
    bounds: {
      minX: 2,
      minY: 2,
      maxX: 22,
      maxY: 22,
    },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default clearCircle;
