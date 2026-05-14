// @ts-nocheck
// Search Query Keys — Cross-product

export const searchKeys = {
  all: ['shared', 'search'] as const,
  lists: () => [...searchKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...searchKeys.lists(), params] as const,
  details: () => [...searchKeys.all, 'detail'] as const,
  detail: (id: string) => [...searchKeys.details(), id] as const,
  stats: () => [...searchKeys.all, 'stats'] as const,
} as const;
