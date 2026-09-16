import { defineIcon } from "../../schemas/icon.schema";

export const laptop = defineIcon({
  "name": "PXIconLaptop",
  "slug": "px-laptop",
  "title": "Laptop",
  "description": "Portable clamshell notebook computer with keyboard base.",
  "category": "devices",
  "family": "laptop",
  "aliases": [
    "notebook",
    "macbook"
  ],
  "tags": [
    "notebook",
    "macbook",
    "computer",
    "portable"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M4 4h16v11H4V4zm2 2v7h12V6H6zm-4 10h20v4H2v-4zm8 1h4v1h-4v-1z"
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
export default laptop;
