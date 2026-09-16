import { defineIcon } from "../../schemas/icon.schema";

export const bookmark = defineIcon({
  "name": "PXIconBookmark",
  "slug": "px-bookmark",
  "title": "Bookmark",
  "description": "Vertical ribbon marker with triangular notched tail for reading points.",
  "category": "actions",
  "family": "bookmark",
  "aliases": [
    "save-mark",
    "pin"
  ],
  "tags": [
    "save",
    "read-later",
    "marker",
    "favorite",
    "tag"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M5 3h14v18l-7-4-7 4V3zm2 2v13.2l5-2.8 5 2.8V5H7z"
      }
    ],
    "filled": [
      {
        "d": "M5 3h14v18l-7-4-7 4V3z"
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
export default bookmark;
