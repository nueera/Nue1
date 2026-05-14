// @ts-nocheck
// Items Query Keys — Zoho Inventory

export const itemsKeys = {
  all: ['inventory', 'items'] as const,
  lists: () => [...itemsKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...itemsKeys.lists(), params] as const,
  details: () => [...itemsKeys.all, 'detail'] as const,
  detail: (id: string) => [...itemsKeys.details(), id] as const,
  stats: () => [...itemsKeys.all, 'stats'] as const,
} as const;
