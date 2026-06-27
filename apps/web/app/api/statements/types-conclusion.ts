import type { PensionApp } from './types-pension';
import type { PolicyAppDto } from './types-policy';

export type Person = {
  id: string;
  processInstanceId: string;
  insisId: number;
  iin: string;
  phone: string;
  longName: string;
  isIpdl: boolean | null;
  isTerror: boolean | null;
  isIpdlCompliance: boolean | null;
  isTerrorCompliance: boolean | null;
  personType: number;
};

export type ClientAppPerson = Person & {
  isInsured: boolean;
  isActOwnBehalf: boolean;
  profession: string;
  position: string;
  jobName: string;
  familyStatusId: string;
  familyStatusName: string;
  isAffilation: boolean | null;
};

export type InsuredAppPerson = Person & {
  isDisability: boolean;
  disabilityGroupId: string | null;
  profession: string;
  position: string;
  jobName: string;
  familyStatusId: string | null;
  familyStatusName: string;
  relationId: string | null;
  relationName: string | null;
};

export type BeneficiaryAppPerson = Person & {
  percentage: number;
  familyStatusId: string | null;
  familyStatusName: string;
  relationId: string | null;
  relationName: string | null;
};

export type SpokesmanApp = Person & {
  familyStatusId: string | null;
  familyStatusName: string;
};

export type BeneficialOwnerApp = Person & {
  familyStatusId: string | null;
  familyStatusName: string;
};

export type InsisWorkDataApp = {
  id: string;
  processInstanceId: string;
  agentId: number;
  agentName: string;
  agentNumber: string;
  salesChannel: string;
  salesChannelName: string;
  insrType: number;
  saleChanellPolicy: string;
  saleChanellPolicyName: string;
  regionPolicy: string;
  regionPolicyName: string;
  managerPolicy: string;
  managerPolicyName: string;
  insuranceProgramType: string;
  sourceId: string;
  sourceEnum: number;
  source: AvailableSources;
};

export type LifeTripApp = {
  id: string;
  processInstanceId: string;
  tripTypeId: string;
  tripTypeName: string | null;
  lifeTripCountries: unknown;
  countryName: string | null;
  insuredAmountId: string;
  insuredAmount: number;
  tripPurposeId: string;
  tripPurpose: string | null;
  workTypeId: string;
  workType: string | null;
  sportsTypeId: string;
  sportsType: string | null;
  dayCountId: string;
  startDate: string;
  endDate: string;
  singleTripDays: number | null;
  tripInsurancePeriod: number | null;
  multipleTripMaxDays: number | null;
  totalPremiumKZT: number | null;
  totalPremium: number | null;
  currency: string | null;
  exchangeRates: number;
};

export type CreditData = {
  contractNumber: string;
  openData: string;
  closeData: string;
};

export type ConclusionData = {
  processInstanceId: string;
  regNumber: string;
  initiatorId: string;
  initiatorName: string;
  branchName: string;
  branchCode: string;
  masterProcessId: string | null;
  processCode: number;
  processName: string;
  statusCode: StatusCode;
  statusName: string;
  isTask: boolean;
  createDate: string;
  clientApp: ClientAppPerson;
  insuredApp: InsuredAppPerson[];
  beneficiaryApp: BeneficiaryAppPerson[];
  spokesmanApp: SpokesmanApp | null;
  beneficialOwnerApp: BeneficialOwnerApp[];
  insisWorkDataApp: InsisWorkDataApp;
  addCoverDto: unknown;
  policyAppDto: PolicyAppDto;
  pensionApp: PensionApp;
  lifeTripApp: LifeTripApp;
  creditData: CreditData;
  underwritingCouncilAppDto: unknown;
};
