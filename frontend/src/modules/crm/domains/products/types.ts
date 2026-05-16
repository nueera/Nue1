import type { CrmRecord } from "../../core/types";

export type ProductCategory = "hardware" | "software" | "service" | "subscription" | "other";

export interface Product { id: string; name: string; sku: string; category: ProductCategory; unitPrice: number; cost: number; description: string; vendorId?: string; vendorName?: string; stockQuantity: number; isActive: boolean; createdAt: string; updatedAt: string; owner: string; }
