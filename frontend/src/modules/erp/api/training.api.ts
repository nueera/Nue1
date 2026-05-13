import type { TrainingProgram, TrainingEnrollment, TrainingFeedback } from '../data/mock/training.mock';
import {
  trainingPrograms,
  getTrainingProgramById,
  trainingEnrollments,
  getEnrollmentsByProgramId,
  getEnrollmentsByEmployeeId,
  trainingFeedbacks,
  getFeedbackByProgramId,
} from '../data/mock/training.mock';

export const trainingApi = {
  getAll: async (): Promise<TrainingProgram[]> => trainingPrograms,
  getById: async (id: string): Promise<TrainingProgram | undefined> => getTrainingProgramById(id),
  create: async (data: Partial<TrainingProgram>): Promise<TrainingProgram> => {
    const newProgram: TrainingProgram = {
      id: `TRN${String(trainingPrograms.length + 1).padStart(3, '0')}`,
      title: data.title || '',
      description: data.description || '',
      category: data.category || '',
      duration: data.duration || '',
      trainer: data.trainer || '',
      startDate: data.startDate || '',
      endDate: data.endDate || '',
      maxParticipants: data.maxParticipants || 20,
      enrolledCount: 0,
      status: 'upcoming',
      location: data.location || '',
    };
    return newProgram;
  },
};

export const enrollmentApi = {
  enroll: async (data: Partial<TrainingEnrollment>): Promise<TrainingEnrollment> => {
    const newEnrollment: TrainingEnrollment = {
      id: `ENR${String(trainingEnrollments.length + 1).padStart(3, '0')}`,
      programId: data.programId || '',
      employeeId: data.employeeId || '',
      employeeName: data.employeeName || '',
      status: 'enrolled',
      enrolledDate: new Date().toISOString().split('T')[0],
      completedDate: null,
      progress: 0,
    };
    return newEnrollment;
  },
  getEnrollments: async (programId?: string, employeeId?: string): Promise<TrainingEnrollment[]> => {
    if (programId) return getEnrollmentsByProgramId(programId);
    if (employeeId) return getEnrollmentsByEmployeeId(employeeId);
    return trainingEnrollments;
  },
};

export const feedbackApi = {
  submit: async (data: Partial<TrainingFeedback>): Promise<TrainingFeedback> => {
    const newFeedback: TrainingFeedback = {
      id: `FB${String(trainingFeedbacks.length + 1).padStart(3, '0')}`,
      programId: data.programId || '',
      employeeId: data.employeeId || '',
      employeeName: data.employeeName || '',
      rating: data.rating || 0,
      comments: data.comments || '',
      submittedAt: new Date().toISOString().split('T')[0],
    };
    return newFeedback;
  },
  getList: async (programId?: string): Promise<TrainingFeedback[]> => {
    if (programId) return getFeedbackByProgramId(programId);
    return trainingFeedbacks;
  },
};
