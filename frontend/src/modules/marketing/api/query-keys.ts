// ============================================================================
// Marketing Query Keys — TanStack Query v5 key factories
// Pattern: [module, entity, action, ...params]
// ============================================================================

// ---------------------------------------------------------------------------
// Leads
// ---------------------------------------------------------------------------

export const leadKeys = {
  all: ['marketing', 'leads'] as const,
  lists: () => [...leadKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...leadKeys.lists(), params] as const,
  details: () => [...leadKeys.all, 'detail'] as const,
  detail: (id: string) => [...leadKeys.details(), id] as const,
  timeline: (id: string) => [...leadKeys.detail(id), 'timeline'] as const,
} as const;

// ---------------------------------------------------------------------------
// Contacts
// ---------------------------------------------------------------------------

export const contactKeys = {
  all: ['marketing', 'contacts'] as const,
  lists: () => [...contactKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...contactKeys.lists(), params] as const,
  details: () => [...contactKeys.all, 'detail'] as const,
  detail: (id: string) => [...contactKeys.details(), id] as const,
  timeline: (id: string) => [...contactKeys.detail(id), 'timeline'] as const,
  preferences: (id: string) => [...contactKeys.detail(id), 'preferences'] as const,
} as const;

// ---------------------------------------------------------------------------
// Campaigns
// ---------------------------------------------------------------------------

export const campaignKeys = {
  all: ['marketing', 'campaigns'] as const,
  lists: () => [...campaignKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...campaignKeys.lists(), params] as const,
  details: () => [...campaignKeys.all, 'detail'] as const,
  detail: (id: string) => [...campaignKeys.details(), id] as const,
  analytics: (id: string) => [...campaignKeys.detail(id), 'analytics'] as const,
  abResults: (id: string) => [...campaignKeys.detail(id), 'ab-results'] as const,
} as const;

// ---------------------------------------------------------------------------
// Journeys
// ---------------------------------------------------------------------------

export const journeyKeys = {
  all: ['marketing', 'journeys'] as const,
  lists: () => [...journeyKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...journeyKeys.lists(), params] as const,
  details: () => [...journeyKeys.all, 'detail'] as const,
  detail: (id: string) => [...journeyKeys.details(), id] as const,
  analytics: (id: string) => [...journeyKeys.detail(id), 'analytics'] as const,
} as const;

// ---------------------------------------------------------------------------
// Signup Forms
// ---------------------------------------------------------------------------

export const formKeys = {
  all: ['marketing', 'forms'] as const,
  lists: () => [...formKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...formKeys.lists(), params] as const,
  details: () => [...formKeys.all, 'detail'] as const,
  detail: (id: string) => [...formKeys.details(), id] as const,
  submissions: (id: string) => [...formKeys.detail(id), 'submissions'] as const,
} as const;

// ---------------------------------------------------------------------------
// Landing Pages
// ---------------------------------------------------------------------------

export const landingPageKeys = {
  all: ['marketing', 'landing-pages'] as const,
  lists: () => [...landingPageKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...landingPageKeys.lists(), params] as const,
  details: () => [...landingPageKeys.all, 'detail'] as const,
  detail: (id: string) => [...landingPageKeys.details(), id] as const,
  analytics: (id: string) => [...landingPageKeys.detail(id), 'analytics'] as const,
} as const;

// ---------------------------------------------------------------------------
// Popups
// ---------------------------------------------------------------------------

export const popupKeys = {
  all: ['marketing', 'popups'] as const,
  lists: () => [...popupKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...popupKeys.lists(), params] as const,
  details: () => [...popupKeys.all, 'detail'] as const,
  detail: (id: string) => [...popupKeys.details(), id] as const,
  analytics: (id: string) => [...popupKeys.detail(id), 'analytics'] as const,
} as const;

// ---------------------------------------------------------------------------
// Audiences
// ---------------------------------------------------------------------------

export const audienceKeys = {
  all: ['marketing', 'audiences'] as const,
  lists: () => [...audienceKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...audienceKeys.lists(), params] as const,
  details: () => [...audienceKeys.all, 'detail'] as const,
  detail: (id: string) => [...audienceKeys.details(), id] as const,
  members: (id: string) => [...audienceKeys.detail(id), 'members'] as const,
  growth: (id: string) => [...audienceKeys.detail(id), 'growth'] as const,
} as const;

// ---------------------------------------------------------------------------
// Segments
// ---------------------------------------------------------------------------

export const segmentKeys = {
  all: ['marketing', 'segments'] as const,
  lists: () => [...segmentKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...segmentKeys.lists(), params] as const,
  details: () => [...segmentKeys.all, 'detail'] as const,
  detail: (id: string) => [...segmentKeys.details(), id] as const,
  preview: (id: string) => [...segmentKeys.detail(id), 'preview'] as const,
  members: (id: string) => [...segmentKeys.detail(id), 'members'] as const,
} as const;

// ---------------------------------------------------------------------------
// Scoring
// ---------------------------------------------------------------------------

export const scoringKeys = {
  all: ['marketing', 'scoring'] as const,
  lists: () => [...scoringKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...scoringKeys.lists(), params] as const,
  details: () => [...scoringKeys.all, 'detail'] as const,
  detail: (id: string) => [...scoringKeys.details(), id] as const,
  history: () => [...scoringKeys.all, 'history'] as const,
  leaderboard: () => [...scoringKeys.all, 'leaderboard'] as const,
} as const;

// ---------------------------------------------------------------------------
// Stages
// ---------------------------------------------------------------------------

export const stageKeys = {
  all: ['marketing', 'stages'] as const,
  lists: () => [...stageKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...stageKeys.lists(), params] as const,
  details: () => [...stageKeys.all, 'detail'] as const,
  detail: (id: string) => [...stageKeys.details(), id] as const,
  distribution: () => [...stageKeys.all, 'distribution'] as const,
} as const;

// ---------------------------------------------------------------------------
// Plans
// ---------------------------------------------------------------------------

export const planKeys = {
  all: ['marketing', 'plans'] as const,
  lists: () => [...planKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...planKeys.lists(), params] as const,
  details: () => [...planKeys.all, 'detail'] as const,
  detail: (id: string) => [...planKeys.details(), id] as const,
  milestones: (id: string) => [...planKeys.detail(id), 'milestones'] as const,
  roi: (id: string) => [...planKeys.detail(id), 'roi'] as const,
} as const;

// ---------------------------------------------------------------------------
// E-Commerce
// ---------------------------------------------------------------------------

export const ecommerceKeys = {
  all: ['marketing', 'ecommerce'] as const,
  stores: () => [...ecommerceKeys.all, 'stores'] as const,
  storeList: (params: Record<string, unknown>) => [...ecommerceKeys.stores(), 'list', params] as const,
  storeDetail: (id: string) => [...ecommerceKeys.stores(), 'detail', id] as const,
  carts: () => [...ecommerceKeys.all, 'carts'] as const,
  cartList: (params: Record<string, unknown>) => [...ecommerceKeys.carts(), 'list', params] as const,
  followups: () => [...ecommerceKeys.all, 'followups'] as const,
  followupList: (params: Record<string, unknown>) => [...ecommerceKeys.followups(), 'list', params] as const,
  productCampaigns: () => [...ecommerceKeys.all, 'product-campaigns'] as const,
  productCampaignList: (params: Record<string, unknown>) => [...ecommerceKeys.productCampaigns(), 'list', params] as const,
} as const;

// ---------------------------------------------------------------------------
// Analytics
// ---------------------------------------------------------------------------

export const analyticsKeys = {
  all: ['marketing', 'analytics'] as const,
  overview: (params: Record<string, unknown>) => [...analyticsKeys.all, 'overview', params] as const,
  campaignReport: (id: string) => [...analyticsKeys.all, 'campaign-report', id] as const,
  attribution: (params: Record<string, unknown>) => [...analyticsKeys.all, 'attribution', params] as const,
  webAnalytics: (params: Record<string, unknown>) => [...analyticsKeys.all, 'web', params] as const,
  journeyReport: (id: string) => [...analyticsKeys.all, 'journey-report', id] as const,
  abTestResults: (id: string) => [...analyticsKeys.all, 'ab-test-results', id] as const,
  roi: (params: Record<string, unknown>) => [...analyticsKeys.all, 'roi', params] as const,
} as const;

// ---------------------------------------------------------------------------
// Workflows
// ---------------------------------------------------------------------------

export const workflowKeys = {
  all: ['marketing', 'workflows'] as const,
  lists: () => [...workflowKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...workflowKeys.lists(), params] as const,
  details: () => [...workflowKeys.all, 'detail'] as const,
  detail: (id: string) => [...workflowKeys.details(), id] as const,
  logs: (id: string) => [...workflowKeys.detail(id), 'logs'] as const,
} as const;

// ---------------------------------------------------------------------------
// Tracking (Smart URLs, Goals)
// ---------------------------------------------------------------------------

export const trackingKeys = {
  all: ['marketing', 'tracking'] as const,
  smartUrls: () => [...trackingKeys.all, 'smart-urls'] as const,
  smartUrlList: (params: Record<string, unknown>) => [...trackingKeys.smartUrls(), 'list', params] as const,
  smartUrlDetail: (id: string) => [...trackingKeys.smartUrls(), 'detail', id] as const,
  smartUrlClicks: (id: string) => [...trackingKeys.smartUrls(), 'clicks', id] as const,
  goals: () => [...trackingKeys.all, 'goals'] as const,
  goalList: (params: Record<string, unknown>) => [...trackingKeys.goals(), 'list', params] as const,
  goalDetail: (id: string) => [...trackingKeys.goals(), 'detail', id] as const,
  goalConversions: (id: string) => [...trackingKeys.goals(), 'conversions', id] as const,
} as const;

// ---------------------------------------------------------------------------
// CRM Sync
// ---------------------------------------------------------------------------

export const crmSyncKeys = {
  all: ['marketing', 'crm-sync'] as const,
  config: () => [...crmSyncKeys.all, 'config'] as const,
  fieldMappings: () => [...crmSyncKeys.all, 'field-mappings'] as const,
  logs: (params: Record<string, unknown>) => [...crmSyncKeys.all, 'logs', params] as const,
} as const;

// ---------------------------------------------------------------------------
// Compliance
// ---------------------------------------------------------------------------

export const complianceKeys = {
  all: ['marketing', 'compliance'] as const,
  consents: () => [...complianceKeys.all, 'consents'] as const,
  consentList: (params: Record<string, unknown>) => [...complianceKeys.consents(), 'list', params] as const,
  gdprRequests: () => [...complianceKeys.all, 'gdpr'] as const,
  gdprRequestList: (params: Record<string, unknown>) => [...complianceKeys.gdprRequests(), 'list', params] as const,
  unsubscribes: () => [...complianceKeys.all, 'unsubscribes'] as const,
  unsubscribeList: (params: Record<string, unknown>) => [...complianceKeys.unsubscribes(), 'list', params] as const,
} as const;

// ---------------------------------------------------------------------------
// Integrations
// ---------------------------------------------------------------------------

export const integrationKeys = {
  all: ['marketing', 'integrations'] as const,
  lists: () => [...integrationKeys.all, 'list'] as const,
  list: (params: Record<string, unknown>) => [...integrationKeys.lists(), params] as const,
  details: () => [...integrationKeys.all, 'detail'] as const,
  detail: (id: string) => [...integrationKeys.details(), id] as const,
  config: (id: string) => [...integrationKeys.detail(id), 'config'] as const,
} as const;
