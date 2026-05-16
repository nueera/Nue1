import type { Note } from "./types";

export function getNoteLabel(item: Note): string { return item.content?.substring(0, 50) || item.id; }