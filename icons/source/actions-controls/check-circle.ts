import { defineIcon } from "../../schemas/icon.schema";

export const checkCircle = defineIcon({
  name: "PXIconCheckCircle",
  slug: "px-check-circle",
  title: "Check Circle",
  description: "Represents successful completion or confirmation within a circular contained state.",
  category: "actions-controls",
  family: "check",
  aliases: ["success-circle", "confirmed-circle", "complete-circle", "tick-circle"],
  tags: ["success", "confirmation", "circle", "status", "complete"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M8 2h8v1h2v1h2v1h1v3h1v8h-1v3h-1v1h-2v1h-2v1H8v-1H6v-1H4v-1H3v-3H2V8h1V5h1V4h2V3h2V2z M7 11h2v1h1v1h1v1h1v-1h1v-1h1v-1h1v-1h2v2h-1v1h-1v1h-1v1h-1v1h-1v1h-2v-1h-1v-1h-1v-1H7v-2z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 2, minY: 2, maxX: 22, maxY: 22 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default checkCircle;
