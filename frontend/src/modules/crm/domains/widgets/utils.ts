import type { Widget } from "./types";

export function getWidgetLabel(item: Widget): string { return item.name || item.id; }