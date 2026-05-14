// @ts-nocheck
import { z } from 'zod';

export const createSalesOrderSchema = z.object({
  customerId: z.string().min(1, 'Customer is required'),
  date: z.string().min(1, 'Date is required'),
  shipmentDate: z.string().optional(),
  notes: z.string().max(5000).optional(),
  terms: z.string().optional(),
  lineItems: z.array(z.object({
    item: z.string().min(1), description: z.string().optional(), quantity: z.number().min(0), rate: z.number().min(0),
  })).min(1, 'At least one line item is required'),
});

export const updateSalesOrderSchema = createSalesOrderSchema.partial();

export type CreateSalesOrderInput = z.infer<typeof createSalesOrderSchema>;
export type UpdateSalesOrderInput = z.infer<typeof updateSalesOrderSchema>;
