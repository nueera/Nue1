import type { Dashboard } from "./types";

export function getDashboardLabel(item: Dashboard): string { return item.name || item.id; }