// @ts-nocheck
// PaymentLinks Utils — Zoho Checkout

export function formatPaymentLinkNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getPaymentLinkStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
