import { z } from 'zod';

export const createCustomReportSchema = z.object({
  name: z.string().min(1, 'Report name is required'),
  category: z.enum(['Employee', 'Attendance', 'Leave', 'Payroll', 'Performance', 'Recruitment', 'Training', 'Expense', 'Shift', 'Loan'] as const, {
    message: 'Category is required',
  }),
  description: z.string().min(1, 'Description is required').max(500, 'Description must be under 500 characters'),
  fields: z.array(z.string()).min(1, 'At least one field is required'),
  filters: z.array(z.object({
    field: z.string().min(1, 'Filter field is required'),
    operator: z.enum(['eq', 'neq', 'gt', 'gte', 'lt', 'lte', 'contains', 'between', 'in'] as const),
    value: z.union([z.string(), z.number(), z.boolean(), z.array(z.string())]),
  })).optional(),
  groupBy: z.array(z.string()).optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc'] as const).optional(),
  chartType: z.enum(['bar', 'line', 'pie', 'table', 'metric'] as const).optional(),
  dateRange: z.object({
    start: z.string().min(1, 'Start date is required'),
    end: z.string().min(1, 'End date is required'),
  }).optional(),
});

export const scheduleReportSchema = z.object({
  reportId: z.string().min(1, 'Report ID is required'),
  frequency: z.enum(['daily', 'weekly', 'monthly', 'quarterly'] as const, {
    message: 'Frequency is required',
  }),
  recipients: z.array(z.string().email('Invalid email')).min(1, 'At least one recipient is required'),
  format: z.enum(['pdf', 'xlsx', 'csv'] as const, {
    message: 'Format is required',
  }),
  isActive: z.boolean().optional().default(true),
  dayOfWeek: z.number().min(0).max(6).optional(), // 0=Sunday, for weekly
  dayOfMonth: z.number().min(1).max(31).optional(), // for monthly/quarterly
  time: z.string().min(1, 'Time is required'), // HH:mm format
});

export type CreateCustomReportInput = z.infer<typeof createCustomReportSchema>;
export type ScheduleReportInput = z.infer<typeof scheduleReportSchema>;
