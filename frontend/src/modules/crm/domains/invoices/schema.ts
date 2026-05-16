import { z } from "zod";

export const createInvoiceSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
export const updateInvoiceSchema = createInvoiceSchema.partial();
export const invoicesMassUpdateSchema = z.object({ recordIds: z.array(z.string()).min(1), updates: z.record(z.string(), z.unknown()) });
export type CreateInvoiceInput = z.infer<typeof createInvoiceSchema>;
export type UpdateInvoiceInput = z.infer<typeof updateInvoiceSchema>;
export type InvoiceMassUpdateInput = z.infer<typeof invoicesMassUpdateSchema>;