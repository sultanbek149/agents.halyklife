import { api } from '../config';

import type * as types from './types';

export const userApi = {
  getUserData: () => api<UserInfo>('GET', '/users'),

  BMGService: ({ iin, phone }: { iin: string; phone: string }) =>
    api<{ success: boolean }>('POST', '/account/auth/phone', {
      params: { iin, phone },
    }),

  fetchInfoFromGBDFL: (memberData: { iin: string; phone: string }) =>
    api<GBDFLResponse>('POST', '/account/users/short-name', {
      data: memberData,
    }),

  getAccountData: () => api<types.AccountDataType>('GET', '/account/contragent'),

  getPersonaldata: () => api<types.AgentResponse>('GET', '/agent/v1/agents/me'),
};
