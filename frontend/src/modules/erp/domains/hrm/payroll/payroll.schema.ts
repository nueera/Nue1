import { z } from 'zod';

export const runPayrollSchema = z.object({
  month: z.string().min(1, 'Month is required'),
  department: z.string().optional(),
  processAll: z.boolean().optional().default(false),
});

export const createSalaryStructureSchema = z.object({
  employeeId: z.string().min(1, 'Employee ID is required'),
  ctc: z.number().min(0, 'CTC must be a positive number'),
  basic: z.number().min(0, 'Basic salary must be positive'),
  hra: z.number().min(0, 'HRA must be positive'),
  da: z.number().min(0, 'DA must be positive'),
  specialAllowance: z.number().min(0, 'Special allowance must be positive'),
  pf: z.number().min(0, 'PF must be positive'),
  esi: z.number().min(0, 'ESI must be positive'),
  tax: z.number().min(0, 'Tax must be positive'),
  effectiveDate: z.string().min(1, 'Effective date is required'),
});

export type RunPayrollInput = z.infer<typeof runPayrollSchema>;
export type CreateSalaryStructureInput = z.infer<typeof createSalaryStructureSchema>;
