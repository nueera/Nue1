// ============================================================================
// Unified API Client — Connects Next.js Frontend to FastAPI Backend
// ============================================================================
// This is the SINGLE source of truth for all API calls.
// Every module (CRM, ERP, Finance, Marketing) should use this client.
//
// Features:
//   - Auto-attaches JWT token from auth store
//   - Handles 401 → redirect to login
//   - Proper error parsing from FastAPI validation errors
//   - Request/response interceptors
// ============================================================================

import type { ApiResponse, PaginatedResponse, ApiError } from '@/types/api';

// ── Configuration ──────────────────────────────────────────────────────────

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

const AUTH_TOKEN_KEY = 'nueone_access_token';
const REFRESH_TOKEN_KEY = 'nueone_refresh_token';

// ── Types ──────────────────────────────────────────────────────────────────

interface RequestConfig extends Omit<RequestInit, 'body'> {
  params?: Record<string, string | number | boolean | undefined>;
  skipAuth?: boolean; // Set true for public endpoints like login/register
  body?: unknown; // Will be JSON.stringify'd automatically
}

interface FastApiValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

interface FastApiErrorBody {
  detail: string | FastApiValidationError[];
}

// ── Token Storage ──────────────────────────────────────────────────────────

/**
 * Set a cookie accessible by the server-side middleware.
 * localStorage is NOT accessible from Edge middleware, so we sync
 * the access token to a cookie so middleware can verify auth state.
 */
function setCookie(name: string, value: string, maxAge = 86400): void {
  document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function deleteCookie(name: string): void {
  document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
}

export const tokenStorage = {
  getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },

  setAccessToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    // Also set as cookie so server-side middleware can read it
    setCookie(AUTH_TOKEN_KEY, token);
  },

  getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  setRefreshToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  },

  clearAll(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    // Also clear the cookie so middleware sees user as logged out
    deleteCookie(AUTH_TOKEN_KEY);
  },
};

// ── Custom Error Classes ───────────────────────────────────────────────────

export class ApiClientError extends Error {
  status: number;
  statusText: string;
  validationErrors: FastApiValidationError[];
  code: string;

  constructor(
    status: number,
    statusText: string,
    detail?: string | FastApiValidationError[]
  ) {
    let message: string;
    let validationErrors: FastApiValidationError[] = [];

    if (typeof detail === 'string') {
      message = detail;
    } else if (Array.isArray(detail)) {
      validationErrors = detail;
      message = detail
        .map((e) => `${e.loc.join('.')}: ${e.msg}`)
        .join('; ');
    } else {
      message = `API Error: ${status} ${statusText}`;
    }

    super(message);
    this.name = 'ApiClientError';
    this.status = status;
    this.statusText = statusText;
    this.validationErrors = validationErrors;
    this.code = `HTTP_${status}`;
  }

  toApiError(): ApiError {
    const details: Record<string, string[]> = {};
    if (this.validationErrors.length > 0) {
      this.validationErrors.forEach((e) => {
        const field = e.loc.join('.');
        if (!details[field]) details[field] = [];
        details[field].push(e.msg);
      });
    }
    return {
      code: this.code,
      message: this.message,
      details: Object.keys(details).length > 0 ? details : undefined,
    };
  }
}

// ── API Client Class ───────────────────────────────────────────────────────

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /** Build authorization headers */
  private getHeaders(customHeaders?: HeadersInit): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    const token = tokenStorage.getAccessToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Merge custom headers
    if (customHeaders) {
      if (customHeaders instanceof Headers) {
        customHeaders.forEach((value, key) => {
          headers[key] = value;
        });
      } else if (Array.isArray(customHeaders)) {
        customHeaders.forEach(([key, value]) => {
          headers[key] = value;
        });
      } else {
        Object.entries(customHeaders).forEach(([key, value]) => {
          if (typeof value === 'string') headers[key] = value;
        });
      }
    }

    return headers;
  }

  /** Handle 401 Unauthorized — clear tokens and redirect */
  private handleUnauthorized(): void {
    tokenStorage.clearAll();
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      if (!currentPath.startsWith('/login')) {
        window.location.href = `/login?callbackUrl=${encodeURIComponent(currentPath)}`;
      }
    }
  }

  /** Core request method */
  private async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<T> {
    const { params, skipAuth = false, ...fetchConfig } = config;

    // Build URL with query params
    let url = `${this.baseUrl}${endpoint}`;
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.set(key, String(value));
        }
      });
      const qs = searchParams.toString();
      if (qs) url += `?${qs}`;
    }

    // Build headers
    const headers = skipAuth
      ? { 'Content-Type': 'application/json', Accept: 'application/json' }
      : this.getHeaders(fetchConfig.headers as HeadersInit);

    try {
      const response = await fetch(url, {
        ...fetchConfig,
        headers,
        body: fetchConfig.body ? JSON.stringify(fetchConfig.body) : undefined,
      });

      // Handle errors
      if (!response.ok) {
        let errorDetail: string | FastApiValidationError[] | undefined;
        try {
          const errorBody: FastApiErrorBody = await response.json();
          errorDetail = errorBody.detail;
        } catch {
          // Couldn't parse error body
        }

        if (response.status === 401 && !skipAuth) {
          this.handleUnauthorized();
        }

        throw new ApiClientError(response.status, response.statusText, errorDetail);
      }

      // Handle 204 No Content
      if (response.status === 204) {
        return undefined as T;
      }

      return response.json();
    } catch (error) {
      if (error instanceof ApiClientError) throw error;

      throw new ApiClientError(
        0,
        'Network Error',
        'Unable to connect to the server. Please check your connection.'
      );
    }
  }

  // ── HTTP Methods ──────────────────────────────────────────────────────

  async get<T>(
    endpoint: string,
    params?: Record<string, string | number | boolean | undefined>,
    options?: { skipAuth?: boolean }
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'GET',
      params,
      skipAuth: options?.skipAuth,
    });
  }

  async post<T>(
    endpoint: string,
    data?: unknown,
    options?: { skipAuth?: boolean }
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data,
      skipAuth: options?.skipAuth,
    });
  }

  async put<T>(
    endpoint: string,
    data?: unknown,
    options?: { skipAuth?: boolean }
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data,
      skipAuth: options?.skipAuth,
    });
  }

  async patch<T>(
    endpoint: string,
    data?: unknown,
    options?: { skipAuth?: boolean }
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data,
      skipAuth: options?.skipAuth,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  /** File upload (multipart/form-data) */
  async upload<T>(endpoint: string, formData: FormData): Promise<T> {
    const headers: Record<string, string> = { Accept: 'application/json' };
    const token = tokenStorage.getAccessToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      let errorDetail: string | undefined;
      try {
        const errorBody = await response.json();
        errorDetail = errorBody.detail;
      } catch { /* ignore */ }
      if (response.status === 401) this.handleUnauthorized();
      throw new ApiClientError(response.status, response.statusText, errorDetail);
    }

    return response.json();
  }
}

// ── Singleton Export ───────────────────────────────────────────────────────

export const apiClient = new ApiClient(API_BASE_URL);

// ── API Endpoints Map ──────────────────────────────────────────────────────

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    ME: '/auth/me',
  },
  CRM: {
    CONTACTS: '/crm/contacts',
    CONTACT_BY_ID: (id: number) => `/crm/contacts/${id}`,
    ACCOUNTS: '/crm/accounts',
    ACCOUNT_BY_ID: (id: number) => `/crm/accounts/${id}`,
    LEADS: '/crm/leads',
    LEAD_BY_ID: (id: number) => `/crm/leads/${id}`,
    DEALS: '/crm/deals',
    DEAL_BY_ID: (id: number) => `/crm/deals/${id}`,
  },
  ERP: {
    DASHBOARD: '/erp/dashboard',
    CATEGORIES: '/erp/categories',
    CATEGORY_BY_ID: (id: number) => `/erp/categories/${id}`,
    SUPPLIERS: '/erp/suppliers',
    SUPPLIER_BY_ID: (id: number) => `/erp/suppliers/${id}`,
    WAREHOUSES: '/erp/warehouses',
    WAREHOUSE_BY_ID: (id: number) => `/erp/warehouses/${id}`,
    PRODUCTS: '/erp/products',
    PRODUCT_BY_ID: (id: number) => `/erp/products/${id}`,
    INVENTORY: '/erp/inventory',
    INVENTORY_BY_ID: (id: number) => `/erp/inventory/${id}`,
    INVENTORY_LOW_STOCK: '/erp/inventory/low-stock',
    PURCHASE_ORDERS: '/erp/purchase-orders',
    PURCHASE_ORDER_BY_ID: (id: number) => `/erp/purchase-orders/${id}`,
    SALES_ORDERS: '/erp/sales-orders',
    SALES_ORDER_BY_ID: (id: number) => `/erp/sales-orders/${id}`,
  },
  FINANCE: {
    DASHBOARD: '/finance/dashboard',
    ACCOUNTS: '/finance/accounts',
    ACCOUNT_BY_ID: (id: number) => `/finance/accounts/${id}`,
    TAX_RATES: '/finance/tax-rates',
    TAX_RATE_BY_ID: (id: number) => `/finance/tax-rates/${id}`,
    INVOICES: '/finance/invoices',
    INVOICE_BY_ID: (id: number) => `/finance/invoices/${id}`,
    EXPENSES: '/finance/expenses',
    EXPENSE_BY_ID: (id: number) => `/finance/expenses/${id}`,
    PAYMENTS: '/finance/payments',
    PAYMENT_BY_ID: (id: number) => `/finance/payments/${id}`,
    JOURNAL_ENTRIES: '/finance/journal-entries',
    JOURNAL_ENTRY_BY_ID: (id: number) => `/finance/journal-entries/${id}`,
    REPORTS: {
      PROFIT_LOSS: '/finance/reports/profit-loss',
      CASH_FLOW: '/finance/reports/cash-flow',
      OUTSTANDING: '/finance/reports/outstanding',
    },
  },
  MARKETING: {
    DASHBOARD: '/marketing/dashboard',
    CHANNELS: '/marketing/channels',
    CHANNEL_BY_ID: (id: number) => `/marketing/channels/${id}`,
    CAMPAIGNS: '/marketing/campaigns',
    CAMPAIGN_BY_ID: (id: number) => `/marketing/campaigns/${id}`,
    EMAIL_TEMPLATES: '/marketing/email-templates',
    EMAIL_TEMPLATE_BY_ID: (id: number) => `/marketing/email-templates/${id}`,
    SOCIAL_POSTS: '/marketing/social-posts',
    SOCIAL_POST_BY_ID: (id: number) => `/marketing/social-posts/${id}`,
    CONTENT_PAGES: '/marketing/content-pages',
    CONTENT_PAGE_BY_ID: (id: number) => `/marketing/content-pages/${id}`,
    ANALYTICS_EVENTS: '/marketing/analytics-events',
    ANALYTICS_EVENT_BY_ID: (id: number) => `/marketing/analytics-events/${id}`,
    ANALYTICS: {
      OVERVIEW: '/marketing/analytics/overview',
      CAMPAIGN_PERFORMANCE: '/marketing/analytics/campaign-performance',
      SOCIAL_SUMMARY: '/marketing/analytics/social-summary',
    },
  },
  HEALTH: '/health',
  HEALTH_DETAILED: '/health/detailed',
} as const;
