import type { Contact } from "./types"; import { CONTACT_TYPES, CONTACT_STATUSES } from "./constants";
export function getContactDisplayName(contact: Contact): string { return `${contact.firstName} ${contact.lastName}`.trim(); }
export function formatPhoneNumber(phone: string): string { const c = phone.replace(/\D/g, ""); if (c.length === 10) return `(${c.slice(0,3)}) ${c.slice(3,6)}-${c.slice(6)}`; if (c.length === 11 && c.startsWith("1")) return `+1 (${c.slice(1,4)}) ${c.slice(4,7)}-${c.slice(7)}`; return phone; }
export function isKeyContact(contact: Contact): boolean { return contact.type === "customer" && contact.status === "active"; }
export function mapContactToLead(contact: Contact) { return { firstName: contact.firstName, lastName: contact.lastName, email: contact.email, phone: contact.phone, company: contact.accountName, title: contact.title, leadSource: contact.leadSource }; }
export function getContactTypeLabel(type: string): string { return CONTACT_TYPES.find(t => t.value === type)?.label ?? type; }
export function getContactStatusLabel(status: string): string { return CONTACT_STATUSES.find(s => s.value === status)?.label ?? status; }
export function getContactStatusColor(status: string): string { return CONTACT_STATUSES.find(s => s.value === status)?.color ?? "text-status-neutral"; }