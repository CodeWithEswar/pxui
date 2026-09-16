import { defineIcon } from "../../schemas/icon.schema";

export const editSquare = defineIcon({
  name: "PXIconEditSquare",
  slug: "px-edit-square",
  title: "Edit Square",
  description: "Represents an editing action within a square or modular interface control.",
  category: "actions-controls",
  family: "edit",
  aliases: ["modify-square", "pencil-square", "update-square"],
  tags: ["edit", "modify", "square", "control", "pencil", "module"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M5 3h14v2h2v14h-2v2H5v-2H3V5h2V3z M7 17h2v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h2V7h-2v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v2H7v2z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 3, minY: 3, maxX: 21, maxY: 21 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default editSquare;
