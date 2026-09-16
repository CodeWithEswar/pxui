import { defineIcon } from "../../schemas/icon.schema";

export const checkDouble = defineIcon({
  name: "PXIconCheckDouble",
  slug: "px-check-double",
  title: "Check Double",
  description: "Indicates a second level of completion, acknowledgement, or double confirmation.",
  category: "actions-controls",
  family: "check",
  aliases: ["double-check", "double-tick", "acknowledged", "confirmed-twice"],
  tags: ["check", "confirmation", "complete", "double", "acknowledgement"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M2 11h2v1h1v1h1v2h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h2v2h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-2v-1h-1v-1h-1v-1H2v-2zm6 2h2v1h1v1h1v2h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h2v2h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-2v-1h-1v-1h-1v-1H8v-2z",
      },
    ],
    bounds: { minX: 2, minY: 5, maxX: 21, maxY: 18 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default checkDouble;
