export type ReferralManagerResponse = {
  agentID: string;
  agentNo: string;
  saleChannel: string;
  officeID: string;
  officeNo: string;
  prefix: string;
  agentName: string;
  withAgent: string;
  staffID: string;
  staffName: string;
  manager: {
    id: string;
    staffID: number;
    name: string;
    fullName: string;
    officeID: number;
    officeName: string;
  };
};

export type ReferralManagerState = {
  managerId: string;
  managerName: string;
  agentNo: string;
  source: string;
  isFromReferral: boolean;
};
