import { defineIcon } from "../../schemas/icon.schema";

export const gitCommit = defineIcon({
  "name": "PXIconGitCommit",
  "slug": "px-git-commit",
  "title": "Git Commit",
  "description": "Individual revision commit point on continuous pipeline track.",
  "category": "development",
  "family": "git",
  "aliases": [
    "commit"
  ],
  "tags": [
    "git",
    "commit",
    "revision",
    "hash",
    "snapshot"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M11 3h2v5.1a5 5 0 0 1 0 7.8V21h-2v-5.1a5 5 0 0 1 0-7.8V3zm1 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"
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
export default gitCommit;
