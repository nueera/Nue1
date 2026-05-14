// @ts-nocheck
// ============================================================================
// Scoring Service — CRUD + list, recalculateAll, getHistory, getLeaderboard
// ============================================================================

import { marketingApi } from '../api/client';
import { LEADS_ENDPOINTS } from '../api/endpoints';
import type { ScoringRule, ScoreModel, ApiResponse, PaginatedResponse, PaginatedRequest } from '../types';
import type { ScoringRuleInput } from '../schemas/scoring.schema';

export const scoringService = {
  list: async (params?: PaginatedRequest): Promise<PaginatedResponse<ScoringRule>> => {
    return marketingApi.getPaginated<ScoringRule>(LEADS_ENDPOINTS.scoringRules, params);
  },

  getById: async (id: string): Promise<ApiResponse<ScoringRule>> => {
    return marketingApi.get<ScoringRule>(`${LEADS_ENDPOINTS.scoringRules}/${id}`);
  },

  create: async (data: ScoringRuleInput): Promise<ApiResponse<ScoringRule>> => {
    return marketingApi.post<ScoringRule>(LEADS_ENDPOINTS.scoringRules, data);
  },

  update: async (id: string, data: Partial<ScoringRuleInput>): Promise<ApiResponse<ScoringRule>> => {
    return marketingApi.patch<ScoringRule>(`${LEADS_ENDPOINTS.scoringRules}/${id}`, data);
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return marketingApi.delete<void>(`${LEADS_ENDPOINTS.scoringRules}/${id}`);
  },

  recalculateAll: async (): Promise<ApiResponse<{ processed: number }>> => {
    return marketingApi.post<{ processed: number }>(`${LEADS_ENDPOINTS.scoringRules}/recalculate`);
  },

  getHistory: async (params?: PaginatedRequest): Promise<PaginatedResponse<{ leadId: string; previousScore: number; newScore: number; changedAt: string }>> => {
    return marketingApi.getPaginated<{ leadId: string; previousScore: number; newScore: number; changedAt: string }>(`${LEADS_ENDPOINTS.scoringRules}/history`, params);
  },

  getLeaderboard: async (params?: PaginatedRequest): Promise<PaginatedResponse<{ leadId: string; name: string; email: string; score: number }>> => {
    return marketingApi.getPaginated<{ leadId: string; name: string; email: string; score: number }>(`${LEADS_ENDPOINTS.scoringRules}/leaderboard`, params);
  },
};
