// ============================================================================
// Integration Constants
// Categories, statuses, and configuration for Integrations domain
// ============================================================================

import type { IntegrationCategory } from '../types';

// ---------------------------------------------------------------------------
// Integration Category Config
// ---------------------------------------------------------------------------

export const INTEGRATION_CATEGORY_CONFIG: Record<IntegrationCategory, { label: string; icon: string; description: string }> = {
  crm: { label: 'CRM', icon: 'users', description: 'Customer relationship management systems' },
  analytics: { label: 'Analytics', icon: 'bar-chart-3', description: 'Web and marketing analytics platforms' },
  advertising: { label: 'Advertising', icon: 'megaphone', description: 'Ad platforms and networks' },
  social_media: { label: 'Social Media', icon: 'share-2', description: 'Social media platforms' },
  ecommerce: { label: 'E-Commerce', icon: 'shopping-cart', description: 'Online store platforms' },
  content: { label: 'Content', icon: 'file-text', description: 'CMS and content platforms' },
  communication: { label: 'Communication', icon: 'message-square', description: 'Messaging and notification tools' },
  data: { label: 'Data', icon: 'database', description: 'Data pipeline and warehouse tools' },
  automation: { label: 'Automation', icon: 'zap', description: 'Automation and workflow tools' },
};

// ---------------------------------------------------------------------------
// Integration Status Config
// ---------------------------------------------------------------------------

export const INTEGRATION_STATUS_CONFIG = {
  connected: { label: 'Connected', color: 'green', description: 'Integration is active and working' },
  disconnected: { label: 'Disconnected', color: 'gray', description: 'Integration is not connected' },
  error: { label: 'Error', color: 'red', description: 'Integration has an error' },
  pending: { label: 'Pending', color: 'amber', description: 'Integration setup in progress' },
} as const;

// ---------------------------------------------------------------------------
// Supported CRM Integrations
// ---------------------------------------------------------------------------

export const SUPPORTED_CRM_INTEGRATIONS = [
  { id: 'salesforce', name: 'Salesforce', category: 'crm' as const, logo: 'salesforce' },
  { id: 'hubspot', name: 'HubSpot', category: 'crm' as const, logo: 'hubspot' },
  { id: 'pipedrive', name: 'Pipedrive', category: 'crm' as const, logo: 'pipedrive' },
  { id: 'zoho', name: 'Zoho CRM', category: 'crm' as const, logo: 'zoho' },
  { id: 'dynamics', name: 'Dynamics 365', category: 'crm' as const, logo: 'dynamics' },
] as const;

// ---------------------------------------------------------------------------
// Supported E-Commerce Integrations
// ---------------------------------------------------------------------------

export const SUPPORTED_ECOMMERCE_INTEGRATIONS = [
  { id: 'shopify', name: 'Shopify', category: 'ecommerce' as const, logo: 'shopify' },
  { id: 'woocommerce', name: 'WooCommerce', category: 'ecommerce' as const, logo: 'woocommerce' },
  { id: 'magento', name: 'Magento', category: 'ecommerce' as const, logo: 'magento' },
  { id: 'bigcommerce', name: 'BigCommerce', category: 'ecommerce' as const, logo: 'bigcommerce' },
  { id: 'stripe', name: 'Stripe', category: 'ecommerce' as const, logo: 'stripe' },
] as const;

// ---------------------------------------------------------------------------
// Sync Frequency Options
// ---------------------------------------------------------------------------

export const SYNC_FREQUENCY_OPTIONS = [
  { value: 'realtime', label: 'Real-time', description: 'Sync immediately on change' },
  { value: 'hourly', label: 'Hourly', description: 'Sync every hour' },
  { value: 'daily', label: 'Daily', description: 'Sync once per day' },
  { value: 'manual', label: 'Manual', description: 'Sync only when triggered manually' },
] as const;

// ---------------------------------------------------------------------------
// Sync Direction Options
// ---------------------------------------------------------------------------

export const SYNC_DIRECTION_OPTIONS = [
  { value: 'marketing_to_crm', label: 'Marketing → CRM', description: 'One-way: Marketing to CRM' },
  { value: 'crm_to_marketing', label: 'CRM → Marketing', description: 'One-way: CRM to Marketing' },
  { value: 'bidirectional', label: 'Bidirectional', description: 'Two-way sync between both' },
] as const;
