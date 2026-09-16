import { defineIcon } from "../../schemas/icon.schema";

export const check = defineIcon({
  name: "PXIconCheck",
  slug: "px-check",
  title: "Check",
  description: "Indicates successful completion, confirmation, acceptance, or a positive state.",
  category: "actions-controls",
  family: "check",
  aliases: ["tick", "done", "complete", "success", "confirmed", "accepted"],
  tags: ["confirmation", "completion", "positive", "action", "status", "control"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M4 11h3v1h1v1h1v2h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h3v3h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-3v-1h-1v-1h-1v-1h-1v-1H4v-3z",
      },
    ],
    bounds: { minX: 4, minY: 6, maxX: 20, maxY: 18 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default check;
