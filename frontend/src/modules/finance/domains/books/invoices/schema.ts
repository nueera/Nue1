import { z } from 'zod';

export const createInvoiceSchema = z.object({
  customerId: z.string().min(1, 'Customer is required'),
  date: z.string().min(1, 'Date is required'),
  dueDate: z.string().min(1, 'Due date is required'),
  subject: z.string().optional(),
  notes: z.string().max(5000).optional(),
  terms: z.string().optional(),
  lineItems: z.array(z.object({
    item: z.string().min(1), description: z.string().optional(), quantity: z.number().min(0), rate: z.number().min(0),
  })).min(1, 'At least one line item is required'),
});

export const updateInvoiceSchema = createInvoiceSchema.partial();

export const recordPaymentSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  date: z.string().min(1, 'Payment date is required'),
  paymentMethod: z.enum(['cash', 'check', 'bank-transfer', 'credit-card', 'online', 'other'] as const),
  reference: z.string().optional(),
  notes: z.string().optional(),
});

export type CreateInvoiceInput = z.infer<typeof createInvoiceSchema>;
export type UpdateInvoiceInput = z.infer<typeof updateInvoiceSchema>;
export type RecordPaymentInput = z.infer<typeof recordPaymentSchema>;
