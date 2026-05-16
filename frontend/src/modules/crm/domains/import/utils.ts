import type { ImportJob } from "./types";

export function getImportJobLabel(item: ImportJob): string { return item.fileName || item.id; }