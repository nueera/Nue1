// @ts-nocheck
// ExpenseReports Schema — Zoho Expense
import { z } from 'zod';

export const createExpenseReportSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  policyId: z.string().optional(),
});
export type CreateExpenseReportInput = z.infer<typeof createExpenseReportSchema>;
