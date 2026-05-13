// Benefits Utils — Zoho Payroll

export function formatBenefitNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getBenefitStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
