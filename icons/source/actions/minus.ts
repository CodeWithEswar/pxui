import { defineIcon } from "../../schemas/icon.schema";

export const minus = defineIcon({
  "name": "PXIconMinus",
  "slug": "px-minus",
  "title": "Minus",
  "description": "Stepped minus horizontal bar for removing, collapsing, or decrementing.",
  "category": "actions",
  "family": "minus",
  "aliases": [
    "remove",
    "subtract"
  ],
  "tags": [
    "remove",
    "collapse",
    "decrement",
    "dash"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M4 11h16v2H4v-2z"
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
export default minus;
