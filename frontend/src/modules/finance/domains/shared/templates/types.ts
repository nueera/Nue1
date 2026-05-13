'use client';
// Templates Types — Finance Shared

export type TemplateType = 'invoice' | 'estimate' | 'credit_note' | 'purchase_order' | 'payment_receipt';
export interface TemplateVariable {
  name: string;
  label: string;
  defaultValue: string;
}
export interface Template {
  id: string;
  name: string;
  type: TemplateType;
  variables: TemplateVariable[];
  htmlContent: string;
  isDefault: boolean;
  preview: string;
  createdAt: string;
}
