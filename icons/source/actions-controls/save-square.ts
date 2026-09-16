import { defineIcon } from "../../schemas/icon.schema";

export const saveSquare = defineIcon({
  name: "PXIconSaveSquare",
  slug: "px-save-square",
  title: "Save Square",
  description: "Pixel icon for save; square container.",
  category: "actions-controls",
  family: "save",
  aliases: ["store-square", "persist-square", "disk-square"],
  tags: ["save", "square", "action", "control", "ui"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M5 3h14v2h2v14h-2v2H5v-2H3V5h2V3z M7 7h9v1h1v9H7V7zm2 2h5v2H9V9zm1 4h5v3h-5v-3z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 3, minY: 3, maxX: 21, maxY: 21 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default saveSquare;
