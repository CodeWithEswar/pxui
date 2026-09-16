import { defineIcon } from "../../schemas/icon.schema";

export const chevronRight = defineIcon({
  "name": "PXIconChevronRight",
  "slug": "px-chevron-right",
  "title": "Chevron Right",
  "description": "Stepped pixel chevron angle bracket pointing right.",
  "category": "arrows",
  "family": "chevron",
  "aliases": [
    "angle-right"
  ],
  "tags": [
    "right",
    "angle",
    "next",
    "breadcrumb"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M9 4l-1.4 1.4L14.2 12l-6.6 6.6L9 20l8-8-8-8z"
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
export default chevronRight;
