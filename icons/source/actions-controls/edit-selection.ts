import { defineIcon } from "../../schemas/icon.schema";

export const editSelection = defineIcon({
  name: "PXIconEditSelection",
  slug: "px-edit-selection",
  title: "Edit Selection",
  description: "Modifies the currently selected object, region, layer, or group.",
  category: "actions-controls",
  family: "edit",
  aliases: ["edit-selection", "modify-selection", "selected-edit", "edit-region"],
  tags: ["selection", "editor", "design", "region", "object", "transform"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M3 3h5v2H5v3H3V3zm13 0h5v5h-2V5h-3V3zM3 16h2v3h3v2H3v-5zm16 0h2v5h-5v-2h3v-3z M7 17h2v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h2V7h-2v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v2H7v2z",
      },
    ],
    bounds: { minX: 3, minY: 3, maxX: 21, maxY: 21 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default editSelection;
