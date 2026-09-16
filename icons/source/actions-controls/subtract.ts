import { defineIcon } from "../../schemas/icon.schema";

export const subtract = defineIcon({
  name: "PXIconSubtract",
  slug: "px-subtract",
  title: "Subtract",
  description: "Represents numerical subtraction or decreasing a quantity or value.",
  category: "actions-controls",
  family: "subtract",
  aliases: ["minus", "decrease", "math", "decrement"],
  tags: ["subtract", "minus", "decrease", "math", "value", "quantity", "calculation"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M6 10h12v4H6v-4z",
      },
    ],
    bounds: {
      minX: 6,
      minY: 10,
      maxX: 18,
      maxY: 14,
    },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default subtract;
