import { defineIcon } from "../../schemas/icon.schema";

export const addCircle = defineIcon({
  name: "PXIconAddCircle",
  slug: "px-add-circle",
  title: "Add Circle",
  description: "Add action presented inside a circular container for compact controls and state-oriented UI.",
  category: "actions-controls",
  family: "add",
  aliases: ["plus-circle", "create-circle", "new-circle"],
  tags: ["action", "circle", "container", "create", "add"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M8 2h8v1h2v1h2v1h1v3h1v8h-1v3h-1v1h-2v1h-2v1H8v-1H6v-1H4v-1H3v-3H2V8h1V5h1V4h2V3h2V2z M9 5h6v1h2v2h1v8h-1v2h-2v1H9v-1H7v-2H6V8h1V6h2V5z M11 7h2v3h3v2h-3v3h-2v-3H8v-2h3V7z",
        fillRule: "evenodd",
      },
    ],
    bounds: {
      minX: 2,
      minY: 2,
      maxX: 22,
      maxY: 22,
    },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default addCircle;
