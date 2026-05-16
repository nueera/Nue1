// ============================================================================
// Finance Utils — Barrel Export
// ============================================================================

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
} from './currency';

export {
  calculateTaxAmount,
  calculateTax,
  calculateLineItemTax,
  calculateMultipleItemsTax,
  calculateCompoundTax,
  formatTaxRate,
  getTaxLabel,
} from './tax';

export type { TaxBreakdownItem, TaxCalculationResult as TaxCalculationResultUtil } from './tax';

export {
  generateDocumentNumber,
  parseDocumentNumber,
  getNextSequence,
  isValidDocumentNumber,
  generateYearBasedNumber,
  generateMonthBasedNumber,
} from './invoice-number';

export type { DocumentType, ParsedDocumentNumber } from './invoice-number';

export {
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
} from './date-helpers';

export type { AgingBucket, DateRange } from './date-helpers';

export {
  toCsv,
  downloadCsv,
  generatePdf,
  downloadJson,
  downloadTsv,
  withDateStamp,
} from './export';

export type { CsvExportOptions, PdfExportOptions, JsonExportOptions, TsvExportOptions } from './export';
