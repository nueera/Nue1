export const statusBadgeVariants = {
  active: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/15',
  inactive: 'bg-zinc-500/10 text-zinc-500 dark:text-zinc-400 border-zinc-500/15',
  'on-leave': 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/15',
  pending: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/15',
  approved: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/15',
  rejected: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/15',
  present: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/15',
  absent: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/15',
  late: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/15',
  paid: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/15',
  processing: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/15',
} as const;
