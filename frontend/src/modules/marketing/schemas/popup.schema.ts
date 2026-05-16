// ============================================================================
// Popup Schemas — Zod v4 validation
// ============================================================================

import { z } from 'zod';

export const triggerConfigSchema = z.object({
  delaySeconds: z.number().min(0).optional(),
  scrollPercentage: z.number().min(0).max(100).optional(),
  clickSelector: z.string().optional(),
  inactivitySeconds: z.number().min(0).optional(),
  pageViews: z.number().min(0).optional(),
  sessionsCount: z.number().min(0).optional(),
});

export type TriggerConfigInput = z.infer<typeof triggerConfigSchema>;

export const createPopupSchema = z.object({
  name: z.string().min(1, 'Popup name is required'),
  type: z.enum(['popup', 'slide_in', 'floating_bar', 'full_screen', 'sticky_bar']),
  triggers: z.array(
    z.enum([
      'time_on_page',
      'scroll_percentage',
      'exit_intent',
      'click_element',
      'page_load',
      'inactivity',
      'manual',
    ])
  ).min(1, 'At least one trigger is required'),
  targeting: z.array(
    z.enum([
      'all_visitors',
      'new_visitors',
      'returning_visitors',
      'specific_pages',
      'specific_segments',
      'geo_location',
      'device_type',
      'utm_source',
    ])
  ).default(['all_visitors']),
  theme: z
    .object({
      primaryColor: z.string().optional(),
      backgroundColor: z.string().optional(),
      borderRadius: z.string().optional(),
      fontFamily: z.string().optional(),
    })
    .optional(),
  content: z
    .object({
      headline: z.string().optional(),
      body: z.string().optional(),
      ctaText: z.string().optional(),
      ctaUrl: z.string().optional(),
      imageUrl: z.string().optional(),
      dismissible: z.boolean().default(true),
    })
    .optional(),
});

export type CreatePopupInput = z.infer<typeof createPopupSchema>;
