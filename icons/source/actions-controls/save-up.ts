import { defineIcon } from "../../schemas/icon.schema";

export const saveUp = defineIcon({
  name: "PXIconSaveUp",
  slug: "px-save-up",
  title: "Save Up",
  description: "Pixel icon for save; up-oriented variant.",
  category: "actions-controls",
  family: "save",
  aliases: ["store-up", "persist-up", "disk-up", "save-upload"],
  tags: ["save", "up", "action", "control", "ui"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M11 8V6H9V4h2V2h2v2h2v2h-2v2h-2z M5 10h12v1h1v1h1v10H5V10zm3 2h7v2H8v-2zm1 4h7v4H9v-4z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 5, minY: 2, maxX: 19, maxY: 22 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default saveUp;
