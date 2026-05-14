// @ts-nocheck
// ============================================================================
// CRM Module — Core Barrel Export
// ============================================================================

// Types
export type {
  CrmRecord,
  CrmUser,
  CrmUserRole,
  CrmPreference,
  CrmModuleName,
  PipelineStage,
  Pipeline,
  FieldType,
  LayoutField,
  RelatedList,
  CrmFilter,
  FilterOperator,
  CrmSort,
  OwnershipType,
  SharingRule,
  BulkAction,
  MassUpdateField,
  CrmPagination,
  ApiResponse,
  PaginatedResponse,
  PaginatedRequest,
  CrmStatus,
  Currency,
  TimeUnit,
} from './types';

// Constants
export {
  CRM_MODULES,
  DEFAULT_DEAL_STAGES,
  CRM_SORT_FIELDS,
  CRM_VIEW_MODES,
  OWNERSHIP_TYPES,
  CURRENCY_OPTIONS,
  CRM_EDITIONS,
  CRM_STATUS_COLORS,
  CRM_STATUS_BG_COLORS,
  DEFAULT_PAGE_SIZE,
  PAGE_SIZE_OPTIONS,
  TIME_UNIT_LABELS,
  CRM_SIDEBAR_SECTIONS,
} from './constants';
export type { CrmViewMode, CrmEdition } from './constants';

// Config
export { CRM_CONFIG } from './config';
export type { CrmFeatureFlags } from './config';

// Query Keys
export { crmKeys } from './query-keys';

// Schemas
export {
  CrmIdSchema,
  PaginationSchema,
  SortSchema,
  FilterSchema,
  BulkActionSchema,
  MassUpdateSchema,
  DateRangeSchema,
  TagSchema,
  NoteCreateSchema,
  QuickCreateSchema,
} from './schema';
export type {
  PaginationInput,
  SortInput,
  FilterInput,
  BulkActionInput,
  MassUpdateInput,
  DateRangeInput,
  TagInput,
  NoteCreateInput,
  QuickCreateInput,
} from './schema';

// Utils
export {
  formatCurrency,
  calculateDealValue,
  computeWeightedPipeline,
  computeWinProbability,
  deduplicateRecords,
  parseFullName,
  buildFullName,
  getInitials,
  validateEmailDomain,
  generateRecordUrl,
  getModuleIcon,
  formatRelativeDate,
  formatPercentage,
  formatPhoneNumber,
  truncateText,
  generateSlug,
  isOverdue,
  isStale,
} from './utils';

// Store
export {
  useCrmSidebarStore,
  useCrmPipelinePreferencesStore,
  useCrmListViewPreferencesStore,
  useCrmQuickCreateStore,
  useCrmRecentRecordsStore,
} from './store';

// Hooks
export {
  useCrmModule,
  useCrmSidebar,
  useCrmQuickCreate,
  useCrmRecentRecords,
  useCrmFavorites,
  useCrmTag,
  useCrmSearch,
  useCrmRecord,
  useCrmPipelinePreferences,
  useCrmListViewPreferences,
} from './hooks';

// Providers
export { CrmProvider, CrmQueryProvider } from './providers';

// Error Boundary
export { CrmErrorBoundary } from './error-boundary';
