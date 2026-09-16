import { defineIcon } from "../../schemas/icon.schema";

export const checkboxIndeterminate = defineIcon({
  name: "PXIconCheckboxIndeterminate",
  slug: "px-checkbox-indeterminate",
  title: "Checkbox Indeterminate",
  description: "Represents a checkbox containing a mixed or partially selected state.",
  category: "actions-controls",
  family: "checkbox",
  aliases: ["mixed", "partial", "checkbox-mixed", "indeterminate"],
  tags: ["checkbox", "partial", "selection", "mixed", "form", "control"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M5 3h14v1h1v1h1v14h-1v1h-1v1H5v-1H4v-1H3V5h1V4h1V3zm0 2v14h14V5H5z M7 11h10v2H7v-2z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 3, minY: 3, maxX: 21, maxY: 21 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default checkboxIndeterminate;
