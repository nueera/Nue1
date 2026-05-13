import type { Product } from "./types";

export function getProductLabel(item: Product): string { return item.name || item.id; }