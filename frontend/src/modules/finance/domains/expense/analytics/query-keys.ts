// Analytics Query Keys — Zoho Expense

export const analyticsKeys = {
  all: ['expense', 'analytics'] as const,
  lists: () => [...analyticsKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...analyticsKeys.lists(), params] as const,
  details: () => [...analyticsKeys.all, 'detail'] as const,
  detail: (id: string) => [...analyticsKeys.details(), id] as const,
  stats: () => [...analyticsKeys.all, 'stats'] as const,
} as const;
