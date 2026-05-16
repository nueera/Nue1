// ============================================================================
// Marketing API Client
// Fetch-based API client for the Marketing module
// Same pattern as Finance's api/client.ts
// ============================================================================

import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../types';
import { MARKETING_CONFIG } from '../config';

// ---------------------------------------------------------------------------
// API Error
// ---------------------------------------------------------------------------

export class MarketingApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public data?: unknown
  ) {
    super(`Marketing API Error: ${status} ${statusText}`);
    this.name = 'MarketingApiError';
  }
}

// ---------------------------------------------------------------------------
// API Client
// ---------------------------------------------------------------------------

class MarketingApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${MARKETING_CONFIG.isDev ? '' : ''}/api/marketing`;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new MarketingApiError(
        response.status,
        response.statusText,
        await response.json().catch(() => null)
      );
    }

    return response.json();
  }

  async get<T>(endpoint: string, params?: Record<string, string>): Promise<ApiResponse<T>> {
    const searchParams = params ? `?${new URLSearchParams(params)}` : '';
    return this.request<ApiResponse<T>>(`${endpoint}${searchParams}`);
  }

  async post<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<ApiResponse<T>>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<ApiResponse<T>>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<ApiResponse<T>>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<ApiResponse<T>>(endpoint, {
      method: 'DELETE',
    });
  }

  async getPaginated<T>(endpoint: string, params?: PaginatedRequest): Promise<PaginatedResponse<T>> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', String(params.page));
    if (params?.pageSize) searchParams.set('pageSize', String(params.pageSize));
    if (params?.search) searchParams.set('search', params.search);
    if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
    if (params?.sortOrder) searchParams.set('sortOrder', params.sortOrder);

    return this.request<PaginatedResponse<T>>(`${endpoint}?${searchParams}`);
  }
}

// ---------------------------------------------------------------------------
// Singleton
// ---------------------------------------------------------------------------

export const marketingApi = new MarketingApiClient();
