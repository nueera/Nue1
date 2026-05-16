import type { SearchResult } from "./types";

export function getSearchResultLabel(item: SearchResult): string { return item.title || item.id; }