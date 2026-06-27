import type { ConclusionData } from './types-conclusion';
import type { DossierApiResponse } from '../dossier/types';

export * from './types-conclusion';
export * from './types-policy';
export * from './types-pension';

export type StatementItem = {
  productName: string;
  productCode: number;
  processInstanceId: string;
  number: string;
  dateCreated: string;
  status: string;
  isOperatable: boolean;
  statusCode: StatusCode;
  applicationType: StatementType;
  policyholderFullName: string;
  policyholderIin: string;
  insuredFullName: string;
  insuredIin: string;
};

export type Statements = {
  active: StatementItem[];
  archive: StatementItem[];
};

export type StatementStatus = 'active' | 'archive';

export type StatementDetail = {
  productName: string;
  productCode: number;
  isRecalculate: boolean;
  processInstanceId: string;
  number: string;
  dateCreated: string;
  status: string;
  policyId: string;
  processName: string;
  applicationType: StatementType;
  policyholderIin: string;
  insuredFullName: string;
  insuredIin: string;
  source: AvailableSources;
  dossierData?: DossierApiResponse;
  isOperatable: boolean;
  statusCode: StatusCode;
  processHistory: ProcessHistory[];
  signingMethods: null | {
    egovQR: string;
    egovURL: string;
    id: string;
  };
  signingDocuments: null | SigningDocument[];
  paymentMethods: null | {
    halykURL: string;
    payformURL: string;
  };
  conclusionData: ConclusionData | null;
  adjustmentData: {
    insuranceCaseId: string;
    insuranceEvent: {
      dateOfEvent: string;
      insuranceEventType: StandardDictionaryType;
    };
    applicationDocuments: {
      fileTypeNameRu: string;
      fileTypeNameKz: string;
      id: string;
      createdDate: string;
    }[];
    policy: {
      policyNumber: string;
    };
  };
};

export type SigningDocument = {
  id: string;
  name: string;
  titleRU: string;
  titleKZ: string;
  url: string;
};

export type ProcessHistory = {
  appointmentDate: string;
  comment: null | string;
  dateCreated: string;
  decisionCode: null | SendTaskDecision;
  decisionNameRu: null | string;
  factEndDate: string;
  id: string;
  number: string;
  planEndDate: string;
  statusCode: StatusCode;
  statusTitle: string;
  userFullName: string;
  userId: null | string;
  violationText: string;
};

export type PolicyStatus = {
  code: 'INVALID' | 'VALID' | 'NOT_FOUND';
  message: string;
  conclusionDate?: string;
  beneficiaryBirthDate?: string;
  id: string;
  accureStartEducationalCapitalStatus: SokStatus;
};

export type SearchPolicyBody = {
  iin: string;
  eventDate: string;
  policyNo: string;
};

export type SokStatus = {
  isAllowed: boolean;
  conditionTypes: Array<'educational-capital' | 'supplementary-agreement'> | null;
  allowedDecisions: Array<true | false> | null;
};
