// @ts-nocheck
// ============================================================================
// CRM Mock Data — MSW-style Mock Handlers
// ============================================================================

import { leads, getLeadById } from './leads-mock';
import { contacts, getContactById } from './contacts-mock';
import { accounts, getAccountById } from './accounts-mock';
import { deals, getDealById, getDealsByStage } from './deals-mock';

interface MockRoute {
  pattern: RegExp;
  method: string;
  handler: (url: string, body?: unknown) => unknown;
}

function paginated<T>(data: T[], page = 1, pageSize = 25) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return {
    success: true,
    data: data.slice(start, end),
    pagination: { page, pageSize, total: data.length, totalPages: Math.ceil(data.length / pageSize) },
  };
}

function apiResponse<T>(data: T, message?: string) {
  return { success: true, data, message };
}

export const crmMockHandlers: MockRoute[] = [
  // ---- LEADS ----
  { pattern: /^\/api\/crm\/leads\/([^/]+)$/, method: 'GET', handler: (url) => apiResponse(getLeadById(url.split('/').pop()!)) },
  { pattern: /^\/api\/crm\/leads\/stats$/, method: 'GET', handler: () => apiResponse({ total: leads.length, byStatus: { new: 12, contacted: 8, qualified: 15, converted: 10, nurturing: 5 }, bySource: { web: 20, referral: 10, social: 8, partner: 12 } }) },
  { pattern: /^\/api\/crm\/leads$/, method: 'GET', handler: () => paginated(leads) },
  { pattern: /^\/api\/crm\/leads$/, method: 'POST', handler: (_url, body) => apiResponse({ id: `lead-${Date.now()}`, ...(body as Record<string, unknown>) }) },

  // ---- CONTACTS ----
  { pattern: /^\/api\/crm\/contacts\/([^/]+)$/, method: 'GET', handler: (url) => apiResponse(getContactById(url.split('/').pop()!)) },
  { pattern: /^\/api\/crm\/contacts$/, method: 'GET', handler: () => paginated(contacts) },
  { pattern: /^\/api\/crm\/contacts$/, method: 'POST', handler: (_url, body) => apiResponse({ id: `contact-${Date.now()}`, ...(body as Record<string, unknown>) }) },

  // ---- ACCOUNTS ----
  { pattern: /^\/api\/crm\/accounts\/([^/]+)$/, method: 'GET', handler: (url) => apiResponse(getAccountById(url.split('/').pop()!)) },
  { pattern: /^\/api\/crm\/accounts\/stats$/, method: 'GET', handler: () => apiResponse({ total: accounts.length, byType: { customer: 12, prospect: 10, partner: 5 }, byIndustry: { technology: 8, finance: 6, healthcare: 4 } }) },
  { pattern: /^\/api\/crm\/accounts$/, method: 'GET', handler: () => paginated(accounts) },
  { pattern: /^\/api\/crm\/accounts$/, method: 'POST', handler: (_url, body) => apiResponse({ id: `account-${Date.now()}`, ...(body as Record<string, unknown>) }) },

  // ---- DEALS ----
  { pattern: /^\/api\/crm\/deals\/pipeline-stats$/, method: 'GET', handler: () => {
    const byStage: Record<string, { count: number; value: number }> = {};
    for (const stage of ['qualification', 'needs-analysis', 'proposal', 'negotiation', 'closed-won', 'closed-lost']) {
      const stageDeals = getDealsByStage(stage as never);
      byStage[stage] = { count: stageDeals.length, value: stageDeals.reduce((s, d) => s + d.amount, 0) };
    }
    return apiResponse({ byStage, totalValue: deals.reduce((s, d) => s + d.amount, 0) });
  }},
  { pattern: /^\/api\/crm\/deals\/forecast$/, method: 'GET', handler: () => apiResponse({ pipeline: 1250000, bestCase: 1800000, committed: 750000, closed: 450000 }) },
  { pattern: /^\/api\/crm\/deals\/([^/]+)$/, method: 'GET', handler: (url) => apiResponse(getDealById(url.split('/').pop()!)) },
  { pattern: /^\/api\/crm\/deals$/, method: 'GET', handler: () => paginated(deals) },
  { pattern: /^\/api\/crm\/deals$/, method: 'POST', handler: (_url, body) => apiResponse({ id: `deal-${Date.now()}`, ...(body as Record<string, unknown>) }) },
];

function getMockResponse(url: string, method: string): unknown | null {
  for (const route of crmMockHandlers) {
    if (route.method === method && route.pattern.test(url)) {
      return route.handler(url);
    }
  }
  return null;
}

let originalFetch: typeof window.fetch | null = null;

export function startCrmMockServer() {
  if (typeof window === 'undefined' || originalFetch) return;
  originalFetch = window.fetch;
  window.fetch = async (input, init) => {
    const url = typeof input === 'string' ? input : input instanceof Request ? input.url : '';
    const method = init?.method || 'GET';
    const body = init?.body ? JSON.parse(init.body as string) : undefined;

    const mockResponse = getMockResponse(url, method);
    if (mockResponse !== null) {
      return new Response(JSON.stringify(mockResponse), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return originalFetch!(input, init);
  };
}

export function stopCrmMockServer() {
  if (typeof window === 'undefined' || !originalFetch) return;
  window.fetch = originalFetch;
  originalFetch = null;
}
