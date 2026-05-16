import type { Team } from "./types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { teamsService } from "./service";
import { teamsKeys } from "./query-keys";

export function useTeams(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: teamsKeys.list(params || {}), queryFn: () => teamsService.getAll(params) });
}

export function useTeam(id: string) {
  return useQuery({ queryKey: teamsKeys.detail(id), queryFn: () => teamsService.getById(id), enabled: !!id });
}

export function useCreateTeam() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: teamsService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: teamsKeys.all }); } });
}

export function useUpdateTeam() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Team> }) => teamsService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: teamsKeys.all }); } });
}

export function useDeleteTeam() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: teamsService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: teamsKeys.all }); } });
}