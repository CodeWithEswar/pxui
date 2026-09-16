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
        d: "M3 19h2v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h2V7h-2v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v2H3v2z M15 11h4v3h-1v-2h-2v2h-1v-3zm-1 3h6v6h-6v-6z",
      },
    ],
    bounds: { minX: 3, minY: 4, maxX: 21, maxY: 21 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default editLocked;
