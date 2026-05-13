import type { AccountType, AccountTier, AccountIndustry } from "./types";
export const ACCOUNT_TYPES: { value: AccountType; label: string }[] = [
  { value: "customer", label: "Customer" }, { value: "prospect", label: "Prospect" },
  { value: "partner", label: "Partner" }, { value: "vendor", label: "Vendor" },
  { value: "reseller", label: "Reseller" }, { value: "competitor", label: "Competitor" },
];
export const ACCOUNT_TIERS: { value: AccountTier; label: string; color: string }[] = [
  { value: "enterprise", label: "Enterprise", color: "text-status-accent" },
  { value: "mid-market", label: "Mid-Market", color: "text-status-info" },
  { value: "smb", label: "SMB", color: "text-status-success" },
  { value: "startup", label: "Startup", color: "text-status-warning" },
  { value: "freemium", label: "Freemium", color: "text-status-neutral" },
];
export const ACCOUNT_INDUSTRIES: { value: AccountIndustry; label: string }[] = [
  { value: "technology", label: "Technology" }, { value: "finance", label: "Finance" },
  { value: "healthcare", label: "Healthcare" }, { value: "education", label: "Education" },
  { value: "manufacturing", label: "Manufacturing" }, { value: "retail", label: "Retail" },
  { value: "media", label: "Media" }, { value: "energy", label: "Energy" },
  { value: "real-estate", label: "Real Estate" }, { value: "transportation", label: "Transportation" },
  { value: "other", label: "Other" },
];
export const ACCOUNT_TYPE_FILTERS = ["All", "customer", "prospect", "partner", "vendor", "reseller", "competitor"] as const;
export const ACCOUNT_TIER_FILTERS = ["All", "enterprise", "mid-market", "smb", "startup", "freemium"] as const;
export const ACCOUNT_DETAIL_TABS = [{ value: "overview", label: "Overview" }, { value: "contacts", label: "Contacts" }, { value: "deals", label: "Deals" }, { value: "cases", label: "Cases" }] as const;