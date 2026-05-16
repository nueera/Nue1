import type { Activity } from "./types";

export function getActivityLabel(item: Activity): string { return item.subject || item.id; }