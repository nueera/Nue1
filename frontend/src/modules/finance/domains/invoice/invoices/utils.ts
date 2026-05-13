// Invoices Utils — Zoho Invoice

export function formatInvoiceNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getInvoiceStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
