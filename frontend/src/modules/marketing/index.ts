// @ts-nocheck
// ============================================================================
// Marketing Module — Barrel Export
// ============================================================================

// Config
export {
  MARKETING_CONFIG,
  FEATURE_FLAGS,
  PRODUCT_SETTINGS,
  DOCUMENT_PREFIXES,
  ROUTES,
} from './config';

export type { FeatureFlag, ProductSettings, RouteKey } from './config';

// Types
export type {
  MarketingProduct,
  LeadSource,
  LeadStage,
  LeadStatus,
  LeadScore,
  LeadActivity,
  Lead,
  ContactPreference,
  ContactTimeline,
  MarketingContact,
  CampaignType,
  CampaignStatus,
  CampaignChannel,
  CampaignMetrics,
  Campaign,
  EmailCampaign,
  SmsCampaign,
  WhatsappCampaign,
  SocialCampaign,
  JourneyNodeType,
  JourneyTrigger,
  JourneyNode,
  JourneyEdge,
  Journey,
  FormFieldType,
  FormField,
  FormTheme,
  FormSubmission,
  SignupForm,
  PageSection,
  PageVariant,
  LandingPage,
  PopupTrigger,
  PopupTargeting,
  Popup,
  AudienceMember,
  AudienceGrowth,
  Audience,
  ConditionOperator,
  SegmentCondition,
  SegmentRule,
  Segment,
  ScoringCriteria,
  ScoringRule,
  ScoreModel,
  LeadStageDefinition,
  StageTransition,
  PlanActivity,
  PlanBudget,
  PlanMilestone,
  MarketingPlan,
  EcommerceStore,
  AbandonedCart,
  CartRecovery,
  PurchaseFollowup,
  ProductCampaign,
  AttributionModel,
  AttributionTouchpoint,
  MarketingAnalytics,
  WorkflowTrigger,
  WorkflowCondition,
  WorkflowAction,
  WorkflowLog,
  Workflow,
  TrackingGoal,
  GoalConversion,
  SmartUrl,
  FieldMapping,
  SyncLog,
  CrmSyncConfig,
  ComplianceRegulation,
  ComplianceStatus,
  ConsentRecord,
  GdprRequest,
  UnsubscribeEntry,
  IntegrationCategory,
  Integration,
  MetricCard,
  ChartData,
  MarketingDashboard,
  ABVariant,
  ABTest,
  SocialAccount,
  SocialPost,
  TemplateCategory,
  EmailTemplate,
  User,
  ApiResponse,
  PaginatedResponse,
  PaginatedRequest,
  RecentModule,
} from './types';

// Stores
export { useMarketingStore } from './stores/marketing-store';
export { useSidebarStore } from './stores/sidebar-store';

// Providers
export { MarketingProvider } from './providers';
export { MarketingQueryProvider } from './providers';

// Layout
export { MarketingShell } from './components/layout/marketing-shell';
export { MarketingSidebar } from './components/layout/marketing-sidebar';
export { MarketingHeader } from './components/layout/marketing-header';
export { ProductSwitcher } from './components/layout/product-switcher';

// Shared
export { MarketingPageShell } from './components/shared/marketing-page-shell';

// API
export { marketingApi, MarketingApiError } from './api';
export {
  CAMPAIGNS_ENDPOINTS,
  LEADS_ENDPOINTS,
  AUDIENCES_ENDPOINTS,
  JOURNEYS_ENDPOINTS,
  ANALYTICS_ENDPOINTS,
  ECOMMERCE_ENDPOINTS,
  AUTOMATION_ENDPOINTS,
  COMPLIANCE_ENDPOINTS,
  INTEGRATION_ENDPOINTS,
} from './api';
