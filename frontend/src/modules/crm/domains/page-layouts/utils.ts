import type { PageLayout } from "./types";

export function getPageLayoutLabel(item: PageLayout): string { return item.name || item.id; }