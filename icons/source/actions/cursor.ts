import { defineIcon } from "../../schemas/icon.schema";

export const cursor = defineIcon({
  "name": "PXIconCursor",
  "slug": "px-cursor",
  "title": "Cursor",
  "description": "Classic stepped retro pointer arrow for mouse and pointing actions.",
  "category": "actions",
  "family": "cursor",
  "aliases": [
    "pointer",
    "mouse"
  ],
  "tags": [
    "pointer",
    "mouse",
    "click",
    "select",
    "arrow"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M4 3v17l5-4 3 7 3-1-3-7h6L4 3zm2 4l9 7h-4l3 6-1 0.4-3-6-4 3V7z"
      }
    ],
    "filled": [
      {
        "d": "M4 3v17l5-4 3 7 3-1-3-7h6L4 3z"
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
export default cursor;
