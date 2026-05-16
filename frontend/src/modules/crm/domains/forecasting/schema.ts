import { z } from "zod";

export const createForecastPeriodSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export const updateForecastPeriodSchema = createForecastPeriodSchema.partial();
export const forecastingMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.string(), z.unknown()) });
export type CreateForecastPeriodInput = z.infer<typeof createForecastPeriodSchema>;
export type UpdateForecastPeriodInput = z.infer<typeof updateForecastPeriodSchema>;
export type ForecastPeriodMassUpdateInput = z.infer<typeof forecastingMassUpdateSchema>;