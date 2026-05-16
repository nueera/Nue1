// Addons Query Keys — Zoho Billing

export const addonsKeys = {
  all: ['billing', 'addons'] as const,
  lists: () => [...addonsKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...addonsKeys.lists(), params] as const,
  details: () => [...addonsKeys.all, 'detail'] as const,
  detail: (id: string) => [...addonsKeys.details(), id] as const,
  stats: () => [...addonsKeys.all, 'stats'] as const,
} as const;
