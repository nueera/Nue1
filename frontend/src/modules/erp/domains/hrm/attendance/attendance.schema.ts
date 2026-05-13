import { z } from 'zod';

export const createRegularizationSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  checkIn: z.string().min(1, 'Check-in time is required'),
  checkOut: z.string().min(1, 'Check-out time is required'),
  reason: z.string().min(1, 'Reason is required').max(500, 'Reason must be under 500 characters'),
});

export type CreateRegularizationInput = z.infer<typeof createRegularizationSchema>;
