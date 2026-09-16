import { defineIcon } from "../../schemas/icon.schema";

export const bug = defineIcon({
  "name": "PXIconBug",
  "slug": "px-bug",
  "title": "Bug",
  "description": "Beetle insect representing software errors, debugging, and issue tracking.",
  "category": "development",
  "family": "bug",
  "aliases": [
    "error",
    "defect",
    "debug"
  ],
  "tags": [
    "error",
    "defect",
    "debug",
    "issue",
    "crash"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M9 3h6v4h-6V3zm-4 5h3v2H4V8zm12 0h4v2h-4V8zM5 14H1v-2h4v2zm14 0h4v-2h-4v2zm-3 6h4v2h-4v-2zM4 20h4v2H4v-2zm3-11h10v10a5 5 0 0 1-10 0V9zm2 2v8a3 3 0 0 0 6 0v-8H9z"
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
export default bug;
