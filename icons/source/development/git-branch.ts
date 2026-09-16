import { defineIcon } from "../../schemas/icon.schema";

export const gitBranch = defineIcon({
  "name": "PXIconGitBranch",
  "slug": "px-git-branch",
  "title": "Git Branch",
  "description": "Version control branching nodes and bifurcation workflow.",
  "category": "development",
  "family": "git",
  "aliases": [
    "branch",
    "vcs"
  ],
  "tags": [
    "git",
    "vcs",
    "fork",
    "merge",
    "versioning"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M6 3a3 3 0 0 1 2 5.2V15a3 3 0 1 1-2 2.8V8.2A3 3 0 0 1 6 3zm10 3a3 3 0 0 1 2 5.2V13a5 5 0 0 1-5 5H8v-2h5a3 3 0 0 0 3-3v-1.8A3 3 0 0 1 16 6zM6 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm0 12a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm10-9a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
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
export default gitBranch;
