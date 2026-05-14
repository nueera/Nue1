// @ts-nocheck
// Coupons Query Keys — Zoho Billing

export const couponsKeys = {
  all: ['billing', 'coupons'] as const,
  lists: () => [...couponsKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...couponsKeys.lists(), params] as const,
  details: () => [...couponsKeys.all, 'detail'] as const,
  detail: (id: string) => [...couponsKeys.details(), id] as const,
  stats: () => [...couponsKeys.all, 'stats'] as const,
} as const;
