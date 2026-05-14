// @ts-nocheck
// ============================================================================
// Segment Schemas — Zod v4 validation
// ============================================================================

import { z } from 'zod';

export const segmentRuleSchema = z.object({
  id: z.string().min(1, 'Rule ID is required'),
  name: z.string().min(1, 'Rule name is required'),
  conditions: z
    .array(
      z.object({
        id: z.string().min(1, 'Condition ID is required'),
        field: z.string().min(1, 'Field is required'),
        operator: z.enum([
          'equals',
          'not_equals',
          'contains',
          'not_contains',
          'starts_with',
          'ends_with',
          'greater_than',
          'less_than',
          'between',
          'in',
          'not_in',
          'is_set',
          'is_not_set',
          'before',
          'after',
          'within_last',
          'within_next',
        ]),
        value: z.union([z.string(), z.number(), z.boolean()]),
        logicalOperator: z.enum(['and', 'or']).default('and'),
      })
    )
    .min(1, 'At least one condition is required'),
});

export type SegmentRuleInput = z.infer<typeof segmentRuleSchema>;

export const conditionGroupSchema = z.object({
  name: z.string().min(1, 'Group name is required'),
  rules: z.array(segmentRuleSchema).min(1, 'At least one rule is required'),
  logic: z.enum(['and', 'or']).default('and'),
  description: z.string().optional(),
});

export type ConditionGroupInput = z.infer<typeof conditionGroupSchema>;
