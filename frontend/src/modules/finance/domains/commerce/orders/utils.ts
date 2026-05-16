// Orders Utils — Zoho Commerce

export function formatOrderNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getOrderStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
