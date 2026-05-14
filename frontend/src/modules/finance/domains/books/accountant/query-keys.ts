// @ts-nocheck
// ============================================================================
// Accountant — Query Keys
// ============================================================================

export const chartOfAccountKeys = {
  all: ['chart-of-accounts'] as const,
  lists: () => [...chartOfAccountKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...chartOfAccountKeys.lists(), params] as const,
  details: () => [...chartOfAccountKeys.all, 'detail'] as const,
  detail: (id: string) => [...chartOfAccountKeys.details(), id] as const,
  tree: () => [...chartOfAccountKeys.all, 'tree'] as const,
  journalEntries: () => [...chartOfAccountKeys.all, 'journal-entries'] as const,
};
