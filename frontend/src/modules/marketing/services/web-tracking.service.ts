// ============================================================================
// Web Tracking Service — CRUD smart URLs, CRUD goals, getClicks, getConversions
// ============================================================================

import { marketingApi } from '../api/client';
import { ANALYTICS_ENDPOINTS } from '../api/endpoints';
import type { SmartUrl, TrackingGoal, GoalConversion, ApiResponse, PaginatedResponse, PaginatedRequest } from '../types';

export interface CreateSmartUrlInput {
  name: string;
  originalUrl: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  expiresAt?: string;
}

export interface UpdateSmartUrlInput extends Partial<CreateSmartUrlInput> {}

export interface CreateGoalInput {
  name: string;
  type: TrackingGoal['type'];
  targetUrl?: string;
  value: number;
}

export interface UpdateGoalInput extends Partial<CreateGoalInput> {}

export const webTrackingService = {
  // Smart URLs
  listSmartUrls: async (params?: PaginatedRequest): Promise<PaginatedResponse<SmartUrl>> => {
    return marketingApi.getPaginated<SmartUrl>(ANALYTICS_ENDPOINTS.smartUrlList, params);
  },

  getSmartUrl: async (id: string): Promise<ApiResponse<SmartUrl>> => {
    return marketingApi.get<SmartUrl>(ANALYTICS_ENDPOINTS.smartUrlDetail(id));
  },

  createSmartUrl: async (data: CreateSmartUrlInput): Promise<ApiResponse<SmartUrl>> => {
    return marketingApi.post<SmartUrl>(ANALYTICS_ENDPOINTS.smartUrlList, data);
  },

  updateSmartUrl: async (id: string, data: UpdateSmartUrlInput): Promise<ApiResponse<SmartUrl>> => {
    return marketingApi.patch<SmartUrl>(ANALYTICS_ENDPOINTS.smartUrlDetail(id), data);
  },

  deleteSmartUrl: async (id: string): Promise<ApiResponse<void>> => {
    return marketingApi.delete<void>(ANALYTICS_ENDPOINTS.smartUrlDetail(id));
  },

  getClicks: async (id: string, params?: PaginatedRequest): Promise<PaginatedResponse<{ ipAddress: string; userAgent: string; clickedAt: string; contactId?: string }>> => {
    return marketingApi.getPaginated<{ ipAddress: string; userAgent: string; clickedAt: string; contactId?: string }>(ANALYTICS_ENDPOINTS.smartUrlClicks(id), params);
  },

  // Goals
  listGoals: async (params?: PaginatedRequest): Promise<PaginatedResponse<TrackingGoal>> => {
    return marketingApi.getPaginated<TrackingGoal>(ANALYTICS_ENDPOINTS.goalList, params);
  },

  getGoal: async (id: string): Promise<ApiResponse<TrackingGoal>> => {
    return marketingApi.get<TrackingGoal>(ANALYTICS_ENDPOINTS.goalDetail(id));
  },

  createGoal: async (data: CreateGoalInput): Promise<ApiResponse<TrackingGoal>> => {
    return marketingApi.post<TrackingGoal>(ANALYTICS_ENDPOINTS.goalList, data);
  },

  updateGoal: async (id: string, data: UpdateGoalInput): Promise<ApiResponse<TrackingGoal>> => {
    return marketingApi.patch<TrackingGoal>(ANALYTICS_ENDPOINTS.goalDetail(id), data);
  },

  deleteGoal: async (id: string): Promise<ApiResponse<void>> => {
    return marketingApi.delete<void>(ANALYTICS_ENDPOINTS.goalDetail(id));
  },

  getConversions: async (goalId: string, params?: PaginatedRequest): Promise<PaginatedResponse<GoalConversion>> => {
    return marketingApi.getPaginated<GoalConversion>(ANALYTICS_ENDPOINTS.goalConversions(goalId), params);
  },
};
