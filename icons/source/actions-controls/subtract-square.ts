import { defineIcon } from "../../schemas/icon.schema";

export const subtractSquare = defineIcon({
  name: "PXIconSubtractSquare",
  slug: "px-subtract-square",
  title: "Subtract Square",
  description: "Subtraction or decrement action displayed inside a bounded square control.",
  category: "actions-controls",
  family: "subtract",
  aliases: ["minus-square-math", "decrement-square"],
  tags: ["subtract", "minus", "square", "decrement", "decrease", "math", "control"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M5 3h14v2h2v14h-2v2H5v-2H3V5h2V3z M6 11h12v2H6v-2z",
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

export default subtractSquare;
