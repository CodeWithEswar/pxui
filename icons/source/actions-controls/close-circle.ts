import { defineIcon } from "../../schemas/icon.schema";

export const closeCircle = defineIcon({
  name: "PXIconCloseCircle",
  slug: "px-close-circle",
  title: "Close Circle",
  description: "Closes or dismisses a surface using a circular contained action.",
  category: "actions-controls",
  family: "close",
  aliases: ["dismiss-circle", "cancel-circle", "x-circle", "exit-circle"],
  tags: ["close", "dismiss", "control", "circle", "x", "action"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M8 2h8v1h2v1h2v1h1v3h1v8h-1v3h-1v1h-2v1h-2v1H8v-1H6v-1H4v-1H3v-3H2V8h1V5h1V4h2V3h2V2z M9 5h6v1h2v2h1v8h-1v2h-2v1H9v-1H7v-2H6V8h1V6h2V5z M8 8h2v1h1v1h2V9h1V8h2v2h-1v1h-1v2h1v1h1v2h-2v-1h-1v-1h-2v1h-1v1H8v-2h1v-1h1v-2H9V9H8V8z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 2, minY: 2, maxX: 22, maxY: 22 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default closeCircle;
