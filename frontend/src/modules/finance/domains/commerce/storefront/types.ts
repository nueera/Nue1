// @ts-nocheck
'use client';
// Storefront Types — Zoho Commerce
import type { Money } from '../../../types/finance-common';

export type StorefrontStatus = 'published' | 'draft' | 'unpublished';
export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
}
export interface ThemeConfig {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  font: string;
  layout: 'full_width' | 'boxed' | 'sidebar';
}
export interface Storefront {
  id: string;
  name: string;
  domain: string;
  status: StorefrontStatus;
  theme: ThemeConfig;
  seo: SEOConfig;
  favicon: string;
  logo: string;
  currency: string;
  publishedAt: string;
  visitorCount: number;
  orderCount: number;
  revenue: Money;
  createdAt: string;
}
