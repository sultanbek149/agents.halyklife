import { agentServiceApi } from '../agent-service';
import { api } from '../config';

import type * as types from './types';
import type { agentServiceTypes } from '../types';

/**
 * Maps a `SubAgentNode` from the agent-service tree endpoint onto the legacy
 * `SubAgent` shape every existing call site (list/detail pages) was written
 * against. The tree node carries `managerId` but no manager *name*, so the
 * legacy `manager` field falls back to the id.
 */
const toSubAgent = (n: agentServiceTypes.SubAgentNode): types.SubAgent => ({
  agId: n.agId,
  managerId: n.managerId,
  agentNo: n.agentNo,
  fullname: n.fullname,
  sex: n.sex,
  agLevel: n.agLevel,
  lvl: n.lvl,
  hasSubagents: n.hasSubagents,
  dateOfCommencement: n.dateOfCommencement,
  depId: n.depId,
  lastName: n.lastName,
  depName: n.depName,
  subdepId: n.subdepId,
  subdepName: n.subdepName,
  iin: n.iin,
  phoneNumber: n.phoneNumber == null ? '' : String(n.phoneNumber),
  agentState: n.agentState,
  licRegionId: n.licRegionId,
  regionName: n.regionName,
  manager: n.managerId,
});

export const agentApi = {
  // MIGRATED → agent-service `/agent/v1/agents/me/statistics`.
  getAgentStatistics: () => agentServiceApi.getStatistics(),

  getMeStatistics: () => api<types.AgentStatisticsResponse>('GET', '/agent/v1/agents/me/statistics'),

  // MIGRATED → agent-service `/agent/v1/agents/me/sub-agents` (was
  // `/product/agents/mka/subagents`). Unwraps the envelope and maps the tree
  // node to the legacy `SubAgent` shape so callers stay unchanged.
  getSubAgents: async (): Promise<types.SubAgent[]> => {
    const { data } = await agentServiceApi.getSubAgents();
    return (data ?? []).map(toSubAgent);
  },

  // MIGRATED → the agent-service tree has no by-id route, so the detail view is
  // satisfied by locating the node (`agId`) in the authenticated agent's tree.
  getSubAgentById: async (id: string): Promise<types.SubAgent | null> => {
    const { data } = await agentServiceApi.getSubAgents();
    const node = (data ?? []).find(n => n.agId === id || n.agentNo === id);
    return node ? toSubAgent(node) : null;
  },

  // MIGRATED → agent-service paginated policies. Reshaped to `{ items }` to
  // preserve the legacy return contract.
  getAgentPolicies: async (): Promise<{ items: agentServiceTypes.Policy[] }> => {
    const { data } = await agentServiceApi.getPolicies({ page: 1, pageSize: 100 });
    return { items: data?.items ?? [] };
  },

  // MIGRATED → agent-service level awards `/agent/v1/levels/{level}/awards`.
  getLevelById: (id: number) => api<types.LevelResponse>('GET', `/agent/v1/levels/${id}/awards`),

  getLevelAwards: (level: number, lang: string) =>
    api<types.LevelResponse>('GET', `/agent/v1/levels/${level}/awards`, {
      headers: {
        'Accept-Language': lang, // или lang: 'en' 'ru' 'kk' --- default: 'en'
      },
    }),

  // MIGRATED → agent-service synchronous export endpoints (was the generic
  // `/product/agents/mka/reports/f{type}`). `type` selects the report family.
  getReports: (type: string, startDate: string, endDate?: string) => {
    if (type === 'rewards') return agentServiceApi.exportRewards();
    if (type === 'payslips') return agentServiceApi.exportPayslips(startDate, endDate ?? startDate);
    return agentServiceApi.exportPolicies(startDate, endDate ?? startDate, '');
  },

  getReportsPolicies: (start_date: string, end_date: string, filter?: string) =>
    api<types.ReportResponse>('GET', `/agent/v1/agents/me/policies/export`, {
      params: {
        ...(start_date && { start_date }),
        ...(end_date && { end_date }),
        ...(filter && { filter }),
      },
    }),

  getReportsPayslips: (start_date: string, end_date: string) =>
    api<types.ReportResponse>('GET', `/agent/v1/agents/me/payslips/export`, {
      params: {
        ...(start_date && { start_date }),
        ...(end_date && { end_date }),
      },
    }),

  getReportsRewards: () => api<types.ReportResponse>('GET', `/agent/v1/agents/me/rewards/export`),

  checkSurveyAvailability: () => api<{ isAvailable: boolean; quizId?: string; willBecomeAvailableAt?: string }>('GET', '/testing/quizes/check-availability'),

  startSurvey: () => api<{ quizId: string }>('POST', '/testing/quizes/start'),

  getSurveyQuestions: (quizId: string) => api<types.SurveyQuestion>('GET', `/testing/quizes/${quizId}/data`),

  saveSurveyAnswer: (quizId: string, answer: { answerId: string; questionId: string }) => api('POST', `/testing/quizes/${quizId}/save-answer`, { data: answer }),

  submitSurvey: (quizId: string) => api<types.SubmitSurveyResponse>('POST', `/testing/quizes/${quizId}/submit`),

  getCertificate: (quizId: string) => api<string>('GET', `/testing/quizes/${quizId}/certificate`),

  checkSurveyStatus: (iin: string) =>
    api<types.CheckSurveyStatusResponse>('GET', '/testing/quizes/testing-status', {
      params: { iin },
    }),

  getAgentStatus: () => api<types.AgentStatusResponse>('GET', '/agent/v1/agents/me/status'),
};
