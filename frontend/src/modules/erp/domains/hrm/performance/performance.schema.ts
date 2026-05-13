import { z } from 'zod';

export const createReviewCycleSchema = z.object({
  name: z.string().min(1, 'Cycle name is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  reviewers: z.array(z.string().min(1)).min(1, 'At least one reviewer is required'),
});

export const setGoalSchema = z.object({
  employeeId: z.string().min(1, 'Employee ID is required'),
  cycleId: z.string().min(1, 'Cycle ID is required'),
  title: z.string().min(1, 'Goal title is required'),
  description: z.string().min(1, 'Goal description is required'),
  targetDate: z.string().min(1, 'Target date is required'),
});

export const submitReviewSchema = z.object({
  cycleId: z.string().min(1, 'Cycle ID is required'),
  employeeId: z.string().min(1, 'Employee ID is required'),
  reviewerId: z.string().min(1, 'Reviewer ID is required'),
  type: z.enum(['self', 'manager', 'peer'] as const, {
    message: 'Review type is required',
  }),
  rating: z.number().min(1, 'Rating is required').max(5, 'Rating must be at most 5'),
  comments: z.string().min(1, 'Comments are required'),
});

export const submitFeedbackSchema = z.object({
  toEmployeeId: z.string().min(1, 'Employee ID is required'),
  content: z.string().min(1, 'Feedback content is required').max(2000, 'Feedback must be under 2000 characters'),
  isAnonymous: z.boolean().optional().default(false),
});

export type CreateReviewCycleInput = z.infer<typeof createReviewCycleSchema>;
export type SetGoalInput = z.infer<typeof setGoalSchema>;
export type SubmitReviewInput = z.infer<typeof submitReviewSchema>;
export type SubmitFeedbackInput = z.infer<typeof submitFeedbackSchema>;
