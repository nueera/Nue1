// @ts-nocheck
// ============================================================================
// Contact Schemas — Zod v4 validation
// ============================================================================

import { z } from 'zod';

export const createContactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  title: z.string().optional(),
  preferences: z.array(
    z.enum(['email', 'sms', 'whatsapp', 'phone', 'none'])
  ).default(['email']),
  tags: z.array(z.string()).default([]),
});

export type CreateContactInput = z.infer<typeof createContactSchema>;

export const updateContactSchema = z.object({
  firstName: z.string().min(1, 'First name is required').optional(),
  lastName: z.string().min(1, 'Last name is required').optional(),
  email: z.string().email('Invalid email address').optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  title: z.string().optional(),
  preferences: z.array(
    z.enum(['email', 'sms', 'whatsapp', 'phone', 'none'])
  ).optional(),
  tags: z.array(z.string()).optional(),
});

export type UpdateContactInput = z.infer<typeof updateContactSchema>;
