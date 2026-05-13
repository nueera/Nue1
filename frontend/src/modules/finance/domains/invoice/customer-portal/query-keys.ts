// CustomerPortal Query Keys — Zoho Invoice

export const customerPortalKeys = {
  all: ['invoice', 'customer-portal'] as const,
  lists: () => [...customerPortalKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...customerPortalKeys.lists(), params] as const,
  details: () => [...customerPortalKeys.all, 'detail'] as const,
  detail: (id: string) => [...customerPortalKeys.details(), id] as const,
  stats: () => [...customerPortalKeys.all, 'stats'] as const,
} as const;
