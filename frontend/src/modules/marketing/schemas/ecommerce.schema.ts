// @ts-nocheck
// ============================================================================
// E-Commerce Schemas — Zod v4 validation
// ============================================================================

import { z } from 'zod';

export const storeConnectSchema = z.object({
  storeName: z.string().min(1, 'Store name is required'),
  platform: z.enum(['shopify', 'woocommerce', 'magento', 'bigcommerce', 'custom']),
  apiKey: z.string().min(1, 'API key is required'),
  domain: z.string().min(1, 'Domain is required'),
  currency: z.string().default('USD'),
});

export type StoreConnectInput = z.infer<typeof storeConnectSchema>;

export const cartRecoverySchema = z.object({
  cartRules: z.object({
    delayHours: z.number().min(0).default(1),
    maxReminders: z.number().min(1).max(5).default(3),
    discountPercent: z.number().min(0).max(100).optional(),
    excludePurchasedItems: z.boolean().default(true),
  }),
  recoveryConfig: z.object({
    channels: z.array(z.enum(['email', 'sms', 'push'])).min(1, 'At least one channel is required'),
    templateId: z.string().optional(),
    activeHoursOnly: z.boolean().default(false),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  }),
});

export type CartRecoveryInput = z.infer<typeof cartRecoverySchema>;
