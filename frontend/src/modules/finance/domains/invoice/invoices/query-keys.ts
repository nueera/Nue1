// Invoices Query Keys — Zoho Invoice

export const invoicesKeys = {
  all: ['invoice', 'invoices'] as const,
  lists: () => [...invoicesKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...invoicesKeys.lists(), params] as const,
  details: () => [...invoicesKeys.all, 'detail'] as const,
  detail: (id: string) => [...invoicesKeys.details(), id] as const,
  stats: () => [...invoicesKeys.all, 'stats'] as const,
} as const;
