// @ts-nocheck
import { z } from 'zod';

export const createPaymentSchema = z.object({
  customerId: z.string().min(1, 'Customer is required'),
  amount: z.number().positive('Amount must be positive'),
  date: z.string().min(1, 'Date is required'),
  paymentMethod: z.enum(['cash', 'check', 'bank-transfer', 'credit-card', 'online', 'other'] as const),
  reference: z.string().optional(),
  notes: z.string().optional(),
  bankAccountId: z.string().optional(),
  allocations: z.array(z.object({ invoiceId: z.string(), amount: z.number().min(0) })).optional(),
});

export const updatePaymentSchema = createPaymentSchema.partial();
export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
export type UpdatePaymentInput = z.infer<typeof updatePaymentSchema>;
