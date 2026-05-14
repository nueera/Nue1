// @ts-nocheck
import { z } from 'zod';

export const createCreditNoteSchema = z.object({
  customerId: z.string().min(1, 'Customer is required'),
  date: z.string().min(1, 'Date is required'),
  reason: z.string().optional(),
  notes: z.string().max(5000).optional(),
  invoiceId: z.string().optional(),
  lineItems: z.array(z.object({ item: z.string().min(1), description: z.string().optional(), quantity: z.number().min(0), rate: z.number().min(0) })).min(1),
});

export const updateCreditNoteSchema = createCreditNoteSchema.partial();
export type CreateCreditNoteInput = z.infer<typeof createCreditNoteSchema>;
export type UpdateCreditNoteInput = z.infer<typeof updateCreditNoteSchema>;
