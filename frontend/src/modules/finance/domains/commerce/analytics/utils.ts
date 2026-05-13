// Analytics Utils — Zoho Commerce

export function formatAnalyticNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getAnalyticStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
