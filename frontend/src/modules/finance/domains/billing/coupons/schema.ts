// Coupons Schema — Zoho Billing
import { z } from 'zod';

export const createCouponSchema = z.object({
  code: z.string().min(1, 'Code is required'),
  discountType: z.enum(['percentage','flat'] as const),
  discountValue: z.number().positive(),
  minPurchase: z.number().min(0).default(0),
  maxRedemptions: z.number().positive(),
  validFrom: z.string(),
  validTo: z.string(),
});
export type CreateCouponInput = z.infer<typeof createCouponSchema>;
