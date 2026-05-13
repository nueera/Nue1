// Trips Query Keys — Zoho Expense

export const tripsKeys = {
  all: ['expense', 'trips'] as const,
  lists: () => [...tripsKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...tripsKeys.lists(), params] as const,
  details: () => [...tripsKeys.all, 'detail'] as const,
  detail: (id: string) => [...tripsKeys.details(), id] as const,
  stats: () => [...tripsKeys.all, 'stats'] as const,
} as const;
