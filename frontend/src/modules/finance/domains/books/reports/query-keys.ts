// ============================================================================
// Reports — Query Keys
// ============================================================================

export const reportKeys = {
  all: ['reports'] as const,
  lists: () => [...reportKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...reportKeys.lists(), params] as const,
  details: () => [...reportKeys.all, 'detail'] as const,
  detail: (id: string) => [...reportKeys.details(), id] as const,
  runs: (id: string) => [...reportKeys.detail(id), 'runs'] as const,
  data: (type: string, from: string, to: string) => [...reportKeys.all, 'data', type, from, to] as const,
};
