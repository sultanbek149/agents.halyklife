export enum ContragentType {
  Organization = 1,
  Individual = 2,
}

export type Contragent = {
  longName: string;
  contragentType: ContragentType;
};

export type Policy = {
  policyNumber: string;
  claimId: string;
  policyId: string;
};

export type Dossier = {
  id: string;
  regNumber: string;
  dateCreated: string;
  product: string;
  contragents: Contragent[];
  policy: Policy;
};

export type DossiersResponse = {
  totalItems: number;
  items: Dossier[];
};

export type DossiersQueryParams = {
  bin: string;
};

export type DossierByIdResponse = {
  id: string;
  regNumber: string;
  processCode: number;
};

export type DossierContragent = {
  id: string;
  manId: number;
  iin: string;
  longName: string;
  contragentType: number;
  birthDate: string;
  age: number;
  iik: string | null;
  processInstanceId: string;
};

export type DossierContragentList = DossierContragent[];

export type DossierDocument = {
  docId: number;
  name: string;
  fileTypeId: string;
};

export type DossierDocuments = DossierDocument[];

type AdjusterDecision = {
  adjusterDecision: number;
  adjusterDecisionCode: AdjusterDecisionType;
  userId: string;
  revisionReason: string;
  createdDate: string;
};

export type UploadedFile = {
  name: string;
  fileDataId: string;
  fileName: string;
  fileCreatedDate: string;
  fileTypeId: string;
  applicantName: string;
  actualDecisionType: number;
  decisionTypeCode: AdjusterDecisionType;
  userName: string;
  adjusterDecision?: AdjusterDecision;
  downloadUrl: string;
};

type Document = {
  name: string;
  fileTypeId: string;
  isUploaded: boolean;
  uploadUrl: string;
  status: string;
  statusText: string;
  uploadedFiles?: UploadedFile[];
};

type BeneficiaryDocument = {
  name: string;
  fileTypeId: string;
  isRequired: boolean;
  isUploaded: boolean;
  status: string;
  statusText: string;
};

type BeneficiaryWorkDetails = {
  uptStartDate: string;
  uptEndDate: string;
  uptDegree: string;
  socialPayment: string;
};

type Beneficiary = {
  id: string;
  manId: number;
  saved: boolean;
  status: string;
  statusText: string;
  age: number;
  iin: string;
  longName: string;
  birthDate: string;
  isAlive: boolean;
  contragentName: string;
  contragentType: number;
  processInstanceId: string;
  paymentPercentage: number;
  phone: string;
  documents: BeneficiaryDocument[];
  verifyType: 'GBDFL' | string | null;
  workDetails?: BeneficiaryWorkDetails;
  bankInfo?: BankInfo;
};

export type AdjusterDecisionType = 'Approve' | 'Reject' | 'InReview';

type SummaryStatus = 'in_progress' | 'completed' | 'pending' | 'needs_fixes';

type DocumentsSummary = {
  status: SummaryStatus;
  statusText: string;
  totalRequired: number;
  uploaded: number;
  approved: number;
  rejected: number;
  underReview: number;
  remaining: number;
};

type BeneficiariesSummary = {
  status: SummaryStatus;
  statusText: string;
  totalCount: number;
  confirmedCount: number;
  distributedPercent: number;
  hasValidationErrors: boolean;
  pendingModeration: number;
};

export type DossierApiResponse = {
  documents: Document[];
  beneficiaries: Beneficiary[];
  documentsSummary: DocumentsSummary;
  beneficiariesSummary: BeneficiariesSummary;
};

export type BmgRequest = {
  iin: string;
  phone: string;
};

export type BmgResponse = {
  success: boolean;
};

export type GBDFLRequest = {
  iin: string;
  phone: string;
};

export type SendOtpResponse = {
  tokenId: string;
};

export type VerifyOtpRequest = {
  code: string;
  phoneNumber: string;
  tokenId: string;
};

export type VerifyOtpResponse = {
  status: number;
};

export type WorkDetails = {
  uptStartDate: string;
  uptEndDate: string;
  uptDegree: string;
  socialPayment: string;
};

export type BankInfo = {
  bankId: string;
  bankName: string;
  bin: string;
  iik: string;
  bik: string;
};

export type SetContragentRequest = {
  iin: string;
  phone: string;
  workDetails: WorkDetails;
  bankInfo: BankInfo;
};

export type SaveWorkDetailsRequest = {
  iin: string;
  phone: string;
  bankInfo: BankInfo;
  workDetails: WorkDetails;
};
