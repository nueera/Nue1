// CreditNotes Query Keys — Zoho Invoice

export const creditNotesKeys = {
  all: ['invoice', 'credit-notes'] as const,
  lists: () => [...creditNotesKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...creditNotesKeys.lists(), params] as const,
  details: () => [...creditNotesKeys.all, 'detail'] as const,
  detail: (id: string) => [...creditNotesKeys.details(), id] as const,
  stats: () => [...creditNotesKeys.all, 'stats'] as const,
} as const;
