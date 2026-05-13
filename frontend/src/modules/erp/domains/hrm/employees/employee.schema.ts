import { z } from 'zod';

export const createEmployeeSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  department: z.string().min(1, 'Department is required'),
  position: z.string().min(1, 'Position is required'),
  employmentType: z.enum(['full-time', 'part-time', 'contract', 'intern'] as const, {
    message: 'Employment type is required',
  }),
  joinDate: z.string().min(1, 'Join date is required'),
  salary: z.number().min(0, 'Salary must be a positive number'),
  reportingManager: z.string().optional(),
  gender: z.enum(['male', 'female', 'other'] as const).optional(),
  dateOfBirth: z.string().optional(),
  address: z.object({
    present: z.string().min(1, 'Present address is required'),
    permanent: z.string().min(1, 'Permanent address is required'),
  }).optional(),
  emergencyContacts: z.array(z.object({
    name: z.string().min(1, 'Contact name is required'),
    relationship: z.string().min(1, 'Relationship is required'),
    phone: z.string().min(1, 'Contact phone is required'),
  })).optional(),
  bankDetails: z.object({
    bankName: z.string().min(1, 'Bank name is required'),
    accountNumber: z.string().min(1, 'Account number is required'),
    ifscCode: z.string().min(1, 'IFSC code is required'),
    accountType: z.string().min(1, 'Account type is required'),
  }).optional(),
});

export const updateEmployeeSchema = createEmployeeSchema.partial();

export type CreateEmployeeInput = z.infer<typeof createEmployeeSchema>;
export type UpdateEmployeeInput = z.infer<typeof updateEmployeeSchema>;
