import { defineIcon } from "../../schemas/icon.schema";

export const toggleRight = defineIcon({
  "name": "PXIconToggleRight",
  "slug": "px-toggle-right",
  "title": "Toggle Right",
  "description": "Pill switch toggled to the right active on position.",
  "category": "actions",
  "family": "toggle",
  "aliases": [
    "switch-on"
  ],
  "tags": [
    "switch",
    "on",
    "enabled",
    "active"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M7 6h10a6 6 0 0 1 0 12H7A6 6 0 0 1 7 6zm0 2a4 4 0 0 0 0 8h10a4 4 0 0 0 0-8H7zm10 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"
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
export default toggleRight;
