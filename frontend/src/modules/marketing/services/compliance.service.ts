// @ts-nocheck
// ============================================================================
// Compliance Service — getConsents, updateConsent, handleGdprRequest, getUnsubscribes
// ============================================================================

import { marketingApi } from '../api/client';
import { COMPLIANCE_ENDPOINTS } from '../api/endpoints';
import type { ConsentRecord, GdprRequest, UnsubscribeEntry, ApiResponse, PaginatedResponse, PaginatedRequest } from '../types';

export interface UpdateConsentInput {
  granted: boolean;
  type: ConsentRecord['type'];
  source?: string;
}

export interface HandleGdprRequestInput {
  type: GdprRequest['type'];
  notes?: string;
}

export const complianceService = {
  getConsents: async (params?: PaginatedRequest): Promise<PaginatedResponse<ConsentRecord>> => {
    return marketingApi.getPaginated<ConsentRecord>(COMPLIANCE_ENDPOINTS.consentList, params);
  },

  updateConsent: async (id: string, data: UpdateConsentInput): Promise<ApiResponse<ConsentRecord>> => {
    return marketingApi.patch<ConsentRecord>(COMPLIANCE_ENDPOINTS.consentDetail(id), data);
  },

  handleGdprRequest: async (id: string, data: HandleGdprRequestInput): Promise<ApiResponse<GdprRequest>> => {
    return marketingApi.post<GdprRequest>(COMPLIANCE_ENDPOINTS.gdprRequestProcess(id), data);
  },

  getGdprRequests: async (params?: PaginatedRequest): Promise<PaginatedResponse<GdprRequest>> => {
    return marketingApi.getPaginated<GdprRequest>(COMPLIANCE_ENDPOINTS.gdprRequestList, params);
  },

  getUnsubscribes: async (params?: PaginatedRequest): Promise<PaginatedResponse<UnsubscribeEntry>> => {
    return marketingApi.getPaginated<UnsubscribeEntry>(COMPLIANCE_ENDPOINTS.unsubscribeList, params);
  },
};
