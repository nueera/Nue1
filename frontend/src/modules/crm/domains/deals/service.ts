// @ts-nocheck
import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { Deal, DealProductLine } from "./types";
export const dealService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) => crmApiClient.get<PaginatedResponse<Deal>>("/deals", params),
  getById: (id: string) => crmApiClient.get<ApiResponse<Deal>>(`/deals/${id}`),
  create: (data: Partial<Deal>) => crmApiClient.post<ApiResponse<Deal>>("/deals", data),
  update: (id: string, data: Partial<Deal>) => crmApiClient.put<ApiResponse<Deal>>(`/deals/${id}`, data),
  delete: (id: string) => crmApiClient.delete<ApiResponse<void>>(`/deals/${id}`),
  moveStage: (id: string, stage: string, pipelineId?: string) => crmApiClient.patch<ApiResponse<Deal>>(`/deals/${id}/stage`, { stage, pipelineId }),
  closeWon: (id: string, actualAmount?: number) => crmApiClient.patch<ApiResponse<Deal>>(`/deals/${id}/close-won`, { actualAmount }),
  closeLost: (id: string, lossReason?: string, lossDescription?: string) => crmApiClient.patch<ApiResponse<Deal>>(`/deals/${id}/close-lost`, { lossReason, lossDescription }),
  addProducts: (id: string, products: DealProductLine[]) => crmApiClient.post<ApiResponse<Deal>>(`/deals/${id}/products`, { products }),
  removeProducts: (id: string, productIds: string[]) => crmApiClient.delete<ApiResponse<void>>(`/deals/${id}/products`),
  updateProbability: (id: string, probability: number) => crmApiClient.patch<ApiResponse<Deal>>(`/deals/${id}/probability`, { probability }),
  assignToTeam: (id: string, userIds: string[]) => crmApiClient.patch<ApiResponse<Deal>>(`/deals/${id}/assign`, { userIds }),
  getPipelineStats: (pipelineId?: string) => crmApiClient.get<ApiResponse<{ byStage: Record<string, { count: number; value: number }>; totalValue: number }>>("/deals/pipeline-stats", { pipelineId }),
  getForecast: (period?: string) => crmApiClient.get<ApiResponse<{ pipeline: number; bestCase: number; committed: number; closed: number }>>("/deals/forecast", { period }),
};