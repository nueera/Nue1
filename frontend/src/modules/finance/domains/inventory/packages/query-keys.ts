// @ts-nocheck
// Packages Query Keys — Zoho Inventory

export const packagesKeys = {
  all: ['inventory', 'packages'] as const,
  lists: () => [...packagesKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...packagesKeys.lists(), params] as const,
  details: () => [...packagesKeys.all, 'detail'] as const,
  detail: (id: string) => [...packagesKeys.details(), id] as const,
  stats: () => [...packagesKeys.all, 'stats'] as const,
} as const;
