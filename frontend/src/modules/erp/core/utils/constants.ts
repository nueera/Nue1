// Status color mappings
export const STATUS_COLORS = {
  // Employee statuses
  active: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/15',
  inactive: 'bg-zinc-500/10 text-zinc-500 dark:text-zinc-400 border-zinc-500/15',
  'on-leave': 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/15',
  onboarding: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/15',
  notice: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/15',
  terminated: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/15',

  // Attendance statuses
  present: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/15',
  absent: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/15',
  late: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/15',
  'half-day': 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/15',

  // Leave statuses
  pending: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/15',
  approved: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/15',
  rejected: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/15',
  cancelled: 'bg-zinc-500/10 text-zinc-500 dark:text-zinc-400 border-zinc-500/15',

  // Payroll statuses
  paid: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/15',
  processing: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/15',

  // Leave types
  annual: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/15',
  sick: 'bg-red-500/10 text-red-500 dark:text-red-400 border-red-500/15',
  personal: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/15',
  maternity: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/15',
} as const;

export type StatusKey = keyof typeof STATUS_COLORS;

// Departments
export const DEPARTMENTS = [
  'Engineering',
  'Marketing',
  'Sales',
  'HR',
  'Finance',
  'Operations',
] as const;

export type Department = (typeof DEPARTMENTS)[number];

// Gender
export const GENDERS = ['male', 'female', 'other'] as const;
export type Gender = (typeof GENDERS)[number];

// Employment types
export const EMPLOYMENT_TYPES = ['full-time', 'part-time', 'contract', 'intern'] as const;
export type EmploymentType = (typeof EMPLOYMENT_TYPES)[number];
