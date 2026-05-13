// ============================================================================
// Marketing Constants — Barrel Export
// ============================================================================

export {
  LEAD_SOURCE_CONFIG,
  LEAD_STAGE_CONFIG,
  LEAD_STATUS_CONFIG,
  LEAD_SCORE_RANGES,
  LEAD_ACTIVITY_TYPES,
} from './lead-constants';

export {
  CAMPAIGN_TYPE_CONFIG,
  CAMPAIGN_STATUS_CONFIG,
  CAMPAIGN_CHANNEL_CONFIG,
  CAMPAIGN_BENCHMARKS,
  EMAIL_SEND_LIMITS,
  SMS_LIMITS,
} from './campaign-constants';

export {
  JOURNEY_NODE_TYPE_CONFIG,
  JOURNEY_TRIGGER_CONFIG,
  JOURNEY_STATUS_CONFIG,
  DELAY_OPTIONS,
} from './journey-constants';

export {
  FORM_FIELD_TYPE_CONFIG,
  FORM_THEME_CONFIG,
  FORM_STATUS_CONFIG,
  DEFAULT_FORM_FIELDS,
} from './form-constants';

export {
  POPUP_TRIGGER_CONFIG,
  POPUP_TARGETING_CONFIG,
  POPUP_TYPE_CONFIG,
  POPUP_FREQUENCY_OPTIONS,
} from './popup-constants';

export {
  CONDITION_OPERATOR_CONFIG,
  SEGMENT_FIELD_CATEGORIES,
  SEGMENT_TYPE_OPTIONS,
  LOGICAL_OPERATORS,
} from './segment-constants';

export {
  SCORING_CRITERIA_CONFIG,
  DEFAULT_SCORING_RULES,
  SCORE_DECAY_OPTIONS,
  SCORE_RANGE_LABELS,
} from './scoring-constants';

export {
  PLAN_ACTIVITY_CONFIG,
  PLAN_STATUS_CONFIG,
  BUDGET_CATEGORIES,
  PLAN_RECURRENCE_OPTIONS,
} from './planner-constants';

export {
  STORE_PLATFORM_CONFIG,
  CART_STATUS_CONFIG,
  FOLLOWUP_TRIGGER_CONFIG,
  PRODUCT_CAMPAIGN_TYPE_CONFIG,
  CART_RECOVERY_TIMING,
} from './ecommerce-constants';

export {
  COMPLIANCE_REGULATION_CONFIG,
  COMPLIANCE_STATUS_CONFIG,
  CONSENT_TYPE_CONFIG,
  GDPR_REQUEST_TYPE_CONFIG,
  GDPR_REQUEST_STATUS_CONFIG,
  UNSUBSCRIBE_REASONS,
} from './compliance-constants';

export {
  INTEGRATION_CATEGORY_CONFIG,
  INTEGRATION_STATUS_CONFIG,
  SUPPORTED_CRM_INTEGRATIONS,
  SUPPORTED_ECOMMERCE_INTEGRATIONS,
  SYNC_FREQUENCY_OPTIONS,
  SYNC_DIRECTION_OPTIONS,
} from './integration-constants';

export {
  PRODUCT_NAV_CONFIGS,
  PRODUCT_LABELS,
  PRODUCT_DESCRIPTIONS,
  pageTitles,
  getNavSectionsForProduct,
  getAllNavItemsForProduct,
} from './navigation';

export type { NavItem, NavSection, ProductNavConfig } from './navigation';
