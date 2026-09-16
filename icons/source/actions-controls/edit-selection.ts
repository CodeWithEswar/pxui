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
        d: "M3 3h5v2H5v3H3V3zm13 0h5v5h-2V5h-3V3zM3 16h2v3h3v2H3v-5z M19 11h2v1h-2z M18 12h1v1h-1z M20 12h1v1h-1z M16 13h4v2h-4z M14 15h4v2h-4z M13 17h1v1h-1z M15 17h1v1h-1z M12 18h2v1h-2z M11 19h2v2h-2z",
      },
    ],
    bounds: { minX: 3, minY: 3, maxX: 21, maxY: 21 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default editSelection;
