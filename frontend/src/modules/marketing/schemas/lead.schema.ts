// @ts-nocheck
// ============================================================================
// Lead Schemas — Zod v4 validation
// ============================================================================

import { z } from 'zod';

export const createLeadSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  source: z.enum([
    'website',
    'social_media',
    'email',
    'referral',
    'paid_ads',
    'organic_search',
    'events',
    'webinar',
    'content_download',
    'chat',
    'phone',
    'partner',
    'other',
  ]),
  stage: z.enum([
    'new',
    'contacted',
    'qualified',
    'proposal',
    'negotiation',
    'closed_won',
    'closed_lost',
    'nurturing',
  ]).default('new'),
  score: z.number().min(0).max(100).optional(),
  owner: z.string().optional(),
  notes: z.string().optional(),
  tags: z.array(z.string()).default([]),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;

export const updateLeadSchema = z.object({
  firstName: z.string().min(1, 'First name is required').optional(),
  lastName: z.string().min(1, 'Last name is required').optional(),
  email: z.string().email('Invalid email address').optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  source: z.enum([
    'website',
    'social_media',
    'email',
    'referral',
    'paid_ads',
    'organic_search',
    'events',
    'webinar',
    'content_download',
    'chat',
    'phone',
    'partner',
    'other',
  ]).optional(),
  stage: z.enum([
    'new',
    'contacted',
    'qualified',
    'proposal',
    'negotiation',
    'closed_won',
    'closed_lost',
    'nurturing',
  ]).optional(),
  score: z.number().min(0).max(100).optional(),
  owner: z.string().optional(),
  notes: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export type UpdateLeadInput = z.infer<typeof updateLeadSchema>;

export const importLeadSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  source: z.enum([
    'website',
    'social_media',
    'email',
    'referral',
    'paid_ads',
    'organic_search',
    'events',
    'webinar',
    'content_download',
    'chat',
    'phone',
    'partner',
    'other',
  ]).default('other'),
  stage: z.enum([
    'new',
    'contacted',
    'qualified',
    'proposal',
    'negotiation',
    'closed_won',
    'closed_lost',
    'nurturing',
  ]).default('new'),
  score: z.number().min(0).max(100).optional(),
  owner: z.string().optional(),
  notes: z.string().optional(),
  tags: z.array(z.string()).default([]),
});

export type ImportLeadInput = z.infer<typeof importLeadSchema>;
