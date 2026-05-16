// Products Query Keys — Zoho Billing

export const productsKeys = {
  all: ['billing', 'products'] as const,
  lists: () => [...productsKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...productsKeys.lists(), params] as const,
  details: () => [...productsKeys.all, 'detail'] as const,
  detail: (id: string) => [...productsKeys.details(), id] as const,
  stats: () => [...productsKeys.all, 'stats'] as const,
} as const;
