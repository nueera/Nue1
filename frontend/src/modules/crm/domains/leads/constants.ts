import type { LeadSource, LeadStatus, LeadRating } from "./types";
export const LEAD_SOURCES: { value: LeadSource; label: string }[] = [
  { value: "web", label: "Web" }, { value: "referral", label: "Referral" },
  { value: "advertisement", label: "Advertisement" }, { value: "cold-call", label: "Cold Call" },
  { value: "trade-show", label: "Trade Show" }, { value: "social-media", label: "Social Media" },
  { value: "email-campaign", label: "Email Campaign" }, { value: "partner", label: "Partner" },
  { value: "organic", label: "Organic" }, { value: "other", label: "Other" },
];
export const LEAD_STATUSES: { value: LeadStatus; label: string; color: string }[] = [
  { value: "new", label: "New", color: "text-status-info" },
  { value: "contacted", label: "Contacted", color: "text-status-attention" },
  { value: "qualified", label: "Qualified", color: "text-status-accent" },
  { value: "unqualified", label: "Unqualified", color: "text-status-neutral" },
  { value: "converted", label: "Converted", color: "text-status-success" },
  { value: "nurturing", label: "Nurturing", color: "text-status-warning" },
  { value: "junk", label: "Junk", color: "text-status-danger" },
];
export const LEAD_RATINGS: { value: LeadRating; label: string; color: string }[] = [
  { value: "hot", label: "Hot", color: "text-status-danger" },
  { value: "warm", label: "Warm", color: "text-status-warning" },
  { value: "cold", label: "Cold", color: "text-status-info" },
];
export const LEAD_STATUS_FILTERS = ["All", "new", "contacted", "qualified", "unqualified", "converted", "nurturing", "junk"] as const;
export const LEAD_SOURCE_FILTERS = ["All", "web", "referral", "advertisement", "cold-call", "trade-show", "social-media", "email-campaign", "partner", "organic"] as const;
export const LEAD_RATING_FILTERS = ["All", "hot", "warm", "cold"] as const;
export const LEAD_DETAIL_TABS = [{ value: "overview", label: "Overview" }, { value: "activities", label: "Activities" }, { value: "notes", label: "Notes" }, { value: "related", label: "Related" }] as const;