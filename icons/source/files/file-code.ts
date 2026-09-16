import { defineIcon } from "../../schemas/icon.schema";

export const fileCode = defineIcon({
  "name": "PXIconFileCode",
  "slug": "px-file-code",
  "title": "File Code",
  "description": "Source code document file featuring stepped pixel brackets.",
  "category": "files",
  "family": "file",
  "aliases": [
    "code-file",
    "source-file"
  ],
  "tags": [
    "code",
    "source",
    "script",
    "developer",
    "syntax"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M5 3h9l5 5v13H5V3zm2 2v14h10V9h-4V5H7zm2 8l2-2-1.4-1.4L7.2 13l2.4 2.4L11 14l-2-1zm6 0l-2 2 1.4 1.4 2.4-2.4-2.4-2.4L15 11l2 2z"
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
export default fileCode;
