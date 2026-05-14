// @ts-nocheck
// Contacts Schema — Cross-product
import { z } from 'zod';

export const createContactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  type: z.enum(['customer','vendor','both'] as const),
  company: z.string().optional(),
});
export type CreateContactInput = z.infer<typeof createContactSchema>;
