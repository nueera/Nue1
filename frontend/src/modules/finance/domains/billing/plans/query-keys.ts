// Plans Query Keys — Zoho Billing

export const plansKeys = {
  all: ['billing', 'plans'] as const,
  lists: () => [...plansKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...plansKeys.lists(), params] as const,
  details: () => [...plansKeys.all, 'detail'] as const,
  detail: (id: string) => [...plansKeys.details(), id] as const,
  stats: () => [...plansKeys.all, 'stats'] as const,
} as const;
