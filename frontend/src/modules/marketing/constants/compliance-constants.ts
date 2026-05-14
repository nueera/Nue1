// @ts-nocheck
// ============================================================================
// Compliance Constants
// GDPR regulations, consent types, and configuration for Compliance domain
// ============================================================================

import type { ComplianceRegulation, ComplianceStatus } from '../types';

// ---------------------------------------------------------------------------
// Compliance Regulation Config
// ---------------------------------------------------------------------------

export const COMPLIANCE_REGULATION_CONFIG: Record<ComplianceRegulation, { label: string; region: string; description: string }> = {
  gdpr: { label: 'GDPR', region: 'European Union', description: 'General Data Protection Regulation' },
  ccpa: { label: 'CCPA', region: 'California, USA', description: 'California Consumer Privacy Act' },
  can_spam: { label: 'CAN-SPAM', region: 'United States', description: 'Controlling the Assault of Non-Solicited Pornography and Marketing Act' },
  casl: { label: 'CASL', region: 'Canada', description: 'Canada Anti-Spam Legislation' },
  lgpd: { label: 'LGPD', region: 'Brazil', description: 'Lei Geral de Proteção de Dados' },
  popia: { label: 'POPIA', region: 'South Africa', description: 'Protection of Personal Information Act' },
};

// ---------------------------------------------------------------------------
// Compliance Status Config
// ---------------------------------------------------------------------------

export const COMPLIANCE_STATUS_CONFIG: Record<ComplianceStatus, { label: string; color: string; description: string }> = {
  compliant: { label: 'Compliant', color: 'green', description: 'All requirements are met' },
  warning: { label: 'Warning', color: 'amber', description: 'Some issues need attention' },
  non_compliant: { label: 'Non-Compliant', color: 'red', description: 'Critical compliance gaps' },
  not_assessed: { label: 'Not Assessed', color: 'gray', description: 'Compliance not yet evaluated' },
};

// ---------------------------------------------------------------------------
// Consent Type Config
// ---------------------------------------------------------------------------

export const CONSENT_TYPE_CONFIG = {
  email: { label: 'Email Marketing', description: 'Consent to receive marketing emails', required: true },
  sms: { label: 'SMS Marketing', description: 'Consent to receive SMS messages', required: true },
  whatsapp: { label: 'WhatsApp Messages', description: 'Consent to receive WhatsApp messages', required: true },
  phone: { label: 'Phone Calls', description: 'Consent to receive phone calls', required: true },
  tracking: { label: 'Activity Tracking', description: 'Consent to track website activity', required: false },
  marketing: { label: 'Marketing Communications', description: 'General marketing consent', required: true },
  third_party: { label: 'Third-Party Sharing', description: 'Consent to share data with partners', required: false },
} as const;

// ---------------------------------------------------------------------------
// GDPR Request Type Config
// ---------------------------------------------------------------------------

export const GDPR_REQUEST_TYPE_CONFIG = {
  access: { label: 'Data Access', description: 'Request a copy of personal data', deadlineDays: 30 },
  deletion: { label: 'Data Deletion', description: 'Request deletion of personal data', deadlineDays: 30 },
  portability: { label: 'Data Portability', description: 'Request data in portable format', deadlineDays: 30 },
  rectification: { label: 'Data Rectification', description: 'Request correction of data', deadlineDays: 30 },
  objection: { label: 'Right to Object', description: 'Object to processing of data', deadlineDays: 30 },
  restriction: { label: 'Processing Restriction', description: 'Request restriction of processing', deadlineDays: 30 },
} as const;

// ---------------------------------------------------------------------------
// GDPR Request Status Config
// ---------------------------------------------------------------------------

export const GDPR_REQUEST_STATUS_CONFIG = {
  pending: { label: 'Pending', color: 'amber' },
  processing: { label: 'Processing', color: 'blue' },
  completed: { label: 'Completed', color: 'green' },
  rejected: { label: 'Rejected', color: 'red' },
} as const;

// ---------------------------------------------------------------------------
// Unsubscribe Reason Options
// ---------------------------------------------------------------------------

export const UNSUBSCRIBE_REASONS = [
  { value: 'too_frequent', label: 'Too many emails' },
  { value: 'not_relevant', label: 'Content not relevant' },
  { value: 'never_subscribed', label: 'Never subscribed' },
  { value: 'privacy_concerns', label: 'Privacy concerns' },
  { value: 'changing_jobs', label: 'Changing jobs' },
  { value: 'other', label: 'Other' },
] as const;
