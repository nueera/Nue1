// ============================================================================
// ERP Common Types
// Shared types used across all ERP products (HRM, Operations, Analytics)
// ============================================================================

// ---------------------------------------------------------------------------
// ERP Product Type
// ---------------------------------------------------------------------------

export type ErpProduct = 'hrm' | 'operations' | 'analytics';

// ---------------------------------------------------------------------------
// Recent Module (for tracking)
// ---------------------------------------------------------------------------

export interface RecentModule {
  slug: string;
  lastVisited: number;
  visitCount: number;
}
