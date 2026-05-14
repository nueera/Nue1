// @ts-nocheck
import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { Team } from "./types";

export const teamsService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    crmApiClient.get<PaginatedResponse<Team>>(`/teams`, params),
  getById: (id: string) =>
    crmApiClient.get<ApiResponse<Team>>(`/teams/${id}`),
  create: (data: Partial<Team>) =>
    crmApiClient.post<ApiResponse<Team>>(`/teams`, data),
  update: (id: string, data: Partial<Team>) =>
    crmApiClient.put<ApiResponse<Team>>(`/teams/${id}`, data),
  delete: (id: string) =>
    crmApiClient.delete<ApiResponse<void>>(`/teams/${id}`),
};