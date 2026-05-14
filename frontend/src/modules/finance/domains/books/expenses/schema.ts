// @ts-nocheck
import { z } from 'zod';

export const createExpenseSchema = z.object({
  employeeId: z.string().min(1, 'Employee is required'),
  categoryId: z.string().min(1, 'Category is required'),
  description: z.string().min(1, 'Description is required'),
  amount: z.number().positive('Amount must be positive'),
  date: z.string().min(1, 'Date is required'),
  vendorId: z.string().optional(),
  projectId: z.string().optional(),
  isBillable: z.boolean().default(false),
  isReimbursable: z.boolean().default(true),
  notes: z.string().max(5000).optional(),
});

export const updateExpenseSchema = createExpenseSchema.partial();
export type CreateExpenseInput = z.infer<typeof createExpenseSchema>;
export type UpdateExpenseInput = z.infer<typeof updateExpenseSchema>;
