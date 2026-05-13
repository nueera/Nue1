// CustomFields Query Keys — Cross-product

export const customFieldsKeys = {
  all: ['shared', 'custom-fields'] as const,
  lists: () => [...customFieldsKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...customFieldsKeys.lists(), params] as const,
  details: () => [...customFieldsKeys.all, 'detail'] as const,
  detail: (id: string) => [...customFieldsKeys.details(), id] as const,
  stats: () => [...customFieldsKeys.all, 'stats'] as const,
} as const;
