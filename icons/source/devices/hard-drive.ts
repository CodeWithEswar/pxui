import { defineIcon } from "../../schemas/icon.schema";

export const hardDrive = defineIcon({
  "name": "PXIconHardDrive",
  "slug": "px-hard-drive",
  "title": "Hard Drive",
  "description": "Internal disk drive unit with front status activity indicator LEDs.",
  "category": "devices",
  "family": "hard",
  "aliases": [
    "disk",
    "drive"
  ],
  "tags": [
    "disk",
    "storage",
    "ssd",
    "hdd",
    "hardware"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M3 5h18v14H3V5zm2 2v10h14V7H5zm10 7h2v2h-2v-2zm-3 0h2v2h-2v-2z"
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
export default hardDrive;
