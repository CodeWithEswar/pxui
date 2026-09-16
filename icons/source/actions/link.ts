import { defineIcon } from "../../schemas/icon.schema";

export const link = defineIcon({
  "name": "PXIconLink",
  "slug": "px-link",
  "title": "Link",
  "description": "Interlocked oval chain links signifying hyperlinking and connection.",
  "category": "actions",
  "family": "link",
  "aliases": [
    "url",
    "chain",
    "hyperlink"
  ],
  "tags": [
    "url",
    "hyperlink",
    "chain",
    "connect",
    "attachment"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.5 1.5 1.4 1.4 1.5-1.5a3 3 0 0 1 4.2 4.2l-3 3a3 3 0 0 1-4.3-.3L10 13zm4-2a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.5-1.5-1.4-1.4-1.5 1.5a3 3 0 0 1-4.2-4.2l3-3a3 3 0 0 1 4.3.3L14 11z"
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
export default link;
