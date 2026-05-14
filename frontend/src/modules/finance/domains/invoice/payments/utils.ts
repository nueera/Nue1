// @ts-nocheck
// Payments Utils — Zoho Invoice

export function formatPaymentNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getPaymentStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
