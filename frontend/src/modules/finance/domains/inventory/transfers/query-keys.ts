// Transfers Query Keys — Zoho Inventory

export const transfersKeys = {
  all: ['inventory', 'transfers'] as const,
  lists: () => [...transfersKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...transfersKeys.lists(), params] as const,
  details: () => [...transfersKeys.all, 'detail'] as const,
  detail: (id: string) => [...transfersKeys.details(), id] as const,
  stats: () => [...transfersKeys.all, 'stats'] as const,
} as const;
