import type { CalendarEvent } from "./types";

export function getCalendarEventLabel(item: CalendarEvent): string { return item.name || item.id; }