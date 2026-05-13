// ============================================================================
// CRM Module — Configuration
// ============================================================================

import type { CrmEdition } from './types';

export const CRM_CONFIG = {
  apiBase: process.env.NEXT_PUBLIC_CRM_API_URL || '/api/crm',
  edition: (process.env.NEXT_PUBLIC_CRM_EDITION || 'professional') as CrmEdition,

  pagination: {
    defaultPageSize: 25,
    maxPageSize: 100,
    pageSizeOptions: [10, 25, 50, 100],
  },

  rateLimits: {
    api: { window: 60000, max: 100 },
    search: { window: 60000, max: 60 },
    import: { window: 300000, max: 5 },
    export: { window: 300000, max: 10 },
  },

  features: {
    free: {
      leads: true, contacts: true, accounts: true, deals: true,
      activities: true, calendar: true, email: false, social: false,
      sms: false, salesiq: false, omniChannel: false,
      quotes: false, salesOrders: false, invoices: false,
      purchaseOrders: false, products: true, priceBooks: false,
      vendors: false, cases: true, cpq: false,
      workflows: false, blueprint: false, cadences: false,
      pageLayouts: false, journeyOrchestration: false,
      zia: false, territories: false, teams: false,
      rolesProfiles: false, reports: true, dashboards: true,
      forecasting: false, customerAnalytics: false, pipelineAnalytics: false,
      customModules: false, canvas: false, clientScripts: false,
      functions: false, widgets: false, apis: false,
      sandbox: false, portals: false,
      maxRecords: 5000, maxUsers: 3, storageGB: 1,
    },
    standard: {
      leads: true, contacts: true, accounts: true, deals: true,
      activities: true, calendar: true, email: true, social: true,
      sms: false, salesiq: false, omniChannel: false,
      quotes: true, salesOrders: true, invoices: true,
      purchaseOrders: false, products: true, priceBooks: true,
      vendors: true, cases: true, cpq: false,
      workflows: true, blueprint: false, cadences: false,
      pageLayouts: false, journeyOrchestration: false,
      zia: true, territories: false, teams: true,
      rolesProfiles: false, reports: true, dashboards: true,
      forecasting: true, customerAnalytics: false, pipelineAnalytics: true,
      customModules: false, canvas: false, clientScripts: false,
      functions: false, widgets: false, apis: false,
      sandbox: false, portals: false,
      maxRecords: 100000, maxUsers: 15, storageGB: 5,
    },
    professional: {
      leads: true, contacts: true, accounts: true, deals: true,
      activities: true, calendar: true, email: true, social: true,
      sms: true, salesiq: true, omniChannel: false,
      quotes: true, salesOrders: true, invoices: true,
      purchaseOrders: true, products: true, priceBooks: true,
      vendors: true, cases: true, cpq: true,
      workflows: true, blueprint: true, cadences: true,
      pageLayouts: true, journeyOrchestration: false,
      zia: true, territories: true, teams: true,
      rolesProfiles: true, reports: true, dashboards: true,
      forecasting: true, customerAnalytics: true, pipelineAnalytics: true,
      customModules: true, canvas: true, clientScripts: false,
      functions: false, widgets: true, apis: false,
      sandbox: false, portals: false,
      maxRecords: 500000, maxUsers: 50, storageGB: 20,
    },
    enterprise: {
      leads: true, contacts: true, accounts: true, deals: true,
      activities: true, calendar: true, email: true, social: true,
      sms: true, salesiq: true, omniChannel: true,
      quotes: true, salesOrders: true, invoices: true,
      purchaseOrders: true, products: true, priceBooks: true,
      vendors: true, cases: true, cpq: true,
      workflows: true, blueprint: true, cadences: true,
      pageLayouts: true, journeyOrchestration: true,
      zia: true, territories: true, teams: true,
      rolesProfiles: true, reports: true, dashboards: true,
      forecasting: true, customerAnalytics: true, pipelineAnalytics: true,
      customModules: true, canvas: true, clientScripts: true,
      functions: true, widgets: true, apis: true,
      sandbox: true, portals: true,
      maxRecords: Infinity, maxUsers: Infinity, storageGB: 100,
    },
  },

  zia: {
    endpoints: {
      chat: '/zia/chat',
      predictions: '/zia/predictions',
      forecasts: '/zia/forecasts',
      enrichment: '/zia/enrichment',
      anomalies: '/zia/anomalies',
      recommendations: '/zia/recommendations',
      sentiment: '/zia/sentiment',
    },
  },
} as const;

export type CrmFeatureFlags = typeof CRM_CONFIG.features[CrmEdition];
