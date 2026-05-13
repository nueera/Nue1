import type { PriceBook } from "./types";

export function getPriceBookLabel(item: PriceBook): string { return item.name || item.id; }