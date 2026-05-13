import type { SearchResult } from "./types";

export function getSearchResultLabel(item: SearchResult): string { return item.name || item.id; }