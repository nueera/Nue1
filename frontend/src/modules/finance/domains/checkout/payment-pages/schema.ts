// @ts-nocheck
// PaymentPages Schema — Zoho Checkout
import { z } from 'zod';

export const createPaymentPageSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  amount: z.number().positive(),
  description: z.string().optional(),
  isRecurring: z.boolean().default(false),
});
export type CreatePaymentPageInput = z.infer<typeof createPaymentPageSchema>;
