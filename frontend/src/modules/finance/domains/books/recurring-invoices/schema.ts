// @ts-nocheck
import { z } from 'zod';

export const createRecurringInvoiceSchema = z.object({
  customerId: z.string().min(1, 'Customer is required'),
  frequency: z.enum(['weekly', 'biweekly', 'monthly', 'bimonthly', 'quarterly', 'semi-annually', 'annually'] as const),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  subject: z.string().optional(),
  notes: z.string().max(5000).optional(),
  terms: z.string().optional(),
  autoSend: z.boolean().default(false),
  lineItems: z.array(z.object({ item: z.string().min(1), description: z.string().optional(), quantity: z.number().min(0), rate: z.number().min(0) })).min(1),
});

export const updateRecurringInvoiceSchema = createRecurringInvoiceSchema.partial();
export type CreateRecurringInvoiceInput = z.infer<typeof createRecurringInvoiceSchema>;
export type UpdateRecurringInvoiceInput = z.infer<typeof updateRecurringInvoiceSchema>;
