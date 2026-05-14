// @ts-nocheck
// HostedPages Query Keys — Zoho Billing

export const hostedPagesKeys = {
  all: ['billing', 'hosted-pages'] as const,
  lists: () => [...hostedPagesKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...hostedPagesKeys.lists(), params] as const,
  details: () => [...hostedPagesKeys.all, 'detail'] as const,
  detail: (id: string) => [...hostedPagesKeys.details(), id] as const,
  stats: () => [...hostedPagesKeys.all, 'stats'] as const,
} as const;
