// @ts-nocheck
// Contacts Query Keys — Cross-product

export const contactsKeys = {
  all: ['shared', 'contacts'] as const,
  lists: () => [...contactsKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...contactsKeys.lists(), params] as const,
  details: () => [...contactsKeys.all, 'detail'] as const,
  detail: (id: string) => [...contactsKeys.details(), id] as const,
  stats: () => [...contactsKeys.all, 'stats'] as const,
} as const;
