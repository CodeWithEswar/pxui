import { defineIcon } from "../../schemas/icon.schema";

export const subtractCircle = defineIcon({
  name: "PXIconSubtractCircle",
  slug: "px-subtract-circle",
  title: "Subtract Circle",
  description: "Subtraction or decrement action contained within a circular control.",
  category: "actions-controls",
  family: "subtract",
  aliases: ["minus-circle", "decrease-circle", "decrement-circle"],
  tags: ["subtract", "minus", "circle", "decrease", "decrement", "math", "value"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M8 2h8v1h2v1h2v1h1v3h1v8h-1v3h-1v1h-2v1h-2v1H8v-1H6v-1H4v-1H3v-3H2V8h1V5h1V4h2V3h2V2z M9 5h6v1h2v2h1v8h-1v2h-2v1H9v-1H7v-2H6V8h1V6h2V5z M7 11h10v2H7v-2z",
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

export default subtractCircle;
