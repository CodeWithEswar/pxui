import { defineIcon } from "../../schemas/icon.schema";

export const folderOpen = defineIcon({
  "name": "PXIconFolderOpen",
  "slug": "px-folder-open",
  "title": "Folder Open",
  "description": "Directory folder in an open state revealing contents.",
  "category": "files",
  "family": "folder",
  "aliases": [
    "open-folder"
  ],
  "tags": [
    "directory",
    "active",
    "open",
    "browse"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M3 4h7l2 2h9v4h-2V8H5v10h2v2H3V4zm4 6h15l-3 10H4l3-10zm2 2l-1.8 6h11.6l1.8-6H9z"
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
export default folderOpen;
