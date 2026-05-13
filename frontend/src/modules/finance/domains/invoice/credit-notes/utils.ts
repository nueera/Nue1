// CreditNotes Utils — Zoho Invoice

export function formatCreditNoteNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getCreditNoteStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
