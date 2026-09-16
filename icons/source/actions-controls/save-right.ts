import { defineIcon } from "../../schemas/icon.schema";

export const saveRight = defineIcon({
  name: "PXIconSaveRight",
  slug: "px-save-right",
  title: "Save Right",
  description: "Pixel icon for save; right-oriented variant.",
  category: "actions-controls",
  family: "save",
  aliases: ["store-right", "persist-right", "disk-right"],
  tags: ["save", "right", "action", "control", "ui"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M16 11h2V9h2v2h2v2h-2v2h-2v-2h-2v-2z M14 5H4v1H3v1H2v12h12V5zm-3 2H6v2h5V7zm-1 5H5v5h5v-5z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 2, minY: 5, maxX: 22, maxY: 19 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default saveRight;
