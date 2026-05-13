// PurchaseRequests Query Keys — Zoho Expense

export const purchaseRequestsKeys = {
  all: ['expense', 'purchase-requests'] as const,
  lists: () => [...purchaseRequestsKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...purchaseRequestsKeys.lists(), params] as const,
  details: () => [...purchaseRequestsKeys.all, 'detail'] as const,
  detail: (id: string) => [...purchaseRequestsKeys.details(), id] as const,
  stats: () => [...purchaseRequestsKeys.all, 'stats'] as const,
} as const;
