import { defineIcon } from "../../schemas/icon.schema";

export const checkAll = defineIcon({
  name: "PXIconCheckAll",
  slug: "px-check-all",
  title: "Check All",
  description: "Complete or confirm every item in a group, collection, or batch.",
  category: "actions-controls",
  family: "check",
  aliases: ["complete-all", "confirm-all", "mark-all", "select-complete"],
  tags: ["check", "complete", "confirm", "batch", "all", "group"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M3 6h6v2H3V6zm0 5h4v2H3v-2zm0 5h6v2H3v-2z M8 12h2v1h1v1h1v2h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h3v3h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-3v-1h-1v-1h-1v-1H8v-3z",
      },
    ],
    bounds: { minX: 3, minY: 6, maxX: 21, maxY: 19 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default checkAll;
