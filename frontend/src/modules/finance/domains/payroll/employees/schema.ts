// Employees Schema — Zoho Payroll
import { z } from 'zod';

export const createEmployeeSchema = z.object({
  firstName: z.string().min(1, 'First name required'),
  lastName: z.string().min(1, 'Last name required'),
  email: z.string().email('Invalid email'),
  department: z.string().min(1, 'Department required'),
  designation: z.string().min(1, 'Designation required'),
  employmentType: z.enum(['full_time','part_time','contractor','intern'] as const),
  salary: z.number().positive(),
  hireDate: z.string(),
});
export type CreateEmployeeInput = z.infer<typeof createEmployeeSchema>;
