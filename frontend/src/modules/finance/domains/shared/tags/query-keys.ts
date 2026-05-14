// @ts-nocheck
// Tags Query Keys — Cross-product

export const tagsKeys = {
  all: ['shared', 'tags'] as const,
  lists: () => [...tagsKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...tagsKeys.lists(), params] as const,
  details: () => [...tagsKeys.all, 'detail'] as const,
  detail: (id: string) => [...tagsKeys.details(), id] as const,
  stats: () => [...tagsKeys.all, 'stats'] as const,
} as const;
