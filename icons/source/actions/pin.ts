import { defineIcon } from "../../schemas/icon.schema";

export const pin = defineIcon({
  "name": "PXIconPin",
  "slug": "px-pin",
  "title": "Pin",
  "description": "Stepped thumbtack pushpin for pinning items to boards.",
  "category": "actions",
  "family": "pin",
  "aliases": [
    "thumbtack",
    "attach"
  ],
  "tags": [
    "thumbtack",
    "board",
    "attach",
    "stick",
    "fasten"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M16 2l6 6-3 3-1-1-4 4v5l-2 2-1-6-4-4-1 1-3-3 6-6 4 4z"
      }
    ],
    "filled": [
      {
        "d": "M16 2l6 6-3 3-1-1-4 4v5l-2 2-1-6-4-4-1 1-3-3 6-6 4 4z"
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
export default pin;
