// ============================================================================
// CRM Module — Shared Constants
// ============================================================================

import type { CrmModuleName, Currency, OwnershipType, TimeUnit } from './types';

// --- CRM Module Registry ---

export const CRM_MODULES: { name: CrmModuleName; label: string; icon: string; path: string }[] = [
  // Core CRM (Sales Force Automation)
  { name: 'leads', label: 'Leads', icon: 'UserPlus', path: '/crm/leads' },
  { name: 'contacts', label: 'Contacts', icon: 'Users', path: '/crm/contacts' },
  { name: 'accounts', label: 'Accounts', icon: 'Building2', path: '/crm/accounts' },
  { name: 'deals', label: 'Deals', icon: 'Handshake', path: '/crm/deals' },
  // Activities & Communication
  { name: 'activities', label: 'Activities', icon: 'Activity', path: '/crm/activities' },
  { name: 'calendar', label: 'Calendar', icon: 'Calendar', path: '/crm/calendar' },
  { name: 'email', label: 'Email', icon: 'Mail', path: '/crm/email' },
  { name: 'social', label: 'Social', icon: 'Share2', path: '/crm/social' },
  { name: 'sms', label: 'SMS', icon: 'MessageSquare', path: '/crm/sms' },
  { name: 'salesiq', label: 'SalesIQ', icon: 'Headphones', path: '/crm/salesiq' },
  { name: 'omni-channel', label: 'Omni-Channel', icon: 'Radio', path: '/crm/omni-channel' },
  // Sales Operations
  { name: 'quotes', label: 'Quotes', icon: 'FileText', path: '/crm/quotes' },
  { name: 'sales-orders', label: 'Sales Orders', icon: 'ShoppingCart', path: '/crm/sales-orders' },
  { name: 'invoices', label: 'Invoices', icon: 'Receipt', path: '/crm/invoices' },
  { name: 'purchase-orders', label: 'Purchase Orders', icon: 'Truck', path: '/crm/purchase-orders' },
  { name: 'products', label: 'Products', icon: 'Package', path: '/crm/products' },
  { name: 'price-books', label: 'Price Books', icon: 'BookOpen', path: '/crm/price-books' },
  { name: 'vendors', label: 'Vendors', icon: 'Store', path: '/crm/vendors' },
  { name: 'cases', label: 'Cases', icon: 'LifeBuoy', path: '/crm/cases' },
  { name: 'cpq', label: 'CPQ', icon: 'Calculator', path: '/crm/cpq' },
  // Automation & Process
  { name: 'workflows', label: 'Workflows', icon: 'Workflow', path: '/crm/workflows' },
  { name: 'blueprint', label: 'Blueprint', icon: 'GitBranch', path: '/crm/blueprint' },
  { name: 'cadences', label: 'Cadences', icon: 'Timer', path: '/crm/cadences' },
  { name: 'page-layouts', label: 'Page Layouts', icon: 'Layout', path: '/crm/page-layouts' },
  { name: 'journey-orchestration', label: 'Journey Orchestration', icon: 'Route', path: '/crm/journey-orchestration' },
  // AI & Intelligence
  { name: 'zia', label: 'Zia (AI)', icon: 'Brain', path: '/crm/zia' },
  // Territory & Team
  { name: 'territories', label: 'Territories', icon: 'Map', path: '/crm/territories' },
  { name: 'teams', label: 'Teams', icon: 'UsersRound', path: '/crm/teams' },
  { name: 'roles-profiles', label: 'Roles & Profiles', icon: 'Shield', path: '/crm/roles-profiles' },
  // Analytics
  { name: 'reports', label: 'Reports', icon: 'BarChart3', path: '/crm/reports' },
  { name: 'dashboards', label: 'Dashboards', icon: 'LayoutDashboard', path: '/crm/dashboards' },
  { name: 'forecasting', label: 'Forecasting', icon: 'TrendingUp', path: '/crm/forecasting' },
  { name: 'customer-analytics', label: 'Customer Analytics', icon: 'PieChart', path: '/crm/customer-analytics' },
  { name: 'pipeline-analytics', label: 'Pipeline Analytics', icon: 'GitFork', path: '/crm/pipeline-analytics' },
  // Platform
  { name: 'custom-modules', label: 'Custom Modules', icon: 'Puzzle', path: '/crm/custom-modules' },
  { name: 'canvas', label: 'Canvas', icon: 'Paintbrush', path: '/crm/canvas' },
  { name: 'client-scripts', label: 'Client Scripts', icon: 'Code', path: '/crm/client-scripts' },
  { name: 'functions', label: 'Functions', icon: 'Zap', path: '/crm/functions' },
  { name: 'widgets', label: 'Widgets', icon: 'Widget', path: '/crm/widgets' },
  { name: 'apis', label: 'APIs', icon: 'Globe', path: '/crm/apis' },
  { name: 'sandbox', label: 'Sandbox', icon: 'FlaskConical', path: '/crm/sandbox' },
  { name: 'portals', label: 'Portals', icon: 'ExternalLink', path: '/crm/portals' },
  // Shared
  { name: 'notes', label: 'Notes', icon: 'StickyNote', path: '/crm/notes' },
  { name: 'attachments', label: 'Attachments', icon: 'Paperclip', path: '/crm/attachments' },
  { name: 'tags', label: 'Tags', icon: 'Tag', path: '/crm/tags' },
  { name: 'search', label: 'Search', icon: 'Search', path: '/crm/search' },
  { name: 'import', label: 'Import', icon: 'Upload', path: '/crm/import' },
  { name: 'settings', label: 'Settings', icon: 'Settings', path: '/crm/settings' },
  { name: 'quick-create', label: 'Quick Create', icon: 'Plus', path: '/crm/quick-create' },
];

// --- Default Pipeline Stages ---

export const DEFAULT_DEAL_STAGES = [
  { id: 'stage-1', name: 'Qualification', probability: 10, order: 1, color: 'var(--status-neutral)' },
  { id: 'stage-2', name: 'Needs Analysis', probability: 25, order: 2, color: 'var(--status-info)' },
  { id: 'stage-3', name: 'Proposal', probability: 50, order: 3, color: 'var(--status-accent)' },
  { id: 'stage-4', name: 'Negotiation', probability: 75, order: 4, color: 'var(--status-warning)' },
  { id: 'stage-5', name: 'Closed Won', probability: 100, order: 5, color: 'var(--status-success)' },
  { id: 'stage-6', name: 'Closed Lost', probability: 0, order: 6, color: 'var(--status-danger)' },
] as const;

// --- Sort Field Options ---

export const CRM_SORT_FIELDS = {
  leads: ['createdAt', 'firstName', 'lastName', 'company', 'leadSource', 'leadScore', 'status'],
  contacts: ['createdAt', 'firstName', 'lastName', 'company', 'email', 'phone', 'status'],
  accounts: ['createdAt', 'name', 'industry', 'type', 'annualRevenue', 'rating'],
  deals: ['createdAt', 'dealName', 'amount', 'closingDate', 'stage', 'probability'],
  activities: ['createdAt', 'subject', 'dueDate', 'priority', 'status', 'type'],
  quotes: ['createdAt', 'subject', 'total', 'validUntil', 'status'],
  salesOrders: ['createdAt', 'subject', 'total', 'status'],
  invoices: ['createdAt', 'invoiceNumber', 'total', 'dueDate', 'status'],
  cases: ['createdAt', 'subject', 'priority', 'status', 'origin'],
} as const;

// --- View Mode Options ---

export const CRM_VIEW_MODES = ['list', 'pipeline', 'card'] as const;
export type CrmViewMode = (typeof CRM_VIEW_MODES)[number];

// --- Ownership Types ---

export const OWNERSHIP_TYPES: { value: OwnershipType; label: string }[] = [
  { value: 'private', label: 'Private' },
  { value: 'public-read', label: 'Public Read' },
  { value: 'public-read-write', label: 'Public Read/Write' },
  { value: 'read-only', label: 'Read Only' },
];

// --- Currency Options ---

export const CURRENCY_OPTIONS: { value: Currency; label: string; symbol: string }[] = [
  { value: 'USD', label: 'US Dollar', symbol: '$' },
  { value: 'EUR', label: 'Euro', symbol: '\u20AC' },
  { value: 'GBP', label: 'British Pound', symbol: '\u00A3' },
  { value: 'INR', label: 'Indian Rupee', symbol: '\u20B9' },
  { value: 'AUD', label: 'Australian Dollar', symbol: 'A$' },
  { value: 'CAD', label: 'Canadian Dollar', symbol: 'C$' },
  { value: 'SGD', label: 'Singapore Dollar', symbol: 'S$' },
];

// --- CRM Editions ---

export const CRM_EDITIONS = ['free', 'standard', 'professional', 'enterprise'] as const;
export type CrmEdition = (typeof CRM_EDITIONS)[number];

// --- Status Colors ---

export const CRM_STATUS_COLORS: Record<string, string> = {
  active: 'text-status-success',
  inactive: 'text-status-neutral',
  draft: 'text-status-warning',
  archived: 'text-status-neutral',
  pending: 'text-status-warning',
  approved: 'text-status-success',
  rejected: 'text-status-danger',
  converted: 'text-status-info',
  qualified: 'text-status-accent',
  unqualified: 'text-status-neutral',
  won: 'text-status-success',
  lost: 'text-status-danger',
  open: 'text-status-info',
  closed: 'text-status-neutral',
  escalated: 'text-status-elevated',
  resolved: 'text-status-success',
};

export const CRM_STATUS_BG_COLORS: Record<string, string> = {
  active: 'bg-status-success/15',
  inactive: 'bg-status-neutral/15',
  draft: 'bg-status-warning/15',
  archived: 'bg-status-neutral/15',
  pending: 'bg-status-warning/15',
  approved: 'bg-status-success/15',
  rejected: 'bg-status-danger/15',
  converted: 'bg-status-info/15',
  qualified: 'bg-status-accent/15',
  unqualified: 'bg-status-neutral/15',
  won: 'bg-status-success/15',
  lost: 'bg-status-danger/15',
  open: 'bg-status-info/15',
  closed: 'bg-status-neutral/15',
  escalated: 'bg-status-elevated/15',
  resolved: 'bg-status-success/15',
};

// --- Default Page Sizes ---

export const DEFAULT_PAGE_SIZE = 25;
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100] as const;

// --- Time Unit Labels ---

export const TIME_UNIT_LABELS: Record<TimeUnit, string> = {
  minutes: 'Minutes',
  hours: 'Hours',
  days: 'Days',
  weeks: 'Weeks',
  months: 'Months',
};

// --- Sidebar Sections ---

export const CRM_SIDEBAR_SECTIONS = [
  { title: 'Core CRM', modules: ['leads', 'contacts', 'accounts', 'deals'] },
  { title: 'Activities', modules: ['activities', 'calendar', 'email', 'social', 'sms', 'salesiq', 'omni-channel'] },
  { title: 'Sales Ops', modules: ['quotes', 'sales-orders', 'invoices', 'purchase-orders', 'products', 'price-books', 'vendors', 'cases', 'cpq'] },
  { title: 'Automation', modules: ['workflows', 'blueprint', 'cadences', 'page-layouts', 'journey-orchestration'] },
  { title: 'AI', modules: ['zia'] },
  { title: 'Team', modules: ['territories', 'teams', 'roles-profiles'] },
  { title: 'Analytics', modules: ['reports', 'dashboards', 'forecasting', 'customer-analytics', 'pipeline-analytics'] },
  { title: 'Platform', modules: ['custom-modules', 'canvas', 'client-scripts', 'functions', 'widgets', 'apis', 'sandbox', 'portals'] },
] as const;
