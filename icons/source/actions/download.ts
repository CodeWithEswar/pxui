import { defineIcon } from "../../schemas/icon.schema";

export const download = defineIcon({
  "name": "PXIconDownload",
  "slug": "px-download",
  "title": "Download",
  "description": "Stepped down arrow into a receptor tray for downloading files.",
  "category": "actions",
  "family": "download",
  "aliases": [
    "save",
    "receive"
  ],
  "tags": [
    "save",
    "fetch",
    "receive",
    "export",
    "arrow-down"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M11 3h2v8h3l-4 5-4-5h3V3zM4 17h2v3h12v-3h2v5H4v-5z"
      }
    ],
    "bounds": {
      "minX": 0,
      "minY": 0,
      "maxX": 24,
      "maxY": 24
    }
  },
  "animation": {
    "type": "bounce",
    "family": "directional",
    "trigger": "hover"
  },
  "status": "stable",
  "introducedVersion": "1.0.0"
});
export default download;
