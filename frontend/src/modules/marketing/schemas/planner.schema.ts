// @ts-nocheck
// ============================================================================
// Planner Schemas — Zod v4 validation
// ============================================================================

import { z } from 'zod';

export const planActivitySchema = z.object({
  type: z.enum([
    'campaign',
    'content',
    'event',
    'social_post',
    'ad_spend',
    'review',
    'meeting',
    'deadline',
  ]),
  name: z.string().min(1, 'Activity name is required'),
  description: z.string().optional(),
  assignedTo: z.string().optional(),
  dueDate: z.string().optional(),
  status: z.enum(['pending', 'in_progress', 'completed', 'cancelled']).default('pending'),
  budget: z.number().min(0).optional(),
});

export type PlanActivityInput = z.infer<typeof planActivitySchema>;

export const createPlanSchema = z.object({
  name: z.string().min(1, 'Plan name is required'),
  activities: z.array(planActivitySchema).default([]),
  budget: z
    .object({
      allocated: z.number().min(0, 'Budget must be non-negative'),
      spent: z.number().min(0).default(0),
      remaining: z.number().min(0).default(0),
      currency: z.string().default('USD'),
    })
    .optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  milestones: z
    .array(
      z.object({
        name: z.string().min(1, 'Milestone name is required'),
        dueDate: z.string().min(1, 'Due date is required'),
      })
    )
    .default([]),
  collaborators: z.array(z.string()).default([]),
});

export type CreatePlanInput = z.infer<typeof createPlanSchema>;
