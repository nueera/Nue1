// @ts-nocheck
import type { CrmRecord } from "../../core/types";

export type VendorStatus = "active" | "inactive";

export interface Vendor { id: string; name: string; email: string; phone: string; website: string; category: string; status: VendorStatus; rating: number; street: string; city: string; state: string; zipCode: string; country: string; description: string; createdAt: string; updatedAt: string; owner: string; }
