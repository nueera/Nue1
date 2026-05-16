// ============================================================================
// Journey Schemas — Zod v4 validation
// ============================================================================

import { z } from 'zod';

export const journeyNodeSchema = z.object({
  id: z.string().min(1, 'Node ID is required'),
  type: z.enum([
    'trigger',
    'delay',
    'email',
    'sms',
    'whatsapp',
    'condition',
    'action',
    'exit',
    'webhook',
    'update_field',
    'add_to_list',
    'remove_from_list',
    'score',
    'notification',
  ]),
  label: z.string().min(1, 'Node label is required'),
  // @ts-expect-error — Expected 2-3 arguments, but got 1.
  config: z.record(z.unknown()).default({}),
  position: z.object({
    x: z.number(),
    y: z.number(),
  }),
});

export type JourneyNodeInput = z.infer<typeof journeyNodeSchema>;

export const journeyEdgeSchema = z.object({
  id: z.string().min(1, 'Edge ID is required'),
  source: z.string().min(1, 'Source node ID is required'),
  target: z.string().min(1, 'Target node ID is required'),
  sourceHandle: z.string().optional(),
  targetHandle: z.string().optional(),
  label: z.string().optional(),
  condition: z.string().optional(),
});

export type JourneyEdgeInput = z.infer<typeof journeyEdgeSchema>;

export const journeyConfigSchema = z.object({
  name: z.string().min(1, 'Journey name is required'),
  description: z.string().optional(),
  nodes: z.array(journeyNodeSchema).min(1, 'At least one node is required'),
  edges: z.array(journeyEdgeSchema).default([]),
  trigger: z.enum([
    'list_entry',
    'form_submit',
    'page_visit',
    'email_open',
    'email_click',
    'purchase',
    'custom_event',
    'date_based',
    'score_threshold',
    'api_call',
    'field_change',
  ]),
  status: z.enum(['draft', 'active', 'paused', 'completed', 'archived']).default('draft'),
});

export type JourneyConfigInput = z.infer<typeof journeyConfigSchema>;
