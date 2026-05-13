export const estimateKeys = {
  all: ['estimates'] as const,
  lists: () => [...estimateKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...estimateKeys.lists(), params] as const,
  details: () => [...estimateKeys.all, 'detail'] as const,
  detail: (id: string) => [...estimateKeys.details(), id] as const,
};
