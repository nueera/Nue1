import { z } from 'zod';

export const createProgramSchema = z.object({
  title: z.string().min(1, 'Program title is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.enum(['Technical', 'Leadership', 'Soft Skills', 'Compliance', 'Onboarding', 'Certification', 'Safety', 'Product'] as const, {
    message: 'Category is required',
  }),
  deliveryMode: z.enum(['classroom', 'online', 'hybrid', 'self-paced'] as const, {
    message: 'Delivery mode is required',
  }),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  durationHours: z.number().min(0.5, 'Duration must be at least 0.5 hours'),
  maxParticipants: z.number().min(1, 'At least 1 participant is required'),
  trainer: z.string().min(1, 'Trainer is required'),
  location: z.string().optional(),
  isMandatory: z.boolean().optional().default(false),
  skills: z.array(z.string()).optional(),
  prerequisites: z.array(z.string()).optional(),
});

export const enrollTrainingSchema = z.object({
  programId: z.string().min(1, 'Program ID is required'),
  employeeId: z.string().min(1, 'Employee ID is required'),
  notes: z.string().max(500, 'Notes must be under 500 characters').optional(),
});

export const submitFeedbackSchema = z.object({
  programId: z.string().min(1, 'Program ID is required'),
  enrollmentId: z.string().min(1, 'Enrollment ID is required'),
  rating: z.number().min(1, 'Rating is required').max(5, 'Rating must be at most 5'),
  content: z.string().min(1, 'Feedback content is required').max(2000, 'Feedback must be under 2000 characters'),
  wouldRecommend: z.boolean().optional(),
  trainerRating: z.number().min(1).max(5).optional(),
  materialRating: z.number().min(1).max(5).optional(),
});

export type CreateProgramInput = z.infer<typeof createProgramSchema>;
export type EnrollTrainingInput = z.infer<typeof enrollTrainingSchema>;
export type SubmitTrainingFeedbackInput = z.infer<typeof submitFeedbackSchema>;
