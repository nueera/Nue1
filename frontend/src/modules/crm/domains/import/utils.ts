import type { ImportJob } from "./types";

export function getImportJobLabel(item: ImportJob): string { return item.name || item.id; }