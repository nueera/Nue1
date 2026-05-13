import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { trainingService } from './training.service';
import { trainingKeys } from './query-keys';

export function useTrainingPrograms(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({
    queryKey: trainingKeys.programs(params || {}),
    queryFn: () => trainingService.getPrograms(params),
  });
}

export function useTrainingProgram(id: string) {
  return useQuery({
    queryKey: trainingKeys.program(id),
    queryFn: () => trainingService.getProgram(id),
    enabled: !!id,
  });
}

export function useTrainingSessions(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({
    queryKey: trainingKeys.sessions(params || {}),
    queryFn: () => trainingService.getSessions(params),
  });
}

export function useEnrollments(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({
    queryKey: trainingKeys.enrollments(params || {}),
    queryFn: () => trainingService.getEnrollments(params),
  });
}

export function useMyEnrollments() {
  return useQuery({
    queryKey: trainingKeys.myEnrollments(),
    queryFn: () => trainingService.getMyEnrollments(),
  });
}

export function useTrainingFeedback(programId: string) {
  return useQuery({
    queryKey: trainingKeys.feedback(programId),
    queryFn: () => trainingService.getFeedback(programId),
    enabled: !!programId,
  });
}

export function useCertificates(employeeId: string) {
  return useQuery({
    queryKey: trainingKeys.certificates(employeeId),
    queryFn: () => trainingService.getCertificates(employeeId),
    enabled: !!employeeId,
  });
}

export function useCreateProgram() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: trainingService.createProgram,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: trainingKeys.all });
    },
  });
}

export function useEnrollTraining() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: trainingService.enroll,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: trainingKeys.all });
    },
  });
}

export function useSubmitTrainingFeedback() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: trainingService.submitFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: trainingKeys.all });
    },
  });
}

export function useCancelEnrollment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => trainingService.cancelEnrollment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: trainingKeys.all });
    },
  });
}
