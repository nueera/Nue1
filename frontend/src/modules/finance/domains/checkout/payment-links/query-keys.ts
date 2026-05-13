// PaymentLinks Query Keys — Zoho Checkout

export const paymentLinksKeys = {
  all: ['checkout', 'payment-links'] as const,
  lists: () => [...paymentLinksKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...paymentLinksKeys.lists(), params] as const,
  details: () => [...paymentLinksKeys.all, 'detail'] as const,
  detail: (id: string) => [...paymentLinksKeys.details(), id] as const,
  stats: () => [...paymentLinksKeys.all, 'stats'] as const,
} as const;
