import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { recruitmentService } from './recruitment.service';
import { recruitmentKeys } from './query-keys';

export function useJobOpenings(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({
    queryKey: recruitmentKeys.openings(params || {}),
    queryFn: () => recruitmentService.getOpenings(params),
  });
}

export function useJobOpening(id: string) {
  return useQuery({
    queryKey: recruitmentKeys.opening(id),
    queryFn: () => recruitmentService.getOpening(id),
    enabled: !!id,
  });
}

export function useCandidates(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({
    queryKey: recruitmentKeys.candidates(params || {}),
    queryFn: () => recruitmentService.getCandidates(params),
  });
}

export function useApplications(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({
    queryKey: recruitmentKeys.applications(params || {}),
    queryFn: () => recruitmentService.getApplications(params),
  });
}

export function useInterviews(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({
    queryKey: recruitmentKeys.interviews(params || {}),
    queryFn: () => recruitmentService.getInterviews(params),
  });
}

export function useReferrals(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({
    queryKey: recruitmentKeys.referrals(params || {}),
    queryFn: () => recruitmentService.getReferrals(params),
  });
}

export function useCreateJobOpening() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: recruitmentService.createOpening,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recruitmentKeys.all });
    },
  });
}

export function useUpdateJobOpening() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, string | number | boolean | undefined> }) =>
      recruitmentService.updateOpening(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recruitmentKeys.all });
    },
  });
}

export function useReferCandidate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: recruitmentService.referCandidate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recruitmentKeys.all });
    },
  });
}

export function useScheduleInterview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: recruitmentService.scheduleInterview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recruitmentKeys.all });
    },
  });
}

export function useUpdateApplicationStage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, stage }: { id: string; stage: string }) =>
      recruitmentService.updateApplicationStage(id, stage),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recruitmentKeys.all });
    },
  });
}
