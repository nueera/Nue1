import { crmApiClient } from "../../api/client";
import type { ApiResponse, PaginatedResponse } from "../../core/types";
import type { OmniChannelConfig } from "./types";

export const omnichannelService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    crmApiClient.get<PaginatedResponse<OmniChannelConfig>>(`/omni-channel`, params),
  getById: (id: string) =>
    crmApiClient.get<ApiResponse<OmniChannelConfig>>(`/omni-channel/${id}`),
  create: (data: Partial<OmniChannelConfig>) =>
    crmApiClient.post<ApiResponse<OmniChannelConfig>>(`/omni-channel`, data),
  update: (id: string, data: Partial<OmniChannelConfig>) =>
    crmApiClient.put<ApiResponse<OmniChannelConfig>>(`/omni-channel/${id}`, data),
  delete: (id: string) =>
    crmApiClient.delete<ApiResponse<void>>(`/omni-channel/${id}`),
};