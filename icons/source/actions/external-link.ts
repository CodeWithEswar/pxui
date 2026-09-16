import { defineIcon } from "../../schemas/icon.schema";

export const externalLink = defineIcon({
  "name": "PXIconExternalLink",
  "slug": "px-external-link",
  "title": "External Link",
  "description": "Open window with upper right departing stepped arrow.",
  "category": "actions",
  "family": "external",
  "aliases": [
    "new-tab",
    "outbound"
  ],
  "tags": [
    "new-tab",
    "outbound",
    "redirect",
    "href",
    "popout"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M19 19H5V5h7V3H3v18h18v-9h-2v7zM14 3v2h3.6l-9.3 9.3 1.4 1.4L19 6.4V10h2V3h-7z"
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
export default externalLink;
