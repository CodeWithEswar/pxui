import { defineIcon } from "../../schemas/icon.schema";

export const heart = defineIcon({
  "name": "PXIconHeart",
  "slug": "px-heart",
  "title": "Heart",
  "description": "Stepped pixel heart shape, supports pulse animation.",
  "category": "people",
  "family": "heart",
  "aliases": [
    "like",
    "favorite",
    "love"
  ],
  "tags": [
    "love",
    "like",
    "favorite",
    "health",
    "wishlist"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M12 21l-1.4-1.3C5.4 15 2 12 2 8.3 2 5.4 4.4 3 7.3 3c1.7 0 3.3.8 4.2 2.1C12.4 3.8 14 3 15.7 3 18.6 3 21 5.4 21 8.3c0 3.7-3.4 6.7-8.6 11.4L12 21zm0-3.3c4.7-4.2 7-6.8 7-9.4 0-1.8-1.3-3.3-3.3-3.3-1.4 0-2.8.9-3.3 2.2h-1.8C10.1 5.9 8.7 5 7.3 5 5.3 5 4 6.5 4 8.3c0 2.6 2.3 5.2 7 9.4h1z"
      }
    ],
    "filled": [
      {
        "d": "M12 21l-1.4-1.3C5.4 15 2 12 2 8.3 2 5.4 4.4 3 7.3 3c1.7 0 3.3.8 4.2 2.1C12.4 3.8 14 3 15.7 3 18.6 3 21 5.4 21 8.3c0 3.7-3.4 6.7-8.6 11.4L12 21z"
      }
    ],
    "bounds": {
      "minX": 0,
      "minY": 0,
      "maxX": 24,
      "maxY": 24
    }
  },
  "animation": {
    "type": "pulse",
    "family": "attention",
    "trigger": "hover"
  },
  "status": "stable",
  "introducedVersion": "1.0.0"
});
export default heart;
