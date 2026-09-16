import { defineIcon } from "../../schemas/icon.schema";

export const fileText = defineIcon({
  "name": "PXIconFileText",
  "slug": "px-file-text",
  "title": "File Text",
  "description": "Document file with horizontal lines representing text content.",
  "category": "files",
  "family": "file",
  "aliases": [
    "document-text",
    "article"
  ],
  "tags": [
    "document",
    "article",
    "readme",
    "lines",
    "copy"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M5 3h9l5 5v13H5V3zm2 2v14h10V9h-4V5H7zm2 6h6v2H9v-2zm0 4h6v2H9v-2zm4-10v2h2l-2-2z"
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
export default fileText;
