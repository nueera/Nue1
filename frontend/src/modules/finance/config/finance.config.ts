// @ts-nocheck
// ============================================================================
// Finance Module Configuration
// Feature flags, module settings, and product configuration
// ============================================================================

import type { FinanceProduct } from '../types';

// ---------------------------------------------------------------------------
// Module Config
// ---------------------------------------------------------------------------

export const FINANCE_CONFIG = {
  name: 'NueFinance',
  version: '1.0.0',
  products: [
    'books',
    'invoice',
    'billing',
    'expense',
    'inventory',
    'checkout',
    'commerce',
    'payroll',
  ] as const,
  defaultProduct: 'books' as FinanceProduct,
  defaultCurrency: 'USD',
  fiscalYearStart: 'January',
  moduleId: 'finance',
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
} as const;

// ---------------------------------------------------------------------------
// Feature Flags
// ---------------------------------------------------------------------------

export const FEATURE_FLAGS = {
  // Books
  booksDoubleEntry: true,
  booksBanking: true,
  booksProjects: true,
  booksTimesheets: true,
  booksAccountant: true,

  // Invoice
  invoiceRecurring: true,
  invoiceTimeTracking: true,
  invoiceCustomerPortal: true,

  // Billing
  billingDunning: true,
  billingHostedPages: true,
  billingCoupons: true,
  billingAddons: true,

  // Expense
  expenseTrips: true,
  expensePerDiem: true,
  expenseMileage: true,
  expenseCorporateCards: true,
  expenseAdvances: true,
  expensePettyCash: true,
  expensePurchaseRequests: true,

  // Inventory
  inventoryBatchTracking: true,
  inventoryMultiWarehouse: true,
  inventoryShipments: true,

  // Checkout
  checkoutPaymentPages: true,
  checkoutPaymentLinks: true,

  // Commerce
  commerceStorefront: true,
  commerceDiscounts: true,

  // Payroll
  payrollBenefits: true,
  payrollTaxFiling: true,

  // Cross-product
  multiCurrency: true,
  autoExchangeRates: false,
  onlinePayments: true,
  paymentReminders: true,
  pdfExport: true,
  csvExport: true,
  emailInvoicing: true,
  auditTrail: true,
} as const;

export type FeatureFlag = keyof typeof FEATURE_FLAGS;

// ---------------------------------------------------------------------------
// Per-product settings
// ---------------------------------------------------------------------------

export interface ProductSettings {
  product: FinanceProduct;
  enabled: boolean;
  prefix: string;       // Document number prefix (e.g., INV-, EST-)
  defaultTaxRate: number;
  defaultPaymentTermDays: number;
}

export const PRODUCT_SETTINGS: Record<FinanceProduct, ProductSettings> = {
  books: {
    product: 'books',
    enabled: true,
    prefix: 'BK-',
    defaultTaxRate: 0,
    defaultPaymentTermDays: 30,
  },
  invoice: {
    product: 'invoice',
    enabled: true,
    prefix: 'INV-',
    defaultTaxRate: 0,
    defaultPaymentTermDays: 30,
  },
  billing: {
    product: 'billing',
    enabled: true,
    prefix: 'SUB-',
    defaultTaxRate: 0,
    defaultPaymentTermDays: 30,
  },
  expense: {
    product: 'expense',
    enabled: true,
    prefix: 'EXP-',
    defaultTaxRate: 0,
    defaultPaymentTermDays: 0,
  },
  inventory: {
    product: 'inventory',
    enabled: true,
    prefix: 'INV-',
    defaultTaxRate: 0,
    defaultPaymentTermDays: 30,
  },
  checkout: {
    product: 'checkout',
    enabled: true,
    prefix: 'PAY-',
    defaultTaxRate: 0,
    defaultPaymentTermDays: 0,
  },
  commerce: {
    product: 'commerce',
    enabled: true,
    prefix: 'ORD-',
    defaultTaxRate: 0,
    defaultPaymentTermDays: 0,
  },
  payroll: {
    product: 'payroll',
    enabled: true,
    prefix: 'PR-',
    defaultTaxRate: 0,
    defaultPaymentTermDays: 0,
  },
};

// ---------------------------------------------------------------------------
// Document number prefixes per entity type
// ---------------------------------------------------------------------------

export const DOCUMENT_PREFIXES = {
  invoice: 'INV-',
  estimate: 'EST-',
  salesOrder: 'SO-',
  purchaseOrder: 'PO-',
  bill: 'BILL-',
  creditNote: 'CN-',
  retainerInvoice: 'RI-',
  recurringInvoice: 'RC-',
  payment: 'PAY-',
  expense: 'EXP-',
  vendorCredit: 'VC-',
  subscription: 'SUB-',
  order: 'ORD-',
  payRun: 'PR-',
} as const;

// ---------------------------------------------------------------------------
// Route base paths
// ---------------------------------------------------------------------------

export const ROUTES = {
  base: '/finance',
  books: '/finance/books',
  invoice: '/finance/invoice',
  billing: '/finance/billing',
  expense: '/finance/expense',
  inventory: '/finance/inventory',
  checkout: '/finance/checkout',
  commerce: '/finance/commerce',
  payroll: '/finance/payroll',
} as const;

export type RouteKey = keyof typeof ROUTES;
