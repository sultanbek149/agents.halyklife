import { api } from '../config';

import type * as types from './types';

export const policyApi = {
  getPolicyList: ({ page, pageSize }: types.GetPolicyParams) => api<types.PolicyResponse>('GET', '/agent/v1/agents/me/policies', { params: { page, pageSize } }),

  getPolicyAnalytics: () => api<types.ChartResponse>('GET', '/agent/v1/agents/me/policies/analytics'),

  getPolicyPayments: (policyId: number | string) => api<types.PolicyPaymentsResponse>('GET', `/agent/v1/policy/payments`, { params: { policyId } }),

  getPolicyPaymentsNew: (policyId: number | string, paymentStatus: string = '', sortOrder?: string, page?: number, pageSize?: number) =>
    api<types.PolicyPaymentsResponse>('GET', `/agent/v1/policy/payments`, {
      params: { policyId, paymentStatus, sortOrder, page, pageSize },
    }),
};
