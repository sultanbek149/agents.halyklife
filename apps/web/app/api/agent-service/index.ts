/**
 * Typed client for the `agent-service` (`/v1/*`) endpoints.
 *
 * The service runs behind the gateway under the `/agent` prefix, so every path
 * here is `/agent/v1/...`. Auth (`Bearer`), `Language` and `source` are injected
 * by the shared axios interceptor in `../config.ts`.
 *
 * Includes `/v1/admin/*`: since 2026-06-17 the admin group is open to any
 * authenticated agent (legacy-parity), so no separate back-office client.
 */
import { api } from '../config';

import type * as t from './types';

const V1 = '/agent/v1';

export const agentServiceApi = {
  // ─── Agent profile ─────────────────────────────────────────────────────────

  /** Search an agent by number for a given product/source. */
  searchAgent: (params: { source: string; productName: string; agentNumber: string }) => api<t.ApiResponse<t.Agent>>('GET', `${V1}/agents`, { params }),

  /** Authenticated agent's own profile. */
  getMe: () => api<t.ApiResponse<t.Me>>('GET', `${V1}/agents/me`),

  /** Active flag + sale channel for the authenticated agent. */
  getStatus: () => api<t.ApiResponse<t.AgentStatus>>('GET', `${V1}/agents/me/status`),

  /** Sub-agents tree for the authenticated agent. */
  getSubAgents: () => api<t.ApiResponse<t.SubAgentNode[]>>('GET', `${V1}/agents/me/sub-agents`),

  // ─── Sales KPI / Dashboard ──────────────────────────────────────────────────

  getDashboard: () => api<t.ApiResponse<t.DashboardData>>('GET', `${V1}/agents/me/dashboard`),

  /** Sales KPI (plan/fact) for the authenticated agent (`GET /v1/agents/me/sales/kpi`). */
  getSalesKpi: () => api<t.ApiResponse<t.SalesKpi>>('GET', `${V1}/agents/me/sales/kpi`),

  // ─── Statistics ────────────────────────────────────────────────────────────

  getStatistics: () => api<t.ApiResponse<t.AgentUnitInfo>>('GET', `${V1}/agents/me/statistics`),

  getStatisticsComparison: () => api<t.ApiResponse<t.PeriodComparison>>('GET', `${V1}/agents/me/statistics/comparison`),

  getStructure: () => api<t.ApiResponse<t.LeaderStructure>>('GET', `${V1}/agents/me/structure`),

  // ─── Policies ──────────────────────────────────────────────────────────────

  getPolicies: (params: { page?: number; pageSize?: number } = {}) => api<t.PaginatedResponse<t.Policy>>('GET', `${V1}/agents/me/policies`, { params }),

  /** Chart-ready policy analytics (donut + monthly stacked bar). */
  getPolicyAnalytics: () => api<t.ApiResponse<t.PolicyAnalytics>>('GET', `${V1}/agents/me/policies/analytics`),

  getPolicyRisks: (params: { riskLevel?: t.RiskLevel | ''; page?: number; pageSize?: number } = {}) =>
    api<t.PaginatedResponse<t.PolicyRisk>>('GET', `${V1}/agents/me/policies/risks`, { params }),

  /** Persist editable personal data (phone/email/etc). */
  setPersonalData: (data: Record<string, unknown>) => api<t.ApiResponse<{ message: string }>>('PUT', `${V1}/agents/me/personal-data`, { data }),

  // ─── Contracts ─────────────────────────────────────────────────────────────

  getProblemContracts: () => api<t.ApiResponse<t.AgentContractListing[]>>('GET', `${V1}/agents/me/contracts/problem`),

  getVoidContracts: () => api<t.ApiResponse<t.AgentContractListing[]>>('GET', `${V1}/agents/me/contracts/void`),

  getNoNoticeContracts: () => api<t.ApiResponse<t.AgentContractListing[]>>('GET', `${V1}/agents/me/contracts/no-notice`),

  getShelveContracts: () => api<t.ApiResponse<t.ShelveContractRow[]>>('GET', `${V1}/agents/me/contracts/shelve`),

  getCoverRates: () => api<t.ApiResponse<t.CoverRate[]>>('GET', `${V1}/agents/me/cover-rates`),

  getPayReminders: (params: { startDate: string; endDate: string }) => api<t.ApiResponse<t.PayReminderRow[]>>('GET', `${V1}/agents/me/pay-reminders`, { params }),

  // ─── Policy payments ───────────────────────────────────────────────────────

  // `paymentStatus` is required by the service (doc §5.6: paid|unpaid|overdue).
  getPolicyPayments: (params: { policyId: number | string; paymentStatus: t.PaymentStatus; sortOrder?: 'asc' | 'desc'; page?: number; pageSize?: number }) =>
    api<t.PaginatedResponse<t.PolicyPayment>>('GET', `${V1}/policy/payments`, { params }),

  getPaymentsCount: (policyId: number | string) => api<t.ApiResponse<t.CountOfPayments>>('GET', `${V1}/policy/payments/count`, { params: { policyId } }),

  getRecognizedPayments: (params: { policyNo?: string; bin?: string; dateFrom?: string; dateTo?: string; page?: number; pageSize?: number } = {}) =>
    api<t.PaginatedResponse<t.RecognizedPayment>>('GET', `${V1}/policy/payments/recognized`, { params }),

  // ─── Policy journal ────────────────────────────────────────────────────────

  getJournal: (policyNo: string) => api<t.ApiResponse<t.PolicyJournalEntry[]>>('GET', `${V1}/policy/journal`, { params: { policyNo } }),

  getJournalHead: (policyId: number | string) => api<t.ApiResponse<t.PolicyJournalHead>>('GET', `${V1}/policy/journal/head`, { params: { policyId } }),

  getJournalState: (policyId: number | string) => api<t.ApiResponse<t.PolicyJournalState[]>>('GET', `${V1}/policy/journal/state`, { params: { policyId } }),

  getJournalPlan: (policyId: number | string) => api<t.ApiResponse<t.PolicyJournalPlan[]>>('GET', `${V1}/policy/journal/plan`, { params: { policyId } }),

  /** Journal as a PDF (BI Publisher). Returns a raw Blob. */
  exportJournal: (policyNo: string) => api<Blob>('GET', `${V1}/policy/journal/export`, { params: { policyNo }, responseType: 'blob' }),

  // ─── Reward calculator / awards ──────────────────────────────────────────────

  calcReward: (params: t.RewardCalcParams) => api<t.ApiResponse<t.RewardCalcResult>>('GET', `${V1}/agents/me/reward-calculator`, { params }),

  getAwards: () => api<t.ApiResponse<t.AgentAwardProgress[]>>('GET', `${V1}/agents/me/awards`),

  /** Reward conditions for a single MLM level. */
  getLevelAwards: (level: number | string) => api<t.ApiResponse<t.LevelAward>>('GET', `${V1}/levels/${level}/awards`),

  // ─── Reports: synchronous file exports ───────────────────────────────────────

  exportPolicies: (start_date: string, end_date: string, filter = '') =>
    api<t.ApiResponse<t.ReportFile>>('GET', `${V1}/agents/me/policies/export`, { params: { start_date, end_date, filter } }),

  exportPayslips: (start_date: string, end_date: string) => api<t.ApiResponse<t.ReportFile>>('GET', `${V1}/agents/me/payslips/export`, { params: { start_date, end_date } }),

  exportRewards: () => api<t.ApiResponse<t.ReportFile>>('GET', `${V1}/agents/me/rewards/export`),

  exportWorkAct: (params: { startDate: string; endDate: string; isBTA?: string }) => api<t.ApiResponse<t.ReportFile>>('GET', `${V1}/agents/me/work-act/export`, { params }),

  exportReconciliation: (params: { startDate: string; endDate: string }) => api<t.ApiResponse<t.ReportFile>>('GET', `${V1}/agents/me/reconciliation/export`, { params }),

  // ─── Reports: payslip JSON (cached) ──────────────────────────────────────────

  getPayslipData: (params: { start_date: string; end_date: string; refresh?: boolean }) => api<t.ApiResponse<t.AgentPayslip>>('GET', `${V1}/agents/me/payslips`, { params }),

  // ─── Reports: async jobs (submit → poll → download) ──────────────────────────

  submitPayslipJob: (params: { startDate: string; endDate: string; isBTA?: string }) => api<t.ApiResponse<t.JobSubmit>>('POST', `${V1}/agents/me/payslips/jobs`, { params }),

  submitPayrollJob: (params: t.PayrollJobParams) => api<t.ApiResponse<t.JobSubmit>>('POST', `${V1}/reports/payroll/jobs`, { params }),

  /** The agent's report jobs (newest first). Empty `[]` if no cabinet / non-STR. */
  listJobs: () => api<t.ApiResponse<t.ReportJob[]>>('GET', `${V1}/reports/jobs`),

  getJobStatus: (jobId: string) => api<t.ApiResponse<t.JobStatus>>('GET', `${V1}/reports/jobs/${jobId}`),

  /** Stream a job artifact. Returns a raw Blob. */
  downloadJobFile: (jobId: string, fileId: string, source: 'report' | 'subrep') =>
    api<Blob>('GET', `${V1}/reports/jobs/${jobId}/files/${fileId}`, { params: { source }, responseType: 'blob' }),

  // ─── Manager-scoped report exports ───────────────────────────────────────────

  exportDepWorkAct: (params: t.DepReportFilter) => api<t.ApiResponse<t.ReportFile>>('GET', `${V1}/reports/work-act/export`, { params }),

  exportDepReconciliation: (params: Omit<t.DepReportFilter, 'isBTA'>) => api<t.ApiResponse<t.ReportFile>>('GET', `${V1}/reports/reconciliation/export`, { params }),

  // ─── Message attachments ─────────────────────────────────────────────────────

  /** Download a message attachment. Returns a raw Blob. */
  downloadMessageAttachment: (messageId: string) => api<Blob>('GET', `${V1}/agents/me/messages/${messageId}/attachment`, { responseType: 'blob' }),

  // ─── Dictionaries ────────────────────────────────────────────────────────────

  getSubDepartments: (depId: string) => api<t.ApiResponse<t.SubDepartment[]>>('GET', `${V1}/dictionaries/sub-departments`, { params: { depId } }),

  getCalcPeriods: (depId: string) => api<t.ApiResponse<t.CalcPeriod[]>>('GET', `${V1}/dictionaries/calculation-periods`, { params: { depId } }),

  getProductYears: (depId: string, productId: string) => api<t.ApiResponse<number[]>>('GET', `${V1}/dictionaries/product-years`, { params: { depId, productId } }),

  /** Global department list (MLM `DEPARTMENTS`, `STATUS='A'`). */
  getDepartments: () => api<t.ApiResponse<t.Department[]>>('GET', `${V1}/dictionaries/departments`),

  /** Products of a department (MLM `MAG_DELITEL` by `AGENS=depId`). */
  getProducts: (depId: string) => api<t.ApiResponse<t.Product[]>>('GET', `${V1}/dictionaries/products`, { params: { depId } }),

  /** Global region list (MLM `LIC_REGIONS`). */
  getRegions: () => api<t.ApiResponse<t.Region[]>>('GET', `${V1}/dictionaries/regions`),

  /** Payer BINs (MLM via DB-link). Heavy (~20s cold); Redis-cached 5 min. */
  getPayerBins: () => api<t.ApiResponse<t.PayerBin[]>>('GET', `${V1}/dictionaries/payer-bins`),

  // ─── Admin (open to any agent since 2026-06-17) ──────────────────────────────

  getUnrecognizedPayments: (params: { bin?: string; paymentSum?: string; dateFrom?: string; dateTo?: string; page?: number; pageSize?: number } = {}) =>
    api<t.ApiResponse<{ items: t.UnrecognizedPayment[] }>>('GET', `${V1}/admin/payments/unrecognized`, { params }),

  getGroupMembership: (agentId: number | string) => api<t.ApiResponse<t.AgentGroupMembership>>('GET', `${V1}/admin/agent-groups/membership/${agentId}`),

  searchGroupAgents: (params: { name: string }) => api<t.ApiResponse<t.AgentGroupMember[] | null>>('GET', `${V1}/admin/agent-groups/agents`, { params }),

  getGroupCurators: (params: { page?: number; pageSize?: number } = {}) =>
    api<t.ApiResponse<{ items: t.AgentGroupMember[] }>>('GET', `${V1}/admin/agent-groups/curators`, { params }),

  createAgentGroup: (data: t.CreateAgentGroupBody) => api<t.ApiResponse<t.CreateAgentGroupResult>>('POST', `${V1}/admin/agent-groups`, { data }),

  /** FO-registry lookup (`iin` takes priority over `name`). 503 on dev/test. */
  getFoAgents: (params: { iin?: string; name?: string }) => api<t.ApiResponse<t.FoAgent | null>>('GET', `${V1}/admin/fo-agents`, { params }),

  getFoAgentsFull: (params: { iin?: string; name?: string; code?: string }) => api<t.ApiResponse<t.FoAgent | null>>('GET', `${V1}/admin/fo-agents/full`, { params }),

  getFoAgentsBatch: (data: { agentIds: number[] }) => api<t.ApiResponse<t.FoAgent[] | null>>('POST', `${V1}/admin/fo-agents/batch`, { data }),

  // ─── Tasks ──────────────────────────────────────────────────────────────────

  getTasks: () => api<t.ApiResponse<t.Task[]>>('GET', `${V1}/tasks`),

  createTask: (data: t.TaskInput) => api<t.ApiResponse<t.Task>>('POST', `${V1}/tasks`, { data }),

  patchTask: (id: string, status: t.TaskStatus) =>
    api<t.ApiResponse<t.Task>>('PATCH', `${V1}/tasks/${id}`, { data: { status } }),

  // ─── Payment delegation ──────────────────────────────────────────────────────

  /** Assign an unrecognized payment to an agent (`POST /v1/admin/payments/unrecognized/{statementId}/assign`). */
  assignUnrecognizedPayment: (statementId: string, data: { assigneeIin: string; dueAt?: string | null; snapshot?: Record<string, unknown> }) =>
    api<t.ApiResponse<{ status: string }>>('POST', `${V1}/admin/payments/unrecognized/${statementId}/assign`, { data }),

  /** Update an unrecognized payment's workflow status (`PATCH /v1/admin/payments/unrecognized/{statementId}`). */
  updateUnrecognizedPayment: (statementId: string, data: { status: string; resolution?: string }) =>
    api<t.ApiResponse<{ status: string }>>('PATCH', `${V1}/admin/payments/unrecognized/${statementId}`, { data }),

  /** Delegated payments assigned to the authenticated agent (`GET /v1/agents/me/delegated-payments`). */
  getDelegatedPayments: () => api<t.ApiResponse<t.PaymentAssignment[]>>('GET', `${V1}/agents/me/delegated-payments`),

  // ─── Messages ────────────────────────────────────────────────────────────────

  /** Agent inbox messages, paginated (`GET /v1/agents/me/messages`). */
  getMessages: (params: { page?: number; pageSize?: number } = {}) =>
    api<t.PaginatedResponse<t.NotificationItem>>('GET', `${V1}/agents/me/messages`, { params }),

  /** Mark a message as read (`PATCH /v1/agents/me/messages/{id}/read`). */
  markMessageRead: (id: string) => api<t.ApiResponse<{ status: string }>>('PATCH', `${V1}/agents/me/messages/${id}/read`),

  // ─── Cabinet Analytics ────────────────────────────────────────────────────

  /** Cabinet funnel + overdue counters (`GET /v1/agents/me/analytics`). */
  getCabinetAnalytics: () => api<t.ApiResponse<t.CabinetAnalytics>>('GET', `${V1}/agents/me/analytics`),

  // ─── Push Templates ───────────────────────────────────────────────────────

  /** List all push templates (`GET /v1/push-templates`). */
  listPushTemplates: () => api<t.ApiResponse<t.PushTemplate[]>>('GET', `${V1}/push-templates`),

  /** Create a push template (`POST /v1/push-templates`). */
  createPushTemplate: (data: t.PushTemplateInput) => api<t.ApiResponse<t.PushTemplate>>('POST', `${V1}/push-templates`, { data }),

  /** Update a push template (`PATCH /v1/push-templates/{id}`). */
  updatePushTemplate: (id: string, data: t.PushTemplateInput) => api<t.ApiResponse<t.PushTemplate>>('PATCH', `${V1}/push-templates/${id}`, { data }),

  /** Delete a push template (`DELETE /v1/push-templates/{id}`). */
  deletePushTemplate: (id: string) => api<t.ApiResponse<{ status: string }>>('DELETE', `${V1}/push-templates/${id}`),

  /** Send a push template to recipients (`POST /v1/push-templates/{id}/send`). */
  sendPushTemplate: (id: string, recipientIins: string[]) =>
    api<t.ApiResponse<{ count: number }>>('POST', `${V1}/push-templates/${id}/send`, { data: { recipientIins } }),
};
