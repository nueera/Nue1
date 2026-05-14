// @ts-nocheck
import type { Note } from "./types";

export function getNoteLabel(item: Note): string { return item.name || item.id; }