// Orders Query Keys — Zoho Commerce

export const ordersKeys = {
  all: ['commerce', 'orders'] as const,
  lists: () => [...ordersKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...ordersKeys.lists(), params] as const,
  details: () => [...ordersKeys.all, 'detail'] as const,
  detail: (id: string) => [...ordersKeys.details(), id] as const,
  stats: () => [...ordersKeys.all, 'stats'] as const,
} as const;
