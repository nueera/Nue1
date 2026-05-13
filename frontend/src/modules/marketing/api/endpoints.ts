// ============================================================================
// Marketing API Endpoints
// Organized by product — same pattern as Finance's api/endpoints.ts
// ============================================================================

// ---------------------------------------------------------------------------
// Campaigns
// ---------------------------------------------------------------------------

export const CAMPAIGNS_ENDPOINTS = {
  list: '/campaigns',
  detail: (id: string) => `/campaigns/${id}`,
  create: '/campaigns',
  update: (id: string) => `/campaigns/${id}`,
  delete: (id: string) => `/campaigns/${id}`,
  send: (id: string) => `/campaigns/${id}/send`,
  schedule: (id: string) => `/campaigns/${id}/schedule`,
  duplicate: (id: string) => `/campaigns/${id}/duplicate`,
  stats: (id: string) => `/campaigns/${id}/stats`,
  // Email
  emailList: '/campaigns/email',
  emailDetail: (id: string) => `/campaigns/email/${id}`,
  // SMS
  smsList: '/campaigns/sms',
  smsDetail: (id: string) => `/campaigns/sms/${id}`,
  // WhatsApp
  whatsappList: '/campaigns/whatsapp',
  whatsappDetail: (id: string) => `/campaigns/whatsapp/${id}`,
  // Social
  socialList: '/campaigns/social',
  socialDetail: (id: string) => `/campaigns/social/${id}`,
  // Templates
  templateList: '/campaigns/templates',
  templateDetail: (id: string) => `/campaigns/templates/${id}`,
} as const;

// ---------------------------------------------------------------------------
// Leads
// ---------------------------------------------------------------------------

export const LEADS_ENDPOINTS = {
  list: '/leads',
  detail: (id: string) => `/leads/${id}`,
  create: '/leads',
  update: (id: string) => `/leads/${id}`,
  delete: (id: string) => `/leads/${id}`,
  convert: (id: string) => `/leads/${id}/convert`,
  assign: (id: string) => `/leads/${id}/assign`,
  score: (id: string) => `/leads/${id}/score`,
  activities: (id: string) => `/leads/${id}/activities`,
  // Contacts
  contactList: '/leads/contacts',
  contactDetail: (id: string) => `/leads/contacts/${id}`,
  // Scoring
  scoringRules: '/leads/scoring/rules',
  scoringModels: '/leads/scoring/models',
  // Stages
  stageList: '/leads/stages',
  stageTransitions: (leadId: string) => `/leads/${leadId}/transitions`,
} as const;

// ---------------------------------------------------------------------------
// Audiences
// ---------------------------------------------------------------------------

export const AUDIENCES_ENDPOINTS = {
  list: '/audiences',
  detail: (id: string) => `/audiences/${id}`,
  create: '/audiences',
  update: (id: string) => `/audiences/${id}`,
  delete: (id: string) => `/audiences/${id}`,
  members: (id: string) => `/audiences/${id}/members`,
  addMembers: (id: string) => `/audiences/${id}/members/add`,
  removeMembers: (id: string) => `/audiences/${id}/members/remove`,
  growth: (id: string) => `/audiences/${id}/growth`,
  // Segments
  segmentList: '/audiences/segments',
  segmentDetail: (id: string) => `/audiences/segments/${id}`,
  segmentPreview: (id: string) => `/audiences/segments/${id}/preview`,
  // Signup Forms
  formList: '/audiences/forms',
  formDetail: (id: string) => `/audiences/forms/${id}`,
  formSubmissions: (id: string) => `/audiences/forms/${id}/submissions`,
  // Landing Pages
  landingPageList: '/audiences/landing-pages',
  landingPageDetail: (id: string) => `/audiences/landing-pages/${id}`,
  // Popups
  popupList: '/audiences/popups',
  popupDetail: (id: string) => `/audiences/popups/${id}`,
} as const;

// ---------------------------------------------------------------------------
// Journeys
// ---------------------------------------------------------------------------

export const JOURNEYS_ENDPOINTS = {
  list: '/journeys',
  detail: (id: string) => `/journeys/${id}`,
  create: '/journeys',
  update: (id: string) => `/journeys/${id}`,
  delete: (id: string) => `/journeys/${id}`,
  activate: (id: string) => `/journeys/${id}/activate`,
  pause: (id: string) => `/journeys/${id}/pause`,
  stats: (id: string) => `/journeys/${id}/stats`,
  // Templates
  templateList: '/journeys/templates',
  templateDetail: (id: string) => `/journeys/templates/${id}`,
  // Workflows
  workflowList: '/journeys/workflows',
  workflowDetail: (id: string) => `/journeys/workflows/${id}`,
} as const;

// ---------------------------------------------------------------------------
// Analytics
// ---------------------------------------------------------------------------

export const ANALYTICS_ENDPOINTS = {
  dashboard: '/analytics/dashboard',
  campaignReports: '/analytics/campaigns',
  campaignReport: (id: string) => `/analytics/campaigns/${id}`,
  attribution: '/analytics/attribution',
  webAnalytics: '/analytics/web',
  // Smart URLs
  smartUrlList: '/analytics/smart-urls',
  smartUrlDetail: (id: string) => `/analytics/smart-urls/${id}`,
  smartUrlClicks: (id: string) => `/analytics/smart-urls/${id}/clicks`,
  // Goals
  goalList: '/analytics/goals',
  goalDetail: (id: string) => `/analytics/goals/${id}`,
  goalConversions: (id: string) => `/analytics/goals/${id}/conversions`,
  // A/B Testing
  abTestList: '/analytics/ab-tests',
  abTestDetail: (id: string) => `/analytics/ab-tests/${id}`,
} as const;

// ---------------------------------------------------------------------------
// E-Commerce
// ---------------------------------------------------------------------------

export const ECOMMERCE_ENDPOINTS = {
  dashboard: '/ecommerce/dashboard',
  storeList: '/ecommerce/stores',
  storeDetail: (id: string) => `/ecommerce/stores/${id}`,
  // Abandoned Carts
  cartList: '/ecommerce/abandoned-carts',
  cartDetail: (id: string) => `/ecommerce/abandoned-carts/${id}`,
  cartRecover: (id: string) => `/ecommerce/abandoned-carts/${id}/recover`,
  // Purchase Follow-ups
  followupList: '/ecommerce/followups',
  followupDetail: (id: string) => `/ecommerce/followups/${id}`,
  // Product Campaigns
  productCampaignList: '/ecommerce/product-campaigns',
  productCampaignDetail: (id: string) => `/ecommerce/product-campaigns/${id}`,
} as const;

// ---------------------------------------------------------------------------
// Automation
// ---------------------------------------------------------------------------

export const AUTOMATION_ENDPOINTS = {
  dashboard: '/automation/dashboard',
  // Workflows
  workflowList: '/automation/workflows',
  workflowDetail: (id: string) => `/automation/workflows/${id}`,
  workflowLogs: (id: string) => `/automation/workflows/${id}/logs`,
  // Planner
  plannerList: '/automation/planner',
  plannerDetail: (id: string) => `/automation/planner/${id}`,
  // Web Tracking
  webTrackingConfig: '/automation/web-tracking',
  webTrackingEvents: '/automation/web-tracking/events',
  // CRM Sync
  crmSyncConfig: '/automation/crm-sync',
  crmSyncLogs: '/automation/crm-sync/logs',
  crmSyncTrigger: '/automation/crm-sync/trigger',
} as const;

// ---------------------------------------------------------------------------
// Compliance
// ---------------------------------------------------------------------------

export const COMPLIANCE_ENDPOINTS = {
  consentList: '/compliance/consent',
  consentDetail: (id: string) => `/compliance/consent/${id}`,
  gdprRequestList: '/compliance/gdpr',
  gdprRequestDetail: (id: string) => `/compliance/gdpr/${id}`,
  gdprRequestProcess: (id: string) => `/compliance/gdpr/${id}/process`,
  unsubscribeList: '/compliance/unsubscribes',
} as const;

// ---------------------------------------------------------------------------
// Integrations
// ---------------------------------------------------------------------------

export const INTEGRATION_ENDPOINTS = {
  list: '/integrations',
  detail: (id: string) => `/integrations/${id}`,
  connect: (id: string) => `/integrations/${id}/connect`,
  disconnect: (id: string) => `/integrations/${id}/disconnect`,
  sync: (id: string) => `/integrations/${id}/sync`,
} as const;
