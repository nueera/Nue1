// ============================================================================
// Finance Navigation Configuration
// Sidebar navigation for all 8 Finance products
// ============================================================================

import {
  LayoutDashboard,
  Users,
  Truck,
  Package,
  FileText,
  ShoppingCart,
  Receipt,
  RefreshCw,
  CreditCard,
  DollarSign,
  Banknote,
  Building2,
  Calculator,
  FolderKanban,
  Clock,
  BarChart3,
  Settings,
  FileBarChart,
  Mail,
  Globe,
  Tag,
  Percent,
  AlertTriangle,
  Link2,
  Plane,
  Car,
  Wallet,
  PiggyBank,
  ClipboardCheck,
  Shield,
  CheckCircle2,
  Warehouse,
  Layers,
  Box,
  ArrowLeftRight,
  Send,
  ShoppingBag,
  Store,
  BadgePercent,
  TrendingUp,
  UserCircle,
  Heart,
  FileSpreadsheet,
  Briefcase,
  ArrowRightLeft,
  StickyNote,
  UserPlus,
  HandCoins,
  ScrollText,
  Timer,
  Landmark,
  BookOpen,
  Plus,
} from 'lucide-react';
import type { FinanceProduct } from '../types';

// ---------------------------------------------------------------------------
// Nav Item & Section Types (same pattern as ERP sidebar.config.ts)
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
  product: FinanceProduct;
  label: string;
  sections: NavSection[];
}

// ---------------------------------------------------------------------------
// Books — Full Accounting Suite
// ---------------------------------------------------------------------------

const BOOKS_NAV: ProductNavConfig = {
  product: 'books',
  label: 'Books',
  sections: [
    {
      title: 'Overview',
      items: [
        { id: 'books-dashboard', label: 'Dashboard', icon: LayoutDashboard, slug: 'books/dashboard' },
      ],
    },
    {
      title: 'Sales',
      items: [
        { id: 'books-customers', label: 'Customers', icon: Users, slug: 'books/customers' },
        { id: 'books-estimates', label: 'Estimates', icon: FileText, slug: 'books/estimates' },
        { id: 'books-sales-orders', label: 'Sales Orders', icon: ShoppingCart, slug: 'books/sales-orders' },
        { id: 'books-invoices', label: 'Invoices', icon: Receipt, slug: 'books/invoices' },
        { id: 'books-recurring-invoices', label: 'Recurring Invoices', icon: RefreshCw, slug: 'books/recurring-invoices' },
        { id: 'books-retainer-invoices', label: 'Retainer Invoices', icon: StickyNote, slug: 'books/retainer-invoices' },
        { id: 'books-credit-notes', label: 'Credit Notes', icon: CreditCard, slug: 'books/credit-notes' },
        { id: 'books-payments', label: 'Payments', icon: DollarSign, slug: 'books/payments' },
      ],
    },
    {
      title: 'Purchases',
      items: [
        { id: 'books-vendors', label: 'Vendors', icon: Truck, slug: 'books/vendors' },
        { id: 'books-purchase-orders', label: 'Purchase Orders', icon: ShoppingCart, slug: 'books/purchase-orders' },
        { id: 'books-bills', label: 'Bills', icon: FileText, slug: 'books/bills' },
        { id: 'books-expenses', label: 'Expenses', icon: Banknote, slug: 'books/expenses' },
        { id: 'books-vendor-credits', label: 'Vendor Credits', icon: ArrowLeftRight, slug: 'books/vendor-credits' },
      ],
    },
    {
      title: 'Inventory',
      items: [
        { id: 'books-items', label: 'Items', icon: Package, slug: 'books/items' },
      ],
    },
    {
      title: 'Banking',
      items: [
        { id: 'books-banking', label: 'Banking', icon: Building2, slug: 'books/banking' },
      ],
    },
    {
      title: 'Time & Projects',
      items: [
        { id: 'books-projects', label: 'Projects', icon: FolderKanban, slug: 'books/projects' },
        { id: 'books-timesheets', label: 'Timesheets', icon: Clock, slug: 'books/timesheets' },
      ],
    },
    {
      title: 'Accountant',
      items: [
        { id: 'books-accountant', label: 'Accountant', icon: Calculator, slug: 'books/accountant' },
      ],
    },
    {
      title: 'Analytics',
      items: [
        { id: 'books-reports', label: 'Reports', icon: FileBarChart, slug: 'books/reports' },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Invoice — Invoicing & Estimates
// ---------------------------------------------------------------------------

const INVOICE_NAV: ProductNavConfig = {
  product: 'invoice',
  label: 'Invoice',
  sections: [
    {
      title: 'Overview',
      items: [
        { id: 'invoice-dashboard', label: 'Dashboard', icon: LayoutDashboard, slug: 'invoice/dashboard' },
      ],
    },
    {
      title: 'Sales',
      items: [
        { id: 'invoice-estimates', label: 'Estimates', icon: FileText, slug: 'invoice/estimates' },
        { id: 'invoice-invoices', label: 'Invoices', icon: Receipt, slug: 'invoice/invoices' },
        { id: 'invoice-recurring', label: 'Recurring', icon: RefreshCw, slug: 'invoice/recurring' },
        { id: 'invoice-credit-notes', label: 'Credit Notes', icon: CreditCard, slug: 'invoice/credit-notes' },
        { id: 'invoice-payments', label: 'Payments', icon: DollarSign, slug: 'invoice/payments' },
      ],
    },
    {
      title: 'Time & Projects',
      items: [
        { id: 'invoice-projects', label: 'Projects', icon: FolderKanban, slug: 'invoice/projects' },
        { id: 'invoice-time-tracking', label: 'Time Tracking', icon: Timer, slug: 'invoice/time-tracking' },
      ],
    },
    {
      title: 'Portal',
      items: [
        { id: 'invoice-customer-portal', label: 'Customer Portal', icon: Globe, slug: 'invoice/customer-portal' },
      ],
    },
    {
      title: 'Analytics',
      items: [
        { id: 'invoice-reports', label: 'Reports', icon: FileBarChart, slug: 'invoice/reports' },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Billing — Subscriptions & Recurring
// ---------------------------------------------------------------------------

const BILLING_NAV: ProductNavConfig = {
  product: 'billing',
  label: 'Billing',
  sections: [
    {
      title: 'Overview',
      items: [
        { id: 'billing-dashboard', label: 'Dashboard', icon: LayoutDashboard, slug: 'billing/dashboard' },
      ],
    },
    {
      title: 'Catalog',
      items: [
        { id: 'billing-products', label: 'Products', icon: Package, slug: 'billing/products' },
        { id: 'billing-plans', label: 'Plans', icon: BookOpen, slug: 'billing/plans' },
        { id: 'billing-addons', label: 'Addons', icon: Plus, slug: 'billing/addons' },
        { id: 'billing-coupons', label: 'Coupons', icon: Tag, slug: 'billing/coupons' },
      ],
    },
    {
      title: 'Subscriptions',
      items: [
        { id: 'billing-subscriptions', label: 'Subscriptions', icon: RefreshCw, slug: 'billing/subscriptions' },
      ],
    },
    {
      title: 'Operations',
      items: [
        { id: 'billing-dunning', label: 'Dunning', icon: AlertTriangle, slug: 'billing/dunning' },
        { id: 'billing-hosted-pages', label: 'Hosted Pages', icon: Globe, slug: 'billing/hosted-pages' },
      ],
    },
    {
      title: 'Analytics',
      items: [
        { id: 'billing-reports', label: 'Reports', icon: FileBarChart, slug: 'billing/reports' },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Expense — Expense Management
// ---------------------------------------------------------------------------

const EXPENSE_NAV: ProductNavConfig = {
  product: 'expense',
  label: 'Expense',
  sections: [
    {
      title: 'Overview',
      items: [
        { id: 'expense-dashboard', label: 'Dashboard', icon: LayoutDashboard, slug: 'expense/dashboard' },
      ],
    },
    {
      title: 'Expenses',
      items: [
        { id: 'expense-expenses', label: 'Expenses', icon: Banknote, slug: 'expense/expenses' },
        { id: 'expense-reports', label: 'Expense Reports', icon: FileBarChart, slug: 'expense/expense-reports' },
      ],
    },
    {
      title: 'Travel',
      items: [
        { id: 'expense-trips', label: 'Trips', icon: Plane, slug: 'expense/trips' },
        { id: 'expense-per-diem', label: 'Per Diem', icon: Wallet, slug: 'expense/per-diem' },
        { id: 'expense-mileage', label: 'Mileage', icon: Car, slug: 'expense/mileage' },
      ],
    },
    {
      title: 'Corporate Spending',
      items: [
        { id: 'expense-corporate-cards', label: 'Corporate Cards', icon: CreditCard, slug: 'expense/corporate-cards' },
        { id: 'expense-advances', label: 'Advances', icon: HandCoins, slug: 'expense/advances' },
        { id: 'expense-petty-cash', label: 'Petty Cash', icon: PiggyBank, slug: 'expense/petty-cash' },
      ],
    },
    {
      title: 'Requests & Approvals',
      items: [
        { id: 'expense-purchase-requests', label: 'Purchase Requests', icon: ScrollText, slug: 'expense/purchase-requests' },
        { id: 'expense-policies', label: 'Policies', icon: Shield, slug: 'expense/policies' },
        { id: 'expense-approvals', label: 'Approvals', icon: CheckCircle2, slug: 'expense/approvals' },
      ],
    },
    {
      title: 'Analytics',
      items: [
        { id: 'expense-analytics', label: 'Analytics', icon: TrendingUp, slug: 'expense/analytics' },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Inventory — Stock & Warehouse
// ---------------------------------------------------------------------------

const INVENTORY_NAV: ProductNavConfig = {
  product: 'inventory',
  label: 'Inventory',
  sections: [
    {
      title: 'Overview',
      items: [
        { id: 'inventory-dashboard', label: 'Dashboard', icon: LayoutDashboard, slug: 'inventory/dashboard' },
      ],
    },
    {
      title: 'Items',
      items: [
        { id: 'inventory-items', label: 'Items', icon: Package, slug: 'inventory/items' },
        { id: 'inventory-batch-tracking', label: 'Batch Tracking', icon: Layers, slug: 'inventory/batch-tracking' },
      ],
    },
    {
      title: 'Warehouses',
      items: [
        { id: 'inventory-warehouses', label: 'Warehouses', icon: Warehouse, slug: 'inventory/warehouses' },
      ],
    },
    {
      title: 'Sales',
      items: [
        { id: 'inventory-sales-orders', label: 'Sales Orders', icon: ShoppingCart, slug: 'inventory/sales-orders' },
        { id: 'inventory-packages', label: 'Packages', icon: Box, slug: 'inventory/packages' },
        { id: 'inventory-shipments', label: 'Shipments', icon: Send, slug: 'inventory/shipments' },
      ],
    },
    {
      title: 'Purchases',
      items: [
        { id: 'inventory-purchase-orders', label: 'Purchase Orders', icon: ShoppingCart, slug: 'inventory/purchase-orders' },
      ],
    },
    {
      title: 'Adjustments',
      items: [
        { id: 'inventory-stock-adjustments', label: 'Stock Adjustments', icon: ArrowLeftRight, slug: 'inventory/stock-adjustments' },
        { id: 'inventory-transfers', label: 'Transfers', icon: ArrowRightLeft, slug: 'inventory/transfers' },
      ],
    },
    {
      title: 'Analytics',
      items: [
        { id: 'inventory-reports', label: 'Reports', icon: FileBarChart, slug: 'inventory/reports' },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Checkout — Payment Pages & Links
// ---------------------------------------------------------------------------

const CHECKOUT_NAV: ProductNavConfig = {
  product: 'checkout',
  label: 'Checkout',
  sections: [
    {
      title: 'Overview',
      items: [
        { id: 'checkout-dashboard', label: 'Dashboard', icon: LayoutDashboard, slug: 'checkout/dashboard' },
      ],
    },
    {
      title: 'Payment Channels',
      items: [
        { id: 'checkout-payment-pages', label: 'Payment Pages', icon: Globe, slug: 'checkout/payment-pages' },
        { id: 'checkout-payment-links', label: 'Payment Links', icon: Link2, slug: 'checkout/payment-links' },
      ],
    },
    {
      title: 'Transactions',
      items: [
        { id: 'checkout-transactions', label: 'Transactions', icon: Receipt, slug: 'checkout/transactions' },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Commerce — Online Store
// ---------------------------------------------------------------------------

const COMMERCE_NAV: ProductNavConfig = {
  product: 'commerce',
  label: 'Commerce',
  sections: [
    {
      title: 'Overview',
      items: [
        { id: 'commerce-dashboard', label: 'Dashboard', icon: LayoutDashboard, slug: 'commerce/dashboard' },
      ],
    },
    {
      title: 'Store',
      items: [
        { id: 'commerce-storefront', label: 'Storefront', icon: Store, slug: 'commerce/storefront' },
        { id: 'commerce-products', label: 'Products', icon: ShoppingBag, slug: 'commerce/products' },
      ],
    },
    {
      title: 'Sales',
      items: [
        { id: 'commerce-orders', label: 'Orders', icon: ClipboardCheck, slug: 'commerce/orders' },
        { id: 'commerce-discounts', label: 'Discounts', icon: BadgePercent, slug: 'commerce/discounts' },
      ],
    },
    {
      title: 'Analytics',
      items: [
        { id: 'commerce-analytics', label: 'Analytics', icon: TrendingUp, slug: 'commerce/analytics' },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Payroll — Employee Payroll
// ---------------------------------------------------------------------------

const PAYROLL_NAV: ProductNavConfig = {
  product: 'payroll',
  label: 'Payroll',
  sections: [
    {
      title: 'Overview',
      items: [
        { id: 'payroll-dashboard', label: 'Dashboard', icon: LayoutDashboard, slug: 'payroll/dashboard' },
      ],
    },
    {
      title: 'People',
      items: [
        { id: 'payroll-employees', label: 'Employees', icon: Users, slug: 'payroll/employees' },
      ],
    },
    {
      title: 'Payroll',
      items: [
        { id: 'payroll-pay-runs', label: 'Pay Runs', icon: Banknote, slug: 'payroll/pay-runs' },
      ],
    },
    {
      title: 'Benefits & Taxes',
      items: [
        { id: 'payroll-benefits', label: 'Benefits', icon: Heart, slug: 'payroll/benefits' },
        { id: 'payroll-taxes', label: 'Taxes', icon: Landmark, slug: 'payroll/taxes' },
      ],
    },
    {
      title: 'Analytics',
      items: [
        { id: 'payroll-reports', label: 'Reports', icon: FileBarChart, slug: 'payroll/reports' },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Product Navigation Map
// ---------------------------------------------------------------------------

export const PRODUCT_NAV_CONFIGS: Record<FinanceProduct, ProductNavConfig> = {
  books: BOOKS_NAV,
  invoice: INVOICE_NAV,
  billing: BILLING_NAV,
  expense: EXPENSE_NAV,
  inventory: INVENTORY_NAV,
  checkout: CHECKOUT_NAV,
  commerce: COMMERCE_NAV,
  payroll: PAYROLL_NAV,
};

// ---------------------------------------------------------------------------
// Product Labels & Metadata
// ---------------------------------------------------------------------------

export const PRODUCT_LABELS: Record<FinanceProduct, string> = {
  books: 'Books',
  invoice: 'Invoice',
  billing: 'Billing',
  expense: 'Expense',
  inventory: 'Inventory',
  checkout: 'Checkout',
  commerce: 'Commerce',
  payroll: 'Payroll',
};

export const PRODUCT_DESCRIPTIONS: Record<FinanceProduct, string> = {
  books: 'Full accounting suite with double-entry bookkeeping',
  invoice: 'Professional invoicing and estimates',
  billing: 'Subscription management and recurring billing',
  expense: 'Expense reporting and management',
  inventory: 'Stock management and warehouse operations',
  checkout: 'Payment pages and payment links',
  commerce: 'Online store and product catalog',
  payroll: 'Employee payroll and compensation management',
};

// ---------------------------------------------------------------------------
// Page Titles Map (for breadcrumb / topbar — same pattern as ERP)
// ---------------------------------------------------------------------------

export const pageTitles: Record<string, string> = {
  // Books
  'books/dashboard': 'Dashboard',
  'books/customers': 'Customers',
  'books/vendors': 'Vendors',
  'books/items': 'Items',
  'books/estimates': 'Estimates',
  'books/sales-orders': 'Sales Orders',
  'books/invoices': 'Invoices',
  'books/recurring-invoices': 'Recurring Invoices',
  'books/retainer-invoices': 'Retainer Invoices',
  'books/credit-notes': 'Credit Notes',
  'books/payments': 'Payments',
  'books/purchase-orders': 'Purchase Orders',
  'books/bills': 'Bills',
  'books/expenses': 'Expenses',
  'books/vendor-credits': 'Vendor Credits',
  'books/banking': 'Banking',
  'books/accountant': 'Accountant',
  'books/projects': 'Projects',
  'books/timesheets': 'Timesheets',
  'books/reports': 'Reports',

  // Invoice
  'invoice/dashboard': 'Dashboard',
  'invoice/estimates': 'Estimates',
  'invoice/invoices': 'Invoices',
  'invoice/recurring': 'Recurring',
  'invoice/credit-notes': 'Credit Notes',
  'invoice/payments': 'Payments',
  'invoice/projects': 'Projects',
  'invoice/time-tracking': 'Time Tracking',
  'invoice/customer-portal': 'Customer Portal',
  'invoice/reports': 'Reports',

  // Billing
  'billing/dashboard': 'Dashboard',
  'billing/products': 'Products',
  'billing/plans': 'Plans',
  'billing/addons': 'Addons',
  'billing/coupons': 'Coupons',
  'billing/subscriptions': 'Subscriptions',
  'billing/dunning': 'Dunning',
  'billing/hosted-pages': 'Hosted Pages',
  'billing/reports': 'Reports',

  // Expense
  'expense/dashboard': 'Dashboard',
  'expense/expenses': 'Expenses',
  'expense/expense-reports': 'Expense Reports',
  'expense/trips': 'Trips',
  'expense/per-diem': 'Per Diem',
  'expense/mileage': 'Mileage',
  'expense/corporate-cards': 'Corporate Cards',
  'expense/advances': 'Advances',
  'expense/petty-cash': 'Petty Cash',
  'expense/purchase-requests': 'Purchase Requests',
  'expense/policies': 'Policies',
  'expense/approvals': 'Approvals',
  'expense/analytics': 'Analytics',

  // Inventory
  'inventory/dashboard': 'Dashboard',
  'inventory/items': 'Items',
  'inventory/warehouses': 'Warehouses',
  'inventory/batch-tracking': 'Batch Tracking',
  'inventory/sales-orders': 'Sales Orders',
  'inventory/packages': 'Packages',
  'inventory/shipments': 'Shipments',
  'inventory/purchase-orders': 'Purchase Orders',
  'inventory/stock-adjustments': 'Stock Adjustments',
  'inventory/transfers': 'Transfers',
  'inventory/reports': 'Reports',

  // Checkout
  'checkout/dashboard': 'Dashboard',
  'checkout/payment-pages': 'Payment Pages',
  'checkout/payment-links': 'Payment Links',
  'checkout/transactions': 'Transactions',

  // Commerce
  'commerce/dashboard': 'Dashboard',
  'commerce/storefront': 'Storefront',
  'commerce/products': 'Products',
  'commerce/orders': 'Orders',
  'commerce/discounts': 'Discounts',
  'commerce/analytics': 'Analytics',

  // Payroll
  'payroll/dashboard': 'Dashboard',
  'payroll/employees': 'Employees',
  'payroll/pay-runs': 'Pay Runs',
  'payroll/benefits': 'Benefits',
  'payroll/taxes': 'Taxes',
  'payroll/reports': 'Reports',
};

// ---------------------------------------------------------------------------
// Helper: Get nav sections for a product
// ---------------------------------------------------------------------------

export function getNavSectionsForProduct(product: FinanceProduct): NavSection[] {
  return PRODUCT_NAV_CONFIGS[product]?.sections ?? [];
}

// ---------------------------------------------------------------------------
// Helper: Get flat list of all nav items for a product
// ---------------------------------------------------------------------------

export function getAllNavItemsForProduct(product: FinanceProduct): NavItem[] {
  const config = PRODUCT_NAV_CONFIGS[product];
  if (!config) return [];
  return config.sections.flatMap((s) => s.items);
}
