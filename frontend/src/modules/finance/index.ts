// ============================================================================
// Finance Module — Barrel Export
// NueOne Business OS Finance Module
// ============================================================================

// Types
export type {
  Money,
  Currency,
  TaxRate,
  Address,
  FinanceContact,
  LineItem,
  InvoiceStatus,
  EstimateStatus,
  BillStatus,
  PaymentStatus,
  SubscriptionStatus,
  ExpenseStatus,
  OrderStatus,
  User,
  ApiResponse,
  PaginatedResponse,
  PaginatedRequest,
  FinanceProduct,
  PaymentTerm,
  RecentModule,
  BankAccount,
  FinanceTransaction,
} from './types';

// Constants
export {
  CURRENCIES,
  DEFAULT_CURRENCY,
  getCurrencyByCode,
  PAYMENT_TERMS,
  DEFAULT_PAYMENT_TERM,
  DEFAULT_TAX_RATES,
  INVOICE_STATUS_CONFIG,
  ESTIMATE_STATUS_CONFIG,
  BILL_STATUS_CONFIG,
  PAYMENT_STATUS_CONFIG,
  SUBSCRIPTION_STATUS_CONFIG,
  EXPENSE_STATUS_CONFIG,
  ORDER_STATUS_CONFIG,
  FISCAL_YEAR_MONTHS,
  DATE_FORMAT_PRESETS,
  NUMBER_FORMAT_PRESETS,
  PRODUCT_NAV_CONFIGS,
  PRODUCT_LABELS,
  PRODUCT_DESCRIPTIONS,
  pageTitles,
  getNavSectionsForProduct,
  getAllNavItemsForProduct,
} from './constants';

export type { FiscalYearMonth, NavItem, NavSection, ProductNavConfig } from './constants';

// Config
export {
  FINANCE_CONFIG,
  FEATURE_FLAGS,
  PRODUCT_SETTINGS,
  DOCUMENT_PREFIXES,
  ROUTES,
} from './config';

export type { FeatureFlag, ProductSettings, RouteKey } from './config';

// Providers
export { FinanceProvider, useFinanceContext } from './providers';
export { QueryProvider } from './providers';

// Stores
export { useFinanceStore } from './stores';
export { useSidebarStore } from './stores';

// API
export { financeApiClient } from './api';
export {
  getAuthToken,
  setAuthToken,
  getRefreshToken,
  setRefreshToken,
  clearTokens,
  applyRequestInterceptors,
  applyResponseInterceptors,
  FinanceApiError,
} from './api';
export {
  BOOKS_ENDPOINTS,
  INVOICE_ENDPOINTS,
  BILLING_ENDPOINTS,
  EXPENSE_ENDPOINTS,
  INVENTORY_ENDPOINTS,
  CHECKOUT_ENDPOINTS,
  COMMERCE_ENDPOINTS,
  PAYROLL_ENDPOINTS,
  FINANCE_ENDPOINTS,
} from './api';

// Hooks
export { useFinanceModule } from './hooks';
export { useCurrency } from './hooks';
export { useTaxCalculation } from './hooks';
export { useLineItems } from './hooks';
export { usePaymentGateway } from './hooks';
export { useFinanceSearch } from './hooks';

export type {
  TaxBreakdown,
  TaxCalculationResult,
  LineItemFormValues,
  GatewayProvider,
  PaymentIntent,
  RefundRequest,
  RefundResult,
  GatewayConfig,
  FinanceSearchCategory,
  FinanceSearchResult,
  FinanceSearchFilters,
} from './hooks';

// Utils
export {
  formatMoney,
  formatMoneyWithCode,
  formatAmount,
  parseMoney,
  getCurrencySymbol,
  getCurrencyPrecision,
  roundToPrecision,
  convertCurrency,
  isZero,
  isNegative,
  moneyEquals,
  moneyAdd,
  moneySubtract,
  moneyMultiply,
  getAllCurrencies,
  calculateTaxAmount,
  calculateTax,
  calculateLineItemTax,
  calculateMultipleItemsTax,
  calculateCompoundTax,
  formatTaxRate,
  getTaxLabel,
  generateDocumentNumber,
  parseDocumentNumber,
  getNextSequence,
  isValidDocumentNumber,
  generateYearBasedNumber,
  generateMonthBasedNumber,
  getFiscalYear,
  getFiscalYearLabel,
  getFiscalYearRange,
  getFiscalQuarter,
  calculateDueDate,
  calculateDueDateEndOfMonth,
  calculateDueDateEndOfNextMonth,
  getAgingBucket,
  getDaysOverdue,
  getDaysUntilDue,
  getMonthRange,
  getQuarterRange,
  getYearRange,
  isDateInRange,
  formatFinancialPeriod,
  getBusinessDays,
  toCsv,
  downloadCsv,
  generatePdf,
  downloadJson,
  downloadTsv,
  withDateStamp,
} from './utils';

export type {
  DocumentType,
  ParsedDocumentNumber,
  AgingBucket,
  DateRange,
  CsvExportOptions,
  PdfExportOptions,
  JsonExportOptions,
  TsvExportOptions,
  TaxBreakdownItem,
  TaxCalculationResultUtil,
} from './utils';
