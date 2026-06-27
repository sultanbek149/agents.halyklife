export type SubAgent = {
  agId: string;
  managerId: string;
  agentNo: string;
  fullname: string;
  sex: string;
  agLevel: string;
  lvl: string;
  hasSubagents: boolean;
  dateOfCommencement: string;
  depId: string;
  lastName: string;
  depName: string;
  subdepId: string;
  subdepName: string;
  iin: string;
  phoneNumber: string;
  agentState: string;
  licRegionId: number;
  regionName: string;
  manager: string;
};

export type AgentPolicyItem = {
  policyId: string;
  policyNo: string;
  policyLot: string;
  clientName: string;
  insrType: number;
  productCode: string;
  productKklCode: string;
  regDate: string;
  beginDate: string;
  endDate: string;
  amount: string;
  grossPremium: string;
  netPremium: string;
  status: string;
  addStatus: string;
};

export type LevelItem = {
  id: number;
  level: number;
  additionalReward: string;
  additionalRewardCondition: string;
  condition: string;
  rate: string;
  rewardValue: string;
};

export type LevelResponse = {
  success: boolean;
  data: LevelItem;
};

export type ReportData = {
  bytes: string;
  fileName: string;
  fileType: string;
};

export type ReportResponse = {
  success: boolean;
  data: ReportData;
};

export type SurveyQuestion = {
  questionsCount: number;
  questionsPool: SurveyQuestionItem[];
  secondsLeft: number;
  completionStatus: SurveyStatus;
  totalScore: number;
};

export type SurveyQuestionItem = {
  id: string;
  titleRu: string;
  titleKz: string;
  selectedAnswer: null | {
    id: string;
    answerKz: string;
    answerRu: string;
  };
  answers: {
    id: string;
    answerRu: string;
    index: number;
    answerKz: string;
  }[];
};

export type SurveyAnswersModel = SurveyAnswerItem[];

export type SurveyAnswerItem = {
  answerId: string;
  questionId: string;
};

export type SurveyStatus = 'FAIL' | 'SUCCESS' | 'IN_PROGRESS';

export type SubmitSurveyResponse = {
  correctAnswersAmount: number;
  totalAnswersAmount: number;
  percentage: string;
  completionStatus: Exclude<SurveyStatus, 'IN_PROGRESS'>;
  certificateBytes: string;
};

export type CheckSurveyStatusResponse = { isTestingCompleted: true; quizID: string } | { isTestingCompleted: false };

export interface AgentStatus {
  isActive: boolean;
  saleChannel: string | null;
}

export interface AgentStatusResponse {
  success: boolean;
  data: AgentStatus | null;
  message?: string;
  errorCode?: number;
}

export interface UnitStats {
  perUnit: string;
  groupUnit: string;
  allUnit: string;
}

export interface AgentStatistics {
  level: number;
  unit: UnitStats;
  nextlevelConditions: unknown | null;
  leftPerUnit: string;
  leftGroupUnit: string;
  subAgentCount: number | null;
  leftsubAgentCount: number | null;
  agencyPaymentsCurrent: string;
  totalItems: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export type AgentStatisticsResponse = ApiResponse<AgentStatistics>;
