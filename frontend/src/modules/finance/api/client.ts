// @ts-nocheck
// ============================================================================
// Finance API Client
// Fetch-based API client for the Finance module.
// Same pattern as ERP's api-client.ts.
// ============================================================================

const FINANCE_API_BASE = process.env.NEXT_PUBLIC_FINANCE_API_URL || '/api/finance';

interface RequestConfig extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

class FinanceApiClient {
  private baseUrl: string;
  private orgId: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /** Set the current organization ID for multi-tenant requests */
  setOrgId(orgId: string) {
    this.orgId = orgId;
  }

  /** Build headers with auth token and org context */
  private getHeaders(customHeaders?: Record<string, string>): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.orgId) {
      headers['X-Org-ID'] = this.orgId;
    }

    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('nueone-auth-token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return { ...headers, ...customHeaders };
  }

  /** Core request method */
  private async request<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const { params, ...fetchConfig } = config;

    let url = `${this.baseUrl}${endpoint}`;
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.set(key, String(value));
        }
      });
      const qs = searchParams.toString();
      if (qs) {
        url += `?${qs}`;
      }
    }

    const response = await fetch(url, {
      headers: this.getHeaders(fetchConfig.headers as Record<string, string>),
      ...fetchConfig,
    });

    if (!response.ok) {
      // Try to parse error body
      let errorMessage = `API Error: ${response.status} ${response.statusText}`;
      try {
        const errorBody = await response.json();
        if (errorBody.message) {
          errorMessage = errorBody.message;
        }
      } catch {
        // Use default error message
      }

      // Special handling for common status codes
      if (response.status === 401) {
        errorMessage = 'Authentication required. Please log in again.';
      } else if (response.status === 403) {
        errorMessage = 'You do not have permission to perform this action.';
      } else if (response.status === 404) {
        errorMessage = 'The requested resource was not found.';
      } else if (response.status === 429) {
        errorMessage = 'Rate limit exceeded. Please try again later.';
      }

      throw new Error(errorMessage);
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return undefined as T;
    }

    return response.json();
  }

  // ---------------------------------------------------------------------------
  // HTTP Methods
  // ---------------------------------------------------------------------------

  async get<T>(
    endpoint: string,
    params?: Record<string, string | number | boolean | undefined>
  ): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', params });
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  /** Upload a file (multipart/form-data) */
  async upload<T>(endpoint: string, formData: FormData): Promise<T> {
    const headers: Record<string, string> = {};
    if (this.orgId) {
      headers['X-Org-ID'] = this.orgId;
    }
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('nueone-auth-token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }
}

// ---------------------------------------------------------------------------
// Singleton Client
// ---------------------------------------------------------------------------

export const financeApiClient = new FinanceApiClient(FINANCE_API_BASE);
