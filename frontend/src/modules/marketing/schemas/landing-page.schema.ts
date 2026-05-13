// ============================================================================
// Landing Page Schemas — Zod v4 validation
// ============================================================================

import { z } from 'zod';

export const pageSectionSchema = z.object({
  type: z.enum([
    'hero',
    'features',
    'testimonials',
    'pricing',
    'cta',
    'faq',
    'form',
    'video',
    'gallery',
    'stats',
    'custom',
  ]),
  title: z.string().optional(),
  content: z.string().optional(),
  config: z.record(z.unknown()).default({}),
  order: z.number().min(0),
});

export type PageSectionInput = z.infer<typeof pageSectionSchema>;

export const createPageSchema = z.object({
  name: z.string().min(1, 'Page name is required'),
  title: z.string().min(1, 'Page title is required'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase, alphanumeric, with hyphens'),
  sections: z.array(pageSectionSchema).min(1, 'At least one section is required'),
  seo: z
    .object({
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
      ogImage: z.string().optional(),
      canonicalUrl: z.string().optional(),
    })
    .optional(),
  variants: z
    .array(
      z.object({
        name: z.string().min(1, 'Variant name is required'),
        isControl: z.boolean().default(false),
        trafficPercent: z.number().min(1).max(100).default(50),
      })
    )
    .optional(),
  status: z.enum(['published', 'draft', 'archived']).default('draft'),
});

export type CreatePageInput = z.infer<typeof createPageSchema>;
