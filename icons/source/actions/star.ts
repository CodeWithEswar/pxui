import { defineIcon } from "../../schemas/icon.schema";

export const star = defineIcon({
  "name": "PXIconStar",
  "slug": "px-star",
  "title": "Star",
  "description": "5-pointed stepped pixel star for ratings, bookmarks, and favorites.",
  "category": "actions",
  "family": "star",
  "aliases": [
    "favorite",
    "rating"
  ],
  "tags": [
    "rating",
    "favorite",
    "bookmark",
    "score",
    "highlight"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M12 2l3.1 6.3 7 .9-5.1 4.9 1.2 7L12 17.8 5.8 21l1.2-7L1.9 9.2l7-.9L12 2zm0 3.3L9.7 9.8l-5.1.7 3.7 3.6-.9 5.1L12 16.8l4.6 2.4-.9-5.1 3.7-3.6-5.1-.7L12 5.3z"
      }
    ],
    "filled": [
      {
        "d": "M12 2l3.1 6.3 7 .9-5.1 4.9 1.2 7L12 17.8 5.8 21l1.2-7L1.9 9.2l7-.9L12 2z"
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
export default star;
