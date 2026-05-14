// @ts-nocheck
// Transactions Query Keys — Zoho Checkout

export const transactionsKeys = {
  all: ['checkout', 'transactions'] as const,
  lists: () => [...transactionsKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...transactionsKeys.lists(), params] as const,
  details: () => [...transactionsKeys.all, 'detail'] as const,
  detail: (id: string) => [...transactionsKeys.details(), id] as const,
  stats: () => [...transactionsKeys.all, 'stats'] as const,
} as const;
