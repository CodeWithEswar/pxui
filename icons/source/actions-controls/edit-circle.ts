import { defineIcon } from "../../schemas/icon.schema";

export const editCircle = defineIcon({
  name: "PXIconEditCircle",
  slug: "px-edit-circle",
  title: "Edit Circle",
  description: "Represents an editing or modification action inside a circular control.",
  category: "actions-controls",
  family: "edit",
  aliases: ["modify-circle", "pencil-circle", "update-circle"],
  tags: ["edit", "modify", "circle", "control", "pencil"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M8 2h8v1h2v1h2v1h1v3h1v8h-1v3h-1v1h-2v1h-2v1H8v-1H6v-1H4v-1H3v-3H2V8h1V5h1V4h2V3h2V2z M7 17h2v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h2V7h-2v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v2H7v2z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 2, minY: 2, maxX: 22, maxY: 22 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default editCircle;
