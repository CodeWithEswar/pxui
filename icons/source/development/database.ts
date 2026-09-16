import { defineIcon } from "../../schemas/icon.schema";

export const database = defineIcon({
  "name": "PXIconDatabase",
  "slug": "px-database",
  "title": "Database",
  "description": "Stacked cylindrical storage platters representing database tables and SQL.",
  "category": "development",
  "family": "database",
  "aliases": [
    "sql",
    "storage",
    "db"
  ],
  "tags": [
    "sql",
    "data",
    "storage",
    "server",
    "postgres"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M12 3c4.4 0 8 1.3 8 3v12c0 1.7-3.6 3-8 3s-8-1.3-8-3V6c0-1.7 3.6-3 8-3zm0 2C8.7 5 6 6 6 6s2.7 1 6 1 6-1 6-1-2.7-1-6-1zm6 4.8c-.8.5-2.2.9-4 1.1V13h-4v-2.1c-1.8-.2-3.2-.6-4-1.1V12c0 .4 2.7 1.5 6 1.5s6-1.1 6-1.5V9.8zm0 5c-.8.5-2.2.9-4 1.1V18h-4v-2.1c-1.8-.2-3.2-.6-4-1.1V17c0 .4 2.7 1.5 6 1.5s6-1.1 6-1.5v-2.2z"
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
export default database;
