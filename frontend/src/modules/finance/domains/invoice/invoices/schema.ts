// Invoices Schema — Zoho Invoice
import { z } from 'zod';

export const createInvoiceSchema = z.object({
  customerId: z.string().min(1, 'Customer is required'),
  lineItems: z.array(z.object({ item: z.string(), quantity: z.number().positive(), rate: z.number() })).min(1),
  date: z.string(),
  dueDate: z.string(),
  paymentTermsId: z.string().optional(),
  notes: z.string().optional(),
});
export type CreateInvoiceInput = z.infer<typeof createInvoiceSchema>;
export const updateInvoiceSchema = createInvoiceSchema.partial();
export type UpdateInvoiceInput = z.infer<typeof updateInvoiceSchema>;
