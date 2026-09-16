import { defineIcon } from "../../schemas/icon.schema";

export const saveLarge = defineIcon({
  name: "PXIconSaveLarge",
  slug: "px-save-large",
  title: "Save Large",
  description: "Pixel icon for save; large-emphasis variant.",
  category: "actions-controls",
  family: "save",
  aliases: ["store-large", "persist-large", "disk-large", "save-expanded"],
  tags: ["save", "large", "action", "control", "ui"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M2 2h18v1h1v1h1v18H2V2zm4 3h10v4H6V5zm2 7h10v8H8v-8zm2 2v4h6v-4h-6z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 2, minY: 2, maxX: 22, maxY: 22 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default saveLarge;
