// Discounts Query Keys — Zoho Commerce

export const discountsKeys = {
  all: ['commerce', 'discounts'] as const,
  lists: () => [...discountsKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...discountsKeys.lists(), params] as const,
  details: () => [...discountsKeys.all, 'detail'] as const,
  detail: (id: string) => [...discountsKeys.details(), id] as const,
  stats: () => [...discountsKeys.all, 'stats'] as const,
} as const;
