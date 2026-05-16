// ============================================================================
// Finance Common Types
// Shared types used across all Finance products (Books, Invoice, Billing,
// Expense, Inventory, Checkout, Commerce, Payroll)
// ============================================================================

// ---------------------------------------------------------------------------
// Money & Currency
// ---------------------------------------------------------------------------

export interface Money {
  amount: number;
  currency: string;
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  precision: number;
}

// ---------------------------------------------------------------------------
// Tax
// ---------------------------------------------------------------------------

export interface TaxRate {
  id: string;
  name: string;
  rate: number;
  type: 'inclusive' | 'exclusive';
  compound?: boolean;
}

// ---------------------------------------------------------------------------
// Address & Contact
// ---------------------------------------------------------------------------

export interface Address {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}

export interface FinanceContact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  type: 'customer' | 'vendor';
}

// ---------------------------------------------------------------------------
// Line Item
// ---------------------------------------------------------------------------

export interface LineItem {
  id: string;
  item: string;
  description?: string;
  quantity: number;
  rate: Money;
  tax?: TaxRate;
  total: Money;
}

// ---------------------------------------------------------------------------
// Status Types
// ---------------------------------------------------------------------------

export type InvoiceStatus = 'draft' | 'sent' | 'viewed' | 'paid' | 'overdue' | 'void';
export type EstimateStatus = 'draft' | 'sent' | 'approved' | 'declined' | 'converted' | 'expired';
export type BillStatus = 'draft' | 'awaiting_approval' | 'approved' | 'paid' | 'overdue';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type SubscriptionStatus = 'live' | 'trial' | 'paused' | 'cancelled' | 'expired' | 'future';
export type ExpenseStatus = 'draft' | 'submitted' | 'approved' | 'rejected' | 'reimbursed';
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

// ---------------------------------------------------------------------------
// User
// ---------------------------------------------------------------------------

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

// ---------------------------------------------------------------------------
// API Response Types
// ---------------------------------------------------------------------------

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface PaginatedRequest {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// ---------------------------------------------------------------------------
// Finance Product Type
// ---------------------------------------------------------------------------

export type FinanceProduct = 'books' | 'invoice' | 'billing' | 'expense' | 'inventory' | 'checkout' | 'commerce' | 'payroll';

// ---------------------------------------------------------------------------
// Payment Terms
// ---------------------------------------------------------------------------

export interface PaymentTerm {
  id: string;
  label: string;
  days: number;
}

// ---------------------------------------------------------------------------
// Recent Module (for tracking)
// ---------------------------------------------------------------------------

export interface RecentModule {
  slug: string;
  lastVisited: number;
  visitCount: number;
}

// ---------------------------------------------------------------------------
// Bank Account
// ---------------------------------------------------------------------------

export interface BankAccount {
  id: string;
  name: string;
  accountNumber: string;
  routingNumber?: string;
  bankName: string;
  currency: string;
  balance: Money;
  type: 'checking' | 'savings' | 'credit' | 'cash';
}

// ---------------------------------------------------------------------------
// Transaction
// ---------------------------------------------------------------------------

export interface FinanceTransaction {
  id: string;
  date: string;
  description: string;
  amount: Money;
  type: 'credit' | 'debit';
  status: PaymentStatus;
  category?: string;
  reference?: string;
}
