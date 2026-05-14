// @ts-nocheck
// ============================================================================
// Analytics Service — getOverview, getCampaignReport, getAttribution, getWebAnalytics,
//   getJourneyReport, getABTestResults, getROI
// ============================================================================

import { marketingApi } from '../api/client';
import { ANALYTICS_ENDPOINTS } from '../api/endpoints';
import type { MarketingAnalytics, AttributionTouchpoint, ABTest, ApiResponse, PaginatedRequest } from '../types';

export interface AnalyticsOverviewParams extends PaginatedRequest {
  startDate?: string;
  endDate?: string;
  period?: '7d' | '30d' | '90d' | '1y' | 'custom';
}

export interface AttributionParams {
  model?: 'first_touch' | 'last_touch' | 'linear' | 'time_decay' | 'u_shaped' | 'w_shaped' | 'custom';
  startDate?: string;
  endDate?: string;
}

export const analyticsService = {
  getOverview: async (params?: AnalyticsOverviewParams): Promise<ApiResponse<MarketingAnalytics>> => {
    return marketingApi.get<MarketingAnalytics>(ANALYTICS_ENDPOINTS.dashboard, params as Record<string, string>);
  },

  getCampaignReport: async (campaignId: string): Promise<ApiResponse<MarketingAnalytics>> => {
    return marketingApi.get<MarketingAnalytics>(ANALYTICS_ENDPOINTS.campaignReport(campaignId));
  },

  getAttribution: async (params?: AttributionParams): Promise<ApiResponse<AttributionTouchpoint[]>> => {
    return marketingApi.get<AttributionTouchpoint[]>(ANALYTICS_ENDPOINTS.attribution, params as Record<string, string>);
  },

  getWebAnalytics: async (params?: AnalyticsOverviewParams): Promise<ApiResponse<{ pageViews: number; uniqueVisitors: number; avgSessionDuration: number; bounceRate: number; topPages: Array<{ url: string; views: number }> }>> => {
    return marketingApi.get<{ pageViews: number; uniqueVisitors: number; avgSessionDuration: number; bounceRate: number; topPages: Array<{ url: string; views: number }> }>(ANALYTICS_ENDPOINTS.webAnalytics, params as Record<string, string>);
  },

  getJourneyReport: async (journeyId: string): Promise<ApiResponse<{ enrolledCount: number; completedCount: number; avgCompletionTime: number; dropoffPoints: Array<{ nodeId: string; label: string; dropoffRate: number }> }>> => {
    return marketingApi.get<{ enrolledCount: number; completedCount: number; avgCompletionTime: number; dropoffPoints: Array<{ nodeId: string; label: string; dropoffRate: number }> }>(`${ANALYTICS_ENDPOINTS.dashboard}/journeys/${journeyId}`);
  },

  getABTestResults: async (testId: string): Promise<ApiResponse<ABTest>> => {
    return marketingApi.get<ABTest>(ANALYTICS_ENDPOINTS.abTestDetail(testId));
  },

  getROI: async (params?: AnalyticsOverviewParams): Promise<ApiResponse<{ totalRevenue: number; totalSpend: number; roi: number; roas: number; byChannel: Record<string, { revenue: number; spend: number; roi: number }> }>> => {
    return marketingApi.get<{ totalRevenue: number; totalSpend: number; roi: number; roas: number; byChannel: Record<string, { revenue: number; spend: number; roi: number }> }>(`${ANALYTICS_ENDPOINTS.dashboard}/roi`, params as Record<string, string>);
  },
};
