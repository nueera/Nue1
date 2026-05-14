// @ts-nocheck
// ============================================================================
// CRM Module — Sidebar Navigation Config
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

export const crmNavSections: CrmNavSection[] = [
  {
    title: 'Dashboard',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, slug: 'dashboard' },
    ],
  },
  {
    title: 'Core CRM',
    items: [
      { id: 'leads', label: 'Leads', icon: UserPlus, slug: 'leads' },
      { id: 'contacts', label: 'Contacts', icon: Users, slug: 'contacts' },
      { id: 'accounts', label: 'Accounts', icon: Building2, slug: 'accounts' },
      { id: 'deals', label: 'Deals', icon: Handshake, slug: 'deals' },
    ],
  },
  {
    title: 'Activities',
    items: [
      { id: 'activities', label: 'Activities', icon: Activity, slug: 'activities' },
      { id: 'calendar', label: 'Calendar', icon: Calendar, slug: 'calendar' },
      { id: 'email', label: 'Email', icon: Mail, slug: 'email' },
      { id: 'social', label: 'Social', icon: Share2, slug: 'social' },
      { id: 'sms', label: 'SMS', icon: MessageSquare, slug: 'sms' },
      { id: 'salesiq', label: 'SalesIQ', icon: Headphones, slug: 'salesiq' },
      { id: 'omni-channel', label: 'Omni-Channel', icon: Radio, slug: 'omni-channel' },
    ],
  },
  {
    title: 'Sales Ops',
    items: [
      { id: 'quotes', label: 'Quotes', icon: FileText, slug: 'quotes' },
      { id: 'sales-orders', label: 'Sales Orders', icon: ShoppingCart, slug: 'sales-orders' },
      { id: 'invoices', label: 'Invoices', icon: Receipt, slug: 'invoices' },
      { id: 'purchase-orders', label: 'Purchase Orders', icon: Truck, slug: 'purchase-orders' },
      { id: 'products', label: 'Products', icon: Package, slug: 'products' },
      { id: 'price-books', label: 'Price Books', icon: BookOpen, slug: 'price-books' },
      { id: 'vendors', label: 'Vendors', icon: Store, slug: 'vendors' },
      { id: 'cases', label: 'Cases', icon: LifeBuoy, slug: 'cases' },
      { id: 'cpq', label: 'CPQ', icon: Calculator, slug: 'cpq' },
    ],
  },
  {
    title: 'Automation',
    items: [
      { id: 'workflows', label: 'Workflows', icon: Workflow, slug: 'workflows' },
      { id: 'blueprint', label: 'Blueprint', icon: GitBranch, slug: 'blueprint' },
      { id: 'cadences', label: 'Cadences', icon: Timer, slug: 'cadences' },
      { id: 'page-layouts', label: 'Page Layouts', icon: Layout, slug: 'page-layouts' },
      { id: 'journey-orchestration', label: 'Journey Orchestration', icon: Route, slug: 'journey-orchestration' },
    ],
  },
  {
    title: 'AI',
    items: [
      { id: 'zia', label: 'Zia (AI)', icon: Brain, slug: 'zia' },
    ],
  },
  {
    title: 'Team',
    items: [
      { id: 'territories', label: 'Territories', icon: Map, slug: 'territories' },
      { id: 'teams', label: 'Teams', icon: UsersRound, slug: 'teams' },
      { id: 'roles-profiles', label: 'Roles & Profiles', icon: Shield, slug: 'roles-profiles' },
    ],
  },
  {
    title: 'Analytics',
    items: [
      { id: 'reports', label: 'Reports', icon: BarChart3, slug: 'reports' },
      { id: 'dashboards', label: 'Dashboards', icon: LayoutDashboard, slug: 'dashboards' },
      { id: 'forecasting', label: 'Forecasting', icon: TrendingUp, slug: 'forecasting' },
      { id: 'customer-analytics', label: 'Customer Analytics', icon: PieChart, slug: 'customer-analytics' },
      { id: 'pipeline-analytics', label: 'Pipeline Analytics', icon: GitFork, slug: 'pipeline-analytics' },
    ],
  },
  {
    title: 'Platform',
    items: [
      { id: 'custom-modules', label: 'Custom Modules', icon: Puzzle, slug: 'custom-modules' },
      { id: 'canvas', label: 'Canvas', icon: Paintbrush, slug: 'canvas' },
      { id: 'client-scripts', label: 'Client Scripts', icon: Code, slug: 'client-scripts' },
      { id: 'functions', label: 'Functions', icon: Zap, slug: 'functions' },
      { id: 'widgets', label: 'Widgets', icon: LayoutGrid, slug: 'widgets' },
      { id: 'apis', label: 'APIs', icon: Globe, slug: 'apis' },
      { id: 'sandbox', label: 'Sandbox', icon: FlaskConical, slug: 'sandbox' },
      { id: 'portals', label: 'Portals', icon: ExternalLink, slug: 'portals' },
    ],
  },
  {
    title: 'System',
    items: [
      { id: 'settings', label: 'Settings', icon: Settings, slug: 'settings' },
    ],
  },
];

export const crmPageTitles: Record<string, string> = {
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
