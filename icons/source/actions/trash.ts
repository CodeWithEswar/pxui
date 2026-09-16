import { defineIcon } from "../../schemas/icon.schema";

export const trash = defineIcon({
  "name": "PXIconTrash",
  "slug": "px-trash",
  "title": "Trash",
  "description": "Wastebasket container with handle and lid for discarding items.",
  "category": "actions",
  "family": "trash",
  "aliases": [
    "delete",
    "remove",
    "bin"
  ],
  "tags": [
    "delete",
    "remove",
    "bin",
    "garbage",
    "discard"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M9 3h6v2h5v2H4V5h5V3zm2 2h2V4h-2v1zM5 8h14v13H5V8zm2 2v9h2v-9H7zm4 0v9h2v-9h-2zm4 0v9h2v-9h-2z"
      }
    ],
    "filled": [
      {
        "d": "M9 3h6v2h5v2H4V5h5V3zm2 2h2V4h-2v1zM5 8h14v13H5V8zm4 3h2v7H9v-7zm4 0h2v7h-2v-7z"
      }
    ],
    "bounds": {
      "minX": 0,
      "minY": 0,
      "maxX": 24,
      "maxY": 24
    }
  },
  "status": "stable",
  "introducedVersion": "1.0.0"
});
export default trash;
