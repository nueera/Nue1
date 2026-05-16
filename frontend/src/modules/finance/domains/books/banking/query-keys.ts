// ============================================================================
// Banking — Query Keys
// ============================================================================

export const bankAccountKeys = {
  all: ['bank-accounts'] as const,
  lists: () => [...bankAccountKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...bankAccountKeys.lists(), params] as const,
  details: () => [...bankAccountKeys.all, 'detail'] as const,
  detail: (id: string) => [...bankAccountKeys.details(), id] as const,
  transactions: (id: string) => [...bankAccountKeys.detail(id), 'transactions'] as const,
  reconciliation: (id: string) => [...bankAccountKeys.detail(id), 'reconciliation'] as const,
};
