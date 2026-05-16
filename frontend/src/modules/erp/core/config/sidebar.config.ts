// @ts-nocheck
// ============================================================================
// ERP Navigation Configuration
// Sidebar navigation for all 3 ERP products
// ============================================================================

import {
  LayoutDashboard,
  Users,
  Clock,
  Calendar,
  Banknote,
  FolderKanban,
  DollarSign,
  BarChart3,
  Settings,
  TrendingUp,
  UserPlus,
  ArrowLeftRight,
  Receipt,
  Target,
  Landmark,
  GraduationCap,
  FileBarChart,
  Building2,
  ClipboardCheck,
  PieChart,
  Globe,
} from 'lucide-react';
import type { ErpProduct } from '../../types';

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
  product: ErpProduct;
  label: string;
  sections: NavSection[];
}

// ---------------------------------------------------------------------------
// HRM — Human Resource Management
// ---------------------------------------------------------------------------

const HRM_NAV: ProductNavConfig = {
  product: 'hrm',
  label: 'HRM',
  sections: [
    {
      title: 'Overview',
      items: [
        { id: 'hrm-dashboard', label: 'Dashboard', icon: LayoutDashboard, slug: 'hrm/dashboard' },
      ],
    },
    {
      title: 'People',
      items: [
        { id: 'hrm-employees', label: 'Employees', icon: Users, slug: 'hrm/employees' },
        { id: 'hrm-onboarding', label: 'Onboarding', icon: UserPlus, slug: 'hrm/onboarding' },
        { id: 'hrm-recruitment', label: 'Recruitment', icon: Target, slug: 'hrm/recruitment' },
        { id: 'hrm-training', label: 'Training', icon: GraduationCap, slug: 'hrm/training' },
      ],
    },
    {
      title: 'Time & Attendance',
      items: [
        { id: 'hrm-attendance', label: 'Attendance', icon: Clock, slug: 'hrm/attendance' },
        { id: 'hrm-leaves', label: 'Leaves', icon: Calendar, slug: 'hrm/leaves' },
        { id: 'hrm-shifts', label: 'Shifts', icon: ArrowLeftRight, slug: 'hrm/shifts' },
      ],
    },
    {
      title: 'Compensation',
      items: [
        { id: 'hrm-payroll', label: 'Payroll', icon: Banknote, slug: 'hrm/payroll' },
        { id: 'hrm-expenses', label: 'Expenses', icon: Receipt, slug: 'hrm/expenses' },
        { id: 'hrm-loans', label: 'Loans', icon: Landmark, slug: 'hrm/loans' },
      ],
    },
    {
      title: 'Performance',
      items: [
        { id: 'hrm-performance', label: 'Performance', icon: TrendingUp, slug: 'hrm/performance' },
      ],
    },
    {
      title: 'Analytics',
      items: [
        { id: 'hrm-reports', label: 'Reports', icon: FileBarChart, slug: 'hrm/reports' },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Operations — Projects & Finance
// ---------------------------------------------------------------------------

const OPERATIONS_NAV: ProductNavConfig = {
  product: 'operations',
  label: 'Operations',
  sections: [
    {
      title: 'Overview',
      items: [
        { id: 'operations-dashboard', label: 'Dashboard', icon: LayoutDashboard, slug: 'operations/dashboard' },
      ],
    },
    {
      title: 'Projects',
      items: [
        { id: 'operations-projects', label: 'Projects', icon: FolderKanban, slug: 'operations/projects' },
        { id: 'operations-tasks', label: 'Tasks', icon: ClipboardCheck, slug: 'operations/tasks' },
      ],
    },
    {
      title: 'Finance',
      items: [
        { id: 'operations-finance', label: 'Finance', icon: DollarSign, slug: 'operations/finance' },
        { id: 'operations-budgets', label: 'Budgets', icon: PieChart, slug: 'operations/budgets' },
      ],
    },
    {
      title: 'Procurement',
      items: [
        { id: 'operations-procurement', label: 'Procurement', icon: Building2, slug: 'operations/procurement' },
        { id: 'operations-vendors', label: 'Vendors', icon: Globe, slug: 'operations/vendors' },
      ],
    },
    {
      title: 'Analytics',
      items: [
        { id: 'operations-reports', label: 'Reports', icon: FileBarChart, slug: 'operations/reports' },
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
        { id: 'analytics-hrm-reports', label: 'HRM Reports', icon: FileBarChart, slug: 'analytics/hrm-reports' },
        { id: 'analytics-finance-reports', label: 'Finance Reports', icon: DollarSign, slug: 'analytics/finance-reports' },
      ],
    },
    {
      title: 'Insights',
      items: [
        { id: 'analytics-trends', label: 'Trends', icon: TrendingUp, slug: 'analytics/trends' },
        { id: 'analytics-forecasting', label: 'Forecasting', icon: PieChart, slug: 'analytics/forecasting' },
      ],
    },
    {
      title: 'System',
      items: [
        { id: 'analytics-settings', label: 'Settings', icon: Settings, slug: 'analytics/settings' },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Product Navigation Map
// ---------------------------------------------------------------------------

export const PRODUCT_NAV_CONFIGS: Record<ErpProduct, ProductNavConfig> = {
  hrm: HRM_NAV,
  operations: OPERATIONS_NAV,
  analytics: ANALYTICS_NAV,
};

// ---------------------------------------------------------------------------
// Product Labels & Metadata
// ---------------------------------------------------------------------------

export const PRODUCT_LABELS: Record<ErpProduct, string> = {
  hrm: 'HRM',
  operations: 'Operations',
  analytics: 'Analytics',
};

export const PRODUCT_DESCRIPTIONS: Record<ErpProduct, string> = {
  hrm: 'Human Resource Management — employees, payroll, attendance, and performance',
  operations: 'Operations — project management, finance, and procurement',
  analytics: 'Analytics — reports, insights, and forecasting across all modules',
};

// ---------------------------------------------------------------------------
// Page Titles Map (for breadcrumb / topbar)
// ---------------------------------------------------------------------------

export const pageTitles: Record<string, string> = {
  // HRM
  'hrm/dashboard': 'Dashboard',
  'hrm/employees': 'Employees',
  'hrm/attendance': 'Attendance',
  'hrm/leaves': 'Leaves',
  'hrm/payroll': 'Payroll',
  'hrm/performance': 'Performance',
  'hrm/onboarding': 'Onboarding',
  'hrm/shifts': 'Shifts',
  'hrm/expenses': 'Expenses',
  'hrm/recruitment': 'Recruitment',
  'hrm/loans': 'Loans',
  'hrm/training': 'Training',
  'hrm/reports': 'Reports',

  // Operations
  'operations/dashboard': 'Dashboard',
  'operations/projects': 'Projects',
  'operations/tasks': 'Tasks',
  'operations/finance': 'Finance',
  'operations/budgets': 'Budgets',
  'operations/procurement': 'Procurement',
  'operations/vendors': 'Vendors',
  'operations/reports': 'Reports',

  // Analytics
  'analytics/dashboard': 'Dashboard',
  'analytics/reports': 'Reports',
  'analytics/hrm-reports': 'HRM Reports',
  'analytics/finance-reports': 'Finance Reports',
  'analytics/trends': 'Trends',
  'analytics/forecasting': 'Forecasting',
  'analytics/settings': 'Settings',

  // Legacy flat routes (kept for backward compatibility)
  dashboard: 'Dashboard',
  'hrm/employees': 'Employees',
  'hrm/attendance': 'Attendance',
  'hrm/leaves': 'Leaves',
  'hrm/payroll': 'Payroll',
  'hrm/performance': 'Performance',
  'hrm/onboarding': 'Onboarding',
  'hrm/shifts': 'Shifts',
  'hrm/expenses': 'Expenses',
  'hrm/recruitment': 'Recruitment',
  'hrm/loans': 'Loans',
  'hrm/training': 'Training',
  projects: 'Projects',
  finance: 'Finance',
  reports: 'Reports',
  settings: 'Settings',
};

// ---------------------------------------------------------------------------
// Helper: Get nav sections for a product
// ---------------------------------------------------------------------------

export function getNavSectionsForProduct(product: ErpProduct): NavSection[] {
  return PRODUCT_NAV_CONFIGS[product]?.sections ?? [];
}

// ---------------------------------------------------------------------------
// Helper: Get flat list of all nav items for a product
// ---------------------------------------------------------------------------

export function getAllNavItemsForProduct(product: ErpProduct): NavItem[] {
  const config = PRODUCT_NAV_CONFIGS[product];
  if (!config) return [];
  return config.sections.flatMap((s) => s.items);
}

// ---------------------------------------------------------------------------
// Legacy export for backward compatibility
// ---------------------------------------------------------------------------

export const navSections: NavSection[] = HRM_NAV.sections;
