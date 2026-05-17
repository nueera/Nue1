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

  // ── ERP Operations Statuses ─────────────────────────────────────────────

  // Inventory statuses
  in_stock: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/15',
  low_stock: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/15',
  out_of_stock: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/15',
  discontinued: 'bg-zinc-500/10 text-zinc-500 dark:text-zinc-400 border-zinc-500/15',

  // Purchase Order statuses
  draft: 'bg-zinc-500/10 text-zinc-500 dark:text-zinc-400 border-zinc-500/15',
  submitted: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/15',
  partial: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/15',
  received: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/15',

  // Sales Order statuses
  confirmed: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/15',
  picking: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/15',
  packed: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/15',
  shipped: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/15',
  delivered: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/15',
  returned: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/15',

  // Payment statuses
  unpaid: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/15',
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

// ── ERP Operations Constants ───────────────────────────────────────────────

export const PRODUCT_TYPES = [
  { value: 'physical', label: 'Physical' },
  { value: 'digital', label: 'Digital' },
  { value: 'service', label: 'Service' },
  { value: 'bundle', label: 'Bundle' },
] as const;

export const PRODUCT_UNITS = [
  { value: 'piece', label: 'Piece' },
  { value: 'kg', label: 'Kilogram' },
  { value: 'liter', label: 'Liter' },
  { value: 'meter', label: 'Meter' },
] as const;

export const PO_STATUSES = [
  { value: 'draft', label: 'Draft' },
  { value: 'submitted', label: 'Submitted' },
  { value: 'approved', label: 'Approved' },
  { value: 'partial', label: 'Partial' },
  { value: 'received', label: 'Received' },
  { value: 'cancelled', label: 'Cancelled' },
] as const;

export const SO_STATUSES = [
  { value: 'draft', label: 'Draft' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'picking', label: 'Picking' },
  { value: 'packed', label: 'Packed' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'returned', label: 'Returned' },
] as const;

export const PAYMENT_STATUSES = [
  { value: 'unpaid', label: 'Unpaid' },
  { value: 'partial', label: 'Partial' },
  { value: 'paid', label: 'Paid' },
] as const;

export const INVENTORY_STATUSES = [
  { value: 'in_stock', label: 'In Stock' },
  { value: 'low_stock', label: 'Low Stock' },
  { value: 'out_of_stock', label: 'Out of Stock' },
  { value: 'discontinued', label: 'Discontinued' },
] as const;
