import { defineIcon } from "../../schemas/icon.schema";

export const code = defineIcon({
  "name": "PXIconCode",
  "slug": "px-code",
  "title": "Code",
  "description": "Stepped angle brackets representing code syntax, HTML, and programming.",
  "category": "development",
  "family": "code",
  "aliases": [
    "brackets",
    "syntax",
    "developer"
  ],
  "tags": [
    "brackets",
    "syntax",
    "html",
    "developer",
    "markup"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M8 6l-6 6 6 6 1.4-1.4L4.8 12l4.6-4.6L8 6zm8 0l-1.4 1.4L19.2 12l-4.6 4.6L16 18l6-6-6-6z"
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
export default code;
