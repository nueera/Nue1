// @ts-nocheck
// ============================================================================
// Customers — Schema (Zod Validation)
// ============================================================================

import { z } from 'zod';

export const customerContactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  phone: z.string().optional(),
  mobile: z.string().optional(),
  designation: z.string().optional(),
  isPrimary: z.boolean().default(false),
});

export const addressSchema = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  country: z.string().optional(),
});

export const createCustomerSchema = z.object({
  name: z.string().min(1, 'Customer name is required'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  phone: z.string().optional(),
  company: z.string().optional(),
  displayName: z.string().optional(),
  status: z.enum(['active', 'inactive', 'on-hold'] as const).default('active'),
  currency: z.string().default('USD'),
  paymentTerms: z.string().default('net_30'),
  billingAddress: addressSchema.optional(),
  shippingAddress: addressSchema.optional(),
  notes: z.string().max(5000).optional(),
  taxId: z.string().optional(),
  taxExempt: z.boolean().default(false),
  website: z.string().url().optional().or(z.literal('')),
  tags: z.array(z.string()).default([]),
});

export const updateCustomerSchema = createCustomerSchema.partial();

export const customerStatementSchema = z.object({
  customerId: z.string().min(1, 'Customer is required'),
  from: z.string().min(1, 'Start date is required'),
  to: z.string().min(1, 'End date is required'),
});

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;
export type UpdateCustomerInput = z.infer<typeof updateCustomerSchema>;
export type CustomerStatementInput = z.infer<typeof customerStatementSchema>;
export type CustomerContactInput = z.infer<typeof customerContactSchema>;
