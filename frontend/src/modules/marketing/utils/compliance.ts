// ============================================================================
// Compliance Utils — GDPR, CAN-SPAM, CASL compliance checks
// ============================================================================

import type { ComplianceRegulation, ConsentRecord, ComplianceStatus } from '../types';

export interface ComplianceCheckResult {
  regulation: ComplianceRegulation;
  status: ComplianceStatus;
  issues: string[];
}

export function checkGdprCompliance(consents: ConsentRecord[]): ComplianceCheckResult {
  const issues: string[] = [];

  // Check for marketing consent
  const marketingConsent = consents.find((c) => c.type === 'marketing' && c.granted);
  if (!marketingConsent) {
    issues.push('No marketing consent found — GDPR requires explicit consent');
  }

  // Check for expired consents
  const expiredConsents = consents.filter(
    (c) => c.expiresAt && new Date(c.expiresAt) < new Date()
  );
  if (expiredConsents.length > 0) {
    issues.push(`${expiredConsents.length} expired consent(s) need renewal`);
  }

  // Check for tracking consent
  const trackingConsent = consents.find((c) => c.type === 'tracking' && c.granted);
  if (!trackingConsent) {
    issues.push('No tracking consent — cookies/tracking require explicit opt-in');
  }

  return {
    regulation: 'gdpr',
    status: issues.length === 0 ? 'compliant' : issues.length <= 2 ? 'warning' : 'non_compliant',
    issues,
  };
}

export function checkCanSpamCompliance(consents: ConsentRecord[]): ComplianceCheckResult {
  const issues: string[] = [];

  // CAN-SPAM doesn't require opt-in but requires opt-out
  const emailConsent = consents.find((c) => c.type === 'email');
  if (!emailConsent) {
    issues.push('No email consent record found');
  }

  // Check for unsubscribe capability
  const unsubscribed = consents.filter((c) => c.type === 'email' && !c.granted);
  if (unsubscribed.length > 0) {
    // Verify unsubscribes are being honored (within 10 business days)
    const recentUnsubs = unsubscribed.filter((c) => {
      const unsubDate = new Date(c.timestamp);
      const tenDaysAgo = new Date();
      tenDaysAgo.setDate(tenDaysAgo.getDate() - 14); // 14 calendar days ≈ 10 business days
      return unsubDate > tenDaysAgo;
    });
    if (recentUnsubs.length > 0) {
      issues.push(`${recentUnsubs.length} recent unsubscribe(s) — verify they are honored within 10 business days`);
    }
  }

  return {
    regulation: 'can_spam',
    status: issues.length === 0 ? 'compliant' : issues.length <= 1 ? 'warning' : 'non_compliant',
    issues,
  };
}

export function checkCaslCompliance(consents: ConsentRecord[]): ComplianceCheckResult {
  const issues: string[] = [];

  // CASL requires express or implied consent for commercial electronic messages
  const marketingConsent = consents.find((c) => c.type === 'marketing' && c.granted);
  if (!marketingConsent) {
    issues.push('CASL requires express or implied consent for commercial messages');
  }

  // Check consent source
  const withoutSource = consents.filter((c) => !c.source);
  if (withoutSource.length > 0) {
    issues.push(`${withoutSource.length} consent(s) without recorded source — CASL requires proof of consent`);
  }

  return {
    regulation: 'casl',
    status: issues.length === 0 ? 'compliant' : issues.length <= 1 ? 'warning' : 'non_compliant',
    issues,
  };
}

export function isConsentRequired(
  channel: 'email' | 'sms' | 'whatsapp' | 'phone',
  regulation: ComplianceRegulation
): boolean {
  const consentMatrix: Record<ComplianceRegulation, Record<string, boolean>> = {
    gdpr: { email: true, sms: true, whatsapp: true, phone: true },
    ccpa: { email: false, sms: false, whatsapp: false, phone: false }, // CCPA is opt-out
    can_spam: { email: false, sms: true, whatsapp: true, phone: true },
    casl: { email: true, sms: true, whatsapp: true, phone: true },
    lgpd: { email: true, sms: true, whatsapp: true, phone: true },
    popia: { email: true, sms: true, whatsapp: true, phone: true },
  };

  return consentMatrix[regulation]?.[channel] ?? true;
}
