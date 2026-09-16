/**
 * Curated Collections for PXUI.
 * Curated, cross-categorical groupings for developer convenience.
 */
export interface PXCollectionDefinition {
  id: string;
  name: string;
  description: string;
  iconSlugs: string[];
}

export const ICON_COLLECTIONS: Record<string, PXCollectionDefinition> = {
  essentials: {
    id: "essentials",
    name: "Essentials Starter",
    description: "Core interface icons required by every modern application",
    iconSlugs: ["px-home", "px-search", "px-settings", "px-bell", "px-user", "px-check", "px-x", "px-menu"],
  },
  navigation: {
    id: "navigation",
    name: "Navigation System",
    description: "Wayfinding, arrows, chevrons, compass, and orientation",
    iconSlugs: ["px-arrow-left", "px-arrow-right", "px-arrow-up", "px-arrow-down", "px-chevron-left", "px-chevron-right", "px-compass", "px-map-pin"],
  },
  developer: {
    id: "developer",
    name: "Developer & Terminal",
    description: "Code blocks, terminals, git branches, commits, bugs, and hardware",
    iconSlugs: ["px-terminal", "px-code", "px-git-branch", "px-git-commit", "px-bug", "px-database", "px-cpu"],
  },
  animated: {
    id: "animated",
    name: "Discrete Motion",
    description: "Icons featuring pixel-native frame choreography",
    iconSlugs: ["px-bell", "px-heart", "px-refresh", "px-sparkles", "px-download", "px-loader", "px-zap"],
  },
};

export const CATALOG_PLANNING_FLOOR = 5000;
export const CATALOG_PLANNING_ENVELOPE = 5840;

export interface PXPlanningCollection {
  id: string;
  name: string;
  planningTarget: number;
  scope: string;
  canonicalCategories: readonly string[];
}

export const PLANNING_COLLECTIONS: Record<string, PXPlanningCollection> = {
  "actions-controls": {
    id: "actions-controls",
    name: "Actions & Controls",
    planningTarget: 250,
    scope: "Add, remove, edit, copy, save, undo, redo, selection, filtering, sorting, expansion, collapse, drag, move, transformations and common UI actions",
    canonicalCategories: ["actions", "editing"],
  },
  "arrows-navigation": {
    id: "arrows-navigation",
    name: "Arrows & Navigation",
    planningTarget: 320,
    scope: "Arrows, chevrons, directional movement, turns, enter/exit, pagination, route navigation, orientation and compass concepts",
    canonicalCategories: ["arrows", "navigation"],
  },
  "files-folders": {
    id: "files-folders",
    name: "Files & Folders",
    planningTarget: 340,
    scope: "Files, document types, folders, archives, attachments, import/export, document states, cloud files and storage-related objects",
    canonicalCategories: ["files"],
  },
  "communication": {
    id: "communication",
    name: "Communication",
    planningTarget: 300,
    scope: "Mail, inbox, messaging, chat, calls, microphone, notifications, broadcasting, contacts and communication states",
    canonicalCategories: ["communication"],
  },
  "people-social": {
    id: "people-social",
    name: "People & Social",
    planningTarget: 260,
    scope: "Users, groups, profile states, relationships, reactions, identity, community and accessibility-related people concepts",
    canonicalCategories: ["people", "social", "accessibility"],
  },
  "devices-hardware": {
    id: "devices-hardware",
    name: "Devices & Hardware",
    planningTarget: 320,
    scope: "Phones, tablets, desktops, watches, cameras, printers, storage, peripherals, input devices, networking hardware and sensors",
    canonicalCategories: ["devices"],
  },
  "development-code": {
    id: "development-code",
    name: "Development & Code",
    planningTarget: 420,
    scope: "Terminal, source code, Git, APIs, databases, servers, cloud infrastructure, bugs, packages, developer tooling and engineering concepts",
    canonicalCategories: ["development", "infrastructure"],
  },
  "business-finance": {
    id: "business-finance",
    name: "Business & Finance",
    planningTarget: 300,
    scope: "Banking, wallets, accounting, invoices, analytics, office, legal, currencies, financial operations and business workflows",
    canonicalCategories: ["business", "finance"],
  },
  "commerce": {
    id: "commerce",
    name: "Commerce",
    planningTarget: 300,
    scope: "Carts, baskets, stores, packages, shipping, coupons, receipts, products, checkout, inventory and retail operations",
    canonicalCategories: ["commerce"],
  },
  "media-creative": {
    id: "media-creative",
    name: "Media & Creative",
    planningTarget: 320,
    scope: "Playback, audio, video, photography, images, design, layers, cropping, effects, drawing, typography and creative tooling",
    canonicalCategories: ["media"],
  },
  "maps-travel": {
    id: "maps-travel",
    name: "Maps & Travel",
    planningTarget: 300,
    scope: "Maps, locations, routes, vehicles, transit, flights, luggage, navigation, landmarks and travel concepts",
    canonicalCategories: ["maps"],
  },
  "buildings-objects": {
    id: "buildings-objects",
    name: "Buildings & Objects",
    planningTarget: 280,
    scope: "Homes, offices, furniture, appliances, tools and common physical objects",
    canonicalCategories: ["buildings", "objects"],
  },
  "health-fitness": {
    id: "health-fitness",
    name: "Health & Fitness",
    planningTarget: 220,
    scope: "Medical objects, wellness, exercise, movement and general non-diagnostic health/fitness symbols",
    canonicalCategories: ["health"],
  },
  "weather-nature": {
    id: "weather-nature",
    name: "Weather & Nature",
    planningTarget: 220,
    scope: "Sun, moon, clouds, precipitation, climate, environment, plants, animals and natural phenomena",
    canonicalCategories: ["weather"],
  },
  "security-privacy": {
    id: "security-privacy",
    name: "Security & Privacy",
    planningTarget: 220,
    scope: "Locks, keys, shields, authentication, permissions, visibility, privacy, verification and security states",
    canonicalCategories: ["security"],
  },
  "time-calendar": {
    id: "time-calendar",
    name: "Time & Calendar",
    planningTarget: 170,
    scope: "Clocks, timers, calendars, dates, schedules, recurrence, history, alarms and time states",
    canonicalCategories: ["time"],
  },
  "education": {
    id: "education",
    name: "Education",
    planningTarget: 170,
    scope: "Books, learning, graduation, science, classroom, study, research and knowledge",
    canonicalCategories: ["education"],
  },
  "ai-emerging-tech": {
    id: "ai-emerging-tech",
    name: "AI & Emerging Technology",
    planningTarget: 260,
    scope: "Models, agents, automation, neural systems, robotics, compute, prompts, generation and emerging AI concepts",
    canonicalCategories: ["ai"],
  },
  "brands-tech": {
    id: "brands-tech",
    name: "Brands & Technology",
    planningTarget: 450,
    scope: "Major developer platforms, social products, software, hardware and technology brands",
    canonicalCategories: ["brands"],
  },
  "symbols-misc": {
    id: "symbols-misc",
    name: "Miscellaneous & Symbols",
    planningTarget: 250,
    scope: "Shapes, status indicators, mathematical/utility symbols, accessibility and cross-category primitives",
    canonicalCategories: ["shapes", "status", "symbols"],
  },
};
