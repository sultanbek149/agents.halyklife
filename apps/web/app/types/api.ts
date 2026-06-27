/**
 * Контракты данных agent-service (Go/Fiber, база `/v1`).
 * Имена полей сверены с `../agent-service/internal/entity/*` и `response/*`.
 * Конверт ответа: { success, data, message }.
 */

export interface ApiEnvelope<T> {
  success: boolean
  data: T
  message?: string
}

export interface Paginated<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}

/* ─── Профиль агента: GET /v1/agents/me ─── */
export interface Brand {
  name: string
  logoUrl: string
  primaryColor: string
}
export interface Channel {
  type: 'str' | 'partner'
  saleChannel: string
  brand: Brand
}
export interface ManagerInfo {
  id: string
  staffId: number
  name: string
  fullName: string
  officeId: number
  officeName: string
}
export interface Me {
  manId: string
  agentId: string
  agentNo: string
  agentName: string
  mainAgent: string | null
  prefix: string
  saleChannel: string | null
  officeId: string | null
  officeNo: string | null
  staffId: string | null
  staffName: string
  iin: string
  level: number | null
  birthDate: string
  manager: ManagerInfo
  channel: Channel
  flags: { showPersonalKpi: boolean; showPersonalStorefront: boolean }
  permissions: string[]
}

export interface AgentStatus {
  isActive: boolean
  saleChannel: string
}

/* ─── Единицы / уровень: GET /v1/agents/me/statistics ─── */
export interface UnitSums {
  perUnit: string
  groupUnit: string
  allUnit: string
}
export interface NextLevelConditions {
  levId: number
  minCommonUnits: number
  minPersonalUnits: number
  minSubordinateLevel: number
  minSubordinateQty: number
  baseRate: string
}
export interface AgentUnitInfo {
  level: number
  unit: UnitSums
  nextlevelConditions: NextLevelConditions
  leftPerUnit: string
  leftGroupUnit: string
  subAgentCount: number | null
  leftsubAgentCount: number | null
  agencyPaymentsCurrent: string
  totalItems: number
}

/* ─── Сравнение периодов: GET /v1/agents/me/statistics/comparison ─── */
export interface ComparisonMetric {
  current: string
  previous: string
  subDepAverage: string | null
}
export interface PeriodComparison {
  period: {
    current: { from: string; to: string }
    previous: { from: string; to: string }
  }
  fee: ComparisonMetric
  units: ComparisonMetric
  policies: { current: number; previous: number; subDepAverage: string | null }
  subDepAverageAvailable: boolean
}

/* ─── Структура: GET /v1/agents/me/structure ─── */
export interface LeaderBranch {
  agId: string
  agentNo: string
  fullname: string
  level: number
  teamSize: number
  activeCount: number
  dormantCount: number
  units: string
  fee: string
  policies: number
}
export interface LeaderStructureAgent {
  agId: string
  managerId: string
  agentNo: string
  fullname: string
  level: number
  branchRootAgId: string
  units: string
  fee: string
  policies: number
  dormant: boolean
}
export interface LeaderStructure {
  period: { current: { from: string; to: string } }
  dormantThresholdDays: number
  summary: {
    totalAgents: number
    activeAgents: number
    dormantAgents: number
    totalUnits: string
    totalFee: string
    totalPolicies: number
  }
  branches: LeaderBranch[]
  agents: LeaderStructureAgent[]
}

export interface SubAgentNode {
  agId: string
  managerId: string
  agentNo: string
  fullname: string
  lastName: string
  firstName: string
  patronymic: string
  agLevel: string
  lvl: string
  hasSubagents: boolean
  depName: string
  subdepName: string
  iin: string
  agentState: string
  regionName: string
}

/* ─── Полисы / клиенты ─── */
export interface Policy {
  policyId: number
  policyNo: string
  agentId: string
  name: string
  insrType: string
  policyState: string
  insrBegin: string
  insrEnd: string
  grossPremium: number
  agentCommission: number
  dateGiven: string
  insurerId: number
}
export interface PolicyRisk {
  policyNo: string
  clientName: string
  agentNumber: string
  agentName: string
  riskLevel: 'red' | 'yellow' | 'status' | 'green'
  reasons: string[]
  nextPayDate: string | null
  nextPayAmount: number | null
  stateName: string | null
}

/* ─── Награды / уровни ─── */
export interface AgentAwardProgress {
  rownum: number
  awardName: string
  statusCode: number // 1=не получена, 2=не достигнута, 3=не выполнена, 4=выполнена
  statusName: string
  leftPerUnit: string | null
  leftGroupUnit: string | null
  leftSubAgentCount: number | null
  minSubordinateLevel: number | null
  leftDaysCount?: string
}
export interface LevelReward {
  id: number
  condition: string
  rate: number
  additionalRewardCondition: string
  additionalReward: string
  rewardValue: string
}

/* ─── Калькулятор: GET /v1/agents/me/reward-calculator ─── */
export interface RewardCalcResult {
  UnitsSum: number
  CommissionSum: number
  Message: string
}

/* ─── Платежи ─── */
export interface UnrecognizedPayment {
  statementId: string
  postDate: string
  payerName: string | null
  payerBin: string
  firstAmount: number
  factAmount: number
  amount: number
  purpose: string | null
  policyNo: string | null
  note: string | null
}
export interface RecognizedPayment {
  payerBin: string
  payerName: string
  postDate: string
  firstAmount: number | null
  policyNo: string | null
  factAmount: number | null
  status: string | null
  agentNo: string | null
  listId: number
}

/* ─── Задачи: /v1/tasks ─── */
export type TaskStatus = 'new' | 'accepted' | 'progress' | 'overdue' | 'done' | 'escalated'
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent'
export interface Task {
  id: string
  type: string
  authorIin: string
  assigneeIin: string
  clientRef: string | null
  policyNo: string | null
  deadline: string | null
  priority: TaskPriority
  comment: string
  expectedResult: string
  status: TaskStatus
  createdAt: string
  acceptedAt: string | null
  doneAt: string | null
}

/* ─── KPI / дашборд ─── */
export interface SalesKpi {
  channelType: 'str' | 'partner'
  personal: boolean
  period: string
  fact: string
  plan: string
  percentDone: number
  partnerName: string
}
export interface DashboardData {
  kpi: SalesKpi
  level: number
  policiesThisMonth: number
}
export interface CabinetAnalytics {
  funnel: { steps: { status: string; count: number }[]; total: number }
  overdue: { overdueTasks: number; escalatedTasks: number; overduePayments: number }
}

/* ─── Расчётный лист ─── */
export interface PayslipLine {
  label: string
  base: string
  rate: string
  sum: string
}

/* ─── Отчёты ─── */
export interface ReportJobFile {
  id: string
  source: 'report' | 'subrep'
  name: string
  createdAt: string
}
export interface ReportJob {
  jobId: string
  reportId: string
  status: string
  message: string
  files: ReportJobFile[]
}

/* ─── Уведомления / сообщения ─── */
export interface AgentMessage {
  id: string
  title: string
  text: string
  createdAt: string
  read: boolean
  kind?: string
  cta?: { label: string; to: string } | null
}

/* ─── Справочники ─── */
export interface DictItem {
  id: string
  name: string
}
export interface CalcPeriod {
  id: string
  label: string
}
