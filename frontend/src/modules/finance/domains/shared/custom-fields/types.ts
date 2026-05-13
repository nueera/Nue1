'use client';
// CustomFields Types — Finance Shared

export type CustomFieldType = 'text' | 'number' | 'date' | 'select' | 'checkbox' | 'url' | 'email';
export interface FieldRenderer {
  component: 'input' | 'select' | 'datepicker' | 'checkbox' | 'textarea';
  placeholder: string;
  options: string[];
  validationPattern: string;
}
export interface CustomField {
  id: string;
  name: string;
  label: string;
  type: CustomFieldType;
  entityType: string;
  renderer: FieldRenderer;
  isRequired: boolean;
  isUnique: boolean;
  defaultValue: string;
  sortOrder: number;
  createdAt: string;
}
