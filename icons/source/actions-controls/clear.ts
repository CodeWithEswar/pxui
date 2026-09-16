import { defineIcon } from "../../schemas/icon.schema";

export const clear = defineIcon({
  name: "PXIconClear",
  slug: "px-clear",
  title: "Clear",
  description: "Clears transient content, input, selection, or temporary state without implying permanent deletion.",
  category: "actions-controls",
  family: "clear",
  aliases: ["reset", "empty", "erase-input"],
  tags: ["clear", "reset", "empty", "dismiss", "erase", "input", "selection"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M3 20h5v1H3v-1zm13 0h5v1h-5v-1z M8 18h5v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-2h-3v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1H8v1z",
      },
    ],
    bounds: {
      minX: 3,
      minY: 8,
      maxX: 21,
      maxY: 21,
    },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default clear;
