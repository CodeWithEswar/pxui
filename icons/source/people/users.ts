import { defineIcon } from "../../schemas/icon.schema";

export const users = defineIcon({
  "name": "PXIconUsers",
  "slug": "px-users",
  "title": "Users",
  "description": "Group profile representing team, multiple members, or social circles.",
  "category": "people",
  "family": "users",
  "aliases": [
    "team",
    "group"
  ],
  "tags": [
    "team",
    "group",
    "members",
    "community",
    "social"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M6 4h4v4H6V4zm8 0h4v4h-4V4zM2 17c0-2.5 2-4 4.5-4h3c2.5 0 4.5 1.5 4.5 4v2H2v-2zm12-4h2c2.5 0 4 1.5 4 4v2h-3v-2c0-1.2-.6-2.2-1.7-2.8L14 13z"
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
export default users;
