// Approvals Query Keys — Zoho Expense

export const approvalsKeys = {
  all: ['expense', 'approvals'] as const,
  lists: () => [...approvalsKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...approvalsKeys.lists(), params] as const,
  details: () => [...approvalsKeys.all, 'detail'] as const,
  detail: (id: string) => [...approvalsKeys.details(), id] as const,
  stats: () => [...approvalsKeys.all, 'stats'] as const,
} as const;
