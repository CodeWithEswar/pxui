import { defineIcon } from "../../schemas/icon.schema";

export const chevronLeft = defineIcon({
  "name": "PXIconChevronLeft",
  "slug": "px-chevron-left",
  "title": "Chevron Left",
  "description": "Stepped pixel chevron angle bracket pointing left.",
  "category": "arrows",
  "family": "chevron",
  "aliases": [
    "angle-left"
  ],
  "tags": [
    "left",
    "angle",
    "back",
    "breadcrumb"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M15 4l-8 8 8 8 1.4-1.4L9.8 12l6.6-6.6L15 4z"
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
export default chevronLeft;
