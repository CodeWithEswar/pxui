/**
 * Canonical Family Definitions for PXUI.
 * Families group icons sharing semantic and geometric foundations.
 */
export interface PXFamilyDefinition {
  id: string;
  name: string;
  description: string;
  rootIcon: string;
}

export const ICON_FAMILIES: Record<string, PXFamilyDefinition> = {
  add: {
    id: "add",
    name: "Add",
    description: "Creation, addition, and containerized expansion actions",
    rootIcon: "add",
  },
  insert: {
    id: "insert",
    name: "Insert",
    description: "Directional insertion relative to existing content",
    rootIcon: "insert-left",
  },
  remove: {
    id: "remove",
    name: "Remove",
    description: "Generic subtraction, removal, and containerized reduction actions",
    rootIcon: "remove",
  },
  subtract: {
    id: "subtract",
    name: "Subtract",
    description: "Numeric decrement and mathematical subtraction actions",
    rootIcon: "subtract",
  },
  clear: {
    id: "clear",
    name: "Clear",
    description: "Transient state, input, and selection clearing actions",
    rootIcon: "clear",
  },
  delete: {
    id: "delete",
    name: "Delete",
    description: "Permanent and destructive deletion actions",
    rootIcon: "delete",
  },
  close: {
    id: "close",
    name: "Close",
    description: "Dismissal, cancellation, clearing, and diagonal exit controls",
    rootIcon: "close",
  },
  "close-layout": {
    id: "close-layout",
    name: "Close Layout",
    description: "Directional panel, drawer, and layout collapse controls",
    rootIcon: "close-panel-left",
  },
  cancel: {
    id: "cancel",
    name: "Cancel",
    description: "Aborting, prohibiting, and halting transactional actions",
    rootIcon: "cancel",
  },
  check: {
    id: "check",
    name: "Check",
    description: "Success, completion, confirmation, and acceptance indicators",
    rootIcon: "check",
  },
  checkbox: {
    id: "checkbox",
    name: "Checkbox",
    description: "Interactive multi-selection form controls and boolean state indicators",
    rootIcon: "checkbox-checked",
  },
  radio: {
    id: "radio",
    name: "Radio",
    description: "Interactive single-selection option controls and active state indicators",
    rootIcon: "radio-checked",
  },
  edit: {
    id: "edit",
    name: "Edit",
    description: "Modification, revision, authoring, and content update controls",
    rootIcon: "edit",
  },
  home: {
    id: "home",
    name: "Home",
    description: "Domestic and top-level root navigation structures",
    rootIcon: "home",
  },
  search: {
    id: "search",
    name: "Search",
    description: "Inspection, query, magnifying lens, and discovery",
    rootIcon: "search",
  },
  bell: {
    id: "bell",
    name: "Bell",
    description: "Alerts, notifications, alarms, and ringing indicators",
    rootIcon: "bell",
  },
  arrow: {
    id: "arrow",
    name: "Arrow",
    description: "Directional indicators across cardinal angles",
    rootIcon: "arrow-right",
  },
  chevron: {
    id: "chevron",
    name: "Chevron",
    description: "Compact hierarchical navigation arrows",
    rootIcon: "chevron-down",
  },
  folder: {
    id: "folder",
    name: "Folder",
    description: "Hierarchical file storage and container states",
    rootIcon: "folder",
  },
  file: {
    id: "file",
    name: "File",
    description: "Documents, scripts, code, and archive containers",
    rootIcon: "file",
  },
  message: {
    id: "message",
    name: "Message",
    description: "Chat bubbles, messages, and dialogue representations",
    rootIcon: "message-square",
  },
  shield: {
    id: "shield",
    name: "Shield",
    description: "Security boundaries, validation, protection, and trust",
    rootIcon: "shield",
  },
  terminal: {
    id: "terminal",
    name: "Terminal",
    description: "Developer prompts, command lines, git commits, and code",
    rootIcon: "terminal",
  },
  user: {
    id: "user",
    name: "User",
    description: "Profiles, accounts, identities, groups, and relationships",
    rootIcon: "user",
  },
  mail: {
    id: "mail",
    name: "Mail",
    description: "Correspondence, envelopes, inboxes, and email actions",
    rootIcon: "mail",
  },
  heart: {
    id: "heart",
    name: "Heart",
    description: "Reactions, favorites, likes, and emotional markers",
    rootIcon: "heart",
  },
  clock: {
    id: "clock",
    name: "Clock",
    description: "Analog time, stopwatch, history, and chronometer states",
    rootIcon: "clock",
  },
  calendar: {
    id: "calendar",
    name: "Calendar",
    description: "Dates, schedules, appointments, events, and recurrence",
    rootIcon: "calendar",
  },
  wifi: {
    id: "wifi",
    name: "Wifi",
    description: "Wireless networking, signal strength, and offline states",
    rootIcon: "wifi",
  },
  battery: {
    id: "battery",
    name: "Battery",
    description: "Power capacity, charging indicators, and energy levels",
    rootIcon: "battery",
  },
  volume: {
    id: "volume",
    name: "Volume",
    description: "Audio amplitude, speaker levels, and mute toggles",
    rootIcon: "volume",
  },
  cart: {
    id: "cart",
    name: "Cart",
    description: "Shopping carts, baskets, retail checkout, and stores",
    rootIcon: "cart",
  },
  lock: {
    id: "lock",
    name: "Lock",
    description: "Security locks, credentials, keys, and access restrictions",
    rootIcon: "lock",
  },
  database: {
    id: "database",
    name: "Database",
    description: "Structured storage, servers, clusters, and data repositories",
    rootIcon: "database",
  },
  cloud: {
    id: "cloud",
    name: "Cloud",
    description: "Remote infrastructure, network sync, and cloud computing",
    rootIcon: "cloud",
  },
  sparkles: {
    id: "sparkles",
    name: "Sparkles",
    description: "AI generation, magic actions, highlights, and enhancements",
    rootIcon: "sparkles",
  },
};
