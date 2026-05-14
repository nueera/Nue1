// @ts-nocheck
// Payments Query Keys — Zoho Invoice

export const paymentsKeys = {
  all: ['invoice', 'payments'] as const,
  lists: () => [...paymentsKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...paymentsKeys.lists(), params] as const,
  details: () => [...paymentsKeys.all, 'detail'] as const,
  detail: (id: string) => [...paymentsKeys.details(), id] as const,
  stats: () => [...paymentsKeys.all, 'stats'] as const,
} as const;
