import { defineIcon } from "../../schemas/icon.schema";

export const deleteIcon = defineIcon({
  name: "PXIconDelete",
  slug: "px-delete",
  title: "Delete",
  description: "Permanently deletes an item, record, or resource.",
  category: "actions-controls",
  family: "delete",
  aliases: ["destroy", "discard", "purge"],
  tags: ["destructive", "remove", "trash", "record", "resource", "delete"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M9 3h6v2H9V3z M4 6h16v2H4V6z M6 9h12v10h-1v1H7v-1H6V9z M8 11h2v6H8v-6zm3 0h2v6h-2v-6zm3 0h2v6h-2v-6z",
        fillRule: "evenodd",
      },
    ],
    bounds: {
      minX: 4,
      minY: 3,
      maxX: 20,
      maxY: 20,
    },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default deleteIcon;
