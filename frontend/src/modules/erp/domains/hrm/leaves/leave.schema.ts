import { z } from 'zod';

export const applyLeaveSchema = z.object({
  type: z.enum(['annual', 'sick', 'personal', 'maternity', 'paternity', 'unpaid'] as const, {
    message: 'Leave type is required',
  }),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  reason: z.string().min(1, 'Reason is required').max(1000, 'Reason must be under 1000 characters'),
  employeeId: z.string().min(1, 'Employee ID is required'),
});

export const approveLeaveSchema = z.object({
  comments: z.string().max(500, 'Comments must be under 500 characters').optional(),
});

export const rejectLeaveSchema = z.object({
  reason: z.string().min(1, 'Rejection reason is required').max(500, 'Reason must be under 500 characters'),
});

export type ApplyLeaveInput = z.infer<typeof applyLeaveSchema>;
export type ApproveLeaveInput = z.infer<typeof approveLeaveSchema>;
export type RejectLeaveInput = z.infer<typeof rejectLeaveSchema>;
