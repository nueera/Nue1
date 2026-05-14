// @ts-nocheck
// ============================================================================
// Signup Form Schemas — Zod v4 validation
// ============================================================================

import { z } from 'zod';

export const formFieldSchema = z.object({
  id: z.string().min(1, 'Field ID is required'),
  type: z.enum([
    'text',
    'email',
    'phone',
    'number',
    'select',
    'radio',
    'checkbox',
    'textarea',
    'date',
    'url',
    'hidden',
    'consent',
  ]),
  label: z.string().min(1, 'Field label is required'),
  name: z.string().min(1, 'Field name is required'),
  placeholder: z.string().optional(),
  required: z.boolean().default(false),
  options: z.array(z.string()).optional(),
  defaultValue: z.string().optional(),
  helpText: z.string().optional(),
  order: z.number().min(0),
});

export type FormFieldInput = z.infer<typeof formFieldSchema>;

export const createFormSchema = z.object({
  name: z.string().min(1, 'Form name is required'),
  fields: z.array(formFieldSchema).min(1, 'At least one field is required'),
  theme: z.enum(['minimal', 'card', 'full', 'popup', 'slide_in', 'floating_bar']).default('card'),
  layout: z.enum(['single_column', 'two_column', 'inline']).default('single_column'),
  redirectUrl: z.string().url('Invalid redirect URL').optional(),
  successMessage: z.string().default('Thank you for signing up!'),
});

export type CreateFormInput = z.infer<typeof createFormSchema>;
