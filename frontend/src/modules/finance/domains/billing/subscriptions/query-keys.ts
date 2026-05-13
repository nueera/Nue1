// Subscriptions Query Keys — Zoho Billing

export const subscriptionsKeys = {
  all: ['billing', 'subscriptions'] as const,
  lists: () => [...subscriptionsKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...subscriptionsKeys.lists(), params] as const,
  details: () => [...subscriptionsKeys.all, 'detail'] as const,
  detail: (id: string) => [...subscriptionsKeys.details(), id] as const,
  stats: () => [...subscriptionsKeys.all, 'stats'] as const,
} as const;
