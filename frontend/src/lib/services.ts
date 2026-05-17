// ============================================================================
// Module API Services — CRM / ERP / Finance / Marketing
// ============================================================================
// These service files connect the frontend to the FastAPI backend.
// Each service uses the unified apiClient from @/lib/api
// ============================================================================

import { apiClient, API_ENDPOINTS } from '@/lib/api';
import type { ApiResponse, PaginatedResponse } from '@/types/api';

// ── Common Types ───────────────────────────────────────────────────────────

interface PaginationParams {
  page?: number;
  page_size?: number;
  search?: string;
}

// ============================================================================
// AUTH SERVICE
// ============================================================================

export const authService = {
  login: (email: string, password: string) =>
    apiClient.post<{ access_token: string }>(
      API_ENDPOINTS.AUTH.LOGIN,
      { email, password },
      { skipAuth: true } as any
    ),

  register: (data: { email: string; password: string; full_name: string }) =>
    apiClient.post<{
      id: number;
      email: string;
      full_name: string;
      is_active: boolean;
    }>(API_ENDPOINTS.AUTH.REGISTER, data, { skipAuth: true } as any),

  getProfile: () =>
    apiClient.get<{
      id: number;
      email: string;
      full_name: string;
      is_active: boolean;
      role: string;
      created_at: string;
      updated_at: string;
    }>(API_ENDPOINTS.AUTH.ME),
};

// ============================================================================
// CRM SERVICE
// ============================================================================

export const crmService = {
  // Contacts
  getContacts: (params?: PaginationParams & { status?: string }) =>
    apiClient.get(API_ENDPOINTS.CRM.CONTACTS, params as any),

  getContact: (id: number) =>
    apiClient.get(API_ENDPOINTS.CRM.CONTACT_BY_ID(id)),

  createContact: (data: any) =>
    apiClient.post(API_ENDPOINTS.CRM.CONTACTS, data),

  updateContact: (id: number, data: any) =>
    apiClient.put(API_ENDPOINTS.CRM.CONTACT_BY_ID(id), data),

  deleteContact: (id: number) =>
    apiClient.delete(API_ENDPOINTS.CRM.CONTACT_BY_ID(id)),

  // Accounts
  getAccounts: (params?: PaginationParams & { industry?: string }) =>
    apiClient.get(API_ENDPOINTS.CRM.ACCOUNTS, params as any),

  getAccount: (id: number) =>
    apiClient.get(API_ENDPOINTS.CRM.ACCOUNT_BY_ID(id)),

  createAccount: (data: any) =>
    apiClient.post(API_ENDPOINTS.CRM.ACCOUNTS, data),

  updateAccount: (id: number, data: any) =>
    apiClient.put(API_ENDPOINTS.CRM.ACCOUNT_BY_ID(id), data),

  deleteAccount: (id: number) =>
    apiClient.delete(API_ENDPOINTS.CRM.ACCOUNT_BY_ID(id)),

  // Leads
  getLeads: (params?: PaginationParams & { status?: string; source?: string }) =>
    apiClient.get(API_ENDPOINTS.CRM.LEADS, params as any),

  getLead: (id: number) =>
    apiClient.get(API_ENDPOINTS.CRM.LEAD_BY_ID(id)),

  createLead: (data: any) =>
    apiClient.post(API_ENDPOINTS.CRM.LEADS, data),

  updateLead: (id: number, data: any) =>
    apiClient.put(API_ENDPOINTS.CRM.LEAD_BY_ID(id), data),

  deleteLead: (id: number) =>
    apiClient.delete(API_ENDPOINTS.CRM.LEAD_BY_ID(id)),

  // Deals
  getDeals: (params?: PaginationParams & { stage?: string }) =>
    apiClient.get(API_ENDPOINTS.CRM.DEALS, params as any),

  getDeal: (id: number) =>
    apiClient.get(API_ENDPOINTS.CRM.DEAL_BY_ID(id)),

  createDeal: (data: any) =>
    apiClient.post(API_ENDPOINTS.CRM.DEALS, data),

  updateDeal: (id: number, data: any) =>
    apiClient.put(API_ENDPOINTS.CRM.DEAL_BY_ID(id), data),

  deleteDeal: (id: number) =>
    apiClient.delete(API_ENDPOINTS.CRM.DEAL_BY_ID(id)),
};

// ============================================================================
// ERP SERVICE
// ============================================================================

export const erpService = {
  // Dashboard
  getDashboard: () =>
    apiClient.get(API_ENDPOINTS.ERP.DASHBOARD),

  // Categories
  getCategories: (params?: PaginationParams) =>
    apiClient.get(API_ENDPOINTS.ERP.CATEGORIES, params as any),

  getCategory: (id: number) =>
    apiClient.get(API_ENDPOINTS.ERP.CATEGORY_BY_ID(id)),

  createCategory: (data: any) =>
    apiClient.post(API_ENDPOINTS.ERP.CATEGORIES, data),

  updateCategory: (id: number, data: any) =>
    apiClient.put(API_ENDPOINTS.ERP.CATEGORY_BY_ID(id), data),

  deleteCategory: (id: number) =>
    apiClient.delete(API_ENDPOINTS.ERP.CATEGORY_BY_ID(id)),

  // Suppliers
  getSuppliers: (params?: PaginationParams & { rating?: number }) =>
    apiClient.get(API_ENDPOINTS.ERP.SUPPLIERS, params as any),

  getSupplier: (id: number) =>
    apiClient.get(API_ENDPOINTS.ERP.SUPPLIER_BY_ID(id)),

  createSupplier: (data: any) =>
    apiClient.post(API_ENDPOINTS.ERP.SUPPLIERS, data),

  updateSupplier: (id: number, data: any) =>
    apiClient.put(API_ENDPOINTS.ERP.SUPPLIER_BY_ID(id), data),

  deleteSupplier: (id: number) =>
    apiClient.delete(API_ENDPOINTS.ERP.SUPPLIER_BY_ID(id)),

  // Warehouses
  getWarehouses: (params?: PaginationParams) =>
    apiClient.get(API_ENDPOINTS.ERP.WAREHOUSES, params as any),

  getWarehouse: (id: number) =>
    apiClient.get(API_ENDPOINTS.ERP.WAREHOUSE_BY_ID(id)),

  createWarehouse: (data: any) =>
    apiClient.post(API_ENDPOINTS.ERP.WAREHOUSES, data),

  updateWarehouse: (id: number, data: any) =>
    apiClient.put(API_ENDPOINTS.ERP.WAREHOUSE_BY_ID(id), data),

  deleteWarehouse: (id: number) =>
    apiClient.delete(API_ENDPOINTS.ERP.WAREHOUSE_BY_ID(id)),

  // Products
  getProducts: (params?: PaginationParams & { category_id?: number; product_type?: string; is_active?: boolean }) =>
    apiClient.get(API_ENDPOINTS.ERP.PRODUCTS, params as any),

  getProduct: (id: number) =>
    apiClient.get(API_ENDPOINTS.ERP.PRODUCT_BY_ID(id)),

  createProduct: (data: any) =>
    apiClient.post(API_ENDPOINTS.ERP.PRODUCTS, data),

  updateProduct: (id: number, data: any) =>
    apiClient.put(API_ENDPOINTS.ERP.PRODUCT_BY_ID(id), data),

  deleteProduct: (id: number) =>
    apiClient.delete(API_ENDPOINTS.ERP.PRODUCT_BY_ID(id)),

  // Inventory
  getInventory: (params?: PaginationParams & { warehouse_id?: number; product_id?: number }) =>
    apiClient.get(API_ENDPOINTS.ERP.INVENTORY, params as any),

  getInventoryItem: (id: number) =>
    apiClient.get(API_ENDPOINTS.ERP.INVENTORY_BY_ID(id)),

  createInventory: (data: any) =>
    apiClient.post(API_ENDPOINTS.ERP.INVENTORY, data),

  updateInventory: (id: number, data: any) =>
    apiClient.put(API_ENDPOINTS.ERP.INVENTORY_BY_ID(id), data),

  getLowStockAlerts: () =>
    apiClient.get(API_ENDPOINTS.ERP.INVENTORY_LOW_STOCK),

  // Purchase Orders
  getPurchaseOrders: (params?: PaginationParams & { status?: string }) =>
    apiClient.get(API_ENDPOINTS.ERP.PURCHASE_ORDERS, params as any),

  getPurchaseOrder: (id: number) =>
    apiClient.get(API_ENDPOINTS.ERP.PURCHASE_ORDER_BY_ID(id)),

  createPurchaseOrder: (data: any) =>
    apiClient.post(API_ENDPOINTS.ERP.PURCHASE_ORDERS, data),

  updatePurchaseOrder: (id: number, data: any) =>
    apiClient.put(API_ENDPOINTS.ERP.PURCHASE_ORDER_BY_ID(id), data),

  deletePurchaseOrder: (id: number) =>
    apiClient.delete(API_ENDPOINTS.ERP.PURCHASE_ORDER_BY_ID(id)),

  // Sales Orders
  getSalesOrders: (params?: PaginationParams & { status?: string }) =>
    apiClient.get(API_ENDPOINTS.ERP.SALES_ORDERS, params as any),

  getSalesOrder: (id: number) =>
    apiClient.get(API_ENDPOINTS.ERP.SALES_ORDER_BY_ID(id)),

  createSalesOrder: (data: any) =>
    apiClient.post(API_ENDPOINTS.ERP.SALES_ORDERS, data),

  updateSalesOrder: (id: number, data: any) =>
    apiClient.put(API_ENDPOINTS.ERP.SALES_ORDER_BY_ID(id), data),

  deleteSalesOrder: (id: number) =>
    apiClient.delete(API_ENDPOINTS.ERP.SALES_ORDER_BY_ID(id)),
};

// ============================================================================
// FINANCE SERVICE
// ============================================================================

export const financeService = {
  // Dashboard
  getDashboard: () =>
    apiClient.get(API_ENDPOINTS.FINANCE.DASHBOARD),

  // Chart of Accounts
  getAccounts: (params?: PaginationParams & { account_type?: string; is_active?: boolean }) =>
    apiClient.get(API_ENDPOINTS.FINANCE.ACCOUNTS, params as any),

  getAccount: (id: number) =>
    apiClient.get(API_ENDPOINTS.FINANCE.ACCOUNT_BY_ID(id)),

  createAccount: (data: any) =>
    apiClient.post(API_ENDPOINTS.FINANCE.ACCOUNTS, data),

  updateAccount: (id: number, data: any) =>
    apiClient.put(API_ENDPOINTS.FINANCE.ACCOUNT_BY_ID(id), data),

  deleteAccount: (id: number) =>
    apiClient.delete(API_ENDPOINTS.FINANCE.ACCOUNT_BY_ID(id)),

  // Tax Rates
  getTaxRates: (params?: PaginationParams) =>
    apiClient.get(API_ENDPOINTS.FINANCE.TAX_RATES, params as any),

  getTaxRate: (id: number) =>
    apiClient.get(API_ENDPOINTS.FINANCE.TAX_RATE_BY_ID(id)),

  createTaxRate: (data: any) =>
    apiClient.post(API_ENDPOINTS.FINANCE.TAX_RATES, data),

  updateTaxRate: (id: number, data: any) =>
    apiClient.put(API_ENDPOINTS.FINANCE.TAX_RATE_BY_ID(id), data),

  deleteTaxRate: (id: number) =>
    apiClient.delete(API_ENDPOINTS.FINANCE.TAX_RATE_BY_ID(id)),

  // Invoices
  getInvoices: (params?: PaginationParams & { status?: string; invoice_type?: string }) =>
    apiClient.get(API_ENDPOINTS.FINANCE.INVOICES, params as any),

  getInvoice: (id: number) =>
    apiClient.get(API_ENDPOINTS.FINANCE.INVOICE_BY_ID(id)),

  createInvoice: (data: any) =>
    apiClient.post(API_ENDPOINTS.FINANCE.INVOICES, data),

  updateInvoice: (id: number, data: any) =>
    apiClient.put(API_ENDPOINTS.FINANCE.INVOICE_BY_ID(id), data),

  deleteInvoice: (id: number) =>
    apiClient.delete(API_ENDPOINTS.FINANCE.INVOICE_BY_ID(id)),

  // Expenses
  getExpenses: (params?: PaginationParams & { status?: string; category?: string }) =>
    apiClient.get(API_ENDPOINTS.FINANCE.EXPENSES, params as any),

  getExpense: (id: number) =>
    apiClient.get(API_ENDPOINTS.FINANCE.EXPENSE_BY_ID(id)),

  createExpense: (data: any) =>
    apiClient.post(API_ENDPOINTS.FINANCE.EXPENSES, data),

  updateExpense: (id: number, data: any) =>
    apiClient.put(API_ENDPOINTS.FINANCE.EXPENSE_BY_ID(id), data),

  deleteExpense: (id: number) =>
    apiClient.delete(API_ENDPOINTS.FINANCE.EXPENSE_BY_ID(id)),

  // Payments
  getPayments: (params?: PaginationParams & { payment_type?: string }) =>
    apiClient.get(API_ENDPOINTS.FINANCE.PAYMENTS, params as any),

  getPayment: (id: number) =>
    apiClient.get(API_ENDPOINTS.FINANCE.PAYMENT_BY_ID(id)),

  createPayment: (data: any) =>
    apiClient.post(API_ENDPOINTS.FINANCE.PAYMENTS, data),

  updatePayment: (id: number, data: any) =>
    apiClient.put(API_ENDPOINTS.FINANCE.PAYMENT_BY_ID(id), data),

  deletePayment: (id: number) =>
    apiClient.delete(API_ENDPOINTS.FINANCE.PAYMENT_BY_ID(id)),

  // Journal Entries
  getJournalEntries: (params?: PaginationParams & { is_posted?: boolean }) =>
    apiClient.get(API_ENDPOINTS.FINANCE.JOURNAL_ENTRIES, params as any),

  getJournalEntry: (id: number) =>
    apiClient.get(API_ENDPOINTS.FINANCE.JOURNAL_ENTRY_BY_ID(id)),

  createJournalEntry: (data: any) =>
    apiClient.post(API_ENDPOINTS.FINANCE.JOURNAL_ENTRIES, data),

  updateJournalEntry: (id: number, data: any) =>
    apiClient.put(API_ENDPOINTS.FINANCE.JOURNAL_ENTRY_BY_ID(id), data),

  deleteJournalEntry: (id: number) =>
    apiClient.delete(API_ENDPOINTS.FINANCE.JOURNAL_ENTRY_BY_ID(id)),

  // Reports
  getProfitLoss: (params?: { start_date?: string; end_date?: string }) =>
    apiClient.get(API_ENDPOINTS.FINANCE.REPORTS.PROFIT_LOSS, params as any),

  getCashFlow: (params?: { start_date?: string; end_date?: string }) =>
    apiClient.get(API_ENDPOINTS.FINANCE.REPORTS.CASH_FLOW, params as any),

  getOutstanding: (params?: { as_of_date?: string }) =>
    apiClient.get(API_ENDPOINTS.FINANCE.REPORTS.OUTSTANDING, params as any),
};

// ============================================================================
// MARKETING SERVICE
// ============================================================================

export const marketingService = {
  // Dashboard
  getDashboard: () =>
    apiClient.get(API_ENDPOINTS.MARKETING.DASHBOARD),

  // Channels
  getChannels: (params?: PaginationParams & { channel_type?: string; is_active?: boolean }) =>
    apiClient.get(API_ENDPOINTS.MARKETING.CHANNELS, params as any),

  getChannel: (id: number) =>
    apiClient.get(API_ENDPOINTS.MARKETING.CHANNEL_BY_ID(id)),

  createChannel: (data: any) =>
    apiClient.post(API_ENDPOINTS.MARKETING.CHANNELS, data),

  updateChannel: (id: number, data: any) =>
    apiClient.put(API_ENDPOINTS.MARKETING.CHANNEL_BY_ID(id), data),

  deleteChannel: (id: number) =>
    apiClient.delete(API_ENDPOINTS.MARKETING.CHANNEL_BY_ID(id)),

  // Campaigns
  getCampaigns: (params?: PaginationParams & { status?: string; campaign_type?: string; channel_id?: number }) =>
    apiClient.get(API_ENDPOINTS.MARKETING.CAMPAIGNS, params as any),

  getCampaign: (id: number) =>
    apiClient.get(API_ENDPOINTS.MARKETING.CAMPAIGN_BY_ID(id)),

  createCampaign: (data: any) =>
    apiClient.post(API_ENDPOINTS.MARKETING.CAMPAIGNS, data),

  updateCampaign: (id: number, data: any) =>
    apiClient.put(API_ENDPOINTS.MARKETING.CAMPAIGN_BY_ID(id), data),

  deleteCampaign: (id: number) =>
    apiClient.delete(API_ENDPOINTS.MARKETING.CAMPAIGN_BY_ID(id)),

  // Email Templates
  getEmailTemplates: (params?: PaginationParams & { category?: string }) =>
    apiClient.get(API_ENDPOINTS.MARKETING.EMAIL_TEMPLATES, params as any),

  getEmailTemplate: (id: number) =>
    apiClient.get(API_ENDPOINTS.MARKETING.EMAIL_TEMPLATE_BY_ID(id)),

  createEmailTemplate: (data: any) =>
    apiClient.post(API_ENDPOINTS.MARKETING.EMAIL_TEMPLATES, data),

  updateEmailTemplate: (id: number, data: any) =>
    apiClient.put(API_ENDPOINTS.MARKETING.EMAIL_TEMPLATE_BY_ID(id), data),

  deleteEmailTemplate: (id: number) =>
    apiClient.delete(API_ENDPOINTS.MARKETING.EMAIL_TEMPLATE_BY_ID(id)),

  // Social Posts
  getSocialPosts: (params?: PaginationParams & { platform?: string; status?: string }) =>
    apiClient.get(API_ENDPOINTS.MARKETING.SOCIAL_POSTS, params as any),

  getSocialPost: (id: number) =>
    apiClient.get(API_ENDPOINTS.MARKETING.SOCIAL_POST_BY_ID(id)),

  createSocialPost: (data: any) =>
    apiClient.post(API_ENDPOINTS.MARKETING.SOCIAL_POSTS, data),

  updateSocialPost: (id: number, data: any) =>
    apiClient.put(API_ENDPOINTS.MARKETING.SOCIAL_POST_BY_ID(id), data),

  deleteSocialPost: (id: number) =>
    apiClient.delete(API_ENDPOINTS.MARKETING.SOCIAL_POST_BY_ID(id)),

  // Content Pages
  getContentPages: (params?: PaginationParams & { status?: string }) =>
    apiClient.get(API_ENDPOINTS.MARKETING.CONTENT_PAGES, params as any),

  getContentPage: (id: number) =>
    apiClient.get(API_ENDPOINTS.MARKETING.CONTENT_PAGE_BY_ID(id)),

  createContentPage: (data: any) =>
    apiClient.post(API_ENDPOINTS.MARKETING.CONTENT_PAGES, data),

  updateContentPage: (id: number, data: any) =>
    apiClient.put(API_ENDPOINTS.MARKETING.CONTENT_PAGE_BY_ID(id), data),

  deleteContentPage: (id: number) =>
    apiClient.delete(API_ENDPOINTS.MARKETING.CONTENT_PAGE_BY_ID(id)),

  // Analytics Events
  getAnalyticsEvents: (params?: PaginationParams & { event_type?: string }) =>
    apiClient.get(API_ENDPOINTS.MARKETING.ANALYTICS_EVENTS, params as any),

  createAnalyticsEvent: (data: any) =>
    apiClient.post(API_ENDPOINTS.MARKETING.ANALYTICS_EVENTS, data),

  // Analytics Reports
  getAnalyticsOverview: (params?: { start_date?: string; end_date?: string }) =>
    apiClient.get(API_ENDPOINTS.MARKETING.ANALYTICS.OVERVIEW, params as any),

  getCampaignPerformance: (params?: { campaign_id?: number }) =>
    apiClient.get(API_ENDPOINTS.MARKETING.ANALYTICS.CAMPAIGN_PERFORMANCE, params as any),

  getSocialSummary: (params?: { platform?: string }) =>
    apiClient.get(API_ENDPOINTS.MARKETING.ANALYTICS.SOCIAL_SUMMARY, params as any),
};
