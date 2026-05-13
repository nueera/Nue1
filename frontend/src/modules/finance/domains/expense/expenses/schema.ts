// Expenses Schema — Zoho Expense
import { z } from 'zod';

export const createExpenseSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  amount: z.number().positive(),
  date: z.string(),
  vendor: z.string().optional(),
  isBillable: z.boolean().default(true),
});
export type CreateExpenseInput = z.infer<typeof createExpenseSchema>;
