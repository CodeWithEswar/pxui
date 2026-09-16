import { defineIcon } from "../../schemas/icon.schema";

export const arrowRight = defineIcon({
  "name": "PXIconArrowRight",
  "slug": "px-arrow-right",
  "title": "Arrow Right",
  "description": "Stepped pixel arrow pointing toward the right.",
  "category": "arrows",
  "family": "arrow",
  "aliases": [
    "forward",
    "right",
    "next"
  ],
  "tags": [
    "right",
    "forward",
    "next",
    "direction"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M14 5l-1.4 1.4L17.2 11H3v2h14.2l-4.6 4.6L14 19l7-7-7-7z"
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
export default arrowRight;
