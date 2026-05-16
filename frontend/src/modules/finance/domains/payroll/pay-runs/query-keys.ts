// PayRuns Query Keys — Zoho Payroll

export const payRunsKeys = {
  all: ['payroll', 'pay-runs'] as const,
  lists: () => [...payRunsKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...payRunsKeys.lists(), params] as const,
  details: () => [...payRunsKeys.all, 'detail'] as const,
  detail: (id: string) => [...payRunsKeys.details(), id] as const,
  stats: () => [...payRunsKeys.all, 'stats'] as const,
} as const;
