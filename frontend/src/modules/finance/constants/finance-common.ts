// ============================================================================
// Finance Common Constants
// Payment terms, tax rates, currencies, statuses used across all products
// ============================================================================

import type {
  Currency,
  PaymentTerm,
  TaxRate,
  InvoiceStatus,
  EstimateStatus,
  BillStatus,
  PaymentStatus,
  SubscriptionStatus,
  ExpenseStatus,
  OrderStatus,
} from '../types';

// ---------------------------------------------------------------------------
// Currencies
// ---------------------------------------------------------------------------

export const CURRENCIES: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', precision: 2 },
  { code: 'EUR', name: 'Euro', symbol: '\u20AC', precision: 2 },
  { code: 'GBP', name: 'British Pound', symbol: '\u00A3', precision: 2 },
  { code: 'INR', name: 'Indian Rupee', symbol: '\u20B9', precision: 2 },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', precision: 2 },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', precision: 2 },
  { code: 'JPY', name: 'Japanese Yen', symbol: '\u00A5', precision: 0 },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '\u00A5', precision: 2 },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', precision: 2 },
  { code: 'AED', name: 'UAE Dirham', symbol: 'AED', precision: 2 },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', precision: 2 },
  { code: 'MXN', name: 'Mexican Peso', symbol: 'MX$', precision: 2 },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', precision: 2 },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', precision: 2 },
  { code: 'KRW', name: 'South Korean Won', symbol: '\u20A9', precision: 0 },
];

export const DEFAULT_CURRENCY = CURRENCIES[0]; // USD

export function getCurrencyByCode(code: string): Currency | undefined {
  return CURRENCIES.find((c) => c.code === code);
}

// ---------------------------------------------------------------------------
// Payment Terms
// ---------------------------------------------------------------------------

export const PAYMENT_TERMS: PaymentTerm[] = [
  { id: 'due_on_receipt', label: 'Due on Receipt', days: 0 },
  { id: 'net_7', label: 'Net 7', days: 7 },
  { id: 'net_10', label: 'Net 10', days: 10 },
  { id: 'net_15', label: 'Net 15', days: 15 },
  { id: 'net_30', label: 'Net 30', days: 30 },
  { id: 'net_45', label: 'Net 45', days: 45 },
  { id: 'net_60', label: 'Net 60', days: 60 },
  { id: 'net_90', label: 'Net 90', days: 90 },
  { id: 'end_of_month', label: 'End of Month', days: 30 },
  { id: 'end_of_next_month', label: 'End of Next Month', days: 60 },
];

export const DEFAULT_PAYMENT_TERM = PAYMENT_TERMS[4]; // Net 30

// ---------------------------------------------------------------------------
// Tax Rates
// ---------------------------------------------------------------------------

export const DEFAULT_TAX_RATES: TaxRate[] = [
  { id: 'tax_exempt', name: 'Tax Exempt', rate: 0, type: 'exclusive' },
  { id: 'gst_5', name: 'GST 5%', rate: 5, type: 'exclusive' },
  { id: 'gst_7', name: 'GST 7%', rate: 7, type: 'exclusive' },
  { id: 'vat_10', name: 'VAT 10%', rate: 10, type: 'exclusive' },
  { id: 'vat_13', name: 'VAT 13%', rate: 13, type: 'exclusive' },
  { id: 'vat_15', name: 'VAT 15%', rate: 15, type: 'exclusive' },
  { id: 'vat_18', name: 'VAT 18%', rate: 18, type: 'inclusive' },
  { id: 'vat_20', name: 'VAT 20%', rate: 20, type: 'exclusive' },
  { id: 'vat_21', name: 'VAT 21%', rate: 21, type: 'inclusive' },
  { id: 'vat_23', name: 'VAT 23%', rate: 23, type: 'exclusive' },
  { id: 'vat_25', name: 'VAT 25%', rate: 25, type: 'exclusive' },
  { id: 'sales_tax_6', name: 'Sales Tax 6%', rate: 6, type: 'exclusive' },
  { id: 'sales_tax_8', name: 'Sales Tax 8%', rate: 8, type: 'exclusive' },
  { id: 'hst_13', name: 'HST 13%', rate: 13, type: 'exclusive' },
  { id: 'hst_15', name: 'HST 15%', rate: 15, type: 'exclusive' },
];

// ---------------------------------------------------------------------------
// Status Colors & Labels
// ---------------------------------------------------------------------------

export const INVOICE_STATUS_CONFIG: Record<InvoiceStatus, { label: string; color: string }> = {
  draft: { label: 'Draft', color: 'gray' },
  sent: { label: 'Sent', color: 'blue' },
  viewed: { label: 'Viewed', color: 'cyan' },
  paid: { label: 'Paid', color: 'green' },
  overdue: { label: 'Overdue', color: 'red' },
  void: { label: 'Void', color: 'slate' },
};

export const ESTIMATE_STATUS_CONFIG: Record<EstimateStatus, { label: string; color: string }> = {
  draft: { label: 'Draft', color: 'gray' },
  sent: { label: 'Sent', color: 'blue' },
  approved: { label: 'Approved', color: 'green' },
  declined: { label: 'Declined', color: 'red' },
  converted: { label: 'Converted', color: 'emerald' },
  expired: { label: 'Expired', color: 'amber' },
};

export const BILL_STATUS_CONFIG: Record<BillStatus, { label: string; color: string }> = {
  draft: { label: 'Draft', color: 'gray' },
  awaiting_approval: { label: 'Awaiting Approval', color: 'amber' },
  approved: { label: 'Approved', color: 'green' },
  paid: { label: 'Paid', color: 'emerald' },
  overdue: { label: 'Overdue', color: 'red' },
};

export const PAYMENT_STATUS_CONFIG: Record<PaymentStatus, { label: string; color: string }> = {
  pending: { label: 'Pending', color: 'amber' },
  completed: { label: 'Completed', color: 'green' },
  failed: { label: 'Failed', color: 'red' },
  refunded: { label: 'Refunded', color: 'purple' },
};

export const SUBSCRIPTION_STATUS_CONFIG: Record<SubscriptionStatus, { label: string; color: string }> = {
  live: { label: 'Live', color: 'green' },
  trial: { label: 'Trial', color: 'cyan' },
  paused: { label: 'Paused', color: 'amber' },
  cancelled: { label: 'Cancelled', color: 'red' },
  expired: { label: 'Expired', color: 'slate' },
  future: { label: 'Future', color: 'blue' },
};

export const EXPENSE_STATUS_CONFIG: Record<ExpenseStatus, { label: string; color: string }> = {
  draft: { label: 'Draft', color: 'gray' },
  submitted: { label: 'Submitted', color: 'blue' },
  approved: { label: 'Approved', color: 'green' },
  rejected: { label: 'Rejected', color: 'red' },
  reimbursed: { label: 'Reimbursed', color: 'emerald' },
};

export const ORDER_STATUS_CONFIG: Record<OrderStatus, { label: string; color: string }> = {
  pending: { label: 'Pending', color: 'amber' },
  confirmed: { label: 'Confirmed', color: 'blue' },
  processing: { label: 'Processing', color: 'cyan' },
  shipped: { label: 'Shipped', color: 'purple' },
  delivered: { label: 'Delivered', color: 'green' },
  cancelled: { label: 'Cancelled', color: 'red' },
};

// ---------------------------------------------------------------------------
// Fiscal Year Months
// ---------------------------------------------------------------------------

export const FISCAL_YEAR_MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const;

export type FiscalYearMonth = typeof FISCAL_YEAR_MONTHS[number];

// ---------------------------------------------------------------------------
// Date Format Presets
// ---------------------------------------------------------------------------

export const DATE_FORMAT_PRESETS = {
  MM_DD_YYYY: 'MM/DD/YYYY',
  DD_MM_YYYY: 'DD/MM/YYYY',
  YYYY_MM_DD: 'YYYY-MM-DD',
  DD_MMM_YYYY: 'DD MMM YYYY',
  MMM_DD_YYYY: 'MMM DD, YYYY',
} as const;

// ---------------------------------------------------------------------------
// Number Format Presets
// ---------------------------------------------------------------------------

export const NUMBER_FORMAT_PRESETS = {
  COMMA_DOT: '1,000.00',      // US / UK
  DOT_COMMA: '1.000,00',      // EU
  SPACE_COMMA: '1 000,00',    // FR
  COMMA_DOT_IN: '1,00,000.00', // India
} as const;
