import { api } from '../config';

import type { ReferralManagerResponse } from './types';

export const referralApi = {
  validateManager: async (managerId: string): Promise<ReferralManagerResponse | null> => {
    try {
      return await api<ReferralManagerResponse>('GET', `/product/agents/${managerId}`);
    } catch {
      return null;
    }
  },
};
