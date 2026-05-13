import type { ZiaConfig } from "./types";

export function getZiaConfigLabel(item: ZiaConfig): string { return item.name || item.id; }