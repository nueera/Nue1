// @ts-nocheck
// ============================================================================
// CRM Module — Shared Types
// ============================================================================

// --- Base CRM Types ---

export interface CrmRecord {
  id: string;
  createdAt: string;
  updatedAt: string;
  owner: string;
  modifiedBy: string;
  tags?: string[];
}

export interface CrmUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: CrmUserRole;
  department?: string;
}

export type CrmUserRole = 'admin' | 'manager' | 'sales-rep' | 'marketing' | 'support' | 'viewer';

export interface CrmPreference {
  id: string;
  userId: string;
  defaultModule: CrmModuleName;
  defaultView: 'list' | 'pipeline' | 'card';
  defaultPipeline?: string;
  recordsPerPage: number;
  timezone: string;
  currency: string;
  dateFormat: string;
}

// --- CRM Module Names ---

export type CrmModuleName =
  | 'leads'
  | 'contacts'
  | 'accounts'
  | 'deals'
  | 'activities'
  | 'calendar'
  | 'email'
  | 'social'
  | 'sms'
  | 'salesiq'
  | 'omni-channel'
  | 'quotes'
  | 'sales-orders'
  | 'invoices'
  | 'purchase-orders'
  | 'products'
  | 'price-books'
  | 'vendors'
  | 'cases'
  | 'cpq'
  | 'workflows'
  | 'blueprint'
  | 'cadences'
  | 'page-layouts'
  | 'journey-orchestration'
  | 'zia'
  | 'territories'
  | 'teams'
  | 'roles-profiles'
  | 'reports'
  | 'dashboards'
  | 'forecasting'
  | 'customer-analytics'
  | 'pipeline-analytics'
  | 'custom-modules'
  | 'canvas'
  | 'client-scripts'
  | 'functions'
  | 'widgets'
  | 'apis'
  | 'sandbox'
  | 'portals'
  | 'notes'
  | 'attachments'
  | 'tags'
  | 'search'
  | 'import'
  | 'settings'
  | 'quick-create';

// --- Pipeline Types ---

export interface PipelineStage {
  id: string;
  name: string;
  probability: number;
  order: number;
  color: string;
}

export interface Pipeline {
  id: string;
  name: string;
  stages: PipelineStage[];
  isDefault: boolean;
}

// --- Field & Layout Types ---

export type FieldType =
  | 'text' | 'email' | 'phone' | 'url' | 'number' | 'currency'
  | 'date' | 'datetime' | 'time' | 'boolean' | 'select' | 'multiselect'
  | 'lookup' | 'textarea' | 'richtext' | 'file' | 'image'
  | 'formula' | 'auto-number' | 'picklist';

export interface LayoutField {
  id: string;
  name: string;
  label: string;
  type: FieldType;
  required: boolean;
  readonly: boolean;
  visible: boolean;
  defaultValue?: unknown;
  options?: { label: string; value: string }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}

export interface RelatedList {
  id: string;
  module: CrmModuleName;
  label: string;
  fields: string[];
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  filter?: Record<string, unknown>;
}

// --- Filter & Sort Types ---

export interface CrmFilter {
  field: string;
  operator: FilterOperator;
  value: unknown;
}

export type FilterOperator =
  | 'equals' | 'not_equals' | 'contains' | 'not_contains'
  | 'starts_with' | 'ends_with' | 'greater_than' | 'less_than'
  | 'greater_or_equal' | 'less_or_equal' | 'between' | 'in'
  | 'not_in' | 'is_empty' | 'is_not_empty';

export interface CrmSort {
  field: string;
  order: 'asc' | 'desc';
}

// --- Ownership & Sharing ---

export type OwnershipType = 'private' | 'public-read' | 'public-read-write' | 'read-only';

export interface SharingRule {
  id: string;
  name: string;
  fromModule: CrmModuleName;
  toModule: CrmModuleName;
  basedOn: 'role' | 'role-subordinates' | 'territory' | 'group';
  accessLevel: 'read' | 'read-write';
}

// --- Bulk Action Types ---

export interface BulkAction {
  type: 'update' | 'delete' | 'assign' | 'merge' | 'export';
  recordIds: string[];
  data?: Record<string, unknown>;
}

export interface MassUpdateField {
  field: string;
  value: unknown;
}

// --- Pagination ---

export interface CrmPagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

// --- API Response Types (re-export from ERP core for convenience) ---

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: CrmPagination;
}

export interface PaginatedRequest {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: CrmFilter[];
}

// --- Common Enums ---

export type CrmStatus = 'active' | 'inactive' | 'draft' | 'archived';
export type Currency = 'USD' | 'EUR' | 'GBP' | 'INR' | 'AUD' | 'CAD' | 'SGD';
export type TimeUnit = 'minutes' | 'hours' | 'days' | 'weeks' | 'months';
