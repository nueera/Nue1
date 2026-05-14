// @ts-nocheck
// ============================================================================
// CRM Module — Routes Config
// ============================================================================

export const CRM_ROUTES = {
  // Dashboard
  DASHBOARD: '/crm/dashboard',

  // Core CRM
  LEADS: '/crm/leads',
  LEAD_NEW: '/crm/leads/new',
  LEAD_DETAIL: (id: string) => `/crm/leads/${id}`,
  CONTACTS: '/crm/contacts',
  CONTACT_NEW: '/crm/contacts/new',
  CONTACT_DETAIL: (id: string) => `/crm/contacts/${id}`,
  ACCOUNTS: '/crm/accounts',
  ACCOUNT_NEW: '/crm/accounts/new',
  ACCOUNT_DETAIL: (id: string) => `/crm/accounts/${id}`,
  DEALS: '/crm/deals',
  DEAL_NEW: '/crm/deals/new',
  DEAL_DETAIL: (id: string) => `/crm/deals/${id}`,
  DEAL_PIPELINE: '/crm/deals/pipeline',

  // Activities & Communication
  ACTIVITIES: '/crm/activities',
  CALENDAR: '/crm/calendar',
  EMAIL: '/crm/email',
  SOCIAL: '/crm/social',
  SMS: '/crm/sms',
  SALESIQ: '/crm/salesiq',
  OMNI_CHANNEL: '/crm/omni-channel',

  // Sales Operations
  QUOTES: '/crm/quotes',
  QUOTE_NEW: '/crm/quotes/new',
  QUOTE_DETAIL: (id: string) => `/crm/quotes/${id}`,
  SALES_ORDERS: '/crm/sales-orders',
  INVOICES: '/crm/invoices',
  PURCHASE_ORDERS: '/crm/purchase-orders',
  PRODUCTS: '/crm/products',
  PRICE_BOOKS: '/crm/price-books',
  VENDORS: '/crm/vendors',
  CASES: '/crm/cases',
  CPQ: '/crm/cpq',

  // Automation & Process
  WORKFLOWS: '/crm/workflows',
  BLUEPRINT: '/crm/blueprint',
  CADENCES: '/crm/cadences',
  PAGE_LAYOUTS: '/crm/page-layouts',
  JOURNEY: '/crm/journey-orchestration',

  // AI & Intelligence
  ZIA: '/crm/zia',

  // Territory & Team
  TERRITORIES: '/crm/territories',
  TEAMS: '/crm/teams',
  ROLES_PROFILES: '/crm/roles-profiles',

  // Analytics
  REPORTS: '/crm/reports',
  DASHBOARDS: '/crm/dashboards',
  FORECASTING: '/crm/forecasting',
  CUSTOMER_ANALYTICS: '/crm/customer-analytics',
  PIPELINE_ANALYTICS: '/crm/pipeline-analytics',

  // Platform & Customization
  CUSTOM_MODULES: '/crm/custom-modules',
  CANVAS: '/crm/canvas',
  CLIENT_SCRIPTS: '/crm/client-scripts',
  FUNCTIONS: '/crm/functions',
  WIDGETS: '/crm/widgets',
  APIS: '/crm/apis',
  SANDBOX: '/crm/sandbox',
  PORTALS: '/crm/portals',

  // Settings
  SETTINGS: '/crm/settings',
} as const;

export type CrmRouteKey = keyof typeof CRM_ROUTES;
