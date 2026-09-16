import { defineIcon } from "../../schemas/icon.schema";

export const editText = defineIcon({
  name: "PXIconEditText",
  slug: "px-edit-text",
  title: "Edit Text",
  description: "Modifies text, labels, copy, or other textual content.",
  category: "actions-controls",
  family: "edit",
  aliases: ["text-edit", "modify-text", "copy-edit", "rewrite"],
  tags: ["text", "typography", "content", "writing", "label", "editor"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M3 6h15v2H3V6zm0 5h10v2H3v-2zm0 5h6v2H3v-2z M13 21h3v-1h1v-1h1v-1h1v-1h2v-2h-1v-1h-2v2h-1v1h-1v1h-1v1h-2v2z",
      },
    ],
    bounds: { minX: 3, minY: 6, maxX: 21, maxY: 21 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default editText;
