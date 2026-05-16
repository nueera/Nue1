// Notes Query Keys — Cross-product

export const notesKeys = {
  all: ['shared', 'notes'] as const,
  lists: () => [...notesKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...notesKeys.lists(), params] as const,
  details: () => [...notesKeys.all, 'detail'] as const,
  detail: (id: string) => [...notesKeys.details(), id] as const,
  stats: () => [...notesKeys.all, 'stats'] as const,
} as const;
