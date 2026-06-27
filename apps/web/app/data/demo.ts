/**
 * Демо-данные кабинета (как в мокапе). Формы объектов соответствуют
 * контрактам ../agent-service (см. ~/types/api). В будущем заменяются
 * реальными вызовами из ~/api (agentServiceApi.*), перенесёнными из ../agents.
 */
import type {
  Task, TaskStatus, AgentMessage, PolicyRisk, LeaderBranch, AgentUnitInfo,
} from '~/types/api'

/* ── KPI / Главная ── */
export const kpi = { pct: 71, plan: '4 500 000', fact: '3 180 000', delta: '+7%', period: 'Июнь 2026' }

export interface TodayItem {
  id: string
  icon: string
  tone: 'danger' | 'amber' | 'brand' | 'info'
  title: string
  sub: string
  to: string
}
export const todayItems: TodayItem[] = [
  { id: 't1', icon: 'clock', tone: 'danger', title: 'Просроченная задача', sub: 'Звонок клиенту · STR-200118', to: '/tasks' },
  { id: 't2', icon: 'coins', tone: 'amber', title: '65 000 ₸ без списка', sub: 'Платёж требует распознавания', to: '/registry' },
  { id: 't3', icon: 'alert', tone: 'danger', title: 'Полис на риске · 82%', sub: 'KAR106271223E001 · просрочка', to: '/clients' },
  { id: 't4', icon: 'hourglass', tone: 'info', title: '594 000 ₸ висят 18 мес.', sub: 'Нераспознанный остаток MT102', to: '/registry' },
]

export const quickActions = [
  { id: 'q1', icon: 'clipboard', label: 'Поставить задачу', to: '/tasks' },
  { id: 'q2', icon: 'calculator', label: 'Калькулятор', to: '/calculator' },
  { id: 'q3', icon: 'receipt', label: 'Расчётный лист', to: '/payslip' },
  { id: 'q4', icon: 'download', label: 'Отчёты', to: '/reports' },
]

/* ── Агенты ветки (для пикеров делегирования) ── */
export interface DownAgent { agId: string; agentNo: string; name: string; city: string; level: number; initials: string }
export const downAgents: DownAgent[] = [
  { agId: '7000200033', agentNo: 'STR-200033', name: 'Абдулова Айнур', city: 'Шымкент', level: 4, initials: 'АА' },
  { agId: '7000200118', agentNo: 'STR-200118', name: 'Сапаров Ермек', city: 'Тараз', level: 3, initials: 'СЕ' },
  { agId: '7000200211', agentNo: 'STR-200211', name: 'Куанышева Динара', city: 'Шымкент', level: 2, initials: 'КД' },
  { agId: '7000200305', agentNo: 'STR-200305', name: 'Оспанов Нурлан', city: 'Кызылорда', level: 2, initials: 'ОН' },
  { agId: '7000200402', agentNo: 'STR-200402', name: 'Жумабекова Гульнар', city: 'Туркестан', level: 1, initials: 'ЖГ' },
]

/* ── Задачи ── */
const statusLabels: Record<TaskStatus, string> = {
  new: 'Новая', accepted: 'Принята', progress: 'В работе',
  overdue: 'Просрочена', done: 'Выполнена', escalated: 'Эскалация',
}
export const taskStatusLabel = (s: TaskStatus) => statusLabels[s]
export const taskStatusTone: Record<TaskStatus, 'green' | 'blue' | 'amber' | 'red' | 'grey' | 'purple'> = {
  new: 'green', accepted: 'blue', progress: 'amber', overdue: 'red', done: 'grey', escalated: 'purple',
}

export interface DemoTask extends Pick<Task, 'id' | 'priority' | 'status' | 'deadline' | 'comment'> {
  title: string
  ref: string
  assignee: string
  assigneeInitials: string
}
export const tasks: DemoTask[] = [
  { id: 'T-1042', title: 'Позвонить клиенту по продлению', ref: 'KAR106271223E001', assignee: 'Сапаров Ермек', assigneeInitials: 'СЕ', priority: 'urgent', status: 'overdue', deadline: '2026-06-25', comment: 'Продление до конца месяца' },
  { id: 'T-1043', title: 'Собрать документы по ДМС', ref: 'STR-200211', assignee: 'Куанышева Динара', assigneeInitials: 'КД', priority: 'high', status: 'progress', deadline: '2026-06-29', comment: '' },
  { id: 'T-1044', title: 'Уточнить БИН плательщика', ref: '4162059916C22839', assignee: 'Абдулова Айнур', assigneeInitials: 'АА', priority: 'medium', status: 'accepted', deadline: '2026-07-01', comment: '' },
  { id: 'T-1045', title: 'Назначить встречу по Life-Рента+', ref: 'STR-200305', assignee: 'Оспанов Нурлан', assigneeInitials: 'ОН', priority: 'low', status: 'new', deadline: '2026-07-03', comment: '' },
  { id: 'T-1046', title: 'Проверить просрочку по графику', ref: 'AUP115300620E027', assignee: 'Жумабекова Гульнар', assigneeInitials: 'ЖГ', priority: 'high', status: 'new', deadline: '2026-07-02', comment: '' },
  { id: 'T-1039', title: 'Подписать акт сверки', ref: 'STR-200033', assignee: 'Абдулова Айнур', assigneeInitials: 'АА', priority: 'medium', status: 'done', deadline: '2026-06-20', comment: '' },
]

/* ── Уведомления / сообщения ── */
export const notifications: (AgentMessage & { icon: string; time: string })[] = [
  { id: 'n1', icon: 'clock', title: 'Просроченная задача', text: 'Задача T-1042 просрочена — звонок клиенту по KAR106271223E001', createdAt: '2026-06-27T08:10:00Z', read: false, time: 'сегодня, 08:10', cta: { label: 'Открыть', to: '/tasks' } },
  { id: 'n2', icon: 'coins', title: 'Платёж без списка', text: 'Поступило 65 000 ₸ от КГУ «Школа №145» — требуется распознавание', createdAt: '2026-06-27T07:40:00Z', read: false, time: 'сегодня, 07:40', cta: { label: 'Открыть', to: '/registry' } },
  { id: 'n3', icon: 'trophy', title: 'Новая награда доступна', text: 'Вы выполнили условие «20 МРП» (Прил. 2)', createdAt: '2026-06-26T16:20:00Z', read: false, time: 'вчера, 16:20', cta: { label: 'Открыть', to: '/awards' } },
  { id: 'n4', icon: 'trending', title: 'KPI обновлён', text: 'План/факт за июнь: 71% (▲ +7% к маю)', createdAt: '2026-06-26T09:05:00Z', read: true, time: 'вчера, 09:05', cta: { label: 'Открыть', to: '/kpi' } },
  { id: 'n5', icon: 'users', title: 'Новый агент в ветке', text: 'Жумабекова Гульнар (STR-200402) присоединилась к структуре', createdAt: '2026-06-25T14:00:00Z', read: true, time: '25 июня', cta: { label: 'Открыть', to: '/structure' } },
]

/* ── Оплаты (вкладки) ── */
export interface UnrecRow { statement: string; amount: string; date: string; source: string; status: string; tone: 'amber' | 'red' | 'blue' }
export const unrecPayments: UnrecRow[] = [
  { statement: '4162059916C22839', amount: '65 000', date: '27.06.2026', source: 'Halyk Bank', status: 'Нет списка', tone: 'red' },
  { statement: '4162059917C22840', amount: '120 000', date: '26.06.2026', source: 'Kaspi', status: 'Частично', tone: 'blue' },
  { statement: '4162059918C22841', amount: '48 500', date: '25.06.2026', source: 'MT102', status: 'MT102 остаток', tone: 'amber' },
]
export interface RecRow { policyNo: string; client: string; amount: string; date: string }
export const recPayments: RecRow[] = [
  { policyNo: 'KAR106271223E001', client: 'Құрманалин Әлібек', amount: '10 000', date: '27.06.2026' },
  { policyNo: 'AUP115300620E027', client: 'Иванов Иван', amount: '25 000', date: '26.06.2026' },
  { policyNo: 'SHY200410522E113', client: 'Серікова Аружан', amount: '15 500', date: '24.06.2026' },
]

/* ── Реестр нераспознанных ── */
export interface RegOrg {
  id: string; org: string; bin: string; payNo: string; city: string; region: string
  total: number; planned: number; list: 'none' | 'mt102' | 'partial'; aging: 'green' | 'amber' | 'red'; agingLabel: string
}
export const registry: RegOrg[] = [
  { id: 'r1', org: 'КГУ «Общеобразовательная школа №145»', bin: '990440004030', payNo: 'CP00344', city: 'Алматы', region: 'г. Алматы', total: 65000, planned: 65000, list: 'none', aging: 'red', agingLabel: '18 мес.' },
  { id: 'r2', org: 'ТОО «Береке-Агро»', bin: '050340002918', payNo: 'CP00351', city: 'Тараз', region: 'Жамбылская', total: 120000, planned: 84000, list: 'partial', aging: 'amber', agingLabel: '6 мес.' },
  { id: 'r3', org: 'АО «Қазмұнай»', bin: '970140000311', payNo: 'CP00362', city: 'Атырау', region: 'Атырауская', total: 540000, planned: 0, list: 'mt102', aging: 'amber', agingLabel: '9 мес.' },
  { id: 'r4', org: 'ИП Сейтжанова', bin: '870101400512', payNo: 'CP00370', city: 'Шымкент', region: 'Туркестанская', total: 32000, planned: 32000, list: 'none', aging: 'green', agingLabel: '1 мес.' },
  { id: 'r5', org: 'ТОО «Логистик Транс»', bin: '120640008842', payNo: 'CP00381', city: 'Караганда', region: 'Карагандинская', total: 210000, planned: 150000, list: 'partial', aging: 'amber', agingLabel: '4 мес.' },
  { id: 'r6', org: 'КГП «Городская поликлиника №3»', bin: '000340007711', payNo: 'CP00390', city: 'Кызылорда', region: 'Кызылординская', total: 88000, planned: 0, list: 'none', aging: 'red', agingLabel: '12 мес.' },
  { id: 'r7', org: 'ТОО «Строй-Альянс»', bin: '160240009123', payNo: 'CP00399', city: 'Нур-Султан', region: 'г. Астана', total: 145000, planned: 145000, list: 'mt102', aging: 'green', agingLabel: '2 мес.' },
  { id: 'r8', org: 'АО «Аграрная компания»', bin: '030140001277', payNo: 'CP00405', city: 'Костанай', region: 'Костанайская', total: 76000, planned: 50000, list: 'partial', aging: 'amber', agingLabel: '5 мес.' },
]
export const regCities = ['Алматы', 'Тараз', 'Атырау', 'Шымкент', 'Караганда', 'Кызылорда', 'Нур-Султан', 'Костанай']

/* ── Клиенты / риск-светофор ── */
export const funnel = [
  { key: 'active', label: 'Активные', count: 142, tone: 'brand' as const },
  { key: 'new', label: 'Новые', count: 18, tone: 'info' as const },
  { key: 'renew', label: 'Продления', count: 9, tone: 'amber' as const },
  { key: 'risk', label: 'На риске', count: 7, tone: 'warning' as const },
  { key: 'overdue', label: 'Просроченные', count: 4, tone: 'danger' as const },
]
export interface RiskRow extends Pick<PolicyRisk, 'policyNo' | 'clientName' | 'riskLevel' | 'stateName'> {
  prob: number; product: string; premium: number; nextPay: string
}
export const risks: RiskRow[] = [
  { policyNo: 'KAR106271223E001', clientName: 'Құрманалин Әлібек Қанатұлы', riskLevel: 'red', prob: 82, product: 'Накопительное', premium: 120000, nextPay: '01.07.2026', stateName: 'Просрочка 14 дней' },
  { policyNo: 'AUP115300620E027', clientName: 'Иванов Иван Петрович', riskLevel: 'yellow', prob: 47, product: 'Life-Рента+', premium: 240000, nextPay: '05.07.2026', stateName: 'Скоро оплата' },
  { policyNo: 'SHY200410522E113', clientName: 'Серікова Аружан', riskLevel: 'green', prob: 12, product: 'Болашак-Life', premium: 90000, nextPay: '20.07.2026', stateName: 'В графике' },
  { policyNo: 'TRZ300110923E044', clientName: 'Дюсенов Бекзат', riskLevel: 'red', prob: 76, product: 'Байтерек', premium: 60000, nextPay: '28.06.2026', stateName: 'Просрочка 7 дней' },
]
export const funnelBars = [
  { label: 'Заявки', pct: 100, value: 180 },
  { label: 'Расчёты', pct: 74, value: 133 },
  { label: 'Оформлено', pct: 52, value: 94 },
  { label: 'Оплачено', pct: 41, value: 74 },
]

/* ── Структура (дерево ветки) ── */
export interface TreeNode {
  agId: string; name: string; city: string; level: number; agentNo: string
  plan: number; fact: number; hanging: number; kids?: TreeNode[]
}
export const tree: TreeNode = {
  agId: '7000045071', name: 'Байгалиева Жанар', city: 'Шымкент', level: 5, agentNo: 'STR-104116',
  plan: 4500000, fact: 3180000, hanging: 0,
  kids: [
    {
      agId: '7000200033', name: 'Абдулова Айнур', city: 'Шымкент', level: 4, agentNo: 'STR-200033',
      plan: 1800000, fact: 1490000, hanging: 120000,
      kids: [
        { agId: '7000200211', name: 'Куанышева Динара', city: 'Шымкент', level: 2, agentNo: 'STR-200211', plan: 600000, fact: 410000, hanging: 0 },
        { agId: '7000200402', name: 'Жумабекова Гульнар', city: 'Туркестан', level: 1, agentNo: 'STR-200402', plan: 300000, fact: 95000, hanging: 0 },
      ],
    },
    {
      agId: '7000200118', name: 'Сапаров Ермек', city: 'Тараз', level: 3, agentNo: 'STR-200118',
      plan: 1200000, fact: 980000, hanging: 594000,
      kids: [
        { agId: '7000200305', name: 'Оспанов Нурлан', city: 'Кызылорда', level: 2, agentNo: 'STR-200305', plan: 500000, fact: 205000, hanging: 0 },
      ],
    },
  ],
}
export const structureSummary: LeaderBranch[] = []
export const structureStats = { agents: 89, branches: 2, hanging: '714 000' }

/* ── Продажи и KPI ── */
export const periods = [
  { month: 'Янв', plan: 3800000, fact: 2900000 },
  { month: 'Фев', plan: 4000000, fact: 3500000 },
  { month: 'Мар', plan: 4200000, fact: 4100000 },
  { month: 'Апр', plan: 4300000, fact: 3700000 },
  { month: 'Май', plan: 4400000, fact: 4150000 },
  { month: 'Июн', plan: 4500000, fact: 3180000 },
]
export const topAgents = [
  { rank: 1, name: 'Абдулова Айнур', city: 'Шымкент', units: 149.1, fee: 270899 },
  { rank: 2, name: 'Сапаров Ермек', city: 'Тараз', units: 98.3, fee: 178400 },
  { rank: 3, name: 'Куанышева Динара', city: 'Шымкент', units: 41.2, fee: 74800 },
]

/* ── Уровни 1–9 (ВНД-19-04) ── */
export interface LevelRow { level: number; condition: string; rate: number }
export const levels: LevelRow[] = [
  { level: 1, condition: 'С первой продажи', rate: 2500 },
  { level: 2, condition: '50 ед. личных продаж', rate: 3000 },
  { level: 3, condition: '120 ед. + 1 ножка', rate: 3500 },
  { level: 4, condition: '300 ед. + 2 ножки', rate: 4200 },
  { level: 5, condition: '700 ед. + 3 ножки 3 ур.', rate: 4900 },
  { level: 6, condition: '1 500 ед. + 2 ножки 4 ур.', rate: 5400 },
  { level: 7, condition: '4 000 ед. + 2 ножки 5 ур.', rate: 5800 },
  { level: 8, condition: '9 000 ед. + 2 ножки 6 ур.', rate: 6300 },
  { level: 9, condition: '18 000 ед. + 2 ножки 7 ур.', rate: 6800 },
]
export const specialK = [
  { label: 'K · до 1 года', value: '0,8' },
  { label: 'K · 1–3 года', value: '1,0' },
  { label: 'K · свыше 3 лет', value: '1,2' },
]
export const unitInfo: Pick<AgentUnitInfo, 'level' | 'unit' | 'leftPerUnit' | 'leftGroupUnit' | 'leftsubAgentCount'> = {
  level: 5,
  unit: { perUnit: '512.40', groupUnit: '2705.10', allUnit: '3217.50' },
  leftPerUnit: '187.60',
  leftGroupUnit: '2294.90',
  leftsubAgentCount: 1,
}

/* ── Доп. награды (Прил. 2–4) ── */
export interface AwardCard {
  id: string; icon: string; reward: string; achievement: string; cost: string; deadline: string
  status: 'done' | 'progress' | 'locked'; statusLabel: string; pct: number; legs?: string
}
export const awardsCircle1: AwardCard[] = [
  { id: 'a1', icon: 'medal', reward: '20 МРП', achievement: '100 ед. личных продаж за 30 дней', cost: '20 МРП', deadline: 'Бессрочно', status: 'done', statusLabel: 'Получено', pct: 100 },
  { id: 'a2', icon: 'smartphone', reward: 'Смартфон', achievement: '300 ед. групповых за квартал', cost: '120 МРП', deadline: 'до 30.09.2026', status: 'progress', statusLabel: 'В процессе', pct: 64, legs: '2 / 3 ножки' },
  { id: 'a3', icon: 'plane', reward: 'Поездка', achievement: '1 500 ед. + 3 ножки 4 ур.', cost: '500 МРП', deadline: 'до 31.12.2026', status: 'progress', statusLabel: 'В процессе', pct: 38, legs: '1 / 3 ножки' },
  { id: 'a4', icon: 'laptop', reward: 'Ноутбук', achievement: '200 ед. личных за месяц', cost: '90 МРП', deadline: 'закрыта 31.05', status: 'locked', statusLabel: 'Закрыто', pct: 100 },
]
export const awardsCircle2: AwardCard[] = [
  { id: 'b1', icon: 'car', reward: 'Автомобиль', achievement: '50 000 ед. структуры за год', cost: '— ', deadline: 'Прил. 4', status: 'locked', statusLabel: 'Заблокировано', pct: 12 },
  { id: 'b2', icon: 'house', reward: 'Жильё', achievement: '120 000 ед. структуры', cost: '—', deadline: 'Прил. 4', status: 'locked', statusLabel: 'Заблокировано', pct: 4 },
  { id: 'b3', icon: 'crown', reward: 'Статус «Лидер года»', achievement: 'Топ-1 региона по году', cost: '—', deadline: 'Прил. 4', status: 'locked', statusLabel: 'Заблокировано', pct: 0 },
]

/* ── Калькулятор ── */
export const calcProducts = [
  { id: '1', name: 'Байтерек' },
  { id: '2', name: 'Болашак-Life' },
  { id: '3', name: 'Life-Рента+' },
  { id: '4', name: 'Life-Актив+' },
]
export const calcYears = [
  { id: '1', label: '1-й год', k: 0.8 },
  { id: '2', label: '2–3 год', k: 1.0 },
  { id: '3', label: '4+ год', k: 1.2 },
]

/* ── Расчётный лист ── */
export const slipPeriods = [
  { id: '2026-06', label: 'Июнь 2026' },
  { id: '2026-05', label: 'Май 2026' },
  { id: '2026-04', label: 'Апрель 2026' },
  { id: '2026-q1', label: 'I квартал 2026' },
]
export const payslipPersonal = [
  { label: 'Накопительное страхование', base: '180 000', rate: '4,9%', sum: '8 820' },
  { label: 'Life-Рента+', base: '240 000', rate: '5,2%', sum: '12 480' },
  { label: 'Болашак-Life', base: '90 000', rate: '4,5%', sum: '4 050' },
]
export const payslipGroup = [
  { label: 'Абдулова Айнур (ветка)', base: '1 490 000', rate: '1,8%', sum: '26 820' },
  { label: 'Сапаров Ермек (ветка)', base: '980 000', rate: '1,5%', sum: '14 700' },
]

/* ── Отчёты ── */
export interface ReportCard { id: string; icon: string; title: string; desc: string; format: 'XLSX' | 'ZIP' | 'PDF'; endpoint: string }
export const reports: ReportCard[] = [
  { id: 'rep1', icon: 'file', title: 'Журнал оплат', desc: 'Полный журнал начислений и оплат по полисам', format: 'PDF', endpoint: '/v1/policy/journal/export' },
  { id: 'rep2', icon: 'table', title: 'Нераспознанные платежи', desc: 'Реестр входящих платежей без распознавания', format: 'XLSX', endpoint: '/v1/admin/payments/unrecognized/export' },
  { id: 'rep3', icon: 'trophy', title: 'Награды', desc: 'Достигнутые и доступные награды (Прил. 2–4)', format: 'XLSX', endpoint: '/v1/agents/me/rewards/export' },
  { id: 'rep4', icon: 'receipt', title: 'Расчётный лист', desc: 'Личные и групповые начисления за период', format: 'ZIP', endpoint: '/v1/agents/me/payslips/export' },
  { id: 'rep5', icon: 'file-check', title: 'Акт выполненных работ', desc: 'Акт за выбранный расчётный период', format: 'XLSX', endpoint: '/v1/agents/me/work-act/export' },
  { id: 'rep6', icon: 'scale', title: 'Акт сверки (MLM)', desc: 'Сверка взаиморасчётов по структуре', format: 'XLSX', endpoint: '/v1/agents/me/reconciliation/export' },
]

/* ── Рейтинг активности ── */
export const rating = [
  { rank: 1, name: 'Абдулова Айнур', city: 'Шымкент', units: 149.1, deals: 33, active: 96, delta: 8 },
  { rank: 2, name: 'Сапаров Ермек', city: 'Тараз', units: 98.3, deals: 21, active: 88, delta: 3 },
  { rank: 3, name: 'Куанышева Динара', city: 'Шымкент', units: 41.2, deals: 12, active: 74, delta: -2 },
  { rank: 4, name: 'Оспанов Нурлан', city: 'Кызылорда', units: 20.5, deals: 7, active: 61, delta: 0 },
  { rank: 5, name: 'Жумабекова Гульнар', city: 'Туркестан', units: 9.5, deals: 4, active: 48, delta: 5 },
  { rank: 6, name: 'Дюсенов Бекзат', city: 'Тараз', units: 6.0, deals: 2, active: 35, delta: -4 },
]
