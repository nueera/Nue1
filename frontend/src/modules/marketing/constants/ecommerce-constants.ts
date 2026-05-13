// ============================================================================
// E-Commerce Constants
// Store platforms, cart statuses, and configuration for E-Commerce domain
// ============================================================================

// ---------------------------------------------------------------------------
// Store Platform Config
// ---------------------------------------------------------------------------

export const STORE_PLATFORM_CONFIG = {
  shopify: { label: 'Shopify', color: 'green', icon: 'shopping-bag' },
  woocommerce: { label: 'WooCommerce', color: 'purple', icon: 'shopping-cart' },
  magento: { label: 'Magento', color: 'orange', icon: 'store' },
  bigcommerce: { label: 'BigCommerce', color: 'blue', icon: 'package' },
  custom: { label: 'Custom', color: 'gray', icon: 'code' },
} as const;

// ---------------------------------------------------------------------------
// Abandoned Cart Status Config
// ---------------------------------------------------------------------------

export const CART_STATUS_CONFIG = {
  active: { label: 'Active', color: 'amber', description: 'Cart is still recoverable' },
  recovered: { label: 'Recovered', color: 'green', description: 'Customer completed purchase' },
  expired: { label: 'Expired', color: 'gray', description: 'Recovery window has passed' },
} as const;

// ---------------------------------------------------------------------------
// Purchase Follow-up Trigger Events
// ---------------------------------------------------------------------------

export const FOLLOWUP_TRIGGER_CONFIG = {
  purchase: { label: 'After Purchase', description: 'Triggered right after a purchase', defaultDelayDays: 0 },
  delivery: { label: 'After Delivery', description: 'Triggered after order is delivered', defaultDelayDays: 5 },
  review_request: { label: 'Review Request', description: 'Ask for a product review', defaultDelayDays: 7 },
  cross_sell: { label: 'Cross-Sell', description: 'Recommend related products', defaultDelayDays: 3 },
  upsell: { label: 'Upsell', description: 'Offer a premium upgrade', defaultDelayDays: 2 },
} as const;

// ---------------------------------------------------------------------------
// Product Campaign Type Config
// ---------------------------------------------------------------------------

export const PRODUCT_CAMPAIGN_TYPE_CONFIG = {
  launch: { label: 'Product Launch', color: 'blue', description: 'New product announcement' },
  promotion: { label: 'Promotion', color: 'green', description: 'Discount or special offer' },
  clearance: { label: 'Clearance', color: 'red', description: 'Clearing out inventory' },
  featured: { label: 'Featured', color: 'purple', description: 'Spotlight on a product' },
  bundle: { label: 'Bundle', color: 'amber', description: 'Product bundle deal' },
} as const;

// ---------------------------------------------------------------------------
// Cart Recovery Timing Options
// ---------------------------------------------------------------------------

export const CART_RECOVERY_TIMING = [
  { value: '1_hour', label: '1 Hour After Abandonment', recommended: false },
  { value: '3_hours', label: '3 Hours After Abandonment', recommended: false },
  { value: '6_hours', label: '6 Hours After Abandonment', recommended: true },
  { value: '24_hours', label: '24 Hours After Abandonment', recommended: true },
  { value: '48_hours', label: '48 Hours After Abandonment', recommended: false },
  { value: '72_hours', label: '72 Hours After Abandonment', recommended: false },
] as const;
