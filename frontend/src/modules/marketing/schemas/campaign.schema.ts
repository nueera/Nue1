// ============================================================================
// Campaign Schemas — Zod v4 validation
// ============================================================================

import { z } from 'zod';

export const createCampaignSchema = z.object({
  name: z.string().min(1, 'Campaign name is required'),
  type: z.enum(['email', 'sms', 'whatsapp', 'social', 'multi_channel']),
  channel: z.enum([
    'email',
    'sms',
    'whatsapp',
    'facebook',
    'instagram',
    'linkedin',
    'twitter',
    'google_ads',
    'web_push',
  ]),
  subject: z.string().optional(),
  content: z.string().optional(),
  audienceIds: z.array(z.string()).default([]),
  segmentIds: z.array(z.string()).default([]),
  scheduleDate: z.string().optional(),
  abVariants: z.array(
    z.object({
      name: z.string().min(1, 'Variant name is required'),
      subject: z.string().optional(),
      content: z.string().optional(),
      trafficPercent: z.number().min(1).max(100).default(50),
    })
  ).optional(),
});

export type CreateCampaignInput = z.infer<typeof createCampaignSchema>;

export const scheduleCampaignSchema = z.object({
  campaignId: z.string().min(1, 'Campaign ID is required'),
  scheduledAt: z.string().min(1, 'Schedule date is required'),
  timezone: z.string().default('UTC'),
  recurrence: z.enum(['once', 'daily', 'weekly', 'monthly']).default('once'),
});

export type ScheduleCampaignInput = z.infer<typeof scheduleCampaignSchema>;

export const abTestSchema = z.object({
  name: z.string().min(1, 'A/B test name is required'),
  type: z.enum([
    'subject_line',
    'content',
    'cta',
    'send_time',
    'from_name',
    'design',
  ]),
  campaignId: z.string().optional(),
  variants: z
    .array(
      z.object({
        name: z.string().min(1, 'Variant name is required'),
        description: z.string().optional(),
        trafficPercent: z.number().min(1).max(100),
        isControl: z.boolean().default(false),
      })
    )
    .min(2, 'At least 2 variants are required'),
  confidenceLevel: z.number().min(80).max(99).default(95),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
});

export type ABTestInput = z.infer<typeof abTestSchema>;
