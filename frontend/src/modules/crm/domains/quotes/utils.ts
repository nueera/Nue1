import type { Quote } from "./types";

export function getQuoteLabel(item: Quote): string { return item.name || item.id; }