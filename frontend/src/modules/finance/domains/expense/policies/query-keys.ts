// Policies Query Keys — Zoho Expense

export const policiesKeys = {
  all: ['expense', 'policies'] as const,
  lists: () => [...policiesKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...policiesKeys.lists(), params] as const,
  details: () => [...policiesKeys.all, 'detail'] as const,
  detail: (id: string) => [...policiesKeys.details(), id] as const,
  stats: () => [...policiesKeys.all, 'stats'] as const,
} as const;
