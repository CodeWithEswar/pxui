import { defineIcon } from "../../schemas/icon.schema";

export const settings = defineIcon({
  "name": "PXIconSettings",
  "slug": "px-settings",
  "title": "Settings",
  "description": "Stepped pixel gear icon for system configuration, preferences, and controls.",
  "category": "actions",
  "family": "settings",
  "aliases": [
    "gear",
    "preferences",
    "config"
  ],
  "tags": [
    "gear",
    "options",
    "preferences",
    "config",
    "setup"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M10 2h4v3h-4V2zm-4 3h3v2H6V5zm12 0h-3v2h3V5zM3 9h2v3H3V9zm16 0h2v3h-2V9zM2 13h3v2H2v-2zm17 0h3v2h-3v-2zm-13 4h3v2H6v-2zm12 0h-3v2h3v-2zM10 19h4v3h-4v-3zM7 7h10v10H7V7zm3 3h4v4h-4v-4z"
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
export default settings;
