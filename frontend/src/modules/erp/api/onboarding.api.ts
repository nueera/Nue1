import { onboardingTemplates, newHires } from '../data/mock/onboarding.mock';

export const onboardingApi = {
  getTemplates: async () => onboardingTemplates,
  getNewHires: async () => newHires,
  getDetail: async (id: string) => newHires.find((nh) => nh.id === id) || null,
};
