export const leaveKeys = {
  all: ['leaves'] as const,
  balances: (userId: string) => [...leaveKeys.all, 'balances', userId] as const,
  requests: (filters: Record<string, unknown>) => [...leaveKeys.all, 'requests', filters] as const,
  holidays: (year: number) => [...leaveKeys.all, 'holidays', year] as const,
} as const;
