// CustomerPortal Utils — Zoho Invoice

export function formatCustomerPortalNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getCustomerPortalStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
