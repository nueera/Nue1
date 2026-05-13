export const expenseKeys = {
  all: ['expenses'] as const,
  claims: (filters: Record<string, unknown>) => [...expenseKeys.all, 'claims', filters] as const,
  claim: (id: string) => [...expenseKeys.all, 'claim', id] as const,
  advances: (filters: Record<string, unknown>) => [...expenseKeys.all, 'advances', filters] as const,
  advance: (id: string) => [...expenseKeys.all, 'advance', id] as const,
  travelRequests: (filters: Record<string, unknown>) => [...expenseKeys.all, 'travel-requests', filters] as const,
  travelRequest: (id: string) => [...expenseKeys.all, 'travel-request', id] as const,
  categories: () => [...expenseKeys.all, 'categories'] as const,
} as const;
