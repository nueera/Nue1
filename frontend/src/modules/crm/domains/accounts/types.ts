import type { CrmRecord } from "../../core/types";
export type AccountType = "customer" | "prospect" | "partner" | "vendor" | "reseller" | "competitor";
export type AccountTier = "enterprise" | "mid-market" | "smb" | "startup" | "freemium";
export type AccountOwnership = "private" | "public" | "subsidiary" | "government" | "non-profit";
export type AccountIndustry = "technology" | "finance" | "healthcare" | "education" | "manufacturing" | "retail" | "media" | "energy" | "real-estate" | "transportation" | "other";
export interface Account extends CrmRecord {
  name: string; type: AccountType; tier: AccountTier; ownership: AccountOwnership;
  industry: AccountIndustry; annualRevenue: number; employees: number;
  phone: string; fax: string; website: string; tickerSymbol: string;
  description: string; billingStreet: string; billingCity: string; billingState: string;
  billingZip: string; billingCountry: string; shippingStreet: string; shippingCity: string;
  shippingState: string; shippingZip: string; shippingCountry: string;
  parentId: string; parentName: string; rating: number; healthScore: number;
  territoryId: string; sicCode: string;
}