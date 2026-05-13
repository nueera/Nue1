# Task: Finance Module Shared Components

## Task ID: finance-shared-components

## Summary

Created all 17 files for the Finance module shared components at `/home/z/my-project/repo/frontend/src/modules/finance/components/shared/`.

## Files Created

| # | File | Description |
|---|------|-------------|
| 1 | `money-display.tsx` | Formatted money display with Intl.NumberFormat, colorize (positive/negative/neutral), size variants (sm/md/lg) |
| 2 | `tax-badge.tsx` | Tax category badge with color by type (inclusive=blue, exclusive=amber, compound=purple) |
| 3 | `payment-status-badge.tsx` | Payment status badge (pending=yellow, completed=green, failed=red, refunded=gray) |
| 4 | `invoice-status-badge.tsx` | Invoice status badge (draft=gray, sent=blue, viewed=indigo, paid=green, overdue=red, void=muted) |
| 5 | `line-items-table.tsx` | Reusable line items editor table with add/remove, editable fields, subtotal/tax/total summary |
| 6 | `address-form.tsx` | Billing/shipping address form with street, city, state, zip, country fields |
| 7 | `contact-selector.tsx` | Customer/vendor searchable dropdown using Command component with mock data |
| 8 | `item-selector.tsx` | Product/item searchable selector with name, SKU, price display |
| 9 | `tax-selector.tsx` | Tax rate searchable selector showing name + rate + type |
| 10 | `currency-selector.tsx` | Currency picker with code, symbol, name display |
| 11 | `date-range-picker.tsx` | Financial date range picker with preset ranges (This Month, Last Month, This Quarter, Last Quarter, This Year) + Calendar range selector |
| 12 | `amount-summary.tsx` | Subtotal/discount/tax/total summary card with MoneyDisplay formatting |
| 13 | `file-attachment.tsx` | Attachment upload/display with file icons, size formatting, remove button |
| 14 | `comment-thread.tsx` | Timestamped comments with author avatars, auto-scroll, Enter-to-submit input |
| 15 | `template-preview.tsx` | Invoice/template preview with sample data rendering |
| 16 | `payment-gateway-selector.tsx` | Payment gateway picker (Stripe, PayPal, Razorpay, Square, Bank Transfer, Cash, Check) |
| 17 | `index.ts` | Barrel export for all shared components and their types |

## Key Decisions

- All components use `'use client'` directive
- Types imported from `../../types/finance-common`
- Currency utilities imported from `../../utils/currency`
- Tax utilities imported from `../../utils/tax`
- Constants imported from `../../constants/finance-common`
- Uses `cn()` from `@/lib/utils` for class merging
- shadcn/ui components used: Badge, Input, Label, Button, Popover, Calendar, Command, Table, Separator
- All selectors use the Command + Popover pattern for searchable dropdowns
- Color scheme avoids indigo/blue primary; uses emerald, amber, sky, purple for status badges
- Lint passes cleanly for all finance shared component files

## Dependencies

- Existing types: `finance-common.ts` (Money, Currency, TaxRate, Address, FinanceContact, LineItem, PaymentStatus, InvoiceStatus)
- Existing utils: `currency.ts` (formatAmount, formatMoney, getCurrencySymbol, etc.), `tax.ts` (calculateTaxAmount)
- Existing constants: `finance-common.ts` (CURRENCIES, DEFAULT_TAX_RATES, PAYMENT_STATUS_CONFIG, INVOICE_STATUS_CONFIG)
