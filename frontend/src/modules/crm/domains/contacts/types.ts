// @ts-nocheck
import type { CrmRecord } from "../../core/types";
export type ContactStatus = "active" | "inactive" | "bounced" | "subscribed" | "unsubscribed";
export type ContactType = "customer" | "prospect" | "vendor" | "partner" | "employee" | "other";
export type ContactLifecycle = "subscriber" | "lead" | "opportunity" | "customer" | "churned" | "evangelist";
export interface Contact extends CrmRecord {
  firstName: string; lastName: string; email: string; phone: string; mobile: string;
  title: string; department: string; accountId: string; accountName: string;
  status: ContactStatus; type: ContactType; lifecycle: ContactLifecycle;
  leadSource: string; mailingStreet: string; mailingCity: string; mailingState: string;
  mailingZip: string; mailingCountry: string; description: string;
  emailOptOut: boolean; doNotCall: boolean; reportsTo: string;
  twitter: string; linkedin: string; facebook: string;
}
export interface ContactHierarchy { contactId: string; reportsToId: string | null; directReports: ContactHierarchy[]; }
export interface ContactMergeData { primaryId: string; secondaryIds: string[]; fieldResolutions: Record<string, "primary"|"secondary">; }