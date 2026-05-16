// ============================================================================
// Finance Constants — Barrel Export
// ============================================================================

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
} from './finance-common';

export type { FiscalYearMonth } from './finance-common';

export {
  PRODUCT_NAV_CONFIGS,
  PRODUCT_LABELS,
  PRODUCT_DESCRIPTIONS,
  pageTitles,
  getNavSectionsForProduct,
  getAllNavItemsForProduct,
} from './navigation';

export type { NavItem, NavSection, ProductNavConfig } from './navigation';
