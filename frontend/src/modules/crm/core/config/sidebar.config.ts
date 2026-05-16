// @ts-nocheck
// ============================================================================
// CRM Navigation Configuration
// Sidebar navigation for all 5 CRM products
// ============================================================================

import {
  LayoutDashboard,
  Users,
  UserPlus,
  Building2,
  Handshake,
  Activity,
  Calendar,
  Mail,
  Share2,
  MessageSquare,
  Headphones,
  Radio,
  FileText,
  ShoppingCart,
  Receipt,
  Truck,
  Package,
  BookOpen,
  Store,
  LifeBuoy,
  Calculator,
  Workflow,
  GitBranch,
  Timer,
  Layout,
  Route,
  Brain,
  Map,
  UsersRound,
  Shield,
  BarChart3,
  TrendingUp,
  PieChart,
  GitFork,
  Puzzle,
  Paintbrush,
  Code,
  Zap,
  LayoutGrid,
  Globe,
  FlaskConical,
  ExternalLink,
  Settings,
} from 'lucide-react';
import type { CrmProduct } from '../types';

// ---------------------------------------------------------------------------
// Nav Item & Section Types
// ---------------------------------------------------------------------------

export interface CrmNavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  slug: string;
  badge?: string;
}

export interface CrmNavSection {
  title: string;
  items: CrmNavItem[];
}

export interface ProductNavConfig {
  product: CrmProduct;
  label: string;
  sections: CrmNavSection[];
}

// ---------------------------------------------------------------------------
// Sales — Core CRM + Sales Ops
// ---------------------------------------------------------------------------

const SALES_NAV: ProductNavConfig = {
  product: 'sales',
  label: 'Sales',
  sections: [
    {
      title: 'Overview',
      items: [
        { id: 'sales-dashboard', label: 'Dashboard', icon: LayoutDashboard, slug: 'sales/dashboard' },
      ],
    },
    {
      title: 'Pipeline',
      items: [
        { id: 'sales-leads', label: 'Leads', icon: UserPlus, slug: 'sales/leads' },
        { id: 'sales-contacts', label: 'Contacts', icon: Users, slug: 'sales/contacts' },
        { id: 'sales-accounts', label: 'Accounts', icon: Building2, slug: 'sales/accounts' },
        { id: 'sales-deals', label: 'Deals', icon: Handshake, slug: 'sales/deals' },
      ],
    },
    {
      title: 'Sales Ops',
      items: [
        { id: 'sales-quotes', label: 'Quotes', icon: FileText, slug: 'sales/quotes' },
        { id: 'sales-orders', label: 'Sales Orders', icon: ShoppingCart, slug: 'sales/sales-orders' },
        { id: 'sales-invoices', label: 'Invoices', icon: Receipt, slug: 'sales/invoices' },
        { id: 'sales-purchase-orders', label: 'Purchase Orders', icon: Truck, slug: 'sales/purchase-orders' },
        { id: 'sales-products', label: 'Products', icon: Package, slug: 'sales/products' },
        { id: 'sales-price-books', label: 'Price Books', icon: BookOpen, slug: 'sales/price-books' },
        { id: 'sales-vendors', label: 'Vendors', icon: Store, slug: 'sales/vendors' },
        { id: 'sales-cases', label: 'Cases', icon: LifeBuoy, slug: 'sales/cases' },
        { id: 'sales-cpq', label: 'CPQ', icon: Calculator, slug: 'sales/cpq' },
      ],
    },
    {
      title: 'Team',
      items: [
        { id: 'sales-territories', label: 'Territories', icon: Map, slug: 'sales/territories' },
        { id: 'sales-teams', label: 'Teams', icon: UsersRound, slug: 'sales/teams' },
        { id: 'sales-roles-profiles', label: 'Roles & Profiles', icon: Shield, slug: 'sales/roles-profiles' },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Engagement — Activities & Communication
// ---------------------------------------------------------------------------

const ENGAGEMENT_NAV: ProductNavConfig = {
  product: 'engagement',
  label: 'Engagement',
  sections: [
    {
      title: 'Overview',
      items: [
        { id: 'engagement-dashboard', label: 'Dashboard', icon: LayoutDashboard, slug: 'engagement/dashboard' },
      ],
    },
    {
      title: 'Activities',
      items: [
        { id: 'engagement-activities', label: 'Activities', icon: Activity, slug: 'engagement/activities' },
        { id: 'engagement-calendar', label: 'Calendar', icon: Calendar, slug: 'engagement/calendar' },
      ],
    },
    {
      title: 'Communication',
      items: [
        { id: 'engagement-email', label: 'Email', icon: Mail, slug: 'engagement/email' },
        { id: 'engagement-social', label: 'Social', icon: Share2, slug: 'engagement/social' },
        { id: 'engagement-sms', label: 'SMS', icon: MessageSquare, slug: 'engagement/sms' },
      ],
    },
    {
      title: 'Channels',
      items: [
        { id: 'engagement-salesiq', label: 'SalesIQ', icon: Headphones, slug: 'engagement/salesiq' },
        { id: 'engagement-omni-channel', label: 'Omni-Channel', icon: Radio, slug: 'engagement/omni-channel' },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Automation — Workflows & AI
// ---------------------------------------------------------------------------

const AUTOMATION_NAV: ProductNavConfig = {
  product: 'automation',
  label: 'Automation',
  sections: [
    {
      title: 'Overview',
      items: [
        { id: 'automation-dashboard', label: 'Dashboard', icon: LayoutDashboard, slug: 'automation/dashboard' },
      ],
    },
    {
      title: 'Workflows',
      items: [
        { id: 'automation-workflows', label: 'Workflows', icon: Workflow, slug: 'automation/workflows' },
        { id: 'automation-blueprint', label: 'Blueprint', icon: GitBranch, slug: 'automation/blueprint' },
        { id: 'automation-cadences', label: 'Cadences', icon: Timer, slug: 'automation/cadences' },
        { id: 'automation-page-layouts', label: 'Page Layouts', icon: Layout, slug: 'automation/page-layouts' },
        { id: 'automation-journey-orchestration', label: 'Journey Orchestration', icon: Route, slug: 'automation/journey-orchestration' },
      ],
    },
    {
      title: 'AI',
      items: [
        { id: 'automation-zia', label: 'Zia (AI)', icon: Brain, slug: 'automation/zia' },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Analytics — Reports & Insights
// ---------------------------------------------------------------------------

const ANALYTICS_NAV: ProductNavConfig = {
  product: 'analytics',
  label: 'Analytics',
  sections: [
    {
      title: 'Overview',
      items: [
        { id: 'analytics-dashboard', label: 'Dashboard', icon: LayoutDashboard, slug: 'analytics/dashboard' },
      ],
    },
    {
      title: 'Reports',
      items: [
        { id: 'analytics-reports', label: 'Reports', icon: BarChart3, slug: 'analytics/reports' },
        { id: 'analytics-dashboards', label: 'Dashboards', icon: LayoutDashboard, slug: 'analytics/dashboards' },
      ],
    },
    {
      title: 'Insights',
      items: [
        { id: 'analytics-forecasting', label: 'Forecasting', icon: TrendingUp, slug: 'analytics/forecasting' },
        { id: 'analytics-customer-analytics', label: 'Customer Analytics', icon: PieChart, slug: 'analytics/customer-analytics' },
        { id: 'analytics-pipeline-analytics', label: 'Pipeline Analytics', icon: GitFork, slug: 'analytics/pipeline-analytics' },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Platform — Customization & Development
// ---------------------------------------------------------------------------

const PLATFORM_NAV: ProductNavConfig = {
  product: 'platform',
  label: 'Platform',
  sections: [
    {
      title: 'Overview',
      items: [
        { id: 'platform-dashboard', label: 'Dashboard', icon: LayoutDashboard, slug: 'platform/dashboard' },
      ],
    },
    {
      title: 'Customization',
      items: [
        { id: 'platform-custom-modules', label: 'Custom Modules', icon: Puzzle, slug: 'platform/custom-modules' },
        { id: 'platform-canvas', label: 'Canvas', icon: Paintbrush, slug: 'platform/canvas' },
        { id: 'platform-client-scripts', label: 'Client Scripts', icon: Code, slug: 'platform/client-scripts' },
      ],
    },
    {
      title: 'Development',
      items: [
        { id: 'platform-functions', label: 'Functions', icon: Zap, slug: 'platform/functions' },
        { id: 'platform-widgets', label: 'Widgets', icon: LayoutGrid, slug: 'platform/widgets' },
        { id: 'platform-apis', label: 'APIs', icon: Globe, slug: 'platform/apis' },
      ],
    },
    {
      title: 'Environment',
      items: [
        { id: 'platform-sandbox', label: 'Sandbox', icon: FlaskConical, slug: 'platform/sandbox' },
        { id: 'platform-portals', label: 'Portals', icon: ExternalLink, slug: 'platform/portals' },
      ],
    },
    {
      title: 'System',
      items: [
        { id: 'platform-settings', label: 'Settings', icon: Settings, slug: 'platform/settings' },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Product Navigation Map
// ---------------------------------------------------------------------------

export const PRODUCT_NAV_CONFIGS: Record<CrmProduct, ProductNavConfig> = {
  sales: SALES_NAV,
  engagement: ENGAGEMENT_NAV,
  automation: AUTOMATION_NAV,
  analytics: ANALYTICS_NAV,
  platform: PLATFORM_NAV,
};

// ---------------------------------------------------------------------------
// Product Labels & Metadata
// ---------------------------------------------------------------------------

export const PRODUCT_LABELS: Record<CrmProduct, string> = {
  sales: 'Sales',
  engagement: 'Engagement',
  automation: 'Automation',
  analytics: 'Analytics',
  platform: 'Platform',
};

export const PRODUCT_DESCRIPTIONS: Record<CrmProduct, string> = {
  sales: 'Sales pipeline, deals, quotes, and order management',
  engagement: 'Activities, communication channels, and customer engagement',
  automation: 'Workflows, blueprints, cadences, and AI-powered automation',
  analytics: 'Reports, dashboards, forecasting, and customer insights',
  platform: 'Customization, development tools, APIs, and platform management',
};

// ---------------------------------------------------------------------------
// Page Titles Map (for breadcrumb / topbar)
// ---------------------------------------------------------------------------

export const crmPageTitles: Record<string, string> = {
  // Sales
  'sales/dashboard': 'Dashboard',
  'sales/leads': 'Leads',
  'sales/contacts': 'Contacts',
  'sales/accounts': 'Accounts',
  'sales/deals': 'Deals',
  'sales/quotes': 'Quotes',
  'sales/sales-orders': 'Sales Orders',
  'sales/invoices': 'Invoices',
  'sales/purchase-orders': 'Purchase Orders',
  'sales/products': 'Products',
  'sales/price-books': 'Price Books',
  'sales/vendors': 'Vendors',
  'sales/cases': 'Cases',
  'sales/cpq': 'CPQ',
  'sales/territories': 'Territories',
  'sales/teams': 'Teams',
  'sales/roles-profiles': 'Roles & Profiles',

  // Engagement
  'engagement/dashboard': 'Dashboard',
  'engagement/activities': 'Activities',
  'engagement/calendar': 'Calendar',
  'engagement/email': 'Email',
  'engagement/social': 'Social',
  'engagement/sms': 'SMS',
  'engagement/salesiq': 'SalesIQ',
  'engagement/omni-channel': 'Omni-Channel',

  // Automation
  'automation/dashboard': 'Dashboard',
  'automation/workflows': 'Workflows',
  'automation/blueprint': 'Blueprint',
  'automation/cadences': 'Cadences',
  'automation/page-layouts': 'Page Layouts',
  'automation/journey-orchestration': 'Journey Orchestration',
  'automation/zia': 'Zia (AI)',

  // Analytics
  'analytics/dashboard': 'Dashboard',
  'analytics/reports': 'Reports',
  'analytics/dashboards': 'Dashboards',
  'analytics/forecasting': 'Forecasting',
  'analytics/customer-analytics': 'Customer Analytics',
  'analytics/pipeline-analytics': 'Pipeline Analytics',

  // Platform
  'platform/dashboard': 'Dashboard',
  'platform/custom-modules': 'Custom Modules',
  'platform/canvas': 'Canvas',
  'platform/client-scripts': 'Client Scripts',
  'platform/functions': 'Functions',
  'platform/widgets': 'Widgets',
  'platform/apis': 'APIs',
  'platform/sandbox': 'Sandbox',
  'platform/portals': 'Portals',
  'platform/settings': 'Settings',

  // Legacy flat routes (kept for backward compatibility)
  dashboard: 'Dashboard',
  leads: 'Leads',
  contacts: 'Contacts',
  accounts: 'Accounts',
  deals: 'Deals',
  activities: 'Activities',
  calendar: 'Calendar',
  email: 'Email',
  social: 'Social',
  sms: 'SMS',
  salesiq: 'SalesIQ',
  'omni-channel': 'Omni-Channel',
  quotes: 'Quotes',
  'sales-orders': 'Sales Orders',
  invoices: 'Invoices',
  'purchase-orders': 'Purchase Orders',
  products: 'Products',
  'price-books': 'Price Books',
  vendors: 'Vendors',
  cases: 'Cases',
  cpq: 'CPQ',
  workflows: 'Workflows',
  blueprint: 'Blueprint',
  cadences: 'Cadences',
  'page-layouts': 'Page Layouts',
  'journey-orchestration': 'Journey Orchestration',
  zia: 'Zia (AI)',
  territories: 'Territories',
  teams: 'Teams',
  'roles-profiles': 'Roles & Profiles',
  reports: 'Reports',
  dashboards: 'Dashboards',
  forecasting: 'Forecasting',
  'customer-analytics': 'Customer Analytics',
  'pipeline-analytics': 'Pipeline Analytics',
  'custom-modules': 'Custom Modules',
  canvas: 'Canvas',
  'client-scripts': 'Client Scripts',
  functions: 'Functions',
  widgets: 'Widgets',
  apis: 'APIs',
  sandbox: 'Sandbox',
  portals: 'Portals',
  settings: 'Settings',
};

// ---------------------------------------------------------------------------
// Helper: Get nav sections for a product
// ---------------------------------------------------------------------------

export function getNavSectionsForProduct(product: CrmProduct): CrmNavSection[] {
  return PRODUCT_NAV_CONFIGS[product]?.sections ?? [];
}

// ---------------------------------------------------------------------------
// Helper: Get flat list of all nav items for a product
// ---------------------------------------------------------------------------

export function getAllNavItemsForProduct(product: CrmProduct): CrmNavItem[] {
  const config = PRODUCT_NAV_CONFIGS[product];
  if (!config) return [];
  return config.sections.flatMap((s) => s.items);
}

// ---------------------------------------------------------------------------
// Legacy export for backward compatibility
// ---------------------------------------------------------------------------

export const crmNavSections: CrmNavSection[] = SALES_NAV.sections;
