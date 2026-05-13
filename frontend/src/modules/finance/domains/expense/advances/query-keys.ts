// Advances Query Keys — Zoho Expense

export const advancesKeys = {
  all: ['expense', 'advances'] as const,
  lists: () => [...advancesKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...advancesKeys.lists(), params] as const,
  details: () => [...advancesKeys.all, 'detail'] as const,
  detail: (id: string) => [...advancesKeys.details(), id] as const,
  stats: () => [...advancesKeys.all, 'stats'] as const,
} as const;
