import { defineIcon } from "../../schemas/icon.schema";

export const saveActive = defineIcon({
  name: "PXIconSaveActive",
  slug: "px-save-active",
  title: "Save Active",
  description: "Pixel icon for save; active state.",
  category: "actions-controls",
  family: "save",
  aliases: ["store-active", "persist-active", "disk-active", "saved"],
  tags: ["save", "active", "state", "action", "control", "ui"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M4 4h14v1h1v1h1v14H4V4zm3 2h8v3H7V6zm1 6h8v6H8v-6zm1 1v4h6v-4H9z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 4, minY: 4, maxX: 20, maxY: 20 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default saveActive;
