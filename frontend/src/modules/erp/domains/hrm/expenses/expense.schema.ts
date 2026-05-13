import { z } from 'zod';

export const createClaimSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
  date: z.string().min(1, 'Date is required'),
  description: z.string().min(1, 'Description is required').max(1000, 'Description must be under 1000 characters'),
  receiptUrl: z.string().optional(),
  projectId: z.string().optional(),
  isBillable: z.boolean().optional().default(false),
  mileageKm: z.number().min(0).optional(),
  travelFrom: z.string().optional(),
  travelTo: z.string().optional(),
});

export const requestAdvanceSchema = z.object({
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
  reason: z.string().min(1, 'Reason is required').max(500, 'Reason must be under 500 characters'),
  expectedSettlementDate: z.string().min(1, 'Expected settlement date is required'),
  projectId: z.string().optional(),
});

export const travelRequestSchema = z.object({
  purpose: z.string().min(1, 'Travel purpose is required'),
  destination: z.string().min(1, 'Destination is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  travelMode: z.enum(['Flight', 'Train', 'Bus', 'Car', 'Other'] as const, {
    message: 'Travel mode is required',
  }),
  estimatedCost: z.number().min(0, 'Estimated cost must be positive'),
  accommodationRequired: z.boolean().optional().default(false),
  advanceRequired: z.boolean().optional().default(false),
  advanceAmount: z.number().min(0).optional(),
  notes: z.string().max(1000).optional(),
});

export type CreateClaimInput = z.infer<typeof createClaimSchema>;
export type RequestAdvanceInput = z.infer<typeof requestAdvanceSchema>;
export type TravelRequestInput = z.infer<typeof travelRequestSchema>;
