import { defineIcon } from "../../schemas/icon.schema";

export const unlink = defineIcon({
  "name": "PXIconUnlink",
  "slug": "px-unlink",
  "title": "Unlink",
  "description": "Severed chain links showing broken connections or disconnected URLs.",
  "category": "actions",
  "family": "unlink",
  "aliases": [
    "disconnect",
    "broken-link"
  ],
  "tags": [
    "disconnect",
    "broken",
    "separate",
    "break"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.5 1.5 1.4 1.4 1.5-1.5a3 3 0 0 1 4.2 4.2l-3 3a3 3 0 0 1-4.3-.3L10 13zm4-2a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.5-1.5-1.4-1.4-1.5 1.5a3 3 0 0 1-4.2-4.2l3-3a3 3 0 0 1 4.3.3L14 11zM2 2l20 20-1.4 1.4L.6 3.4 2 2z"
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
export default unlink;
