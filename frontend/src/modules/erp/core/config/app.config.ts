// ============================================================================
// ERP Module Configuration
// Feature flags, module settings, and product configuration
// ============================================================================

import type { ErpProduct } from '../../types';

// ---------------------------------------------------------------------------
// Module Config
// ---------------------------------------------------------------------------

export const APP_CONFIG = {
  name: 'NueERP',
  version: '1.0.0',
  products: [
    'hrm',
    'operations',
    'analytics',
  ] as const,
  defaultProduct: 'hrm' as ErpProduct,
  moduleId: 'erp',
  env: process.env.NODE_ENV,
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
} as const;

// ---------------------------------------------------------------------------
// Route base paths
// ---------------------------------------------------------------------------

export const ROUTES = {
  base: '/erp',
  hrm: '/erp/hrm',
  operations: '/erp/operations',
  analytics: '/erp/analytics',
} as const;

export type RouteKey = keyof typeof ROUTES;
