import { defineIcon } from "../../schemas/icon.schema";

export const copy = defineIcon({
  "name": "PXIconCopy",
  "slug": "px-copy",
  "title": "Copy",
  "description": "Dual layered documents representing clipboard copy and duplication.",
  "category": "actions",
  "family": "copy",
  "aliases": [
    "duplicate",
    "clone",
    "clipboard"
  ],
  "tags": [
    "duplicate",
    "clipboard",
    "clone",
    "paste"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M4 4h10v2H6v12H4V4zm4 4h12v14H8V8zm2 2v10h8V10h-8z"
      }
    ],
    "filled": [
      {
        "d": "M4 4h10v2H6v12H4V4zm4 4h12v14H8V8z"
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
export default copy;
