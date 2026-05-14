// @ts-nocheck
// Notes Utils — Cross-product

export function formatNoteNumber(num: string, prefix: string): string {
  return `${prefix}-${num}`;
}

export function getNoteStatusLabel(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
