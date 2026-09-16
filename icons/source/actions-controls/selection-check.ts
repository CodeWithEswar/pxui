import { defineIcon } from "../../schemas/icon.schema";

export const selectionCheck = defineIcon({
  name: "PXIconSelectionCheck",
  slug: "px-selection-check",
  title: "Selection Check",
  description: "Confirms a selected object, region, range, or collection.",
  category: "actions-controls",
  family: "check",
  aliases: ["selected", "confirm-selection", "selection-complete"],
  tags: ["selection", "check", "confirm", "bounding-box", "editor", "control"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M3 3h5v2H5v3H3V3zm13 0h5v5h-2V5h-3V3zM3 16h2v3h3v2H3v-5zm16 0h2v5h-5v-2h3v-3z M7 11h2v1h1v1h1v1h1v-1h1v-1h1v-1h1v-1h2v2h-1v1h-1v1h-1v1h-1v1h-1v1h-2v-1h-1v-1h-1v-1H7v-2z",
      },
    ],
    bounds: { minX: 3, minY: 3, maxX: 21, maxY: 21 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default selectionCheck;
