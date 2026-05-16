// Warehouses Query Keys — Zoho Inventory

export const warehousesKeys = {
  all: ['inventory', 'warehouses'] as const,
  lists: () => [...warehousesKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...warehousesKeys.lists(), params] as const,
  details: () => [...warehousesKeys.all, 'detail'] as const,
  detail: (id: string) => [...warehousesKeys.details(), id] as const,
  stats: () => [...warehousesKeys.all, 'stats'] as const,
} as const;
