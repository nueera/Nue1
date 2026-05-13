// Taxes Utils — Zoho Payroll

export function formatTaxeNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getTaxeStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
