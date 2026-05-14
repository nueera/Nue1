// @ts-nocheck
// ============================================================================
// Scoring Schemas — Zod v4 validation
// ============================================================================

import { z } from 'zod';

export const scoringRuleSchema = z.object({
  name: z.string().min(1, 'Rule name is required'),
  criteria: z.enum([
    'email_engagement',
    'web_activity',
    'social_engagement',
    'demographic_fit',
    'behavioral',
    'custom',
  ]),
  condition: z.string().min(1, 'Condition is required'),
  weight: z.number().min(0).max(10).default(1),
  scoreValue: z.number().min(-100).max(100),
  active: z.boolean().default(true),
});

export type ScoringRuleInput = z.infer<typeof scoringRuleSchema>;

export const criteriaGroupSchema = z.object({
  name: z.string().min(1, 'Group name is required'),
  criteria: z.enum([
    'email_engagement',
    'web_activity',
    'social_engagement',
    'demographic_fit',
    'behavioral',
    'custom',
  ]),
  weight: z.number().min(0).max(10).default(1),
  scoreValue: z.number().min(0).max(100),
  active: z.boolean().default(true),
});

export type CriteriaGroupInput = z.infer<typeof criteriaGroupSchema>;
