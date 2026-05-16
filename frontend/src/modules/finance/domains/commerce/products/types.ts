'use client';
// Products Types — Zoho Commerce
import type { Money } from '../../../types/finance-common';

export type CommerceProductStatus = 'active' | 'draft' | 'archived';
export interface ProductSEO {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
}
export interface CommerceProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: Money;
  compareAtPrice: Money;
  status: CommerceProductStatus;
  categories: string[];
  tags: string[];
  images: string[];
  seo: ProductSEO;
  stock: number;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}
export type Product = CommerceProduct;
export type ProductVisibility = 'public' | 'private' | 'hidden';
