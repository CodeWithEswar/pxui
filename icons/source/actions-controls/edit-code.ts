import { defineIcon } from "../../schemas/icon.schema";

export const editCode = defineIcon({
  name: "PXIconEditCode",
  slug: "px-edit-code",
  title: "Edit Code",
  description: "Modifies source code, markup, configuration, or programmable content.",
  category: "actions-controls",
  family: "edit",
  aliases: ["code-edit", "modify-code", "source-edit", "program-edit"],
  tags: ["code", "developer", "source", "programming", "editor", "markup"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M7 7h2v2H7V7zm-2 2h2v2H5V9zm-2 2h2v2H3v-2zm2 2h2v2H5v-2zm2 2h2v2H7v-2z M13 7h2v2h-2V7zm2 2h2v2h-2V9zm2 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm-2 2h2v2h-2v-2z M19 11h2v1h-2z M18 12h1v1h-1z M20 12h1v1h-1z M16 13h4v2h-4z M14 15h4v2h-4z M13 17h1v1h-1z M15 17h1v1h-1z M12 18h2v1h-2z M11 19h2v2h-2z",
      },
    ],
    bounds: { minX: 3, minY: 7, maxX: 21, maxY: 21 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default editCode;
