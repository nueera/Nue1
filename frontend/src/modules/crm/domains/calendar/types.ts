import type { CrmRecord } from "../../core/types";

export type CalendarView = "day" | "week" | "month";

export interface CalendarEvent { id: string; title: string; start: string; end: string; allDay: boolean; color: string; type: string; description: string; location: string; attendees: { name: string; email: string }[]; }

export interface WorkingHours { start: string; end: string; days: number[]; }
