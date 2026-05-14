// @ts-nocheck
// Transactions Schema — Zoho Checkout
import { z } from 'zod';

export const refundTransactionSchema = z.object({
  transactionId: z.string().min(1),
  amount: z.number().positive(),
  reason: z.string().optional(),
});
export type RefundTransactionInput = z.infer<typeof refundTransactionSchema>;
