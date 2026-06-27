import { api } from '../config';

import type * as types from './types';

export const statementApi = {
  getStatements: (debugIIN?: string, isAgent: boolean = false, state: types.StatementStatus = 'active') =>
    api<types.Statements>('GET', `/product/${isAgent ? 'agents' : 'products'}/applications`, {
      params: { debugIIN, state },
    }),

  getStatementById: (applicationType: StatementType, id: string, isAgent: boolean = false, state: types.StatementStatus = 'active') =>
    api<types.StatementDetail>('GET', `/product/${isAgent ? 'agents' : 'products'}/applications/${id}`, {
      params: { applicationType, state },
    }),

  checkPolicy: (policyNo: string, source: AvailableSources | '') => api<types.PolicyStatus>('GET', '/product/policies/validate', { params: { policyNo, source } }),
};
