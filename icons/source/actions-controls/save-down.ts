import { defineIcon } from "../../schemas/icon.schema";

export const saveDown = defineIcon({
  name: "PXIconSaveDown",
  slug: "px-save-down",
  title: "Save Down",
  description: "Pixel icon for save; down-oriented variant.",
  category: "actions-controls",
  family: "save",
  aliases: ["store-down", "persist-down", "disk-down", "save-download"],
  tags: ["save", "down", "action", "control", "ui"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M11 16v2H9v2h2v2h2v-2h2v-2h-2v-2h-2z M5 14h12v-1h1v-1h1V2H5v12zm3-2h7v-2H8v2zm1-4h7V4H9v4z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 5, minY: 2, maxX: 19, maxY: 22 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default saveDown;
