// HostedPages Utils — Zoho Billing

export function formatHostedPageNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getHostedPageStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
