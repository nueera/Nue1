// @ts-nocheck
// ============================================================================
// Marketing Common Types
// Shared types used across all Marketing products (Campaigns, Leads, Audiences,
// Journeys, Analytics, E-Commerce, Automation)
// ============================================================================

// ---------------------------------------------------------------------------
// Marketing Product Type
// ---------------------------------------------------------------------------

export type MarketingProduct = 'campaigns' | 'leads' | 'audiences' | 'journeys' | 'analytics' | 'ecommerce' | 'automation';

// ---------------------------------------------------------------------------
// Lead Types
// ---------------------------------------------------------------------------

export type LeadSource = 'website' | 'social_media' | 'email' | 'referral' | 'paid_ads' | 'organic_search' | 'events' | 'webinar' | 'content_download' | 'chat' | 'phone' | 'partner' | 'other';

export type LeadStage = 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost' | 'nurturing';

export type LeadStatus = 'active' | 'inactive' | 'converted' | 'disqualified' | 'recycled' | 'archived';

export interface LeadScore {
  total: number;
  engagement: number;
  fit: number;
  behavior: number;
  lastUpdated: string;
}

export interface LeadActivity {
  id: string;
  leadId: string;
  type: 'email_open' | 'email_click' | 'page_visit' | 'form_submit' | 'download' | 'event_attend' | 'social_engage' | 'call' | 'meeting' | 'note';
  description: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  jobTitle?: string;
  source: LeadSource;
  stage: LeadStage;
  status: LeadStatus;
  score: LeadScore;
  assignedTo?: string;
  tags: string[];
  activities: LeadActivity[];
  createdAt: string;
  updatedAt: string;
  lastContactedAt?: string;
  notes?: string;
  customFields?: Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// Marketing Contact Types
// ---------------------------------------------------------------------------

export type ContactPreference = 'email' | 'sms' | 'whatsapp' | 'phone' | 'none';

export interface ContactTimeline {
  id: string;
  type: 'email_sent' | 'email_opened' | 'email_clicked' | 'sms_sent' | 'form_submitted' | 'page_visited' | 'purchase' | 'support_ticket' | 'meeting_booked';
  description: string;
  timestamp: string;
  campaignId?: string;
}

export interface MarketingContact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  jobTitle?: string;
  avatar?: string;
  preferences: ContactPreference[];
  timeline: ContactTimeline[];
  tags: string[];
  leadId?: string;
  subscribedAt: string;
  unsubscribedAt?: string;
  bounceCount: number;
  lastEngagedAt?: string;
  customFields?: Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// Campaign Types
// ---------------------------------------------------------------------------

export type CampaignType = 'email' | 'sms' | 'whatsapp' | 'social' | 'multi_channel';

export type CampaignStatus = 'draft' | 'scheduled' | 'sending' | 'active' | 'paused' | 'completed' | 'archived';

export type CampaignChannel = 'email' | 'sms' | 'whatsapp' | 'facebook' | 'instagram' | 'linkedin' | 'twitter' | 'google_ads' | 'web_push';

export interface CampaignMetrics {
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  bounced: number;
  unsubscribed: number;
  complained: number;
  converted: number;
  revenue: number;
}

export interface Campaign {
  id: string;
  name: string;
  type: CampaignType;
  channel: CampaignChannel;
  status: CampaignStatus;
  subject?: string;
  previewText?: string;
  fromName: string;
  fromEmail?: string;
  audienceId?: string;
  segmentId?: string;
  metrics: CampaignMetrics;
  scheduledAt?: string;
  sentAt?: string;
  completedAt?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

// ---------------------------------------------------------------------------
// Email Campaign
// ---------------------------------------------------------------------------

export interface EmailCampaign extends Campaign {
  type: 'email';
  subject: string;
  preheader?: string;
  templateId?: string;
  contentHtml?: string;
  contentText?: string;
  replyToEmail?: string;
  attachments?: string[];
}

// ---------------------------------------------------------------------------
// SMS Campaign
// ---------------------------------------------------------------------------

export interface SmsCampaign extends Campaign {
  type: 'sms';
  message: string;
  senderId?: string;
  shortLink?: string;
  optOutMessage?: string;
}

// ---------------------------------------------------------------------------
// WhatsApp Campaign
// ---------------------------------------------------------------------------

export interface WhatsappCampaign extends Campaign {
  type: 'whatsapp';
  templateName: string;
  templateLanguage: string;
  headerText?: string;
  bodyText: string;
  footerText?: string;
  buttonActions?: string[];
  mediaUrl?: string;
}

// ---------------------------------------------------------------------------
// Social Campaign
// ---------------------------------------------------------------------------

export interface SocialCampaign extends Campaign {
  type: 'social';
  platform: 'facebook' | 'instagram' | 'linkedin' | 'twitter';
  postContent: string;
  mediaUrls: string[];
  targetAudience?: string;
  budget?: number;
  impressions?: number;
  engagement?: number;
}

// ---------------------------------------------------------------------------
// Journey Types
// ---------------------------------------------------------------------------

export type JourneyNodeType = 'trigger' | 'delay' | 'email' | 'sms' | 'whatsapp' | 'condition' | 'action' | 'exit' | 'webhook' | 'update_field' | 'add_to_list' | 'remove_from_list' | 'score' | 'notification';

export type JourneyTrigger = 'list_entry' | 'form_submit' | 'page_visit' | 'email_open' | 'email_click' | 'purchase' | 'custom_event' | 'date_based' | 'score_threshold' | 'api_call' | 'field_change';

export interface JourneyNode {
  id: string;
  type: JourneyNodeType;
  label: string;
  config: Record<string, unknown>;
  position: { x: number; y: number };
}

export interface JourneyEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  label?: string;
  condition?: string;
}

export interface Journey {
  id: string;
  name: string;
  description?: string;
  trigger: JourneyTrigger;
  triggerConfig: Record<string, unknown>;
  nodes: JourneyNode[];
  edges: JourneyEdge[];
  status: 'draft' | 'active' | 'paused' | 'completed' | 'archived';
  enrolledCount: number;
  activeCount: number;
  completedCount: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// Signup Form Types
// ---------------------------------------------------------------------------

export type FormFieldType = 'text' | 'email' | 'phone' | 'number' | 'select' | 'radio' | 'checkbox' | 'textarea' | 'date' | 'url' | 'hidden' | 'consent';

export interface FormField {
  id: string;
  type: FormFieldType;
  label: string;
  name: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  defaultValue?: string;
  helpText?: string;
  order: number;
}

export type FormTheme = 'minimal' | 'card' | 'full' | 'popup' | 'slide_in' | 'floating_bar';

export interface FormSubmission {
  id: string;
  formId: string;
  data: Record<string, string>;
  contactId?: string;
  leadId?: string;
  ipAddress?: string;
  userAgent?: string;
  submittedAt: string;
}

export interface SignupForm {
  id: string;
  name: string;
  fields: FormField[];
  theme: FormTheme;
  submitButtonText: string;
  successMessage: string;
  redirectUrl?: string;
  doubleOptIn: boolean;
  tags: string[];
  submissions: number;
  conversionRate: number;
  status: 'active' | 'inactive' | 'draft';
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// Landing Page Types
// ---------------------------------------------------------------------------

export type PageSection = 'hero' | 'features' | 'testimonials' | 'pricing' | 'cta' | 'faq' | 'form' | 'video' | 'gallery' | 'stats' | 'custom';

export interface PageVariant {
  id: string;
  name: string;
  sections: PageSection[];
  views: number;
  conversions: number;
  conversionRate: number;
  isControl: boolean;
}

export interface LandingPage {
  id: string;
  name: string;
  slug: string;
  url: string;
  sections: PageSection[];
  variants: PageVariant[];
  totalViews: number;
  totalConversions: number;
  conversionRate: number;
  status: 'published' | 'draft' | 'archived';
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// Popup Types
// ---------------------------------------------------------------------------

export type PopupTrigger = 'time_on_page' | 'scroll_percentage' | 'exit_intent' | 'click_element' | 'page_load' | 'inactivity' | 'manual';

export type PopupTargeting = 'all_visitors' | 'new_visitors' | 'returning_visitors' | 'specific_pages' | 'specific_segments' | 'geo_location' | 'device_type' | 'utm_source';

export interface Popup {
  id: string;
  name: string;
  type: 'popup' | 'slide_in' | 'floating_bar' | 'full_screen' | 'sticky_bar';
  trigger: PopupTrigger;
  triggerConfig: Record<string, unknown>;
  targeting: PopupTargeting[];
  targetingConfig: Record<string, unknown>;
  views: number;
  conversions: number;
  conversionRate: number;
  status: 'active' | 'inactive' | 'draft';
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// Audience Types
// ---------------------------------------------------------------------------

export interface AudienceMember {
  id: string;
  contactId: string;
  addedAt: string;
  source: string;
  status: 'subscribed' | 'unsubscribed' | 'bounced' | 'complained';
}

export interface AudienceGrowth {
  date: string;
  added: number;
  removed: number;
  total: number;
}

export interface Audience {
  id: string;
  name: string;
  description?: string;
  memberCount: number;
  activeCount: number;
  growth: AudienceGrowth[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// Segment Types
// ---------------------------------------------------------------------------

export type ConditionOperator = 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'starts_with' | 'ends_with' | 'greater_than' | 'less_than' | 'between' | 'in' | 'not_in' | 'is_set' | 'is_not_set' | 'before' | 'after' | 'within_last' | 'within_next';

export interface SegmentCondition {
  id: string;
  field: string;
  operator: ConditionOperator;
  value: string | number | boolean;
  logicalOperator: 'and' | 'or';
}

export interface SegmentRule {
  id: string;
  name: string;
  conditions: SegmentCondition[];
}

export interface Segment {
  id: string;
  name: string;
  description?: string;
  rules: SegmentRule[];
  memberCount: number;
  isDynamic: boolean;
  lastEvaluatedAt?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// Scoring Types
// ---------------------------------------------------------------------------

export type ScoringCriteria = 'email_engagement' | 'web_activity' | 'social_engagement' | 'demographic_fit' | 'behavioral' | 'custom';

export interface ScoringRule {
  id: string;
  name: string;
  criteria: ScoringCriteria;
  condition: string;
  points: number;
  isPositive: boolean;
  isActive: boolean;
}

export interface ScoreModel {
  id: string;
  name: string;
  rules: ScoringRule[];
  maxScore: number;
  decayDays: number;
  isActive: boolean;
}

// ---------------------------------------------------------------------------
// Lead Stage / Pipeline Types
// ---------------------------------------------------------------------------

export interface LeadStageDefinition {
  id: string;
  name: string;
  order: number;
  color: string;
  probability: number;
  isDefault: boolean;
}

export interface StageTransition {
  id: string;
  leadId: string;
  fromStage: string;
  toStage: string;
  reason?: string;
  timestamp: string;
  performedBy: string;
}

// ---------------------------------------------------------------------------
// Marketing Plan Types
// ---------------------------------------------------------------------------

export type PlanActivity = 'campaign' | 'content' | 'event' | 'social_post' | 'ad_spend' | 'review' | 'meeting' | 'deadline';

export interface PlanBudget {
  allocated: number;
  spent: number;
  remaining: number;
  currency: string;
}

export interface PlanMilestone {
  id: string;
  name: string;
  dueDate: string;
  completed: boolean;
  completedAt?: string;
}

export interface MarketingPlan {
  id: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  activities: PlanActivity[];
  budget: PlanBudget;
  milestones: PlanMilestone[];
  status: 'planning' | 'active' | 'completed' | 'on_hold' | 'cancelled';
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// E-Commerce Types
// ---------------------------------------------------------------------------

export interface EcommerceStore {
  id: string;
  name: string;
  platform: 'shopify' | 'woocommerce' | 'magento' | 'bigcommerce' | 'custom';
  domain: string;
  currency: string;
  productCount: number;
  orderCount: number;
  revenue: number;
  connectedAt: string;
  status: 'connected' | 'disconnected' | 'error';
}

export interface AbandonedCart {
  id: string;
  contactId: string;
  storeId: string;
  items: { productId: string; name: string; quantity: number; price: number }[];
  total: number;
  currency: string;
  abandonedAt: string;
  recoveredAt?: string;
  recoveryEmailSent: boolean;
  recoverySmsSent: boolean;
  status: 'active' | 'recovered' | 'expired';
}

export interface CartRecovery {
  id: string;
  cartId: string;
  type: 'email' | 'sms' | 'push';
  sentAt: string;
  openedAt?: string;
  clickedAt?: string;
  convertedAt?: string;
  revenue?: number;
}

export interface PurchaseFollowup {
  id: string;
  name: string;
  triggerEvent: 'purchase' | 'delivery' | 'review_request' | 'cross_sell' | 'upsell';
  templateId: string;
  delayDays: number;
  status: 'active' | 'inactive';
  sentCount: number;
  conversionRate: number;
}

export interface ProductCampaign {
  id: string;
  name: string;
  productId: string;
  type: 'launch' | 'promotion' | 'clearance' | 'featured' | 'bundle';
  startDate: string;
  endDate: string;
  discount?: number;
  status: 'draft' | 'active' | 'completed' | 'cancelled';
  metrics: CampaignMetrics;
}

// ---------------------------------------------------------------------------
// Analytics Types
// ---------------------------------------------------------------------------

export type AttributionModel = 'first_touch' | 'last_touch' | 'linear' | 'time_decay' | 'u_shaped' | 'w_shaped' | 'custom';

export interface AttributionTouchpoint {
  id: string;
  campaignId: string;
  channel: CampaignChannel;
  touchDate: string;
  weight: number;
  revenue: number;
}

export interface MarketingAnalytics {
  period: string;
  startDate: string;
  endDate: string;
  totalSent: number;
  totalDelivered: number;
  totalOpened: number;
  totalClicked: number;
  totalConverted: number;
  totalRevenue: number;
  openRate: number;
  clickRate: number;
  conversionRate: number;
  bounceRate: number;
  unsubscribeRate: number;
  byChannel: Record<CampaignChannel, { sent: number; opened: number; clicked: number; converted: number; revenue: number }>;
}

// ---------------------------------------------------------------------------
// Workflow Types
// ---------------------------------------------------------------------------

export type WorkflowTrigger = 'form_submitted' | 'link_clicked' | 'page_visited' | 'list_joined' | 'tag_added' | 'field_changed' | 'score_threshold' | 'date_reached' | 'api_call' | 'manual';

export type WorkflowCondition = 'has_tag' | 'in_list' | 'field_value' | 'score_range' | 'activity_count' | 'time_since' | 'device_type' | 'geo_location' | 'utm_param';

export type WorkflowAction = 'send_email' | 'send_sms' | 'add_tag' | 'remove_tag' | 'add_to_list' | 'remove_from_list' | 'update_field' | 'notify_user' | 'create_task' | 'webhook' | 'wait' | 'score_adjust' | 'send_whatsapp';

export interface WorkflowLog {
  id: string;
  workflowId: string;
  contactId: string;
  action: WorkflowAction;
  status: 'success' | 'failed' | 'skipped';
  executedAt: string;
  error?: string;
}

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  trigger: WorkflowTrigger;
  triggerConfig: Record<string, unknown>;
  conditions: WorkflowCondition[];
  actions: { type: WorkflowAction; config: Record<string, unknown>; order: number }[];
  status: 'active' | 'inactive' | 'draft';
  executionCount: number;
  lastExecutedAt?: string;
  logs: WorkflowLog[];
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// Smart URL / Tracking Types
// ---------------------------------------------------------------------------

export interface TrackingGoal {
  id: string;
  name: string;
  type: 'page_visit' | 'purchase' | 'form_submit' | 'custom_event';
  targetUrl?: string;
  value: number;
  conversions: number;
  conversionRate: number;
}

export interface GoalConversion {
  id: string;
  goalId: string;
  contactId?: string;
  value: number;
  attributedCampaignId?: string;
  convertedAt: string;
}

export interface SmartUrl {
  id: string;
  name: string;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  goals: TrackingGoal[];
  clicks: number;
  uniqueClicks: number;
  conversions: number;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  expiresAt?: string;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// CRM Sync Types
// ---------------------------------------------------------------------------

export interface FieldMapping {
  marketingField: string;
  crmField: string;
  direction: 'marketing_to_crm' | 'crm_to_marketing' | 'bidirectional';
}

export interface SyncLog {
  id: string;
  timestamp: string;
  recordsSynced: number;
  errors: number;
  direction: string;
  status: 'success' | 'partial' | 'failed';
}

export interface CrmSyncConfig {
  id: string;
  crmType: 'salesforce' | 'hubspot' | 'pipedrive' | 'zoho' | 'dynamics' | 'custom';
  enabled: boolean;
  fieldMappings: FieldMapping[];
  syncFrequency: 'realtime' | 'hourly' | 'daily' | 'manual';
  lastSyncAt?: string;
  syncLogs: SyncLog[];
}

// ---------------------------------------------------------------------------
// Compliance / GDPR Types
// ---------------------------------------------------------------------------

export type ComplianceRegulation = 'gdpr' | 'ccpa' | 'can_spam' | 'casl' | 'lgpd' | 'popia';

export type ComplianceStatus = 'compliant' | 'warning' | 'non_compliant' | 'not_assessed';

export interface ConsentRecord {
  id: string;
  contactId: string;
  type: 'email' | 'sms' | 'whatsapp' | 'phone' | 'tracking' | 'marketing' | 'third_party';
  granted: boolean;
  source: string;
  ipAddress?: string;
  timestamp: string;
  expiresAt?: string;
}

export interface GdprRequest {
  id: string;
  contactId: string;
  type: 'access' | 'deletion' | 'portability' | 'rectification' | 'objection' | 'restriction';
  status: 'pending' | 'processing' | 'completed' | 'rejected';
  requestedAt: string;
  completedAt?: string;
  notes?: string;
}

export interface UnsubscribeEntry {
  id: string;
  contactId: string;
  channel: 'email' | 'sms' | 'whatsapp' | 'all';
  reason?: string;
  timestamp: string;
}

// ---------------------------------------------------------------------------
// Integration Types
// ---------------------------------------------------------------------------

export type IntegrationCategory = 'crm' | 'analytics' | 'advertising' | 'social_media' | 'ecommerce' | 'content' | 'communication' | 'data' | 'automation';

export interface Integration {
  id: string;
  name: string;
  category: IntegrationCategory;
  icon?: string;
  description: string;
  status: 'connected' | 'disconnected' | 'error' | 'pending';
  connectedAt?: string;
  lastSyncAt?: string;
  config: Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// Dashboard / Chart Types
// ---------------------------------------------------------------------------

export interface MetricCard {
  id: string;
  label: string;
  value: number | string;
  change?: number;
  changeLabel?: string;
  format: 'number' | 'currency' | 'percentage' | 'duration';
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    color?: string;
  }[];
}

export interface MarketingDashboard {
  period: string;
  metrics: MetricCard[];
  charts: {
    campaignPerformance: ChartData;
    leadTrends: ChartData;
    channelDistribution: ChartData;
    revenueByCampaign: ChartData;
    audienceGrowth: ChartData;
  };
}

// ---------------------------------------------------------------------------
// A/B Test Types
// ---------------------------------------------------------------------------

export interface ABVariant {
  id: string;
  name: string;
  description?: string;
  trafficPercent: number;
  impressions: number;
  conversions: number;
  conversionRate: number;
  isControl: boolean;
  isWinner: boolean;
}

export interface ABTest {
  id: string;
  name: string;
  type: 'subject_line' | 'content' | 'cta' | 'send_time' | 'from_name' | 'design';
  campaignId?: string;
  variants: ABVariant[];
  status: 'draft' | 'running' | 'completed' | 'paused';
  confidenceLevel: number;
  startDate: string;
  endDate?: string;
  winningVariantId?: string;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Social Account Types
// ---------------------------------------------------------------------------

export interface SocialAccount {
  id: string;
  platform: 'facebook' | 'instagram' | 'linkedin' | 'twitter' | 'tiktok' | 'youtube';
  accountName: string;
  accountId: string;
  followers: number;
  connectedAt: string;
  status: 'connected' | 'disconnected' | 'expired';
  accessToken?: string;
}

export interface SocialPost {
  id: string;
  accountId: string;
  platform: SocialAccount['platform'];
  content: string;
  mediaUrls?: string[];
  scheduledAt?: string;
  publishedAt?: string;
  likes: number;
  comments: number;
  shares: number;
  impressions: number;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
}

// ---------------------------------------------------------------------------
// Template Types
// ---------------------------------------------------------------------------

export interface TemplateCategory {
  id: string;
  name: string;
  icon?: string;
  count: number;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  preheader?: string;
  contentHtml: string;
  contentText?: string;
  category: string;
  thumbnail?: string;
  tags: string[];
  usageCount: number;
  status: 'active' | 'archived' | 'draft';
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// Shared Types (same as Finance)
// ---------------------------------------------------------------------------

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface PaginatedRequest {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface RecentModule {
  slug: string;
  lastVisited: number;
  visitCount: number;
}
