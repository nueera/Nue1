// @ts-nocheck
// Analytics Query Keys — Zoho Commerce

export const analyticsKeys = {
  all: ['commerce', 'analytics'] as const,
  lists: () => [...analyticsKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...analyticsKeys.lists(), params] as const,
  details: () => [...analyticsKeys.all, 'detail'] as const,
  detail: (id: string) => [...analyticsKeys.details(), id] as const,
  stats: () => [...analyticsKeys.all, 'stats'] as const,
} as const;
