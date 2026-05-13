// ============================================================================
// Vendors — Schema
// ============================================================================

import { z } from 'zod';

export const createVendorSchema = z.object({
  name: z.string().min(1, 'Vendor name is required'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  phone: z.string().optional(),
  company: z.string().optional(),
  displayName: z.string().optional(),
  status: z.enum(['active', 'inactive', 'on-hold'] as const).default('active'),
  currency: z.string().default('USD'),
  paymentTerms: z.string().default('net_30'),
  notes: z.string().max(5000).optional(),
  taxId: z.string().optional(),
  taxExempt: z.boolean().default(false),
  website: z.string().url().optional().or(z.literal('')),
  tags: z.array(z.string()).default([]),
});

export const updateVendorSchema = createVendorSchema.partial();

export type CreateVendorInput = z.infer<typeof createVendorSchema>;
export type UpdateVendorInput = z.infer<typeof updateVendorSchema>;
