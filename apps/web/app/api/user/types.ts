export type AccountDataType = {
  id: string;
  iin: string;
  phone: string;
  email: string;
  lastName: string;
  firstName: string;
  middleName: string;
  fullName: string;
  country: string;
  gender: string;
  genderNumber: number;
  birthDate: string;
  birthPlace: string;
  workplace: string;
  position: string;
  address: string;
  residency: string;
  taxResidency: string;
  economicSectorCode: string;
  documentType: string;
  documentNumber: string;
  documentRegisteredBy: string;
  documentFromDate: string;
  documentToDate: string;
};

export type AgentResponse = {
  success: boolean;
  data: AgentData;
};

export type AgentData = {
  manId: string;
  agentId: string;
  agentNo: string;
  agentName: string;
  mainAgent: string | null;
  prefix: string;
  saleChannel: string;
  staffId: string;
  officeNo: string | null;
  officeId: string;
  staffName: string;
  priority: number;
  iin: string;
  birthDate: string; // ISO date string
  manager: Manager;
};

export type Manager = {
  id: string;
  staffId: number;
  name: string;
  fullName: string;
  officeId: number;
  officeName: string;
};
