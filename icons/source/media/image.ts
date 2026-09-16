import { defineIcon } from "../../schemas/icon.schema";

export const image = defineIcon({
  "name": "PXIconImage",
  "slug": "px-image",
  "title": "Image",
  "description": "Framed artwork with stepped mountains and sun disc.",
  "category": "media",
  "family": "image",
  "aliases": [
    "photo",
    "picture",
    "gallery"
  ],
  "tags": [
    "photo",
    "picture",
    "gallery",
    "scenery",
    "wallpaper"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M3 3h18v18H3V3zm2 2v14h14V5H5zm3 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm10 9l-4-5-3 4-2-2-3 3h12z"
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
export default image;
