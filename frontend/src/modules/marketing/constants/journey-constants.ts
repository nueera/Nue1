// @ts-nocheck
// ============================================================================
// Journey Constants
// Node types, triggers, and configuration for the Journeys domain
// ============================================================================

import type { JourneyNodeType, JourneyTrigger } from '../types';

// ---------------------------------------------------------------------------
// Journey Node Type Config
// ---------------------------------------------------------------------------

export const JOURNEY_NODE_TYPE_CONFIG: Record<JourneyNodeType, { label: string; color: string; icon: string; category: 'trigger' | 'action' | 'logic' | 'output' }> = {
  trigger: { label: 'Trigger', color: 'blue', icon: 'zap', category: 'trigger' },
  delay: { label: 'Delay', color: 'amber', icon: 'clock', category: 'logic' },
  email: { label: 'Send Email', color: 'cyan', icon: 'mail', category: 'action' },
  sms: { label: 'Send SMS', color: 'green', icon: 'message-square', category: 'action' },
  whatsapp: { label: 'Send WhatsApp', color: 'emerald', icon: 'phone', category: 'action' },
  condition: { label: 'Condition', color: 'purple', icon: 'git-branch', category: 'logic' },
  action: { label: 'Action', color: 'orange', icon: 'play', category: 'action' },
  exit: { label: 'Exit', color: 'red', icon: 'log-out', category: 'output' },
  webhook: { label: 'Webhook', color: 'violet', icon: 'webhook', category: 'action' },
  update_field: { label: 'Update Field', color: 'teal', icon: 'edit', category: 'action' },
  add_to_list: { label: 'Add to List', color: 'sky', icon: 'user-plus', category: 'action' },
  remove_from_list: { label: 'Remove from List', color: 'rose', icon: 'user-minus', category: 'action' },
  score: { label: 'Adjust Score', color: 'indigo', icon: 'target', category: 'action' },
  notification: { label: 'Notification', color: 'pink', icon: 'bell', category: 'output' },
};

// ---------------------------------------------------------------------------
// Journey Trigger Config
// ---------------------------------------------------------------------------

export const JOURNEY_TRIGGER_CONFIG: Record<JourneyTrigger, { label: string; description: string; category: string }> = {
  list_entry: { label: 'List Entry', description: 'Contact added to a list', category: 'list' },
  form_submit: { label: 'Form Submission', description: 'Contact submits a form', category: 'form' },
  page_visit: { label: 'Page Visit', description: 'Contact visits a specific page', category: 'web' },
  email_open: { label: 'Email Open', description: 'Contact opens an email', category: 'email' },
  email_click: { label: 'Email Click', description: 'Contact clicks an email link', category: 'email' },
  purchase: { label: 'Purchase', description: 'Contact makes a purchase', category: 'ecommerce' },
  custom_event: { label: 'Custom Event', description: 'A custom tracked event', category: 'custom' },
  date_based: { label: 'Date Based', description: 'Triggered on a specific date', category: 'time' },
  score_threshold: { label: 'Score Threshold', description: 'Contact score reaches a threshold', category: 'scoring' },
  api_call: { label: 'API Call', description: 'Triggered via API', category: 'integration' },
  field_change: { label: 'Field Change', description: 'A contact field changes', category: 'data' },
};

// ---------------------------------------------------------------------------
// Journey Status Config
// ---------------------------------------------------------------------------

export const JOURNEY_STATUS_CONFIG = {
  draft: { label: 'Draft', color: 'gray' },
  active: { label: 'Active', color: 'green' },
  paused: { label: 'Paused', color: 'amber' },
  completed: { label: 'Completed', color: 'emerald' },
  archived: { label: 'Archived', color: 'slate' },
} as const;

// ---------------------------------------------------------------------------
// Delay Options
// ---------------------------------------------------------------------------

export const DELAY_OPTIONS = [
  { value: '5_minutes', label: '5 Minutes' },
  { value: '15_minutes', label: '15 Minutes' },
  { value: '30_minutes', label: '30 Minutes' },
  { value: '1_hour', label: '1 Hour' },
  { value: '2_hours', label: '2 Hours' },
  { value: '4_hours', label: '4 Hours' },
  { value: '8_hours', label: '8 Hours' },
  { value: '1_day', label: '1 Day' },
  { value: '2_days', label: '2 Days' },
  { value: '3_days', label: '3 Days' },
  { value: '5_days', label: '5 Days' },
  { value: '7_days', label: '7 Days' },
  { value: '14_days', label: '14 Days' },
  { value: '30_days', label: '30 Days' },
] as const;
