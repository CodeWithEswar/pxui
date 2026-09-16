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
        d: "M4 3h10v1h1v1h1v1h1v5h-2V7h-1V6h-1V5H6v14h4v2H4V3zm10 0v3h3l-3-3z M19 11h2v1h-2z M18 12h1v1h-1z M20 12h1v1h-1z M16 13h4v2h-4z M14 15h4v2h-4z M13 17h1v1h-1z M15 17h1v1h-1z M12 18h2v1h-2z M11 19h2v2h-2z",
      },
    ],
    bounds: { minX: 4, minY: 3, maxX: 21, maxY: 21 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default editDocument;
