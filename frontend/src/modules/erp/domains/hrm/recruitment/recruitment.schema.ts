import { z } from 'zod';

export const createJobOpeningSchema = z.object({
  title: z.string().min(1, 'Job title is required'),
  department: z.string().min(1, 'Department is required'),
  position: z.string().min(1, 'Position is required'),
  employmentType: z.enum(['Full-time', 'Part-time', 'Contract', 'Internship'] as const, {
    message: 'Employment type is required',
  }),
  experienceLevel: z.string().min(1, 'Experience level is required'),
  minExperience: z.number().min(0, 'Minimum experience must be non-negative'),
  maxExperience: z.number().min(0, 'Maximum experience must be non-negative'),
  salaryMin: z.number().min(0, 'Minimum salary must be positive'),
  salaryMax: z.number().min(0, 'Maximum salary must be positive'),
  description: z.string().min(1, 'Job description is required'),
  requirements: z.string().min(1, 'Requirements are required'),
  positions: z.number().min(1, 'At least 1 position is required'),
  deadline: z.string().min(1, 'Application deadline is required'),
  location: z.string().optional(),
  skills: z.array(z.string()).optional(),
});

export const referCandidateSchema = z.object({
  candidateName: z.string().min(1, 'Candidate name is required'),
  candidateEmail: z.string().email('Invalid email address'),
  candidatePhone: z.string().min(1, 'Phone number is required'),
  jobId: z.string().min(1, 'Job opening is required'),
  relationship: z.string().min(1, 'Relationship is required'),
  notes: z.string().max(500, 'Notes must be under 500 characters').optional(),
  resumeUrl: z.string().optional(),
});

export const scheduleInterviewSchema = z.object({
  applicationId: z.string().min(1, 'Application ID is required'),
  interviewerIds: z.array(z.string().min(1)).min(1, 'At least one interviewer is required'),
  type: z.enum(['phone', 'video', 'onsite', 'panel'] as const, {
    message: 'Interview type is required',
  }),
  scheduledAt: z.string().min(1, 'Scheduled date/time is required'),
  duration: z.number().min(15, 'Duration must be at least 15 minutes'),
  location: z.string().optional(),
  notes: z.string().max(500).optional(),
});

export type CreateJobOpeningInput = z.infer<typeof createJobOpeningSchema>;
export type ReferCandidateInput = z.infer<typeof referCandidateSchema>;
export type ScheduleInterviewInput = z.infer<typeof scheduleInterviewSchema>;
