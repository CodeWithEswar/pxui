import { defineIcon } from "../../schemas/icon.schema";

export const arrowLeft = defineIcon({
  "name": "PXIconArrowLeft",
  "slug": "px-arrow-left",
  "title": "Arrow Left",
  "description": "Stepped pixel arrow pointing toward the left.",
  "category": "arrows",
  "family": "arrow",
  "aliases": [
    "back",
    "left"
  ],
  "tags": [
    "left",
    "back",
    "previous",
    "direction"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M10 5l-7 7 7 7 1.4-1.4L6.8 13H21v-2H6.8l4.6-4.6L10 5z"
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
export default arrowLeft;
