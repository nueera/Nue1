// @ts-nocheck
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { socialService } from "./service";
import { socialKeys } from "./query-keys";

export function useSocialProfiles(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: socialKeys.list(params || {}), queryFn: () => socialService.getAll(params) });
}

export function useSocialProfile(id: string) {
  return useQuery({ queryKey: socialKeys.detail(id), queryFn: () => socialService.getById(id), enabled: !!id });
}

export function useCreateSocialProfile() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: socialService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: socialKeys.all }); } });
}

export function useUpdateSocialProfile() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<SocialProfile> }) => socialService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: socialKeys.all }); } });
}

export function useDeleteSocialProfile() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: socialService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: socialKeys.all }); } });
}