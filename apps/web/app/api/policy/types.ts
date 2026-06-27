export interface Policy {
  policyId: number;
  policyNo: string;
  agentId: string;
  name: string;
  insrType: string;
  policyState: string;
  insrBegin: string; // ISO Date String
  insrEnd: string; // ISO Date String
  grossPremium: number;
  agentCommission: number;
  dateGiven: string; // ISO Date String
  insurerId: number;
}

// Mirrors the actual API envelope: { success, data: { items, total, page, pageSize } }
export interface PolicyListData {
  items: Policy[];
  page: number;
  pageSize: number;
  total: number;
}

export interface PolicyResponse {
  success: boolean;
  data: PolicyListData;
}

export interface GetPolicyParams {
  page?: number;
  pageSize?: number;
}

export type PaymentStatus = 'paid' | 'unpaid' | 'overdue';

export interface PaymentItem {
  paymentAmount: number;
  paymentDate: string;
  paymentStatus: PaymentStatus;
}

export interface PaymentListData {
  items: PaymentItem[];
  total: number;
  page: number;
  pageSize: number;
}

export interface PolicyPaymentsResponse {
  success: boolean;
  data: PaymentListData;
}

export interface ChartSegment {
  label: string;
  value: number;
  color: string;
  named: boolean;
}

export interface Dataset {
  label: string;
  color: string;
  data: number[];
}

export interface ChartDataset {
  years: string[];
  chartBarData: Dataset[];
}

export interface Segment {
  label: string | null;
  value: number;
  color: string;
  named: boolean;
}

// Response
export interface ChartResponse {
  success: boolean;
  data: ChartData;
}

// Data
export interface ChartData {
  donut: DonutData;
  stackedBar: StackedBarData;
}

// Donut
export interface DonutData {
  total: number;
  items: DonutItem[];
}

export interface DonutItem {
  label: string;
  count: number;
  percentage: number;
}

// StackedBar
export interface StackedBarData {
  categories: string[];
  series: StackedBarSeries[];
  totals: number[];
}

export interface StackedBarSeries {
  name: string;
  data: number[];
}
