import { defineIcon } from "../../schemas/icon.schema";

export const saveSmall = defineIcon({
  name: "PXIconSaveSmall",
  slug: "px-save-small",
  title: "Save Small",
  description: "Pixel icon for save; compact variant.",
  category: "actions-controls",
  family: "save",
  aliases: ["store-small", "persist-small", "disk-small", "save-compact"],
  tags: ["save", "small", "action", "control", "ui"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M6 6h11v1h1v11H6V6zm2 2h6v2H8V8zm1 4h6v4H9v-4z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 6, minY: 6, maxX: 18, maxY: 18 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default saveSmall;
