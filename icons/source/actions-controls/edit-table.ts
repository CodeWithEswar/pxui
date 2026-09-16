import { defineIcon } from "../../schemas/icon.schema";

export const editTable = defineIcon({
  name: "PXIconEditTable",
  slug: "px-edit-table",
  title: "Edit Table",
  description: "Modifies rows, columns, cells, or values in tabular or grid-based content.",
  category: "actions-controls",
  family: "edit",
  aliases: ["table-edit", "grid-edit", "edit-cell", "edit-cells", "modify-table"],
  tags: ["table", "grid", "row", "column", "cell", "cells", "data"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M3 4h15v1h1v1h1v6h-2V6H5v12h6v2H3V4zm2 5h11v2H5V9zm5-3v5h2V6h-2zm0 7v5h2v-5h-2z M13 21h3v-1h1v-1h1v-1h1v-1h2v-2h-1v-1h-2v2h-1v1h-1v1h-1v1h-2v2z",
      },
    ],
    bounds: { minX: 3, minY: 4, maxX: 21, maxY: 21 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default editTable;
