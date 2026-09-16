import { defineIcon } from "../../schemas/icon.schema";

export const editLocked = defineIcon({
  name: "PXIconEditLocked",
  slug: "px-edit-locked",
  title: "Edit Locked",
  description: "Indicates that editable content exists but modification is currently locked or permission-restricted.",
  category: "actions-controls",
  family: "edit",
  aliases: ["read-only", "editing-locked", "cannot-edit", "protected-edit"],
  tags: ["edit", "lock", "permission", "read-only", "restricted", "protected"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M11 4h2v1h-2z M10 5h1v1h-1z M12 5h1v1h-1z M8 6h4v2H8z M6 8h4v2H6z M5 10h1v1H5z M7 10h1v1H7z M4 11h2v1H4z M3 12h2v2H3z M15 9h4v2h1v3h-2v-2h-2v2h-2v-3h1V9z M13 14h8v7h-8v-7zm3 2h2v3h-2v-3z",
      },
    ],
    bounds: { minX: 3, minY: 4, maxX: 21, maxY: 21 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default editLocked;
