import { defineIcon } from "../../schemas/icon.schema";

export const home = defineIcon({
  "name": "PXIconHome",
  "slug": "px-home",
  "title": "Home",
  "description": "Main dashboard or homepage representation with roof, chimney, and door.",
  "category": "navigation",
  "family": "home",
  "aliases": [
    "house",
    "main"
  ],
  "tags": [
    "house",
    "main",
    "dashboard",
    "index",
    "root"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M12 2L2 11h3v10h5v-6h4v6h5V11h3L12 2zm0 3.2L17 8.5V19h-1v-6H8v6H7V8.5l5-3.3zM18 3h2v4h-2V3z"
      }
    ],
    "filled": [
      {
        "d": "M12 2L2 11h3v10h6v-6h2v6h6V11h3L12 2zM18 3h2v4h-2V3z"
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
export default home;
