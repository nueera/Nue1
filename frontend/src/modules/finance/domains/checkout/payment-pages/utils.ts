// PaymentPages Utils — Zoho Checkout

export function formatPaymentPageNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getPaymentPageStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
