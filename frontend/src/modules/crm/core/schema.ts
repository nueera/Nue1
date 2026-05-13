// ============================================================================
// CRM Module — Shared Zod Schemas
// ============================================================================

import { z } from 'zod';

// --- ID Schema ---
export const CrmIdSchema = z.string().min(1, 'ID is required');

// --- Pagination Schema ---
export const PaginationSchema = z.object({
  page: z.number().min(1).default(1),
  pageSize: z.number().min(1).max(100).default(25),
});

// --- Sort Schema ---
export const SortSchema = z.object({
  field: z.string().min(1, 'Sort field is required'),
  order: z.enum(['asc', 'desc']).default('desc'),
});

// --- Filter Schema ---
export const FilterSchema = z.object({
  field: z.string().min(1, 'Filter field is required'),
  operator: z.enum([
    'equals', 'not_equals', 'contains', 'not_contains',
    'starts_with', 'ends_with', 'greater_than', 'less_than',
    'greater_or_equal', 'less_or_equal', 'between', 'in',
    'not_in', 'is_empty', 'is_not_empty',
  ]),
  value: z.unknown(),
});

// --- Bulk Action Schema ---
export const BulkActionSchema = z.object({
  type: z.enum(['update', 'delete', 'assign', 'merge', 'export']),
  recordIds: z.array(z.string()).min(1, 'At least one record must be selected'),
  data: z.record(z.unknown()).optional(),
});

// --- Mass Update Schema ---
export const MassUpdateSchema = z.object({
  recordIds: z.array(z.string()).min(1, 'Select at least one record'),
  updates: z.array(z.object({
    field: z.string().min(1),
    value: z.unknown(),
  })).min(1, 'At least one field update is required'),
});

// --- Date Range Schema ---
export const DateRangeSchema = z.object({
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
}).refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
  message: 'End date must be after start date',
  path: ['endDate'],
});

// --- Tag Schema ---
export const TagSchema = z.object({
  name: z.string().min(1, 'Tag name is required').max(50, 'Tag name too long'),
  color: z.string().optional(),
});

// --- Note Schema ---
export const NoteCreateSchema = z.object({
  content: z.string().min(1, 'Note content is required').max(10000),
  parentId: z.string().min(1, 'Parent record ID is required'),
  parentType: z.string().min(1, 'Parent record type is required'),
  visibility: z.enum(['private', 'public', 'team']).default('public'),
});

// --- Quick Create Schema ---
export const QuickCreateSchema = z.object({
  module: z.string().min(1, 'Module is required'),
  data: z.record(z.unknown()),
});

// --- Inferred Types ---
export type PaginationInput = z.infer<typeof PaginationSchema>;
export type SortInput = z.infer<typeof SortSchema>;
export type FilterInput = z.infer<typeof FilterSchema>;
export type BulkActionInput = z.infer<typeof BulkActionSchema>;
export type MassUpdateInput = z.infer<typeof MassUpdateSchema>;
export type DateRangeInput = z.infer<typeof DateRangeSchema>;
export type TagInput = z.infer<typeof TagSchema>;
export type NoteCreateInput = z.infer<typeof NoteCreateSchema>;
export type QuickCreateInput = z.infer<typeof QuickCreateSchema>;
