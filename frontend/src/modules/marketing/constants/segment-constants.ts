// ============================================================================
// Segment Constants
// Condition operators, field types, and configuration for Segments domain
// ============================================================================

import type { ConditionOperator } from '../types';

// ---------------------------------------------------------------------------
// Condition Operator Config
// ---------------------------------------------------------------------------

export const CONDITION_OPERATOR_CONFIG: Record<ConditionOperator, { label: string; needsValue: boolean; category: 'text' | 'number' | 'date' | 'list' }> = {
  equals: { label: 'Equals', needsValue: true, category: 'text' },
  not_equals: { label: 'Does Not Equal', needsValue: true, category: 'text' },
  contains: { label: 'Contains', needsValue: true, category: 'text' },
  not_contains: { label: 'Does Not Contain', needsValue: true, category: 'text' },
  starts_with: { label: 'Starts With', needsValue: true, category: 'text' },
  ends_with: { label: 'Ends With', needsValue: true, category: 'text' },
  greater_than: { label: 'Greater Than', needsValue: true, category: 'number' },
  less_than: { label: 'Less Than', needsValue: true, category: 'number' },
  between: { label: 'Between', needsValue: true, category: 'number' },
  in: { label: 'In', needsValue: true, category: 'list' },
  not_in: { label: 'Not In', needsValue: true, category: 'list' },
  is_set: { label: 'Is Set', needsValue: false, category: 'text' },
  is_not_set: { label: 'Is Not Set', needsValue: false, category: 'text' },
  before: { label: 'Before', needsValue: true, category: 'date' },
  after: { label: 'After', needsValue: true, category: 'date' },
  within_last: { label: 'Within Last', needsValue: true, category: 'date' },
  within_next: { label: 'Within Next', needsValue: true, category: 'date' },
};

// ---------------------------------------------------------------------------
// Segment Field Categories
// ---------------------------------------------------------------------------

export const SEGMENT_FIELD_CATEGORIES = {
  contact: { label: 'Contact Fields', fields: ['email', 'firstName', 'lastName', 'phone', 'company', 'jobTitle', 'country', 'city'] },
  engagement: { label: 'Engagement', fields: ['emailOpens', 'emailClicks', 'pageViews', 'formSubmissions', 'lastEngagedAt'] },
  scoring: { label: 'Scoring', fields: ['leadScore', 'engagementScore', 'fitScore', 'behaviorScore'] },
  custom: { label: 'Custom Fields', fields: [] },
} as const;

// ---------------------------------------------------------------------------
// Segment Type Options
// ---------------------------------------------------------------------------

export const SEGMENT_TYPE_OPTIONS = [
  { value: 'dynamic', label: 'Dynamic', description: 'Automatically updates based on rules' },
  { value: 'static', label: 'Static', description: 'Manually managed list of contacts' },
] as const;

// ---------------------------------------------------------------------------
// Logical Operators
// ---------------------------------------------------------------------------

export const LOGICAL_OPERATORS = [
  { value: 'and', label: 'AND', description: 'All conditions must be true' },
  { value: 'or', label: 'OR', description: 'Any condition can be true' },
] as const;
