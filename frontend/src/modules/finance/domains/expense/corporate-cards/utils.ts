// CorporateCards Utils — Zoho Expense

export function formatCorporateCardNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getCorporateCardStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
