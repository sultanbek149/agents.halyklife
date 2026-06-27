/**
 * Typed contract for the `agent-service` (`/v1/*`) endpoints, reached through
 * the gateway under the `/agent` prefix (see `./index.ts`).
 *
 * Types are derived 1:1 from the Go service schemas
 * (`agent-service/internal/entity/*`, `.../handler/restapi/v1/response/*`,
 * `.../service/report/resp/*`). Conventions:
 *   - Every successful body is the `{ success, data }` envelope below.
 *   - List endpoints that paginate return `Paginated<T>` inside `data`.
 *   - Go `decimal.Decimal` marshals as a JSON **string** (shopspring default),
 *     so monetary/unit values are typed `string`, not `number`.
 *   - Go `time.Time` marshals as an RFC3339 **string**.
 *   - Go pointer fields (`*T`) become `T | null`.
 */

// ─── Envelopes ───────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export type PaginatedResponse<T> = ApiResponse<Paginated<T>>;

// ─── Agent profile ───────────────────────────────────────────────────────────

export interface Manager {
  id: string;
  staffId: number;
  name: string;
  fullName: string;
  officeId: number;
  officeName: string;
}

export interface Agent {
  manId: string;
  agentId: string;
  agentNo: string;
  agentName: string;
  mainAgent: string | null;
  prefix: string;
  saleChannel: string | null;
  staffId: string | null;
  officeNo: string | null;
  officeId: string | null;
  staffName: string;
  priority: number;
  iin: string;
  level: number | null;
  birthDate: string;
  manager: Manager;
}

export interface Brand {
  name: string;
  logoUrl: string;
  primaryColor: string;
}

export interface Channel {
  type: 'str' | 'partner';
  saleChannel: string;
  brand: Brand;
}

export interface Flags {
  showPersonalKpi: boolean;
  showPersonalStorefront: boolean;
}

// Me расширяет существующий Agent полями кабинета.
export interface Me extends Agent {
  channel: Channel;
  flags: Flags;
  permissions: string[];
}

export interface AgentStatus {
  isActive: boolean;
  saleChannel: string;
}

/** Row of `GET /v1/agents/me/sub-agents` (returned inside the `data` envelope). */
export interface SubAgentNode {
  agId: string;
  managerId: string;
  agentNo: string;
  lastName: string;
  firstName: string;
  patronymic: string;
  fullname: string;
  sex: string;
  agLevel: string;
  lvl: string;
  isLeaf?: string | null;
  hasSubagents: boolean;
  dateOfCommencement: string;
  depId: string;
  depName: string;
  subdepId: string;
  subdepName: string;
  iin: string;
  phoneNumber: unknown;
  agentState: string;
  licRegionId: number;
  regionName: string;
}

// ─── Statistics: unit info / comparison / leader structure ──────────────────

export interface UnitSums {
  perUnit: string;
  groupUnit: string;
  allUnit: string;
}

export interface LevelCondition {
  levId: number;
  minCommonUnits: number;
  minPersonalUnits: number;
  minSubordinateLevel: number;
  minSubordinateQty: number;
  baseRate: string;
}

/** `GET /v1/agents/me/statistics` — `entity.AgentUnitInfo`. */
export interface AgentUnitInfo {
  level: number;
  unit: UnitSums;
  nextlevelConditions: LevelCondition | null;
  leftPerUnit: string;
  leftGroupUnit: string;
  subAgentCount: number | null;
  leftsubAgentCount: number | null;
  agencyPaymentsCurrent: string;
  totalItems: number;
}

export interface PeriodWindow {
  from: string;
  to: string;
}

export interface MetricComparison {
  current: string;
  previous: string;
  subDepAverage: string | null;
}

export interface PolicyComparison {
  current: number;
  previous: number;
  subDepAverage: string | null;
}

/** `GET /v1/agents/me/statistics/comparison` — `entity.PeriodComparison`. */
export interface PeriodComparison {
  period: {
    current: PeriodWindow;
    previous: PeriodWindow;
  };
  fee: MetricComparison;
  units: MetricComparison;
  policies: PolicyComparison;
  subDepAverageAvailable: boolean;
}

export interface LeaderStructureAgent {
  agId: string;
  managerId: string;
  agentNo: string;
  fullname: string;
  level: number;
  branchRootAgId: string;
  units: string;
  fee: string;
  policies: number;
  dormant: boolean;
}

export interface LeaderBranch {
  agId: string;
  agentNo: string;
  fullname: string;
  level: number;
  teamSize: number;
  activeCount: number;
  dormantCount: number;
  units: string;
  fee: string;
  policies: number;
}

export interface LeaderSummary {
  totalAgents: number;
  activeAgents: number;
  dormantAgents: number;
  totalUnits: string;
  totalFee: string;
  totalPolicies: number;
}

/** `GET /v1/agents/me/structure` — `entity.LeaderStructure`. */
export interface LeaderStructure {
  period: { current: PeriodWindow };
  dormantThresholdDays: number;
  summary: LeaderSummary;
  branches: LeaderBranch[];
  agents: LeaderStructureAgent[];
}

// ─── Policies: list / analytics / risk ──────────────────────────────────────

export interface Policy {
  policyId: number;
  policyNo: string;
  agentId: string;
  name: string;
  insrType: string;
  policyState: string;
  insrBegin: string;
  insrEnd: string;
  grossPremium: number;
  agentCommission: number;
  dateGiven: string;
  insurerId: number;
}

/** Donut slice of `GET /v1/agents/me/policies/analytics`. Inner shape inferred —
 * arrays were empty in the 2026-06-17 test run. */
export interface PolicyAnalyticsDonutItem {
  label: string;
  value: number;
}

export interface PolicyAnalyticsDonut {
  total: number;
  items: PolicyAnalyticsDonutItem[];
}

export interface PolicyAnalyticsSeries {
  name: string;
  data: number[];
}

export interface PolicyAnalyticsStackedBar {
  categories: string[]; // e.g. "2025-07" … "2026-06"
  series: PolicyAnalyticsSeries[];
  totals: number[];
}

/** `GET /v1/agents/me/policies/analytics` — chart-ready donut + monthly stacked bar. */
export interface PolicyAnalytics {
  donut: PolicyAnalyticsDonut;
  stackedBar: PolicyAnalyticsStackedBar;
}

// Traffic-light levels per the agent-service contract (red|yellow|green only).
// No `status` — that value is undocumented; see refactor-notes T-007.
export type RiskLevel = 'red' | 'yellow' | 'green';

/** Row of `GET /v1/agents/me/policies/risks` — `entity.PolicyRisk`. */
export interface PolicyRisk {
  policyNo: string;
  clientName: string;
  agentNumber: string;
  agentName: string;
  riskLevel: RiskLevel;
  reasons: string[];
  nextPayDate: string | null;
  nextPayAmount: number | null;
  stateName: string | null;
}

// ─── Contracts: problem / void / no-notice / shelve / cover / reminders ──────

/** Shared row shape for problem / void / no-notice contract lists. */
export interface AgentContractListing {
  policyNo: string;
  declareNo: string;
  startDate: string; // dd-mm-yyyy
  clientName: string;
  stateName: string;
  premium: string;
}

export interface CoverRate {
  coverId: string;
  coverName: string;
  divisor: string;
}

export interface ShelveContractRow {
  agentNo: string;
  agentFio: string;
  managerFio: string;
  clientName: string;
  declareNo: string;
  coverId: string;
  startDate: string; // dd-mm-yyyy
  stateName: string;
  putoffReason: string;
  premium: string;
}

export interface PayReminderRow {
  agentNo: string;
  agentFio: string;
  managerFio: string;
  clientName: string;
  policyNo: string;
  declareNo: string;
  coverId: string;
  startDate: string; // dd-mm-yyyy
  premium: string;
  planDate: string; // dd-mm-yyyy
  periodicity: string;
}

// ─── Policy payments ─────────────────────────────────────────────────────────

export type PaymentStatus = 'paid' | 'unpaid' | 'overdue';

export interface PolicyPayment {
  paymentAmount: number;
  paymentDate: string;
  paymentStatus: PaymentStatus;
}

export interface CountOfPayments {
  paid: number;
  unpaid: number;
  overdue: number;
  overall: number;
}

export interface RecognizedPayment {
  payerBin: string;
  payerName: string | null;
  postDate: string;
  firstAmount: number | null;
  policyNo: string | null;
  factAmount: number | null;
  status: string | null;
  agentNo: string | null;
  listId: number;
}

// ─── Policy journal ──────────────────────────────────────────────────────────

export interface PolicyJournalEntry {
  date: string;
  debet: number;
  credit: number;
  saldo: number;
  note: string | null;
  regDate: string;
}

export interface PolicyJournalHead {
  policyNo: string | null;
  conclusionDate: string;
  insrBeginDate: string;
  insrEndDate: string;
  manId: number;
  date: string;
  clientName: string;
  currency: string;
  insuredName: string | null;
  productName: string | null;
  programName: string | null;
  status: string | null;
  addStatus: string | null;
  dolg: number | null;
}

export interface PolicyJournalState {
  installId: number;
  voucherNo: string;
  voucherDate: string;
  installAmount: number;
  state: string | null;
}

export interface PolicyJournalPlan {
  date: string;
  delay: number | null;
  pay: number | null;
}

// ─── Reward calculator / awards ──────────────────────────────────────────────

export interface RewardCalcResult {
  unitsSum: string;
  commissionSum: string;
  message?: string;
}

export interface RewardCalcParams {
  productId: string;
  premiumSum: string;
  term: string;
  year: string;
  subAgentId?: string;
}

/** Row of `GET /v1/agents/me/awards` — `entity.AgentAwardProgress`. */
export interface AgentAwardProgress {
  rownum: number;
  awardName: string;
  leftPerUnit: string | null;
  leftGroupUnit: string | null;
  leftSubAgentCount: number | null;
  minSubordinateLevel: number | null;
  statusCode: number;
  statusName: string;
  leftDaysCount?: string;
}

// ─── MLM levels ──────────────────────────────────────────────────────────────

/** `GET /v1/levels/:level/awards` — reward conditions for a single MLM level. */
export interface LevelAward {
  id: number;
  condition: string;
  rate: number;
  additionalRewardCondition: string;
  additionalReward: string;
  rewardValue: string; // e.g. "20 МРП"
}

// ─── Reports: file exports / payslip JSON / async jobs ──────────────────────

/** Base64 file payload returned by the synchronous export endpoints. */
export interface ReportFile {
  fileType: string;
  fileName: string;
  bytes: string;
}

export interface PayslipUnit {
  perUnit: string;
  groupUnit: string;
  allUnit: string;
}

export interface PayslipStructureRow {
  agId: string;
  depId: number;
  agNo: string;
  agFio: string;
  startPeriodDate: string;
  agLn: number;
  agUnu: string;
  agentUtu: string;
  agentUku: string;
  agentLK: string;
}

export interface PayslipSubAgent {
  agId: string;
  agFio: string;
  agNo: string;
}

export interface PayslipFeeRow {
  clientFio: string;
  coverName: string;
  policyNo: string;
  policyLot: string;
  startDate: string;
  conTerm: number;
  conYear: number;
  periodicity: string;
  markRate: string;
  chSum: string;
  persUnits: string;
  groupUnits: string;
  parentAgentId: string;
  agentId: string;
}

/** `GET /v1/agents/me/payslips` — `resp.AgentPayslip` (structured JSON). */
export interface AgentPayslip {
  createDate: string;
  fullname: string;
  agentNo: string;
  agentLevel: number;
  regionName: string;
  subDepName: string;
  managerName: string;
  fromDate: string;
  toDate: string;
  unitFrom: PayslipUnit;
  unitChange: PayslipUnit;
  unitInsLife: PayslipUnit;
  unitTotalLife: PayslipUnit;
  unitCurrent: PayslipUnit;
  unitTo: PayslipUnit;
  unitChangeFee: PayslipUnit;
  unitCurrentFee: PayslipUnit;
  structure: PayslipStructureRow[];
  subAgents: PayslipSubAgent[];
  personalFee: PayslipFeeRow[];
  groupFee: PayslipFeeRow[];
}

/** A downloadable artifact attached to an async report job. */
export interface JobFile {
  id: string;
  source: 'report' | 'subrep';
  name: string;
  createdAt: string;
}

/** `GET /v1/reports/jobs/:jobId` — `entity.JobStatus`. */
export interface JobStatus {
  jobId: string;
  reportId?: string;
  status: string; // opaque legacy status ("suc"/"err"/…)
  message?: string;
  files: JobFile[];
}

export interface JobSubmit {
  jobId: string;
}

/** Row of `GET /v1/reports/jobs` — the agent's report jobs (newest first).
 * `jobId`/`status` may be empty for synchronous reports (`cab_reports` with no
 * async job); `reportId` is always present. */
export interface ReportJob {
  jobId: string;
  reportId: string;
  status: string;
  name: string;
  createdAt: string;
}

export interface DateRange {
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
}

export interface DepReportFilter extends DateRange {
  depId: string;
  subDepId?: string;
  regionId?: string;
  isBTA?: string;
}

export interface PayrollJobParams extends DepReportFilter {
  agFio?: string;
  agNo?: string;
}

// ─── Dictionaries ────────────────────────────────────────────────────────────

export interface SubDepartment {
  id: string;
  name: string;
}

export interface CalcPeriod {
  id: string;
  label: string;
}

/** Row of `GET /v1/dictionaries/departments` (global) — `{ id, name }`. */
export interface Department {
  id: string;
  name: string;
}

/** Row of `GET /v1/dictionaries/products?depId=` — `{ id, name }`. */
export interface Product {
  id: string;
  name: string;
}

/** Row of `GET /v1/dictionaries/regions` (global) — MLM `LIC_REGIONS`. */
export interface Region {
  id: string;
  name: string;
}

/** Row of `GET /v1/dictionaries/payer-bins` — payer BINs (MLM, via DB-link).
 * `name` is nullable in the source view. */
export interface PayerBin {
  bin: string;
  name: string | null;
}

// ─── Admin (`/v1/admin/*`) ───────────────────────────────────────────────────
// Open to any authenticated agent since 2026-06-17 (legacy-parity; no BackOffice
// role required). Kept here so the back-office surface stays in one typed client.

/** Row of `GET /v1/admin/payments/unrecognized`. */
export interface UnrecognizedPayment {
  statementId: string;
  postDate: string;
  payerName: string | null;
  payerBin: string;
  firstAmount: number;
  factAmount: number | null;
  amount: number;
  purpose: string | null;
  policyNo: string | null;
  note: string | null;
}

/** `GET /v1/admin/agent-groups/membership/:agentId`. */
export interface AgentGroupMembership {
  inGroup: boolean;
}

/** Shared row for `GET /v1/admin/agent-groups/curators` and `.../agents`. */
export interface AgentGroupMember {
  agentId: number;
  fullName: string;
}

export interface CreateAgentGroupBody {
  mainAgentId: number;
  agentIds: number[];
}

export interface CreateAgentGroupResult {
  created: boolean;
}

/** FO-registry agent profile. Shape is the prod FO record; undocumented here
 * because dev/test FO-DB is unavailable (503) — fields keyed loosely. */
export type FoAgent = Record<string, unknown>;

// ─── Sales KPI / Dashboard ───────────────────────────────────────────────────

/** `GET /agent/v1/agents/me/sales/kpi` — sales KPI for the authenticated agent. */
export interface SalesKpi {
  channelType: 'str' | 'partner';
  personal: boolean;
  period: string;
  fact: number | string;
  plan: number | string;
  percentDone: number;
  partnerName: string;
}

/** `GET /agent/v1/agents/me/dashboard` — top-level dashboard data. */
export interface DashboardData {
  kpi: SalesKpi;
  level: number;
  policiesThisMonth: number;
}

// ─── Tasks ───────────────────────────────────────────────────────────────────

export type TaskStatus = 'new' | 'accepted' | 'in_progress' | 'done' | 'overdue' | 'escalated' | 'closed';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Task {
  id: string;
  type: string;
  authorIin: string;
  assigneeIin: string;
  clientRef: string | null;
  policyNo: string | null;
  deadline: string | null;
  priority: TaskPriority;
  comment: string;
  expectedResult: string;
  status: TaskStatus;
  createdAt: string;
  acceptedAt: string | null;
  doneAt: string | null;
}

export interface TaskInput {
  type: string;
  assigneeIin?: string;
  clientRef?: string | null;
  policyNo?: string | null;
  deadline?: string | null;
  priority?: TaskPriority;
  comment?: string;
  expectedResult?: string;
}

// ─── Payment delegation ───────────────────────────────────────────────────────

/** Row of `GET /v1/agents/me/delegated-payments` — assignment record. */
export interface PaymentAssignment {
  statementId: string;
  assigneeIin: string;
  assignedByIin: string;
  dueAt: string | null;
  status: string;
  resolution: string | null;
  snapshot: Record<string, unknown>;
  updatedAt: string;
}

// ─── Messages / Notifications ─────────────────────────────────────────────────

/** Row of `GET /v1/agents/me/messages` — inbox notification item.
 * Named `NotificationItem` to avoid conflict with the DOM `Notification` API. */
export interface NotificationItem {
  id: string;
  type: string;
  payload: Record<string, unknown>;
  isRead: boolean;
  createdAt: string;
}

// ─── Cabinet Analytics ────────────────────────────────────────────────────────

export interface CabinetAnalyticsFunnelStep {
  status: string;
  count: number;
}

export interface CabinetAnalyticsFunnel {
  steps: CabinetAnalyticsFunnelStep[];
  total: number;
}

export interface CabinetAnalyticsOverdue {
  overdueTasks: number;
  escalatedTasks: number;
  overduePayments: number;
}

/** `GET /agent/v1/agents/me/analytics` — cabinet analytics (funnel + overdue counters). */
export interface CabinetAnalytics {
  funnel: CabinetAnalyticsFunnel;
  overdue: CabinetAnalyticsOverdue;
}

// ─── Push Templates ───────────────────────────────────────────────────────────

/** Row of `GET /agent/v1/push-templates` — push notification template. */
export interface PushTemplate {
  id: string;
  title: string;
  body: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Body for `POST /agent/v1/push-templates` and `PATCH /agent/v1/push-templates/{id}`. */
export interface PushTemplateInput {
  title: string;
  body: string;
  isActive?: boolean;
}
