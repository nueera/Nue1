import type { CrmRecord } from "../../core/types";
export type LeadSource = "web" | "referral" | "advertisement" | "cold-call" | "trade-show" | "social-media" | "email-campaign" | "partner" | "organic" | "other";
export type LeadStatus = "new" | "contacted" | "qualified" | "unqualified" | "converted" | "nurturing" | "junk";
export type LeadRating = "hot" | "warm" | "cold";
export interface Lead extends CrmRecord {
  firstName: string; lastName: string; email: string; phone: string;
  company: string; title: string; leadSource: LeadSource; status: LeadStatus;
  rating: LeadRating; leadScore: number; industry: string; annualRevenue: number;
  website: string; description: string; street: string; city: string;
  state: string; zipCode: string; country: string; assignedTo: string;
  lastActivityDate: string; nextFollowUp: string;
  convertedContactId?: string; convertedDealId?: string; convertedAccountId?: string;
}
export interface LeadScore { leadId: string; score: number; grade: "A"|"B"|"C"|"D"|"F"; factors: { name: string; weight: number; value: number }[]; }
export interface LeadConversionData { contactId: string; accountId: string; dealId?: string; createDeal: boolean; dealAmount?: number; dealClosingDate?: string; }
export interface LeadAssignmentRule { id: string; name: string; conditions: { field: string; operator: string; value: unknown }[]; assignTo: string; isActive: boolean; }