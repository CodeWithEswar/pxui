import { defineIcon } from "../../schemas/icon.schema";

export const removeColumn = defineIcon({
  name: "PXIconRemoveColumn",
  slug: "px-remove-column",
  title: "Remove Column",
  description: "Removes a vertical column from a table, grid, or structured layout.",
  category: "actions-controls",
  family: "remove",
  aliases: ["delete-column", "table-remove-column"],
  tags: ["table", "grid", "layout", "column", "remove"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M4 3h3v18H4V3zm6 0h4v9h-4V3zm-1 13h6v2H9v-2zm8-13h3v18h-3V3z",
      },
    ],
    bounds: {
      minX: 4,
      minY: 3,
      maxX: 20,
      maxY: 21,
    },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default removeColumn;
