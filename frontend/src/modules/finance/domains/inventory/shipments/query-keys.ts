// Shipments Query Keys — Zoho Inventory

export const shipmentsKeys = {
  all: ['inventory', 'shipments'] as const,
  lists: () => [...shipmentsKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...shipmentsKeys.lists(), params] as const,
  details: () => [...shipmentsKeys.all, 'detail'] as const,
  detail: (id: string) => [...shipmentsKeys.details(), id] as const,
  stats: () => [...shipmentsKeys.all, 'stats'] as const,
} as const;
