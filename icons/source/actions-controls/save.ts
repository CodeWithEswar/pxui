import { defineIcon } from "../../schemas/icon.schema";

export const save = defineIcon({
  name: "PXIconSave",
  slug: "px-save",
  title: "Save",
  description: "Pixel icon for save; base form.",
  category: "actions-controls",
  family: "save",
  aliases: ["store", "persist", "disk", "floppy", "commit"],
  tags: ["save", "action", "control", "ui"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M4 4h14v1h1v1h1v14H4V4zm3 2h8v3H7V6zm1 6h8v6H8v-6zm2 2v2h4v-2h-4z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 4, minY: 4, maxX: 20, maxY: 20 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default save;
