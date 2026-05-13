// Payments Schema — Zoho Invoice
import { z } from 'zod';

export const createPaymentSchema = z.object({
  customerId: z.string().min(1),
  amount: z.number().positive(),
  date: z.string(),
  method: z.enum(['credit_card','bank_transfer','check','cash','wire_transfer','paypal','stripe'] as const),
  reference: z.string().optional(),
});
export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
