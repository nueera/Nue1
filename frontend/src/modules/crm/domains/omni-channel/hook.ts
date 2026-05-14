// @ts-nocheck
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { omnichannelService } from "./service";
import { omniChannelKeys } from "./query-keys";

export function useOmniChannelConfigs(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: omniChannelKeys.list(params || {}), queryFn: () => omnichannelService.getAll(params) });
}

export function useOmniChannelConfig(id: string) {
  return useQuery({ queryKey: omniChannelKeys.detail(id), queryFn: () => omnichannelService.getById(id), enabled: !!id });
}

export function useCreateOmniChannelConfig() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: omnichannelService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: omniChannelKeys.all }); } });
}

export function useUpdateOmniChannelConfig() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<OmniChannelConfig> }) => omnichannelService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: omniChannelKeys.all }); } });
}

export function useDeleteOmniChannelConfig() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: omnichannelService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: omniChannelKeys.all }); } });
}