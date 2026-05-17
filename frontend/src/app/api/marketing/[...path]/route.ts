// ============================================================================
// Marketing API Catch-All Route
// ============================================================================
// In development (NEXT_PUBLIC_AUTH_DISABLED=true or backend unavailable),
// serves mock data so the frontend can function without the FastAPI backend.
// In production, proxies requests to the FastAPI backend.
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';

const IS_DEV_MODE = process.env.NEXT_PUBLIC_AUTH_DISABLED === 'true';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

// ── Mock Data Route Map ────────────────────────────────────────────────────
// Maps URL path segments to mock data collections.
// Each key matches the first path segment after /api/marketing/

const MOCK_ROUTE_MAP: Record<string, () => Promise<{ success: boolean; data: unknown }>> = {
  // Campaigns
  campaigns: async () => {
    const { mockCampaigns, mockEmailCampaigns, mockSmsCampaigns, mockWhatsappCampaigns, mockSocialCampaigns } = await import('@/modules/marketing/data');
    return { success: true, data: mockCampaigns };
  },
  'campaigns/email': async () => {
    const { mockEmailCampaigns } = await import('@/modules/marketing/data');
    return { success: true, data: mockEmailCampaigns };
  },
  'campaigns/sms': async () => {
    const { mockSmsCampaigns } = await import('@/modules/marketing/data');
    return { success: true, data: mockSmsCampaigns };
  },
  'campaigns/whatsapp': async () => {
    const { mockWhatsappCampaigns } = await import('@/modules/marketing/data');
    return { success: true, data: mockWhatsappCampaigns };
  },
  'campaigns/social': async () => {
    const { mockSocialCampaigns } = await import('@/modules/marketing/data');
    return { success: true, data: mockSocialCampaigns };
  },
  'campaigns/templates': async () => {
    const { mockEmailTemplates } = await import('@/modules/marketing/data');
    return { success: true, data: mockEmailTemplates };
  },

  // Leads
  leads: async () => {
    const { mockLeads } = await import('@/modules/marketing/data');
    return { success: true, data: mockLeads };
  },
  'leads/contacts': async () => {
    const { mockContacts } = await import('@/modules/marketing/data');
    return { success: true, data: mockContacts };
  },
  'leads/scoring/rules': async () => {
    const { mockScoringRules } = await import('@/modules/marketing/data');
    return { success: true, data: mockScoringRules };
  },
  'leads/stages': async () => {
    const { mockLeadStages } = await import('@/modules/marketing/data');
    return { success: true, data: mockLeadStages };
  },

  // Audiences
  audiences: async () => {
    const { mockAudiences } = await import('@/modules/marketing/data');
    return { success: true, data: mockAudiences };
  },
  'audiences/segments': async () => {
    const { mockSegments } = await import('@/modules/marketing/data');
    return { success: true, data: mockSegments };
  },
  'audiences/forms': async () => {
    const { mockSignupForms } = await import('@/modules/marketing/data');
    return { success: true, data: mockSignupForms };
  },
  'audiences/landing-pages': async () => {
    const { mockLandingPages } = await import('@/modules/marketing/data');
    return { success: true, data: mockLandingPages };
  },
  'audiences/popups': async () => {
    const { mockPopups } = await import('@/modules/marketing/data');
    return { success: true, data: mockPopups };
  },

  // Journeys
  journeys: async () => {
    const { mockJourneys } = await import('@/modules/marketing/data');
    return { success: true, data: mockJourneys };
  },
  'journeys/templates': async () => {
    const { mockJourneys } = await import('@/modules/marketing/data');
    return { success: true, data: mockJourneys.slice(0, 3) };
  },
  'journeys/workflows': async () => {
    const { mockWorkflows } = await import('@/modules/marketing/data');
    return { success: true, data: mockWorkflows };
  },

  // Analytics
  'analytics/dashboard': async () => {
    const { mockMarketingDashboard } = await import('@/modules/marketing/data');
    return { success: true, data: mockMarketingDashboard };
  },
  'analytics/campaigns': async () => {
    const { mockCampaigns } = await import('@/modules/marketing/data');
    return { success: true, data: mockCampaigns };
  },
  analytics: async () => {
    const { mockMarketingAnalytics } = await import('@/modules/marketing/data');
    return { success: true, data: mockMarketingAnalytics };
  },
  'analytics/smart-urls': async () => {
    const { mockSmartUrls } = await import('@/modules/marketing/data');
    return { success: true, data: mockSmartUrls };
  },
  'analytics/goals': async () => {
    const { mockSmartUrls } = await import('@/modules/marketing/data');
    return { success: true, data: mockSmartUrls };
  },
  'analytics/ab-tests': async () => {
    const { mockABTests } = await import('@/modules/marketing/data');
    return { success: true, data: mockABTests };
  },
  'analytics/web': async () => {
    const { mockMarketingAnalytics } = await import('@/modules/marketing/data');
    return { success: true, data: mockMarketingAnalytics };
  },
  'analytics/attribution': async () => {
    const { mockMarketingAnalytics } = await import('@/modules/marketing/data');
    return { success: true, data: mockMarketingAnalytics };
  },

  // E-Commerce
  'ecommerce/dashboard': async () => {
    const { mockEcommerceStores } = await import('@/modules/marketing/data');
    return { success: true, data: { stores: mockEcommerceStores, totalRevenue: 250000 } };
  },
  'ecommerce/stores': async () => {
    const { mockEcommerceStores } = await import('@/modules/marketing/data');
    return { success: true, data: mockEcommerceStores };
  },
  'ecommerce/abandoned-carts': async () => {
    const { mockAbandonedCarts } = await import('@/modules/marketing/data');
    return { success: true, data: mockAbandonedCarts };
  },
  'ecommerce/followups': async () => {
    const { mockPurchaseFollowups } = await import('@/modules/marketing/data');
    return { success: true, data: mockPurchaseFollowups };
  },
  'ecommerce/product-campaigns': async () => {
    const { mockProductCampaigns } = await import('@/modules/marketing/data');
    return { success: true, data: mockProductCampaigns };
  },

  // Automation
  'automation/dashboard': async () => {
    const { mockWorkflows } = await import('@/modules/marketing/data');
    return { success: true, data: { activeWorkflows: mockWorkflows.length, totalExecutions: 15420 } };
  },
  'automation/workflows': async () => {
    const { mockWorkflows } = await import('@/modules/marketing/data');
    return { success: true, data: mockWorkflows };
  },
  'automation/planner': async () => {
    const { mockMarketingPlans } = await import('@/modules/marketing/data');
    return { success: true, data: mockMarketingPlans };
  },
  'automation/web-tracking': async () => {
    const { mockSmartUrls } = await import('@/modules/marketing/data');
    return { success: true, data: { urls: mockSmartUrls, events: [] } };
  },
  'automation/crm-sync': async () => {
    const { mockCrmSyncConfigs } = await import('@/modules/marketing/data');
    return { success: true, data: mockCrmSyncConfigs };
  },

  // Compliance
  'compliance/consent': async () => {
    const { mockConsentRecords } = await import('@/modules/marketing/data');
    return { success: true, data: mockConsentRecords };
  },
  'compliance/gdpr': async () => {
    const { mockGdprRequests } = await import('@/modules/marketing/data');
    return { success: true, data: mockGdprRequests };
  },
  'compliance/unsubscribes': async () => {
    const { mockUnsubscribeEntries } = await import('@/modules/marketing/data');
    return { success: true, data: mockUnsubscribeEntries };
  },

  // Integrations
  integrations: async () => {
    const { mockIntegrations } = await import('@/modules/marketing/data');
    return { success: true, data: mockIntegrations };
  },

  // Search
  search: async () => {
    const { mockLeads, mockCampaigns, mockAudiences } = await import('@/modules/marketing/data');
    return { success: true, data: [...mockLeads.slice(0, 5), ...mockCampaigns.slice(0, 5), ...mockAudiences.slice(0, 3)] };
  },
};

// ── Helper: Find best matching mock route ──────────────────────────────────

function findMockRoute(pathSegments: string[]): (() => Promise<{ success: boolean; data: unknown }>) | null {
  // Try most specific path first, then progressively shorter
  for (let len = pathSegments.length; len >= 1; len--) {
    const key = pathSegments.slice(0, len).join('/');
    if (MOCK_ROUTE_MAP[key]) {
      return MOCK_ROUTE_MAP[key];
    }
  }
  return null;
}

// ── Helper: Get item by ID from mock data array ────────────────────────────

function findItemById(data: unknown[], id: string): unknown | undefined {
  return data.find((item: any) => item.id === id);
}

// ── GET Handler ─────────────────────────────────────────────────────────────

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const pathStr = path.join('/');

  // In production: proxy to FastAPI backend
  if (!IS_DEV_MODE) {
    try {
      const backendUrl = `${API_BASE_URL}/marketing/${pathStr}`;
      const token = request.cookies.get('nueone_access_token')?.value;
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(backendUrl, { headers });
      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    } catch {
      // Backend unavailable — fall through to mock data
    }
  }

  // Dev mode: serve mock data
  const mockRoute = findMockRoute(path);
  if (mockRoute) {
    try {
      const result = await mockRoute();

      // Check if requesting a specific item by ID (last path segment that looks like an ID)
      const lastSegment = path[path.length - 1];
      if (lastSegment && /^[A-Z]+-\d+$/.test(lastSegment) && Array.isArray(result.data)) {
        const item = findItemById(result.data, lastSegment);
        if (item) {
          return NextResponse.json({ success: true, data: item });
        }
        return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
      }

      return NextResponse.json(result);
    } catch (error) {
      console.error('[Marketing API] Mock data error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to load mock data' },
        { status: 500 }
      );
    }
  }

  // No matching route — return empty data instead of 404
  return NextResponse.json({ success: true, data: [] });
}

// ── POST Handler ────────────────────────────────────────────────────────────

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const pathStr = path.join('/');

  // In production: proxy to FastAPI backend
  if (!IS_DEV_MODE) {
    try {
      const backendUrl = `${API_BASE_URL}/marketing/${pathStr}`;
      const token = request.cookies.get('nueone_access_token')?.value;
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const body = await request.json();
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });
      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    } catch {
      // Backend unavailable — fall through to mock response
    }
  }

  // Dev mode: return mock success response
  return NextResponse.json({
    success: true,
    data: { id: `mock-${Date.now()}`, message: 'Created (dev mode)' },
  });
}

// ── PUT/PATCH Handler ───────────────────────────────────────────────────────

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return POST(request, { params });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return POST(request, { params });
}

// ── DELETE Handler ──────────────────────────────────────────────────────────

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const pathStr = path.join('/');

  // In production: proxy to FastAPI backend
  if (!IS_DEV_MODE) {
    try {
      const backendUrl = `${API_BASE_URL}/marketing/${pathStr}`;
      const token = request.cookies.get('nueone_access_token')?.value;
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(backendUrl, { method: 'DELETE', headers });
      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    } catch {
      // Backend unavailable — fall through to mock response
    }
  }

  // Dev mode: return mock success response
  return NextResponse.json({ success: true, data: null });
}
