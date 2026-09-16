import { defineIcon } from "../../schemas/icon.schema";

export const key = defineIcon({
  "name": "PXIconKey",
  "slug": "px-key",
  "title": "Key",
  "description": "Classic skeleton key with bow ring and stepped ward teeth.",
  "category": "security",
  "family": "key",
  "aliases": [
    "auth",
    "credential",
    "password"
  ],
  "tags": [
    "auth",
    "token",
    "credential",
    "password",
    "access"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M7 4a5 5 0 0 0-4.9 6.2L2 11v4h4v-2h2v-2h2.2A5 5 0 1 0 7 4zm0 2a3 3 0 1 1-2.8 4.1L5.6 9H6v2H4.4L4 11.4V13h2v-1h2v-1h1.4l.7-.7A3 3 0 0 1 7 6z"
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
export default key;
