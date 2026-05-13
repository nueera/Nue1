import type { ContactType, ContactStatus, ContactLifecycle } from "./types";
export const CONTACT_TYPES: { value: ContactType; label: string }[] = [
  { value: "customer", label: "Customer" }, { value: "prospect", label: "Prospect" },
  { value: "vendor", label: "Vendor" }, { value: "partner", label: "Partner" },
  { value: "employee", label: "Employee" }, { value: "other", label: "Other" },
];
export const CONTACT_STATUSES: { value: ContactStatus; label: string; color: string }[] = [
  { value: "active", label: "Active", color: "text-status-success" }, { value: "inactive", label: "Inactive", color: "text-status-neutral" },
  { value: "bounced", label: "Bounced", color: "text-status-danger" }, { value: "subscribed", label: "Subscribed", color: "text-status-info" },
  { value: "unsubscribed", label: "Unsubscribed", color: "text-status-warning" },
];
export const CONTACT_LIFECYCLES: { value: ContactLifecycle; label: string }[] = [
  { value: "subscriber", label: "Subscriber" }, { value: "lead", label: "Lead" },
  { value: "opportunity", label: "Opportunity" }, { value: "customer", label: "Customer" },
  { value: "churned", label: "Churned" }, { value: "evangelist", label: "Evangelist" },
];
export const CONTACT_STATUS_FILTERS = ["All", "active", "inactive", "bounced", "subscribed", "unsubscribed"] as const;
export const CONTACT_TYPE_FILTERS = ["All", "customer", "prospect", "vendor", "partner", "employee"] as const;
export const CONTACT_DETAIL_TABS = [{ value: "overview", label: "Overview" }, { value: "activities", label: "Activities" }, { value: "deals", label: "Deals" }, { value: "notes", label: "Notes" }] as const;