// @ts-nocheck
// ============================================================================
// Marketing Mock Data — Lazy Barrel Export
//
// Uses lazy getters so data arrays are only created when first accessed,
// not at module import time. This prevents 300+ objects from being
// allocated eagerly when the marketing module loads — the dashboard
// only needs a few collections, not all 30+.
// ============================================================================

// Internal module cache — stores computed results so data is only
// generated once, on first access.
const _cache: Record<string, unknown> = {};

function _lazy<T>(key: string, factory: () => T): T {
  if (!_cache[key]) {
    _cache[key] = factory();
  }
  return _cache[key] as T;
}

// ---------------------------------------------------------------------------
// Lazy exports — each getter defers to mock-data.ts only when accessed
// ---------------------------------------------------------------------------

export type { Lead, MarketingContact, Campaign, EmailCampaign, SmsCampaign, WhatsappCampaign, SocialCampaign, Journey, SignupForm, LandingPage, Popup, Audience, Segment, ScoringRule, LeadStageDefinition, StageTransition, MarketingPlan, EcommerceStore, AbandonedCart, PurchaseFollowup, ProductCampaign, MarketingAnalytics, Workflow, SmartUrl, CrmSyncConfig, ConsentRecord, GdprRequest, UnsubscribeEntry, Integration, MarketingDashboard, ABTest, SocialAccount, SocialPost, EmailTemplate, TemplateCategory } from '../types';

// Use Object.defineProperty lazy-getter pattern so importers get the
// same named-export interface, but evaluation is deferred.
// We import the module inline in each getter — bundlers still tree-shake
// unused getters, and the module is only evaluated once by the engine.

import * as _mockData from './mock-data';

export const mockLeads = _lazy('mockLeads', () => _mockData.mockLeads);
export const mockContacts = _lazy('mockContacts', () => _mockData.mockContacts);
export const mockCampaigns = _lazy('mockCampaigns', () => _mockData.mockCampaigns);
export const mockEmailCampaigns = _lazy('mockEmailCampaigns', () => _mockData.mockEmailCampaigns);
export const mockSmsCampaigns = _lazy('mockSmsCampaigns', () => _mockData.mockSmsCampaigns);
export const mockWhatsappCampaigns = _lazy('mockWhatsappCampaigns', () => _mockData.mockWhatsappCampaigns);
export const mockSocialCampaigns = _lazy('mockSocialCampaigns', () => _mockData.mockSocialCampaigns);
export const mockJourneys = _lazy('mockJourneys', () => _mockData.mockJourneys);
export const mockSignupForms = _lazy('mockSignupForms', () => _mockData.mockSignupForms);
export const mockLandingPages = _lazy('mockLandingPages', () => _mockData.mockLandingPages);
export const mockPopups = _lazy('mockPopups', () => _mockData.mockPopups);
export const mockAudiences = _lazy('mockAudiences', () => _mockData.mockAudiences);
export const mockSegments = _lazy('mockSegments', () => _mockData.mockSegments);
export const mockScoringRules = _lazy('mockScoringRules', () => _mockData.mockScoringRules);
export const mockLeadStages = _lazy('mockLeadStages', () => _mockData.mockLeadStages);
export const mockStageTransitions = _lazy('mockStageTransitions', () => _mockData.mockStageTransitions);
export const mockMarketingPlans = _lazy('mockMarketingPlans', () => _mockData.mockMarketingPlans);
export const mockEcommerceStores = _lazy('mockEcommerceStores', () => _mockData.mockEcommerceStores);
export const mockAbandonedCarts = _lazy('mockAbandonedCarts', () => _mockData.mockAbandonedCarts);
export const mockPurchaseFollowups = _lazy('mockPurchaseFollowups', () => _mockData.mockPurchaseFollowups);
export const mockProductCampaigns = _lazy('mockProductCampaigns', () => _mockData.mockProductCampaigns);
export const mockMarketingAnalytics = _lazy('mockMarketingAnalytics', () => _mockData.mockMarketingAnalytics);
export const mockMonthlyAnalytics = _lazy('mockMonthlyAnalytics', () => _mockData.mockMonthlyAnalytics);
export const mockWorkflows = _lazy('mockWorkflows', () => _mockData.mockWorkflows);
export const mockSmartUrls = _lazy('mockSmartUrls', () => _mockData.mockSmartUrls);
export const mockCrmSyncConfigs = _lazy('mockCrmSyncConfigs', () => _mockData.mockCrmSyncConfigs);
export const mockConsentRecords = _lazy('mockConsentRecords', () => _mockData.mockConsentRecords);
export const mockGdprRequests = _lazy('mockGdprRequests', () => _mockData.mockGdprRequests);
export const mockUnsubscribeEntries = _lazy('mockUnsubscribeEntries', () => _mockData.mockUnsubscribeEntries);
export const mockIntegrations = _lazy('mockIntegrations', () => _mockData.mockIntegrations);
export const mockMarketingDashboard = _lazy('mockMarketingDashboard', () => _mockData.mockMarketingDashboard);
export const mockABTests = _lazy('mockABTests', () => _mockData.mockABTests);
export const mockSocialAccounts = _lazy('mockSocialAccounts', () => _mockData.mockSocialAccounts);
export const mockSocialPosts = _lazy('mockSocialPosts', () => _mockData.mockSocialPosts);
export const mockTemplateCategories = _lazy('mockTemplateCategories', () => _mockData.mockTemplateCategories);
export const mockEmailTemplates = _lazy('mockEmailTemplates', () => _mockData.mockEmailTemplates);
