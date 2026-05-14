// @ts-nocheck
// ============================================================================
// Finance API Interceptors
// Auth header injection, token refresh, and request/response interceptors.
// ============================================================================

import type { ApiResponse } from '../types';

// ---------------------------------------------------------------------------
// Token Management
// ---------------------------------------------------------------------------

const TOKEN_KEY = 'nueone-auth-token';
const REFRESH_TOKEN_KEY = 'nueone-refresh-token';

/** Get the current auth token from storage */
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

/** Set the auth token in storage */
export function setAuthToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
}

/** Get the refresh token from storage */
export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

/** Set the refresh token in storage */
export function setRefreshToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
}

/** Clear all tokens (logout) */
export function clearTokens(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

// ---------------------------------------------------------------------------
// Request Interceptor
// ---------------------------------------------------------------------------

export interface InterceptorRequestConfig {
  url: string;
  method: string;
  headers: Record<string, string>;
  data?: unknown;
}

/** Apply request interceptors: inject auth headers, add org context, etc. */
export function applyRequestInterceptors(
  config: InterceptorRequestConfig
): InterceptorRequestConfig {
  const token = getAuthToken();
  const modified = { ...config, headers: { ...config.headers } };

  // Inject Authorization header
  if (token) {
    modified.headers['Authorization'] = `Bearer ${token}`;
  }

  // Add org context if available
  if (typeof window !== 'undefined') {
    const orgId = localStorage.getItem('nueone-org-id');
    if (orgId) {
      modified.headers['X-Org-ID'] = orgId;
    }
  }

  // Add request ID for tracing
  modified.headers['X-Request-ID'] = generateRequestId();

  // Add timestamp
  modified.headers['X-Request-Timestamp'] = new Date().toISOString();

  return modified;
}

// ---------------------------------------------------------------------------
// Response Interceptor
// ---------------------------------------------------------------------------

export interface InterceptorResponse<T = unknown> {
  ok: boolean;
  status: number;
  data?: T;
  error?: string;
}

/** Apply response interceptors: handle auth errors, parse errors, etc. */
export function applyResponseInterceptors<T>(
  response: Response,
  data: ApiResponse<T>
): InterceptorResponse<T> {
  // Handle 401 — token expired
  if (response.status === 401) {
    // Clear tokens and redirect to login
    clearTokens();
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return { ok: false, status: 401, error: 'Session expired. Please log in again.' };
  }

  // Handle 403 — forbidden
  if (response.status === 403) {
    return { ok: false, status: 403, error: 'Access denied.' };
  }

  // Success
  if (response.ok && data.success) {
    return { ok: true, status: response.status, data: data.data };
  }

  // API-level error
  return {
    ok: false,
    status: response.status,
    error: data.message || `Request failed with status ${response.status}`,
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function generateRequestId(): string {
  return `fin_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// ---------------------------------------------------------------------------
// Error class for Finance API errors
// ---------------------------------------------------------------------------

export class FinanceApiError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = 'FinanceApiError';
    this.status = status;
    this.code = code;
  }
}
