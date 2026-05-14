// @ts-nocheck
// ============================================================================
// Marketing Navigation Configuration
// Sidebar navigation for all 7 Marketing products
// ============================================================================

import {
  LayoutDashboard,
  Mail,
  MessageSquare,
  Phone,
  Share2,
  FileText,
  Users,
  UserPlus,
  Contact,
  Target,
  GitBranchPlus,
  ListTree,
  Workflow,
  BarChart3,
  FileBarChart,
  PieChart,
  Globe,
  Link2,
  Flag,
  FlaskConical,
  ShoppingCart,
  Store,
  ShoppingBag,
  Package,
  Receipt,
  Zap,
  Clock,
  Eye,
  RefreshCw,
  Settings,
  TrendingUp,
  Megaphone,
  Layers,
  UsersRound,
  Split,
  Award,
  Bell,
  CalendarDays,
  Webhook,
  MousePointerClick,
  BookOpen,
} from 'lucide-react';
import type { MarketingProduct } from '../types';

// ---------------------------------------------------------------------------
// Nav Item & Section Types (same pattern as Finance navigation.ts)
// ---------------------------------------------------------------------------

export interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  slug: string;
  badge?: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export interface ProductNavConfig {
  product: MarketingProduct;
  label: string;
  sections: NavSection[];
}

// ---------------------------------------------------------------------------
// Campaigns — Email, SMS, WhatsApp, Social, Templates
// ---------------------------------------------------------------------------

const CAMPAIGNS_NAV: ProductNavConfig = {
  product: 'campaigns',
  label: 'Campaigns',
  sections: [
    {
      title: 'Overview',
      items: [
        { id: 'campaigns-dashboard', label: 'Dashboard', icon: LayoutDashboard, slug: 'campaigns/dashboard' },
      ],
    },
    {
      title: 'Channels',
      items: [
        { id: 'campaigns-email', label: 'Email Campaigns', icon: Mail, slug: 'campaigns/email' },
        { id: 'campaigns-sms', label: 'SMS Campaigns', icon: MessageSquare, slug: 'campaigns/sms' },
        { id: 'campaigns-whatsapp', label: 'WhatsApp', icon: Phone, slug: 'campaigns/whatsapp' },
        { id: 'campaigns-social', label: 'Social', icon: Share2, slug: 'campaigns/social' },
      ],
    },
    {
      title: 'Assets',
      items: [
        { id: 'campaigns-templates', label: 'Templates', icon: FileText, slug: 'campaigns/templates' },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Leads — Leads, Contacts, Scoring, Stages
// ---------------------------------------------------------------------------

const LEADS_NAV: ProductNavConfig = {
  product: 'leads',
  label: 'Leads',
  sections: [
    {
      title: 'Overview',
      items: [
        { id: 'leads-dashboard', label: 'Dashboard', icon: LayoutDashboard, slug: 'leads/dashboard' },
      ],
    },
    {
      title: 'Contacts',
      items: [
        { id: 'leads-leads', label: 'Leads', icon: UserPlus, slug: 'leads/leads' },
        { id: 'leads-contacts', label: 'Contacts', icon: Contact, slug: 'leads/contacts' },
      ],
    },
    {
      title: 'Scoring & Pipeline',
      items: [
        { id: 'leads-scoring', label: 'Lead Scoring', icon: Target, slug: 'leads/scoring' },
        { id: 'leads-stages', label: 'Lead Stages', icon: Layers, slug: 'leads/stages' },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Audiences — Audiences, Segments, Signup Forms
// ---------------------------------------------------------------------------

const AUDIENCES_NAV: ProductNavConfig = {
  product: 'audiences',
  label: 'Audiences',
  sections: [
    {
      title: 'Overview',
      items: [
        { id: 'audiences-dashboard', label: 'Dashboard', icon: LayoutDashboard, slug: 'audiences/dashboard' },
      ],
    },
    {
      title: 'Lists',
      items: [
        { id: 'audiences-audiences', label: 'Audiences', icon: Users, slug: 'audiences/audiences' },
        { id: 'audiences-segments', label: 'Segments', icon: Split, slug: 'audiences/segments' },
      ],
    },
    {
      title: 'Capture',
      items: [
        { id: 'audiences-signup-forms', label: 'Signup Forms', icon: FileText, slug: 'audiences/signup-forms' },
        { id: 'audiences-landing-pages', label: 'Landing Pages', icon: Globe, slug: 'audiences/landing-pages' },
        { id: 'audiences-popups', label: 'Popups', icon: Bell, slug: 'audiences/popups' },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Journeys — Journeys, Templates, Workflows
// ---------------------------------------------------------------------------

const JOURNEYS_NAV: ProductNavConfig = {
  product: 'journeys',
  label: 'Journeys',
  sections: [
    {
      title: 'Overview',
      items: [
        { id: 'journeys-dashboard', label: 'Dashboard', icon: LayoutDashboard, slug: 'journeys/dashboard' },
      ],
    },
    {
      title: 'Automation',
      items: [
        { id: 'journeys-journeys', label: 'Journeys', icon: GitBranchPlus, slug: 'journeys/journeys' },
        { id: 'journeys-templates', label: 'Journey Templates', icon: ListTree, slug: 'journeys/templates' },
        { id: 'journeys-workflows', label: 'Workflows', icon: Workflow, slug: 'journeys/workflows' },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Analytics — Campaign Reports, Attribution, Web Analytics, Smart URLs, Goals, A/B Testing
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
        { id: 'analytics-campaign-reports', label: 'Campaign Reports', icon: FileBarChart, slug: 'analytics/campaign-reports' },
        { id: 'analytics-attribution', label: 'Attribution', icon: PieChart, slug: 'analytics/attribution' },
      ],
    },
    {
      title: 'Web & Tracking',
      items: [
        { id: 'analytics-web-analytics', label: 'Web Analytics', icon: Globe, slug: 'analytics/web-analytics' },
        { id: 'analytics-smart-urls', label: 'Smart URLs', icon: Link2, slug: 'analytics/smart-urls' },
        { id: 'analytics-goals', label: 'Goals', icon: Flag, slug: 'analytics/goals' },
      ],
    },
    {
      title: 'Testing',
      items: [
        { id: 'analytics-ab-testing', label: 'A/B Testing', icon: FlaskConical, slug: 'analytics/ab-testing' },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// E-Commerce — Stores, Abandoned Carts, Purchase Follow-ups, Product Campaigns
// ---------------------------------------------------------------------------

const ECOMMERCE_NAV: ProductNavConfig = {
  product: 'ecommerce',
  label: 'E-Commerce',
  sections: [
    {
      title: 'Overview',
      items: [
        { id: 'ecommerce-dashboard', label: 'Dashboard', icon: LayoutDashboard, slug: 'ecommerce/dashboard' },
      ],
    },
    {
      title: 'Stores',
      items: [
        { id: 'ecommerce-stores', label: 'Stores', icon: Store, slug: 'ecommerce/stores' },
      ],
    },
    {
      title: 'Recovery & Follow-up',
      items: [
        { id: 'ecommerce-abandoned-carts', label: 'Abandoned Carts', icon: ShoppingCart, slug: 'ecommerce/abandoned-carts' },
        { id: 'ecommerce-purchase-followups', label: 'Purchase Follow-ups', icon: RefreshCw, slug: 'ecommerce/purchase-followups' },
      ],
    },
    {
      title: 'Promotions',
      items: [
        { id: 'ecommerce-product-campaigns', label: 'Product Campaigns', icon: Package, slug: 'ecommerce/product-campaigns' },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Automation — Workflows, Planner, Web Tracking, CRM Sync
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
      title: 'Rules',
      items: [
        { id: 'automation-workflows', label: 'Workflows', icon: Zap, slug: 'automation/workflows' },
        { id: 'automation-planner', label: 'Planner', icon: CalendarDays, slug: 'automation/planner' },
      ],
    },
    {
      title: 'Integration',
      items: [
        { id: 'automation-web-tracking', label: 'Web Tracking', icon: Eye, slug: 'automation/web-tracking' },
        { id: 'automation-crm-sync', label: 'CRM Sync', icon: RefreshCw, slug: 'automation/crm-sync' },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Product Navigation Map
// ---------------------------------------------------------------------------

export const PRODUCT_NAV_CONFIGS: Record<MarketingProduct, ProductNavConfig> = {
  campaigns: CAMPAIGNS_NAV,
  leads: LEADS_NAV,
  audiences: AUDIENCES_NAV,
  journeys: JOURNEYS_NAV,
  analytics: ANALYTICS_NAV,
  ecommerce: ECOMMERCE_NAV,
  automation: AUTOMATION_NAV,
};

// ---------------------------------------------------------------------------
// Product Labels & Metadata
// ---------------------------------------------------------------------------

export const PRODUCT_LABELS: Record<MarketingProduct, string> = {
  campaigns: 'Campaigns',
  leads: 'Leads',
  audiences: 'Audiences',
  journeys: 'Journeys',
  analytics: 'Analytics',
  ecommerce: 'E-Commerce',
  automation: 'Automation',
};

export const PRODUCT_DESCRIPTIONS: Record<MarketingProduct, string> = {
  campaigns: 'Email, SMS, WhatsApp, and social campaign management',
  leads: 'Lead management, scoring, and pipeline tracking',
  audiences: 'Audience lists, segments, and signup forms',
  journeys: 'Customer journey builder and automation workflows',
  analytics: 'Campaign analytics, attribution, and A/B testing',
  ecommerce: 'E-commerce integrations and cart recovery',
  automation: 'Workflow automation and CRM synchronization',
};

// ---------------------------------------------------------------------------
// Page Titles Map (for breadcrumb / topbar — same pattern as Finance)
// ---------------------------------------------------------------------------

export const pageTitles: Record<string, string> = {
  // Campaigns
  'campaigns/dashboard': 'Dashboard',
  'campaigns/email': 'Email Campaigns',
  'campaigns/sms': 'SMS Campaigns',
  'campaigns/whatsapp': 'WhatsApp',
  'campaigns/social': 'Social Campaigns',
  'campaigns/templates': 'Templates',

  // Leads
  'leads/dashboard': 'Dashboard',
  'leads/leads': 'Leads',
  'leads/contacts': 'Contacts',
  'leads/scoring': 'Lead Scoring',
  'leads/stages': 'Lead Stages',

  // Audiences
  'audiences/dashboard': 'Dashboard',
  'audiences/audiences': 'Audiences',
  'audiences/segments': 'Segments',
  'audiences/signup-forms': 'Signup Forms',
  'audiences/landing-pages': 'Landing Pages',
  'audiences/popups': 'Popups',

  // Journeys
  'journeys/dashboard': 'Dashboard',
  'journeys/journeys': 'Journeys',
  'journeys/templates': 'Journey Templates',
  'journeys/workflows': 'Workflows',

  // Analytics
  'analytics/dashboard': 'Dashboard',
  'analytics/campaign-reports': 'Campaign Reports',
  'analytics/attribution': 'Attribution',
  'analytics/web-analytics': 'Web Analytics',
  'analytics/smart-urls': 'Smart URLs',
  'analytics/goals': 'Goals',
  'analytics/ab-testing': 'A/B Testing',

  // E-Commerce
  'ecommerce/dashboard': 'Dashboard',
  'ecommerce/stores': 'Stores',
  'ecommerce/abandoned-carts': 'Abandoned Carts',
  'ecommerce/purchase-followups': 'Purchase Follow-ups',
  'ecommerce/product-campaigns': 'Product Campaigns',

  // Automation
  'automation/dashboard': 'Dashboard',
  'automation/workflows': 'Workflows',
  'automation/planner': 'Planner',
  'automation/web-tracking': 'Web Tracking',
  'automation/crm-sync': 'CRM Sync',
};

// ---------------------------------------------------------------------------
// Helper: Get nav sections for a product
// ---------------------------------------------------------------------------

export function getNavSectionsForProduct(product: MarketingProduct): NavSection[] {
  return PRODUCT_NAV_CONFIGS[product]?.sections ?? [];
}

// ---------------------------------------------------------------------------
// Helper: Get flat list of all nav items for a product
// ---------------------------------------------------------------------------

export function getAllNavItemsForProduct(product: MarketingProduct): NavItem[] {
  const config = PRODUCT_NAV_CONFIGS[product];
  if (!config) return [];
  return config.sections.flatMap((s) => s.items);
}
