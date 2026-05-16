// Products Utils — Zoho Commerce

export function formatProductNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getProductStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
