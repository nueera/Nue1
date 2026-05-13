import type { JobOpening, Candidate, Referral } from '../data/mock/recruitment.mock';
import {
  jobOpenings,
  getJobOpeningById,
  candidates,
  getCandidatesByJobOpening,
  referrals,
} from '../data/mock/recruitment.mock';

export const recruitmentApi = {
  getJobOpenings: async (): Promise<JobOpening[]> => jobOpenings,
  getJobOpeningById: async (id: string): Promise<JobOpening | undefined> => getJobOpeningById(id),
  createJobOpening: async (data: Partial<JobOpening>): Promise<JobOpening> => {
    const newOpening: JobOpening = {
      id: `JOB${String(jobOpenings.length + 1).padStart(3, '0')}`,
      title: data.title || '',
      department: data.department || '',
      location: data.location || '',
      type: data.type || 'full-time',
      experience: data.experience || '',
      salary: data.salary || '',
      status: 'open',
      postedDate: new Date().toISOString().split('T')[0],
      applicants: 0,
      description: data.description || '',
    };
    return newOpening;
  },
};

export const candidateApi = {
  getByJobOpening: async (jobId: string): Promise<Candidate[]> => getCandidatesByJobOpening(jobId),
  updateStage: async (id: string, stage: Candidate['stage']): Promise<Candidate | undefined> => {
    const candidate = candidates.find((c) => c.id === id);
    if (candidate) {
      return { ...candidate, stage };
    }
    return undefined;
  },
};

export const referralApi = {
  getAll: async (): Promise<Referral[]> => referrals,
  create: async (data: Partial<Referral>): Promise<Referral> => {
    const newReferral: Referral = {
      id: `REF${String(referrals.length + 1).padStart(3, '0')}`,
      referredBy: data.referredBy || '',
      candidateName: data.candidateName || '',
      candidateEmail: data.candidateEmail || '',
      jobId: data.jobId || '',
      status: 'pending',
      bonusAmount: data.bonusAmount || 2500,
      bonusStatus: 'unpaid',
    };
    return newReferral;
  },
};
