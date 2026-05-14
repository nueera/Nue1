// @ts-nocheck
// PaymentPages Query Keys — Zoho Checkout

export const paymentPagesKeys = {
  all: ['checkout', 'payment-pages'] as const,
  lists: () => [...paymentPagesKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...paymentPagesKeys.lists(), params] as const,
  details: () => [...paymentPagesKeys.all, 'detail'] as const,
  detail: (id: string) => [...paymentPagesKeys.details(), id] as const,
  stats: () => [...paymentPagesKeys.all, 'stats'] as const,
} as const;
