// PaymentLinks Schema — Zoho Checkout
import { z } from 'zod';

export const createPaymentLinkSchema = z.object({
  customerId: z.string().min(1),
  amount: z.number().positive(),
  description: z.string().optional(),
  expiresAt: z.string().optional(),
  maxUses: z.number().positive().default(1),
});
export type CreatePaymentLinkInput = z.infer<typeof createPaymentLinkSchema>;
