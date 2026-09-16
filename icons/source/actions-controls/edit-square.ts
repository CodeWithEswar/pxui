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
        d: "M5 3h14v2h2v14h-2v2H5v-2H3V5h2V3z M15 7h2v1h-2z M14 8h1v1h-1z M16 8h1v1h-1z M12 9h4v2h-4z M10 11h4v2h-4z M9 13h1v1h-1z M11 13h1v1h-1z M8 14h2v1h-2z M7 15h2v2h-2z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 3, minY: 3, maxX: 21, maxY: 21 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default editSquare;
