// @ts-nocheck
// ============================================================================
// Marketing Module Configuration
// Feature flags, module settings, and product configuration
// ============================================================================

import type { MarketingProduct } from '../types';

// ---------------------------------------------------------------------------
// Module Config
// ---------------------------------------------------------------------------

export const MARKETING_CONFIG = {
  name: 'NueMarketing',
  version: '1.0.0',
  products: [
    'campaigns',
    'leads',
    'audiences',
    'journeys',
    'analytics',
    'ecommerce',
    'automation',
  ] as const,
  defaultProduct: 'campaigns' as MarketingProduct,
  defaultCurrency: 'USD',
  moduleId: 'marketing',
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
} as const;

// ---------------------------------------------------------------------------
// Feature Flags
// ---------------------------------------------------------------------------

export const FEATURE_FLAGS = {
  // Campaigns
  campaignsEmail: true,
  campaignsSms: true,
  campaignsWhatsapp: true,
  campaignsSocial: true,
  campaignsTemplates: true,
  campaignsAbTesting: true,

  // Leads
  leadsScoring: true,
  leadsStages: true,
  leadsPipeline: true,
  leadsAutoAssignment: true,
  leadsDuplicateDetection: true,

  // Audiences
  audiencesSegments: true,
  audiencesSignupForms: true,
  audiencesDynamicSegments: true,
  audiencesImport: true,

  // Journeys
  journeysVisualBuilder: true,
  journeysTemplates: true,
  journeysWorkflows: true,
  journeysTriggers: true,

  // Analytics
  analyticsCampaignReports: true,
  analyticsAttribution: true,
  analyticsWebAnalytics: true,
  analyticsSmartUrls: true,
  analyticsGoals: true,
  analyticsAbTesting: true,

  // E-Commerce
  ecommerceStores: true,
  ecommerceAbandonedCarts: true,
  ecommercePurchaseFollowup: true,
  ecommerceProductCampaigns: true,

  // Automation
  automationWorkflows: true,
  automationPlanner: true,
  automationWebTracking: true,
  automationCrmSync: true,

  // Cross-product
  gdprCompliance: true,
  consentManagement: true,
  unsubscribeManagement: true,
  emailVerification: true,
  auditTrail: true,
  csvExport: true,
  pdfExport: true,
  multiBrand: false,
} as const;

export type FeatureFlag = keyof typeof FEATURE_FLAGS;

// ---------------------------------------------------------------------------
// Per-product settings
// ---------------------------------------------------------------------------

export interface ProductSettings {
  product: MarketingProduct;
  enabled: boolean;
  prefix: string; // Document number prefix
  defaultChannel: string;
  defaultSenderName: string;
}

export const PRODUCT_SETTINGS: Record<MarketingProduct, ProductSettings> = {
  campaigns: {
    product: 'campaigns',
    enabled: true,
    prefix: 'CAMP-',
    defaultChannel: 'email',
    defaultSenderName: 'Marketing Team',
  },
  leads: {
    product: 'leads',
    enabled: true,
    prefix: 'LD-',
    defaultChannel: 'web',
    defaultSenderName: 'Sales Team',
  },
  audiences: {
    product: 'audiences',
    enabled: true,
    prefix: 'AUD-',
    defaultChannel: 'email',
    defaultSenderName: 'Marketing Team',
  },
  journeys: {
    product: 'journeys',
    enabled: true,
    prefix: 'JRN-',
    defaultChannel: 'multi',
    defaultSenderName: 'Automation',
  },
  analytics: {
    product: 'analytics',
    enabled: true,
    prefix: 'RPT-',
    defaultChannel: 'web',
    defaultSenderName: 'Analytics',
  },
  ecommerce: {
    product: 'ecommerce',
    enabled: true,
    prefix: 'ECM-',
    defaultChannel: 'email',
    defaultSenderName: 'Store',
  },
  automation: {
    product: 'automation',
    enabled: true,
    prefix: 'WF-',
    defaultChannel: 'multi',
    defaultSenderName: 'Automation',
  },
};

// ---------------------------------------------------------------------------
// Document number prefixes per entity type
// ---------------------------------------------------------------------------

export const DOCUMENT_PREFIXES = {
  campaign: 'CAMP-',
  lead: 'LD-',
  contact: 'CT-',
  journey: 'JRN-',
  signupForm: 'FRM-',
  landingPage: 'LP-',
  popup: 'POP-',
  audience: 'AUD-',
  segment: 'SEG-',
  scoringRule: 'SCR-',
  stage: 'STG-',
  marketingPlan: 'PLN-',
  ecommerceStore: 'STR-',
  abandonedCart: 'CART-',
  workflow: 'WF-',
  smartUrl: 'URL-',
  trackingGoal: 'GOAL-',
  abTest: 'AB-',
  socialAccount: 'SOC-',
  template: 'TPL-',
} as const;

// ---------------------------------------------------------------------------
// Route base paths
// ---------------------------------------------------------------------------

export const ROUTES = {
  base: '/marketing',
  campaigns: '/marketing/campaigns',
  leads: '/marketing/leads',
  audiences: '/marketing/audiences',
  journeys: '/marketing/journeys',
  analytics: '/marketing/analytics',
  ecommerce: '/marketing/ecommerce',
  automation: '/marketing/automation',
} as const;

export type RouteKey = keyof typeof ROUTES;
