import { defineIcon } from "../../schemas/icon.schema";

export const saveLeft = defineIcon({
  name: "PXIconSaveLeft",
  slug: "px-save-left",
  title: "Save Left",
  description: "Pixel icon for save; left-oriented variant.",
  category: "actions-controls",
  family: "save",
  aliases: ["store-left", "persist-left", "disk-left"],
  tags: ["save", "left", "action", "control", "ui"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M8 11H6V9H4v2H2v2h2v2h2v-2h2v-2z M10 5h10v1h1v1h1v12H10V5zm3 2h5v2h-5V7zm1 5h5v5h-5v-5z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 2, minY: 5, maxX: 22, maxY: 19 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default saveLeft;
