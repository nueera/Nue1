// @ts-nocheck
// ============================================================================
// Form Constants
// Field types, themes, and configuration for Signup Forms domain
// ============================================================================

import type { FormFieldType, FormTheme } from '../types';

// ---------------------------------------------------------------------------
// Form Field Type Config
// ---------------------------------------------------------------------------

export const FORM_FIELD_TYPE_CONFIG: Record<FormFieldType, { label: string; icon: string; hasOptions: boolean }> = {
  text: { label: 'Text', icon: 'type', hasOptions: false },
  email: { label: 'Email', icon: 'mail', hasOptions: false },
  phone: { label: 'Phone', icon: 'phone', hasOptions: false },
  number: { label: 'Number', icon: 'hash', hasOptions: false },
  select: { label: 'Dropdown', icon: 'chevron-down', hasOptions: true },
  radio: { label: 'Radio Button', icon: 'circle', hasOptions: true },
  checkbox: { label: 'Checkbox', icon: 'check-square', hasOptions: true },
  textarea: { label: 'Text Area', icon: 'align-left', hasOptions: false },
  date: { label: 'Date', icon: 'calendar', hasOptions: false },
  url: { label: 'URL', icon: 'link', hasOptions: false },
  hidden: { label: 'Hidden', icon: 'eye-off', hasOptions: false },
  consent: { label: 'Consent', icon: 'shield', hasOptions: false },
};

// ---------------------------------------------------------------------------
// Form Theme Config
// ---------------------------------------------------------------------------

export const FORM_THEME_CONFIG: Record<FormTheme, { label: string; description: string; preview: string }> = {
  minimal: { label: 'Minimal', description: 'Clean and simple form layout', preview: 'minimal' },
  card: { label: 'Card', description: 'Form displayed in a card container', preview: 'card' },
  full: { label: 'Full Page', description: 'Full-width form layout', preview: 'full' },
  popup: { label: 'Popup', description: 'Form in an overlay popup', preview: 'popup' },
  slide_in: { label: 'Slide In', description: 'Form slides in from the side', preview: 'slide_in' },
  floating_bar: { label: 'Floating Bar', description: 'Horizontal bar at top or bottom', preview: 'floating_bar' },
};

// ---------------------------------------------------------------------------
// Form Status Config
// ---------------------------------------------------------------------------

export const FORM_STATUS_CONFIG = {
  active: { label: 'Active', color: 'green' },
  inactive: { label: 'Inactive', color: 'gray' },
  draft: { label: 'Draft', color: 'amber' },
} as const;

// ---------------------------------------------------------------------------
// Default Form Fields
// ---------------------------------------------------------------------------

export const DEFAULT_FORM_FIELDS = [
  { type: 'email' as const, label: 'Email Address', name: 'email', required: true, order: 0 },
  { type: 'text' as const, label: 'First Name', name: 'firstName', required: false, order: 1 },
  { type: 'text' as const, label: 'Last Name', name: 'lastName', required: false, order: 2 },
] as const;
