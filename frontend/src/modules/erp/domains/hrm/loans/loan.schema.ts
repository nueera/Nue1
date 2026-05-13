import { z } from 'zod';

export const createLoanTypeSchema = z.object({
  name: z.string().min(1, 'Loan type name is required'),
  description: z.string().min(1, 'Description is required'),
  interestRate: z.number().min(0, 'Interest rate must be non-negative').max(50, 'Interest rate must be under 50%'),
  maxAmount: z.number().min(0, 'Maximum amount must be positive'),
  maxTenureMonths: z.number().min(1, 'Maximum tenure must be at least 1 month'),
  repaymentFrequency: z.enum(['monthly', 'quarterly'] as const, {
    message: 'Repayment frequency is required',
  }),
  processingFee: z.number().min(0, 'Processing fee must be non-negative').optional(),
  requiresGuarantor: z.boolean().optional().default(false),
  maxLoanToSalaryRatio: z.number().min(0).max(20).optional(),
});

export const applyLoanSchema = z.object({
  loanTypeId: z.string().min(1, 'Loan type is required'),
  amount: z.number().min(1, 'Loan amount is required').max(10000000, 'Amount exceeds maximum'),
  tenureMonths: z.number().min(1, 'Tenure must be at least 1 month').max(360, 'Tenure exceeds maximum'),
  purpose: z.string().min(1, 'Purpose is required').max(1000, 'Purpose must be under 1000 characters'),
  employeeId: z.string().min(1, 'Employee ID is required'),
  guarantorId: z.string().optional(),
  supportingDocUrl: z.string().optional(),
});

export const approveLoanSchema = z.object({
  comments: z.string().max(500, 'Comments must be under 500 characters').optional(),
  approvedAmount: z.number().min(0, 'Approved amount must be positive').optional(),
  disbursalDate: z.string().optional(),
});

export type CreateLoanTypeInput = z.infer<typeof createLoanTypeSchema>;
export type ApplyLoanInput = z.infer<typeof applyLoanSchema>;
export type ApproveLoanInput = z.infer<typeof approveLoanSchema>;
