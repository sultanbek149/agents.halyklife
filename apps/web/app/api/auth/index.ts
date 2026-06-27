import { api } from '../config';

import type * as types from './types';

export const authApi = {
  auth: (credentials: types.AuthCredentials) => api<{ accessToken: string }>('POST', '/auth', { data: credentials }),

  getEgovQr: () => api<types.AuthWithEgovResponse>('GET', '/account/auth/egov/link/mobile', { params: { userType: 'juridical_web', source: 'web' } }),

  getLastCommitHash: () => api<types.GetLastCommitHashResponse>('GET', '/application/front/mobile-web'),
};
