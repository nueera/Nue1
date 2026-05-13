import type { CPQConfig } from "./types";

export function getCPQConfigLabel(item: CPQConfig): string { return item.name || item.id; }