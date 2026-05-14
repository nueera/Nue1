// @ts-nocheck
// Dunning Query Keys — Zoho Billing

export const dunningKeys = {
  all: ['billing', 'dunning'] as const,
  lists: () => [...dunningKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...dunningKeys.lists(), params] as const,
  details: () => [...dunningKeys.all, 'detail'] as const,
  detail: (id: string) => [...dunningKeys.details(), id] as const,
  stats: () => [...dunningKeys.all, 'stats'] as const,
} as const;
