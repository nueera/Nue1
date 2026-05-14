// @ts-nocheck
import type { CalendarEvent } from "./types";

export function getCalendarEventLabel(item: CalendarEvent): string { return item.title || item.id; }