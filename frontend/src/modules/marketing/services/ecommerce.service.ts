// @ts-nocheck
// ============================================================================
// E-Commerce Service — connectStore, getCarts, getFollowups, getProductCampaigns, syncStore
// ============================================================================

import { marketingApi } from '../api/client';
import { ECOMMERCE_ENDPOINTS } from '../api/endpoints';
import type { EcommerceStore, AbandonedCart, PurchaseFollowup, ProductCampaign, ApiResponse, PaginatedResponse, PaginatedRequest } from '../types';
import type { StoreConnectInput, CartRecoveryInput } from '../schemas/ecommerce.schema';

export const ecommerceService = {
  connectStore: async (data: StoreConnectInput): Promise<ApiResponse<EcommerceStore>> => {
    return marketingApi.post<EcommerceStore>(ECOMMERCE_ENDPOINTS.storeList, data);
  },

  getStores: async (params?: PaginatedRequest): Promise<PaginatedResponse<EcommerceStore>> => {
    return marketingApi.getPaginated<EcommerceStore>(ECOMMERCE_ENDPOINTS.storeList, params);
  },

  getStore: async (id: string): Promise<ApiResponse<EcommerceStore>> => {
    return marketingApi.get<EcommerceStore>(ECOMMERCE_ENDPOINTS.storeDetail(id));
  },

  getCarts: async (params?: PaginatedRequest): Promise<PaginatedResponse<AbandonedCart>> => {
    return marketingApi.getPaginated<AbandonedCart>(ECOMMERCE_ENDPOINTS.cartList, params);
  },

  getCart: async (id: string): Promise<ApiResponse<AbandonedCart>> => {
    return marketingApi.get<AbandonedCart>(ECOMMERCE_ENDPOINTS.cartDetail(id));
  },

  recoverCart: async (id: string, data: CartRecoveryInput): Promise<ApiResponse<AbandonedCart>> => {
    return marketingApi.post<AbandonedCart>(ECOMMERCE_ENDPOINTS.cartRecover(id), data);
  },

  getFollowups: async (params?: PaginatedRequest): Promise<PaginatedResponse<PurchaseFollowup>> => {
    return marketingApi.getPaginated<PurchaseFollowup>(ECOMMERCE_ENDPOINTS.followupList, params);
  },

  getFollowup: async (id: string): Promise<ApiResponse<PurchaseFollowup>> => {
    return marketingApi.get<PurchaseFollowup>(ECOMMERCE_ENDPOINTS.followupDetail(id));
  },

  getProductCampaigns: async (params?: PaginatedRequest): Promise<PaginatedResponse<ProductCampaign>> => {
    return marketingApi.getPaginated<ProductCampaign>(ECOMMERCE_ENDPOINTS.productCampaignList, params);
  },

  getProductCampaign: async (id: string): Promise<ApiResponse<ProductCampaign>> => {
    return marketingApi.get<ProductCampaign>(ECOMMERCE_ENDPOINTS.productCampaignDetail(id));
  },

  syncStore: async (id: string): Promise<ApiResponse<{ synced: number; errors: number }>> => {
    return marketingApi.post<{ synced: number; errors: number }>(`${ECOMMERCE_ENDPOINTS.storeDetail(id)}/sync`);
  },
};
