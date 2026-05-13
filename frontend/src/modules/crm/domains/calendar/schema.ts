import { z } from "zod";

export const createCalendarEventSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export const updateCalendarEventSchema = createCalendarEventSchema.partial();
export const calendarMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.unknown()) });
export type CreateCalendarEventInput = z.infer<typeof createCalendarEventSchema>;
export type UpdateCalendarEventInput = z.infer<typeof updateCalendarEventSchema>;
export type CalendarEventMassUpdateInput = z.infer<typeof calendarMassUpdateSchema>;