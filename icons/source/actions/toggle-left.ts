import { defineIcon } from "../../schemas/icon.schema";

export const toggleLeft = defineIcon({
  "name": "PXIconToggleLeft",
  "slug": "px-toggle-left",
  "title": "Toggle Left",
  "description": "Pill switch toggled to the left off position.",
  "category": "actions",
  "family": "toggle",
  "aliases": [
    "switch-off"
  ],
  "tags": [
    "switch",
    "off",
    "disabled",
    "state"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M7 6h10a6 6 0 0 1 0 12H7A6 6 0 0 1 7 6zm0 2a4 4 0 0 0 0 8h10a4 4 0 0 0 0-8H7zm0 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"
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
export default toggleLeft;
