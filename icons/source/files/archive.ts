import { defineIcon } from "../../schemas/icon.schema";

export const archive = defineIcon({
  "name": "PXIconArchive",
  "slug": "px-archive",
  "title": "Archive",
  "description": "Storage chest or archive box with front pull handle.",
  "category": "files",
  "family": "archive",
  "aliases": [
    "backup",
    "box"
  ],
  "tags": [
    "box",
    "backup",
    "vault",
    "history",
    "store"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M3 3h18v5H3V3zm1 7h16v11H4V10zm2 2v7h12v-7H6zm3 1h6v2H9v-2zM5 5v1h14V5H5z"
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
export default archive;
