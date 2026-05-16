// ============================================================================
// Finance API Endpoints
// Map of all Finance API endpoints organized by product.
// ============================================================================

// ---------------------------------------------------------------------------
// Endpoint builder helper
// ---------------------------------------------------------------------------

const v1 = '/v1';

function ep(path: string): string {
  return `${v1}${path}`;
}

// ---------------------------------------------------------------------------
// Books Endpoints
// ---------------------------------------------------------------------------

export const BOOKS_ENDPOINTS = {
  dashboard: ep('/books/dashboard'),
  customers: {
    list: ep('/books/customers'),
    detail: (id: string) => ep(`/books/customers/${id}`),
    create: ep('/books/customers'),
    update: (id: string) => ep(`/books/customers/${id}`),
    delete: (id: string) => ep(`/books/customers/${id}`),
    statements: (id: string) => ep(`/books/customers/${id}/statements`),
  },
  vendors: {
    list: ep('/books/vendors'),
    detail: (id: string) => ep(`/books/vendors/${id}`),
    create: ep('/books/vendors'),
    update: (id: string) => ep(`/books/vendors/${id}`),
    delete: (id: string) => ep(`/books/vendors/${id}`),
  },
  items: {
    list: ep('/books/items'),
    detail: (id: string) => ep(`/books/items/${id}`),
    create: ep('/books/items'),
    update: (id: string) => ep(`/books/items/${id}`),
    delete: (id: string) => ep(`/books/items/${id}`),
  },
  estimates: {
    list: ep('/books/estimates'),
    detail: (id: string) => ep(`/books/estimates/${id}`),
    create: ep('/books/estimates'),
    update: (id: string) => ep(`/books/estimates/${id}`),
    delete: (id: string) => ep(`/books/estimates/${id}`),
    send: (id: string) => ep(`/books/estimates/${id}/send`),
    convert: (id: string) => ep(`/books/estimates/${id}/convert`),
    markAs: (id: string, status: string) => ep(`/books/estimates/${id}/mark/${status}`),
  },
  salesOrders: {
    list: ep('/books/sales-orders'),
    detail: (id: string) => ep(`/books/sales-orders/${id}`),
    create: ep('/books/sales-orders'),
    update: (id: string) => ep(`/books/sales-orders/${id}`),
  },
  invoices: {
    list: ep('/books/invoices'),
    detail: (id: string) => ep(`/books/invoices/${id}`),
    create: ep('/books/invoices'),
    update: (id: string) => ep(`/books/invoices/${id}`),
    delete: (id: string) => ep(`/books/invoices/${id}`),
    send: (id: string) => ep(`/books/invoices/${id}/send`),
    void: (id: string) => ep(`/books/invoices/${id}/void`),
    markAs: (id: string, status: string) => ep(`/books/invoices/${id}/mark/${status}`),
    pdf: (id: string) => ep(`/books/invoices/${id}/pdf`),
  },
  recurringInvoices: {
    list: ep('/books/recurring-invoices'),
    detail: (id: string) => ep(`/books/recurring-invoices/${id}`),
    create: ep('/books/recurring-invoices'),
    update: (id: string) => ep(`/books/recurring-invoices/${id}`),
    stop: (id: string) => ep(`/books/recurring-invoices/${id}/stop`),
    resume: (id: string) => ep(`/books/recurring-invoices/${id}/resume`),
  },
  retainerInvoices: {
    list: ep('/books/retainer-invoices'),
    detail: (id: string) => ep(`/books/retainer-invoices/${id}`),
    create: ep('/books/retainer-invoices'),
  },
  creditNotes: {
    list: ep('/books/credit-notes'),
    detail: (id: string) => ep(`/books/credit-notes/${id}`),
    create: ep('/books/credit-notes'),
  },
  payments: {
    list: ep('/books/payments'),
    detail: (id: string) => ep(`/books/payments/${id}`),
    create: ep('/books/payments'),
    refund: (id: string) => ep(`/books/payments/${id}/refund`),
  },
  purchaseOrders: {
    list: ep('/books/purchase-orders'),
    detail: (id: string) => ep(`/books/purchase-orders/${id}`),
    create: ep('/books/purchase-orders'),
  },
  bills: {
    list: ep('/books/bills'),
    detail: (id: string) => ep(`/books/bills/${id}`),
    create: ep('/books/bills'),
    update: (id: string) => ep(`/books/bills/${id}`),
    markAs: (id: string, status: string) => ep(`/books/bills/${id}/mark/${status}`),
  },
  expenses: {
    list: ep('/books/expenses'),
    detail: (id: string) => ep(`/books/expenses/${id}`),
    create: ep('/books/expenses'),
  },
  vendorCredits: {
    list: ep('/books/vendor-credits'),
    detail: (id: string) => ep(`/books/vendor-credits/${id}`),
    create: ep('/books/vendor-credits'),
  },
  banking: {
    accounts: ep('/books/banking/accounts'),
    transactions: ep('/books/banking/transactions'),
    reconcile: ep('/books/banking/reconcile'),
  },
  accountant: {
    journalEntries: ep('/books/accountant/journal-entries'),
    chartOfAccounts: ep('/books/accountant/chart-of-accounts'),
  },
  projects: {
    list: ep('/books/projects'),
    detail: (id: string) => ep(`/books/projects/${id}`),
  },
  timesheets: {
    list: ep('/books/timesheets'),
    create: ep('/books/timesheets'),
  },
  reports: {
    list: ep('/books/reports'),
    profitLoss: ep('/books/reports/profit-loss'),
    balanceSheet: ep('/books/reports/balance-sheet'),
    cashFlow: ep('/books/reports/cash-flow'),
    arAging: ep('/books/reports/ar-aging'),
    apAging: ep('/books/reports/ap-aging'),
    trialBalance: ep('/books/reports/trial-balance'),
    generalLedger: ep('/books/reports/general-ledger'),
  },
} as const;

// ---------------------------------------------------------------------------
// Invoice Endpoints
// ---------------------------------------------------------------------------

export const INVOICE_ENDPOINTS = {
  dashboard: ep('/invoice/dashboard'),
  estimates: {
    list: ep('/invoice/estimates'),
    detail: (id: string) => ep(`/invoice/estimates/${id}`),
    create: ep('/invoice/estimates'),
    send: (id: string) => ep(`/invoice/estimates/${id}/send`),
    convert: (id: string) => ep(`/invoice/estimates/${id}/convert`),
  },
  invoices: {
    list: ep('/invoice/invoices'),
    detail: (id: string) => ep(`/invoice/invoices/${id}`),
    create: ep('/invoice/invoices'),
    send: (id: string) => ep(`/invoice/invoices/${id}/send`),
    pdf: (id: string) => ep(`/invoice/invoices/${id}/pdf`),
  },
  recurring: {
    list: ep('/invoice/recurring'),
    detail: (id: string) => ep(`/invoice/recurring/${id}`),
    create: ep('/invoice/recurring'),
  },
  creditNotes: {
    list: ep('/invoice/credit-notes'),
    detail: (id: string) => ep(`/invoice/credit-notes/${id}`),
    create: ep('/invoice/credit-notes'),
  },
  payments: {
    list: ep('/invoice/payments'),
    detail: (id: string) => ep(`/invoice/payments/${id}`),
    create: ep('/invoice/payments'),
  },
  projects: {
    list: ep('/invoice/projects'),
    detail: (id: string) => ep(`/invoice/projects/${id}`),
  },
  timeTracking: {
    list: ep('/invoice/time-tracking'),
    create: ep('/invoice/time-tracking'),
  },
  customerPortal: ep('/invoice/customer-portal'),
  reports: ep('/invoice/reports'),
} as const;

// ---------------------------------------------------------------------------
// Billing Endpoints
// ---------------------------------------------------------------------------

export const BILLING_ENDPOINTS = {
  dashboard: ep('/billing/dashboard'),
  products: {
    list: ep('/billing/products'),
    detail: (id: string) => ep(`/billing/products/${id}`),
    create: ep('/billing/products'),
    update: (id: string) => ep(`/billing/products/${id}`),
  },
  plans: {
    list: ep('/billing/plans'),
    detail: (id: string) => ep(`/billing/plans/${id}`),
    create: ep('/billing/plans'),
  },
  addons: {
    list: ep('/billing/addons'),
    detail: (id: string) => ep(`/billing/addons/${id}`),
    create: ep('/billing/addons'),
  },
  coupons: {
    list: ep('/billing/coupons'),
    detail: (id: string) => ep(`/billing/coupons/${id}`),
    create: ep('/billing/coupons'),
  },
  subscriptions: {
    list: ep('/billing/subscriptions'),
    detail: (id: string) => ep(`/billing/subscriptions/${id}`),
    create: ep('/billing/subscriptions'),
    cancel: (id: string) => ep(`/billing/subscriptions/${id}/cancel`),
    pause: (id: string) => ep(`/billing/subscriptions/${id}/pause`),
    resume: (id: string) => ep(`/billing/subscriptions/${id}/resume`),
  },
  dunning: {
    list: ep('/billing/dunning'),
    settings: ep('/billing/dunning/settings'),
  },
  hostedPages: {
    list: ep('/billing/hosted-pages'),
    create: ep('/billing/hosted-pages'),
  },
  reports: ep('/billing/reports'),
} as const;

// ---------------------------------------------------------------------------
// Expense Endpoints
// ---------------------------------------------------------------------------

export const EXPENSE_ENDPOINTS = {
  dashboard: ep('/expense/dashboard'),
  expenses: {
    list: ep('/expense/expenses'),
    detail: (id: string) => ep(`/expense/expenses/${id}`),
    create: ep('/expense/expenses'),
    update: (id: string) => ep(`/expense/expenses/${id}`),
    delete: (id: string) => ep(`/expense/expenses/${id}`),
    submit: (id: string) => ep(`/expense/expenses/${id}/submit`),
    approve: (id: string) => ep(`/expense/expenses/${id}/approve`),
    reject: (id: string) => ep(`/expense/expenses/${id}/reject`),
  },
  expenseReports: {
    list: ep('/expense/expense-reports'),
    detail: (id: string) => ep(`/expense/expense-reports/${id}`),
    create: ep('/expense/expense-reports'),
    submit: (id: string) => ep(`/expense/expense-reports/${id}/submit`),
    approve: (id: string) => ep(`/expense/expense-reports/${id}/approve`),
  },
  trips: {
    list: ep('/expense/trips'),
    detail: (id: string) => ep(`/expense/trips/${id}`),
    create: ep('/expense/trips'),
  },
  perDiem: {
    list: ep('/expense/per-diem'),
    rates: ep('/expense/per-diem/rates'),
  },
  mileage: {
    list: ep('/expense/mileage'),
    create: ep('/expense/mileage'),
    rates: ep('/expense/mileage/rates'),
  },
  corporateCards: {
    list: ep('/expense/corporate-cards'),
    transactions: ep('/expense/corporate-cards/transactions'),
  },
  advances: {
    list: ep('/expense/advances'),
    detail: (id: string) => ep(`/expense/advances/${id}`),
    create: ep('/expense/advances'),
  },
  pettyCash: {
    list: ep('/expense/petty-cash'),
    create: ep('/expense/petty-cash'),
  },
  purchaseRequests: {
    list: ep('/expense/purchase-requests'),
    detail: (id: string) => ep(`/expense/purchase-requests/${id}`),
    create: ep('/expense/purchase-requests'),
  },
  policies: {
    list: ep('/expense/policies'),
    detail: (id: string) => ep(`/expense/policies/${id}`),
  },
  approvals: ep('/expense/approvals'),
  analytics: ep('/expense/analytics'),
} as const;

// ---------------------------------------------------------------------------
// Inventory Endpoints
// ---------------------------------------------------------------------------

export const INVENTORY_ENDPOINTS = {
  dashboard: ep('/inventory/dashboard'),
  items: {
    list: ep('/inventory/items'),
    detail: (id: string) => ep(`/inventory/items/${id}`),
    create: ep('/inventory/items'),
    update: (id: string) => ep(`/inventory/items/${id}`),
    delete: (id: string) => ep(`/inventory/items/${id}`),
    stock: (id: string) => ep(`/inventory/items/${id}/stock`),
  },
  warehouses: {
    list: ep('/inventory/warehouses'),
    detail: (id: string) => ep(`/inventory/warehouses/${id}`),
    create: ep('/inventory/warehouses'),
  },
  batchTracking: {
    list: ep('/inventory/batches'),
    detail: (id: string) => ep(`/inventory/batches/${id}`),
  },
  salesOrders: {
    list: ep('/inventory/sales-orders'),
    detail: (id: string) => ep(`/inventory/sales-orders/${id}`),
    create: ep('/inventory/sales-orders'),
  },
  packages: {
    list: ep('/inventory/packages'),
    detail: (id: string) => ep(`/inventory/packages/${id}`),
    create: ep('/inventory/packages'),
  },
  shipments: {
    list: ep('/inventory/shipments'),
    detail: (id: string) => ep(`/inventory/shipments/${id}`),
    create: ep('/inventory/shipments'),
  },
  purchaseOrders: {
    list: ep('/inventory/purchase-orders'),
    detail: (id: string) => ep(`/inventory/purchase-orders/${id}`),
    create: ep('/inventory/purchase-orders'),
  },
  stockAdjustments: {
    list: ep('/inventory/stock-adjustments'),
    create: ep('/inventory/stock-adjustments'),
  },
  transfers: {
    list: ep('/inventory/transfers'),
    detail: (id: string) => ep(`/inventory/transfers/${id}`),
    create: ep('/inventory/transfers'),
  },
  reports: ep('/inventory/reports'),
} as const;

// ---------------------------------------------------------------------------
// Checkout Endpoints
// ---------------------------------------------------------------------------

export const CHECKOUT_ENDPOINTS = {
  dashboard: ep('/checkout/dashboard'),
  paymentPages: {
    list: ep('/checkout/payment-pages'),
    detail: (id: string) => ep(`/checkout/payment-pages/${id}`),
    create: ep('/checkout/payment-pages'),
  },
  paymentLinks: {
    list: ep('/checkout/payment-links'),
    detail: (id: string) => ep(`/checkout/payment-links/${id}`),
    create: ep('/checkout/payment-links'),
  },
  transactions: {
    list: ep('/checkout/transactions'),
    detail: (id: string) => ep(`/checkout/transactions/${id}`),
    refund: (id: string) => ep(`/checkout/transactions/${id}/refund`),
  },
} as const;

// ---------------------------------------------------------------------------
// Commerce Endpoints
// ---------------------------------------------------------------------------

export const COMMERCE_ENDPOINTS = {
  dashboard: ep('/commerce/dashboard'),
  storefront: ep('/commerce/storefront'),
  products: {
    list: ep('/commerce/products'),
    detail: (id: string) => ep(`/commerce/products/${id}`),
    create: ep('/commerce/products'),
    update: (id: string) => ep(`/commerce/products/${id}`),
    delete: (id: string) => ep(`/commerce/products/${id}`),
  },
  orders: {
    list: ep('/commerce/orders'),
    detail: (id: string) => ep(`/commerce/orders/${id}`),
    fulfill: (id: string) => ep(`/commerce/orders/${id}/fulfill`),
    cancel: (id: string) => ep(`/commerce/orders/${id}/cancel`),
  },
  discounts: {
    list: ep('/commerce/discounts'),
    detail: (id: string) => ep(`/commerce/discounts/${id}`),
    create: ep('/commerce/discounts'),
  },
  analytics: ep('/commerce/analytics'),
} as const;

// ---------------------------------------------------------------------------
// Payroll Endpoints
// ---------------------------------------------------------------------------

export const PAYROLL_ENDPOINTS = {
  dashboard: ep('/payroll/dashboard'),
  employees: {
    list: ep('/payroll/employees'),
    detail: (id: string) => ep(`/payroll/employees/${id}`),
    create: ep('/payroll/employees'),
    update: (id: string) => ep(`/payroll/employees/${id}`),
  },
  payRuns: {
    list: ep('/payroll/pay-runs'),
    detail: (id: string) => ep(`/payroll/pay-runs/${id}`),
    create: ep('/payroll/pay-runs'),
    process: (id: string) => ep(`/payroll/pay-runs/${id}/process`),
  },
  benefits: {
    list: ep('/payroll/benefits'),
    detail: (id: string) => ep(`/payroll/benefits/${id}`),
  },
  taxes: {
    list: ep('/payroll/taxes'),
    settings: ep('/payroll/taxes/settings'),
  },
  reports: ep('/payroll/reports'),
} as const;

// ---------------------------------------------------------------------------
// Combined Endpoints Map
// ---------------------------------------------------------------------------

export const FINANCE_ENDPOINTS = {
  books: BOOKS_ENDPOINTS,
  invoice: INVOICE_ENDPOINTS,
  billing: BILLING_ENDPOINTS,
  expense: EXPENSE_ENDPOINTS,
  inventory: INVENTORY_ENDPOINTS,
  checkout: CHECKOUT_ENDPOINTS,
  commerce: COMMERCE_ENDPOINTS,
  payroll: PAYROLL_ENDPOINTS,
} as const;
