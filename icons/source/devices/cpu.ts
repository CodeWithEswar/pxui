import { defineIcon } from "../../schemas/icon.schema";

export const cpu = defineIcon({
  "name": "PXIconCpu",
  "slug": "px-cpu",
  "title": "CPU",
  "description": "Central processing unit semiconductor chip with peripheral connection pins.",
  "category": "devices",
  "family": "cpu",
  "aliases": [
    "processor",
    "chip"
  ],
  "tags": [
    "chip",
    "processor",
    "hardware",
    "soc",
    "silicon"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M5 5h14v14H5V5zm2 2v10h10V7H7zm2 2h6v6H9V9zm0-7h2v3H9V2zm4 0h2v3h-2V2zM9 19h2v3H9v-3zm4 0h2v3h-2v-3zM2 9h3v2H2V9zm0 4h3v2H2v-2zm17-4h3v2h-3V9zm0 4h3v2h-3v-2z"
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
export default cpu;
