import { reviewCycles, goals } from '../data/mock/performance.mock';

export const performanceApi = {
  getCycles: async () => reviewCycles,
  getGoals: async (userId: string) => goals.filter((g) => g.employeeId === userId),
};
