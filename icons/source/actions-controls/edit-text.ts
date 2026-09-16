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
        d: "M3 6h15v2H3V6zm0 5h9v2H3v-2zm0 5h6v2H3v-2z M19 11h2v1h-2z M18 12h1v1h-1z M20 12h1v1h-1z M16 13h4v2h-4z M14 15h4v2h-4z M13 17h1v1h-1z M15 17h1v1h-1z M12 18h2v1h-2z M11 19h2v2h-2z",
      },
    ],
    bounds: { minX: 3, minY: 6, maxX: 21, maxY: 21 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default editText;
