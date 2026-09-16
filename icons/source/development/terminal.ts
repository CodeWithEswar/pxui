import { defineIcon } from "../../schemas/icon.schema";

export const terminal = defineIcon({
  "name": "PXIconTerminal",
  "slug": "px-terminal",
  "title": "Terminal",
  "description": "Console command line shell with command prompt and blinking cursor.",
  "category": "development",
  "family": "terminal",
  "aliases": [
    "console",
    "cli",
    "shell"
  ],
  "tags": [
    "console",
    "cli",
    "shell",
    "bash",
    "command"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M3 3h18v18H3V3zm2 2v14h14V5H5zm2 4l4 3-4 3-1.2-1.6L8.4 12l-2.6-1.4L7 9zm6 5h5v2h-5v-2z"
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
export default terminal;
