// @ts-nocheck
// Storefront Query Keys — Zoho Commerce

export const storefrontKeys = {
  all: ['commerce', 'storefront'] as const,
  lists: () => [...storefrontKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...storefrontKeys.lists(), params] as const,
  details: () => [...storefrontKeys.all, 'detail'] as const,
  detail: (id: string) => [...storefrontKeys.details(), id] as const,
  stats: () => [...storefrontKeys.all, 'stats'] as const,
} as const;
