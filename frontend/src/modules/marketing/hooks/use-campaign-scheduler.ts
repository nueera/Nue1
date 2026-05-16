'use client';

// ============================================================================
// Campaign Scheduler Hook — Schedule campaigns with date/time, timezone, recurrence
// ============================================================================

import { useState, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { campaignService } from '../services/campaign.service';
import { campaignKeys } from '../api/query-keys';
import type { ScheduleCampaignInput } from '../schemas/campaign.schema';

interface SchedulerState {
  scheduledDate: string;
  scheduledTime: string;
  timezone: string;
  recurrence: ScheduleCampaignInput['recurrence'];
}

export function useCampaignScheduler() {
  const qc = useQueryClient();

  const [schedulerState, setSchedulerState] = useState<SchedulerState>({
    scheduledDate: '',
    scheduledTime: '09:00',
    timezone: 'UTC',
    recurrence: 'once',
  });

  const scheduleMutation = useMutation({
    mutationFn: ({ campaignId, data }: { campaignId: string; data: ScheduleCampaignInput }) =>
      campaignService.schedule(campaignId, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: campaignKeys.all });
    },
  });

  const setDate = useCallback((date: string) => {
    setSchedulerState((prev) => ({ ...prev, scheduledDate: date }));
  }, []);

  const setTime = useCallback((time: string) => {
    setSchedulerState((prev) => ({ ...prev, scheduledTime: time }));
  }, []);

  const setTimezone = useCallback((timezone: string) => {
    setSchedulerState((prev) => ({ ...prev, timezone }));
  }, []);

  const setRecurrence = useCallback((recurrence: ScheduleCampaignInput['recurrence']) => {
    setSchedulerState((prev) => ({ ...prev, recurrence }));
  }, []);

  const scheduleCampaign = useCallback(
    (campaignId: string) => {
      const scheduledAt = `${schedulerState.scheduledDate}T${schedulerState.scheduledTime}:00`;
      return scheduleMutation.mutate({
        campaignId,
        data: {
          campaignId,
          scheduledAt,
          timezone: schedulerState.timezone,
          recurrence: schedulerState.recurrence,
        },
      });
    },
    [schedulerState, scheduleMutation]
  );

  const reset = useCallback(() => {
    setSchedulerState({
      scheduledDate: '',
      scheduledTime: '09:00',
      timezone: 'UTC',
      recurrence: 'once',
    });
  }, []);

  return {
    ...schedulerState,
    setDate,
    setTime,
    setTimezone,
    setRecurrence,
    scheduleCampaign,
    reset,
    isScheduling: scheduleMutation.isPending,
    isSuccess: scheduleMutation.isSuccess,
    isError: scheduleMutation.isError,
    error: scheduleMutation.error,
  };
}
