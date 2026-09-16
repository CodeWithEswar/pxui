import { defineIcon } from "../../schemas/icon.schema";

export const editDocument = defineIcon({
  name: "PXIconEditDocument",
  slug: "px-edit-document",
  title: "Edit Document",
  description: "Modifies the contents or properties of a document or file.",
  category: "actions-controls",
  family: "edit",
  aliases: ["edit-file", "document-edit", "modify-document", "file-pencil"],
  tags: ["document", "file", "content", "editor", "modify"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M4 3h10v1h1v1h1v1h1v6h-2V7h-1V6h-1V5H6v14h5v2H4V3zm10 0v3h3l-3-3z M13 21h3v-1h1v-1h1v-1h1v-1h2v-2h-1v-1h-2v2h-1v1h-1v1h-1v1h-2v2z",
      },
    ],
    bounds: { minX: 4, minY: 3, maxX: 21, maxY: 21 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default editDocument;
