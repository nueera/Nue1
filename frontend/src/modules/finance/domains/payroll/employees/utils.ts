// @ts-nocheck
// Employees Utils — Zoho Payroll

export function formatEmployeeNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getEmployeeStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
