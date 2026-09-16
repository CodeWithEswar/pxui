import { defineIcon } from "../../schemas/icon.schema";

export const edit = defineIcon({
  name: "PXIconEdit",
  slug: "px-edit",
  title: "Edit",
  description: "Modifies or updates an existing item, value, object, or piece of content.",
  category: "actions-controls",
  family: "edit",
  aliases: ["modify", "change", "update", "revise", "pencil", "write"],
  tags: ["editing", "action", "content", "toolbar", "modify"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M3 21h2v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h2V3h-2v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v2H3v2z",
      },
    ],
    bounds: { minX: 3, minY: 3, maxX: 21, maxY: 21 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default edit;
