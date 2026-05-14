// @ts-nocheck
'use client';

// ============================================================================
// Analytics Hooks — TanStack Query v5
// ============================================================================

import { useQuery } from '@tanstack/react-query';
import { analyticsService, type AnalyticsOverviewParams, type AttributionParams } from '../services/analytics.service';
import { analyticsKeys } from '../api/query-keys';

export function useAnalyticsOverview(params?: AnalyticsOverviewParams) {
  return useQuery({
    queryKey: analyticsKeys.overview((params || {}) as Record<string, unknown>),
    queryFn: () => analyticsService.getOverview(params),
  });
}

export function useCampaignReport(campaignId: string) {
  return useQuery({
    queryKey: analyticsKeys.campaignReport(campaignId),
    queryFn: () => analyticsService.getCampaignReport(campaignId),
    enabled: !!campaignId,
  });
}

export function useAttributionReport(params?: AttributionParams) {
  return useQuery({
    queryKey: analyticsKeys.attribution((params || {}) as Record<string, unknown>),
    queryFn: () => analyticsService.getAttribution(params),
  });
}

export function useWebAnalytics(params?: AnalyticsOverviewParams) {
  return useQuery({
    queryKey: analyticsKeys.webAnalytics((params || {}) as Record<string, unknown>),
    queryFn: () => analyticsService.getWebAnalytics(params),
  });
}

export function useJourneyReport(journeyId: string) {
  return useQuery({
    queryKey: analyticsKeys.journeyReport(journeyId),
    queryFn: () => analyticsService.getJourneyReport(journeyId),
    enabled: !!journeyId,
  });
}

export function useABTestResults(testId: string) {
  return useQuery({
    queryKey: analyticsKeys.abTestResults(testId),
    queryFn: () => analyticsService.getABTestResults(testId),
    enabled: !!testId,
  });
}

export function useROIDashboard(params?: AnalyticsOverviewParams) {
  return useQuery({
    queryKey: analyticsKeys.roi((params || {}) as Record<string, unknown>),
    queryFn: () => analyticsService.getROI(params),
  });
}
