// @ts-nocheck
// ============================================================================
// Planner Service — CRUD + list, addActivity, updateBudget, getMilestones, getROI
// ============================================================================

import { marketingApi } from '../api/client';
import { AUTOMATION_ENDPOINTS } from '../api/endpoints';
import type { MarketingPlan, PlanMilestone, ApiResponse, PaginatedResponse, PaginatedRequest } from '../types';
import type { CreatePlanInput, PlanActivityInput } from '../schemas/planner.schema';

export const plannerService = {
  list: async (params?: PaginatedRequest): Promise<PaginatedResponse<MarketingPlan>> => {
    return marketingApi.getPaginated<MarketingPlan>(AUTOMATION_ENDPOINTS.plannerList, params);
  },

  getById: async (id: string): Promise<ApiResponse<MarketingPlan>> => {
    return marketingApi.get<MarketingPlan>(AUTOMATION_ENDPOINTS.plannerDetail(id));
  },

  create: async (data: CreatePlanInput): Promise<ApiResponse<MarketingPlan>> => {
    return marketingApi.post<MarketingPlan>(AUTOMATION_ENDPOINTS.plannerList, data);
  },

  update: async (id: string, data: Partial<CreatePlanInput>): Promise<ApiResponse<MarketingPlan>> => {
    return marketingApi.patch<MarketingPlan>(AUTOMATION_ENDPOINTS.plannerDetail(id), data);
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return marketingApi.delete<void>(AUTOMATION_ENDPOINTS.plannerDetail(id));
  },

  addActivity: async (planId: string, activity: PlanActivityInput): Promise<ApiResponse<MarketingPlan>> => {
    return marketingApi.post<MarketingPlan>(`${AUTOMATION_ENDPOINTS.plannerDetail(planId)}/activities`, activity);
  },

  updateBudget: async (planId: string, budget: { allocated: number; currency?: string }): Promise<ApiResponse<MarketingPlan>> => {
    return marketingApi.patch<MarketingPlan>(`${AUTOMATION_ENDPOINTS.plannerDetail(planId)}/budget`, budget);
  },

  getMilestones: async (planId: string): Promise<ApiResponse<PlanMilestone[]>> => {
    return marketingApi.get<PlanMilestone[]>(`${AUTOMATION_ENDPOINTS.plannerDetail(planId)}/milestones`);
  },

  getROI: async (planId: string): Promise<ApiResponse<{ revenue: number; spend: number; roi: number; roas: number }>> => {
    return marketingApi.get<{ revenue: number; spend: number; roi: number; roas: number }>(`${AUTOMATION_ENDPOINTS.plannerDetail(planId)}/roi`);
  },
};
