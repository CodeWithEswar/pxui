import { defineIcon } from "../../schemas/icon.schema";

export const clock = defineIcon({
  "name": "PXIconClock",
  "slug": "px-clock",
  "title": "Clock",
  "description": "Analog watch dial with circular border and hands at 3:00.",
  "category": "time",
  "family": "clock",
  "aliases": [
    "time",
    "history",
    "recent"
  ],
  "tags": [
    "time",
    "hours",
    "schedule",
    "history",
    "recent"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16zm-1 3v6h5v-2h-3V7h-2z"
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
export default clock;
