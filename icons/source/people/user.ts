import { defineIcon } from "../../schemas/icon.schema";

export const user = defineIcon({
  "name": "PXIconUser",
  "slug": "px-user",
  "title": "User",
  "description": "Single user silhouette featuring head and shoulder contours.",
  "category": "people",
  "family": "user",
  "aliases": [
    "profile",
    "account",
    "person"
  ],
  "tags": [
    "profile",
    "account",
    "person",
    "avatar",
    "member"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M9 4h6v6H9V4zm2 2v2h2V6h-2zM4 18c0-3 2.5-5 5.5-5h5c3 0 5.5 2 5.5 5v2H4v-2zm2 0h12c0-1.7-1.5-3-3.5-3h-5C7.5 15 6 16.3 6 18z"
      }
    ],
    "filled": [
      {
        "d": "M9 4h6v6H9V4zm-5 14c0-3 2.5-5 5.5-5h5c3 0 5.5 2 5.5 5v2H4v-2z"
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
export default user;
