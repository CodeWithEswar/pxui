import { defineIcon } from "../../schemas/icon.schema";

export const upload = defineIcon({
  "name": "PXIconUpload",
  "slug": "px-upload",
  "title": "Upload",
  "description": "Stepped up arrow out of a tray for uploading data or assets.",
  "category": "actions",
  "family": "upload",
  "aliases": [
    "send",
    "push"
  ],
  "tags": [
    "send",
    "push",
    "transfer",
    "arrow-up"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M12 3l4 5h-3v8h-2V8H8l4-5zM4 17h2v3h12v-3h2v5H4v-5z"
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
export default upload;
