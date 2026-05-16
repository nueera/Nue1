// Mileage Utils — Zoho Expense

export function formatMileageNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getMileageStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
