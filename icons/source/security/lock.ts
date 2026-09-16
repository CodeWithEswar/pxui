import { defineIcon } from "../../schemas/icon.schema";

export const lock = defineIcon({
  "name": "PXIconLock",
  "slug": "px-lock",
  "title": "Lock",
  "description": "Secured padlock with closed curved shackle and body keyhole.",
  "category": "security",
  "family": "lock",
  "aliases": [
    "padlock",
    "secure",
    "private"
  ],
  "tags": [
    "padlock",
    "secure",
    "private",
    "encrypted",
    "protection"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M7 8V6a5 5 0 0 1 10 0v2h2v14H5V8h2zm2 0h6V6a3 3 0 0 0-6 0v2zm-2 2v10h10V10H7zm5 3a1.5 1.5 0 0 1 1 1.4v1.6h-2v-1.6c0-.6.4-1.2 1-1.4z"
      }
    ],
    "filled": [
      {
        "d": "M7 8V6a5 5 0 0 1 10 0v2h2v14H5V8h2zm2 0h6V6a3 3 0 0 0-6 0v2z"
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
export default lock;
