// Discounts Utils — Zoho Commerce

export function formatDiscountNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getDiscountStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
