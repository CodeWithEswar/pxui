import { defineIcon } from "../../schemas/icon.schema";

export const globe = defineIcon({
  "name": "PXIconGlobe",
  "slug": "px-globe",
  "title": "Globe",
  "description": "Earth sphere with equator and meridian longitude lines.",
  "category": "navigation",
  "family": "globe",
  "aliases": [
    "world",
    "earth",
    "international"
  ],
  "tags": [
    "world",
    "earth",
    "international",
    "planet",
    "web"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2a8 8 0 0 1 7.7 6H15c-.4-2.5-1.5-4.7-3-6zm-2 0c-1.5 1.3-2.6 3.5-3 6h6c-.4-2.5-1.5-4.7-3-6zm-5.7 6A8 8 0 0 1 12 4c-1.5 1.3-2.6 3.5-3 6H4.3zM4 12c0 .7.1 1.4.3 2H9c-.1-.7-.1-1.3-.1-2s0-1.3.1-2H4.3c-.2.6-.3 1.3-.3 2zm7.1 2h-4c.4 2.5 1.5 4.7 3 6 1.5-1.3 2.6-3.5 3-6zm3.9-2c0 .7-.1 1.3-.1 2H19.7c.2-.6.3-1.3.3-2s-.1-1.3-.3-2H15c0 .7.1 1.3.1 2zm-2 2h-4c0 .7.1 1.3.1 2s.1 1.3.1 2h3.6c.1-.7.1-1.3.1-2s0-1.3-.1-2z"
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
export default globe;
