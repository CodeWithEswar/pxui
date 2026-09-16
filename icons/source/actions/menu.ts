import { defineIcon } from "../../schemas/icon.schema";

export const menu = defineIcon({
  "name": "PXIconMenu",
  "slug": "px-menu",
  "title": "Menu",
  "description": "Three parallel horizontal pixel bars for navigation drawer toggle.",
  "category": "actions",
  "family": "menu",
  "aliases": [
    "hamburger",
    "bars"
  ],
  "tags": [
    "hamburger",
    "bars",
    "drawer",
    "navigation",
    "list"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"
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
export default menu;
