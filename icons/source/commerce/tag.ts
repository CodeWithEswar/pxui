import { defineIcon } from "../../schemas/icon.schema";

export const tag = defineIcon({
  "name": "PXIconTag",
  "slug": "px-tag",
  "title": "Tag",
  "description": "Merchandise sales price tag with ribbon thread eyelet.",
  "category": "commerce",
  "family": "tag",
  "aliases": [
    "label",
    "badge",
    "sale"
  ],
  "tags": [
    "label",
    "price",
    "discount",
    "sale",
    "metadata"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M12.5 2H2v10.5l9.5 9.5 10.5-10.5L12.5 2zM4 4h7.7L19.3 12 12 19.3 4 11.7V4zm3 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"
      }
    ],
    "filled": [
      {
        "d": "M12.5 2H2v10.5l9.5 9.5 10.5-10.5L12.5 2zM7 6a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"
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
export default tag;
