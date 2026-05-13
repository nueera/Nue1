// Workflows Query Keys — Cross-product

export const workflowsKeys = {
  all: ['shared', 'workflows'] as const,
  lists: () => [...workflowsKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...workflowsKeys.lists(), params] as const,
  details: () => [...workflowsKeys.all, 'detail'] as const,
  detail: (id: string) => [...workflowsKeys.details(), id] as const,
  stats: () => [...workflowsKeys.all, 'stats'] as const,
} as const;
