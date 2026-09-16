import { defineIcon } from "../../schemas/icon.schema";

export const folder = defineIcon({
  "name": "PXIconFolder",
  "slug": "px-folder",
  "title": "Folder",
  "description": "File directory container with top left tab.",
  "category": "files",
  "family": "folder",
  "aliases": [
    "directory"
  ],
  "tags": [
    "directory",
    "storage",
    "files",
    "documents"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M3 4h7l2 2h9v14H3V4zm2 4v10h14V8H5zm0-2h4.6l-2-2H5v2z"
      }
    ],
    "filled": [
      {
        "d": "M3 4h7l2 2h9v14H3V4z"
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
export default folder;
