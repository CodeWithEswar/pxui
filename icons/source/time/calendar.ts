import { defineIcon } from "../../schemas/icon.schema";

export const calendar = defineIcon({
  "name": "PXIconCalendar",
  "slug": "px-calendar",
  "title": "Calendar",
  "description": "Sheet calendar with binder rings and interior date grid blocks.",
  "category": "time",
  "family": "calendar",
  "aliases": [
    "date",
    "event",
    "schedule"
  ],
  "tags": [
    "date",
    "month",
    "schedule",
    "event",
    "agenda"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M3 4h18v17H3V4zm2 2v2h14V6H5zm0 4v9h14v-9H5zm2-8h2v3H7V2zm8 0h2v3h-2V2zM7 12h2v2H7v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z"
      }
    ],
    "filled": [
      {
        "d": "M3 4h18v17H3V4zm2 4h14V6H5v2zm2-6h2v3H7V2zm8 0h2v3h-2V2z"
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
export default calendar;
