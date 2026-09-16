import { defineIcon } from "../../schemas/icon.schema";

export const hourglass = defineIcon({
  "name": "PXIconHourglass",
  "slug": "px-hourglass",
  "title": "Hourglass",
  "description": "Stepped glass sand timer with upper and lower chambers.",
  "category": "time",
  "family": "hourglass",
  "aliases": [
    "sandtimer",
    "wait"
  ],
  "tags": [
    "wait",
    "sand",
    "loading",
    "pending",
    "duration"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M5 2h14v4l-4 4 4 4v6H5v-6l4-4-4-4V2zm2 2v2.8l3.6 3.6.6.6-.6.6L7 15.2V18h10v-2.8l-3.6-3.6-.6-.6.6-.6L17 6.8V4H7z"
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
export default hourglass;
