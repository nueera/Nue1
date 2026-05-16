// Subscriptions Schema — Zoho Billing
import { z } from 'zod';

export const createSubscriptionSchema = z.object({
  customerId: z.string().min(1, 'Customer is required'),
  planId: z.string().min(1, 'Plan is required'),
  startDate: z.string(),
  couponId: z.string().optional(),
});
export type CreateSubscriptionInput = z.infer<typeof createSubscriptionSchema>;
