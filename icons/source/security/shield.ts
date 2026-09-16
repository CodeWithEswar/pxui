import { defineIcon } from "../../schemas/icon.schema";

export const shield = defineIcon({
  "name": "PXIconShield",
  "slug": "px-shield",
  "title": "Shield",
  "description": "Protective security shield contour for safeguarding data and privacy.",
  "category": "security",
  "family": "shield",
  "aliases": [
    "protect",
    "guard",
    "security"
  ],
  "tags": [
    "protect",
    "guard",
    "security",
    "safe",
    "defense"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M12 2l8 3v6c0 5.5-3.4 10.3-8 11.9C7.4 21.3 4 16.5 4 11V5l8-3zm0 2.2L6 6.8V11c0 4.4 2.6 8.3 6 9.8 3.4-1.5 6-5.4 6-9.8V6.8L12 4.2z"
      }
    ],
    "filled": [
      {
        "d": "M12 2l8 3v6c0 5.5-3.4 10.3-8 11.9C7.4 21.3 4 16.5 4 11V5l8-3z"
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
export default shield;
