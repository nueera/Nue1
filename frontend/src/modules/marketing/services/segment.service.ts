// @ts-nocheck
// ============================================================================
// Segment Service — CRUD + list, previewCount, getMembers
// ============================================================================

import { marketingApi } from '../api/client';
import { AUDIENCES_ENDPOINTS } from '../api/endpoints';
import type { Segment, ApiResponse, PaginatedResponse, PaginatedRequest } from '../types';
import type { SegmentRuleInput, ConditionGroupInput } from '../schemas/segment.schema';

export interface CreateSegmentInput {
  name: string;
  description?: string;
  rules: SegmentRuleInput[];
  isDynamic?: boolean;
  tags?: string[];
}

export interface UpdateSegmentInput extends Partial<CreateSegmentInput> {}

export const segmentService = {
  list: async (params?: PaginatedRequest): Promise<PaginatedResponse<Segment>> => {
    return marketingApi.getPaginated<Segment>(AUDIENCES_ENDPOINTS.segmentList, params);
  },

  getById: async (id: string): Promise<ApiResponse<Segment>> => {
    return marketingApi.get<Segment>(AUDIENCES_ENDPOINTS.segmentDetail(id));
  },

  create: async (data: CreateSegmentInput): Promise<ApiResponse<Segment>> => {
    return marketingApi.post<Segment>(AUDIENCES_ENDPOINTS.segmentList, data);
  },

  update: async (id: string, data: UpdateSegmentInput): Promise<ApiResponse<Segment>> => {
    return marketingApi.patch<Segment>(AUDIENCES_ENDPOINTS.segmentDetail(id), data);
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return marketingApi.delete<void>(AUDIENCES_ENDPOINTS.segmentDetail(id));
  },

  previewCount: async (id: string): Promise<ApiResponse<{ count: number }>> => {
    return marketingApi.get<{ count: number }>(AUDIENCES_ENDPOINTS.segmentPreview(id));
  },

  getMembers: async (id: string, params?: PaginatedRequest): Promise<PaginatedResponse<{ contactId: string; email: string; firstName: string; lastName: string }>> => {
    return marketingApi.getPaginated<{ contactId: string; email: string; firstName: string; lastName: string }>(`${AUDIENCES_ENDPOINTS.segmentDetail(id)}/members`, params);
  },
};
