import type { Case } from "./types";

export function getCaseLabel(item: Case): string { return item.name || item.id; }