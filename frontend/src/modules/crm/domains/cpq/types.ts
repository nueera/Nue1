// @ts-nocheck
import type { CrmRecord } from "../../core/types";

export interface ProductRule { id: string; name: string; type: "validation" | "selection"; conditions: { field: string; operator: string; value: unknown }[]; action: string; isActive: boolean; }

export interface PricingRule { id: string; name: string; type: "discount" | "surcharge" | "override"; conditions: Record<string, unknown>; value: number; isActive: boolean; }

export interface BundleConfig { id: string; name: string; products: { productId: string; quantity: number; isRequired: boolean }[]; discount: number; }
