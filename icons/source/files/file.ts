import { defineIcon } from "../../schemas/icon.schema";

export const file = defineIcon({
  "name": "PXIconFile",
  "slug": "px-file",
  "title": "File",
  "description": "Single paper document with folded top right corner.",
  "category": "files",
  "family": "file",
  "aliases": [
    "document",
    "page"
  ],
  "tags": [
    "document",
    "page",
    "blank",
    "note"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M5 3h9l5 5v13H5V3zm2 2v14h10V9h-4V5H7zm6 0v2h2l-2-2z"
      }
    ],
    "filled": [
      {
        "d": "M5 3h9l5 5v13H5V3zm8 1v4h4l-4-4z"
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
export default file;
