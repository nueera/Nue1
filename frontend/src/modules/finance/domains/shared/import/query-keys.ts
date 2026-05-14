// @ts-nocheck
// Import Query Keys — Cross-product

export const importKeys = {
  all: ['shared', 'import'] as const,
  lists: () => [...importKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...importKeys.lists(), params] as const,
  details: () => [...importKeys.all, 'detail'] as const,
  detail: (id: string) => [...importKeys.details(), id] as const,
  stats: () => [...importKeys.all, 'stats'] as const,
} as const;
