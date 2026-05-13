import { z } from 'zod';

export const createShiftTypeSchema = z.object({
  name: z.string().min(1, 'Shift name is required'),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  graceMinutes: z.number().min(0, 'Grace minutes must be non-negative'),
  isNightShift: z.boolean().optional().default(false),
  color: z.string().optional(),
});

export const shiftRequestSchema = z.object({
  employeeId: z.string().min(1, 'Employee ID is required'),
  requestedShiftId: z.string().min(1, 'Requested shift is required'),
  reason: z.string().min(1, 'Reason is required').max(500, 'Reason must be under 500 characters'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
});

export const shiftAssignmentSchema = z.object({
  employeeId: z.string().min(1, 'Employee ID is required'),
  shiftTypeId: z.string().min(1, 'Shift type is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  isRotating: z.boolean().optional().default(false),
  rotationFrequency: z.enum(['weekly', 'bi-weekly', 'monthly']).optional(),
});

export type CreateShiftTypeInput = z.infer<typeof createShiftTypeSchema>;
export type ShiftRequestInput = z.infer<typeof shiftRequestSchema>;
export type ShiftAssignmentInput = z.infer<typeof shiftAssignmentSchema>;
