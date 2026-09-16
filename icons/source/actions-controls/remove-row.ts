import { defineIcon } from "../../schemas/icon.schema";

export const removeRow = defineIcon({
  name: "PXIconRemoveRow",
  slug: "px-remove-row",
  title: "Remove Row",
  description: "Removes a horizontal row from a table, grid, list, or structured layout.",
  category: "actions-controls",
  family: "remove",
  aliases: ["delete-row", "table-remove-row"],
  tags: ["table", "grid", "layout", "row", "remove"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M3 4h18v3H3V4zm0 6h9v4H3v-4zm12 1h6v2h-6v-2zm-12 6h18v3H3v-3z",
      },
    ],
    bounds: {
      minX: 3,
      minY: 4,
      maxX: 21,
      maxY: 20,
    },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default removeRow;
