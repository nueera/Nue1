// PettyCash Query Keys — Zoho Expense

export const pettyCashKeys = {
  all: ['expense', 'petty-cash'] as const,
  lists: () => [...pettyCashKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...pettyCashKeys.lists(), params] as const,
  details: () => [...pettyCashKeys.all, 'detail'] as const,
  detail: (id: string) => [...pettyCashKeys.details(), id] as const,
  stats: () => [...pettyCashKeys.all, 'stats'] as const,
} as const;
