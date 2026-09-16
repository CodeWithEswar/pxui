import { defineIcon } from "../../schemas/icon.schema";

export const plus = defineIcon({
  "name": "PXIconPlus",
  "slug": "px-plus",
  "title": "Plus",
  "description": "Stepped plus symbol for adding, creating, or expanding items.",
  "category": "actions",
  "family": "plus",
  "aliases": [
    "add",
    "create",
    "new"
  ],
  "tags": [
    "add",
    "new",
    "create",
    "expand",
    "increment"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M11 4h2v7h7v2h-7v7h-2v-7H4v-2h7V4z"
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
export default plus;
