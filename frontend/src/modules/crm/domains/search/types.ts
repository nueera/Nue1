import type { CrmRecord } from "../../core/types";

export interface SearchResult { id: string; type: string; module: string; title: string; subtitle: string; url: string; score: number; }

export interface SearchSuggestion { text: string; type: "history" | "suggestion"; module?: string; }
