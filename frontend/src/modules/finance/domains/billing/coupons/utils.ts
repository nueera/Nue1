// Coupons Utils — Zoho Billing

export function formatCouponNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getCouponStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
