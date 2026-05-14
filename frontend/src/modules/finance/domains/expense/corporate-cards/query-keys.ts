// @ts-nocheck
// CorporateCards Query Keys — Zoho Expense

export const corporateCardsKeys = {
  all: ['expense', 'corporate-cards'] as const,
  lists: () => [...corporateCardsKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...corporateCardsKeys.lists(), params] as const,
  details: () => [...corporateCardsKeys.all, 'detail'] as const,
  detail: (id: string) => [...corporateCardsKeys.details(), id] as const,
  stats: () => [...corporateCardsKeys.all, 'stats'] as const,
} as const;
