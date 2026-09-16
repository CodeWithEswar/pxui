import { defineIcon } from "../../schemas/icon.schema";

export const saveCircle = defineIcon({
  name: "PXIconSaveCircle",
  slug: "px-save-circle",
  title: "Save Circle",
  description: "Pixel icon for save; circular container.",
  category: "actions-controls",
  family: "save",
  aliases: ["store-circle", "persist-circle", "disk-circle"],
  tags: ["save", "circle", "action", "control", "ui"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M8 2h8v1h2v1h2v1h1v3h1v8h-1v3h-1v1h-2v1h-2v1H8v-1H6v-1H4v-1H3v-3H2V8h1V5h1V4h2V3h2V2z M7 7h9v1h1v9H7V7zm2 2h5v2H9V9zm1 4h5v3h-5v-3z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 2, minY: 2, maxX: 22, maxY: 22 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default saveCircle;
