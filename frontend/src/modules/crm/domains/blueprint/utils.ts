import type { Blueprint } from "./types";

export function getBlueprintLabel(item: Blueprint): string { return item.name || item.id; }