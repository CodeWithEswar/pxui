import { defineIcon } from "../../schemas/icon.schema";

export const confirm = defineIcon({
  name: "PXIconConfirm",
  slug: "px-confirm",
  title: "Confirm",
  description: "Explicitly confirms or accepts a proposed action or decision.",
  category: "actions-controls",
  family: "check",
  aliases: ["accept", "approve", "okay", "proceed", "commit"],
  tags: ["action", "decision", "confirmation", "accept", "submit"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M4 4h16v1h1v1h1v12h-1v1h-1v1H4v-1H3v-1H2V6h1V5h1V4zm0 2v12h16V6H4zm3 5h2v1h1v1h1v1h1v-1h1v-1h1v-1h1v-1h2v2h-1v1h-1v1h-1v1h-1v1h-1v1h-2v-1h-1v-1h-1v-1H7v-2z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 2, minY: 4, maxX: 22, maxY: 20 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default confirm;
