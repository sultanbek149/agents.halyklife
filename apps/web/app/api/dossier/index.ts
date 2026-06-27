import { api } from '../config';

import type * as types from './types';

export const dossierApi = {
  uploadDocument: (dossierId: string, formData: FormData) => api('POST', `/product/dossiers/${dossierId}/documents/upload`, { data: formData }),

  deleteDocument: (dossierId: string, documentId: string) => api('GET', `/product/dossiers/${dossierId}/documents/${documentId}`),

  getDocumentById: (dossierId: string, documentId: string) => api<string>('GET', `/product/dossiers/${dossierId}/documents/${documentId}`),

  verifyBmg: (params: types.BmgRequest) =>
    api<types.BmgResponse>('POST', '/account/auth/phone', {
      params,
    }),

  fetchInfoFromGBDFL: (data: types.GBDFLRequest) => api<GBDFLResponse>('POST', '/account/users/short-name', { data }),

  sendOtp: (phone: string, iin: string) =>
    api<types.SendOtpResponse>('POST', '/product/products/otp/send', {
      params: { phone, iin },
    }),

  verifyOtp: (data: types.VerifyOtpRequest) =>
    api<types.VerifyOtpResponse>('POST', '/product/products/otp/check', {
      data,
    }),

  setContragent: (dossierId: string, contragentId: string, data: types.SetContragentRequest) =>
    api('POST', `/product/dossiers/${dossierId}/contragents/${contragentId}/save`, { data }),

  uploadContragentDocument: (dossierId: string, contragentId: string, formData: FormData) =>
    api('POST', `/product/dossiers/${dossierId}/contragents/${contragentId}/upload`, { data: formData }),

  submitContragent: (dossierId: string, contragentId: string, decision: 'accept' | 'reject') =>
    api('POST', `/product/dossiers/${dossierId}/contragents/${contragentId}/submit`, { data: { decision } }),

  getBankInfo: (iban: string) =>
    api<GetBankInfoResponse>('GET', '/product/products/bank', {
      params: { iban },
    }),

  saveWorkDetails: (dossierId: string, contragentId: string, data: types.SaveWorkDetailsRequest) =>
    api('POST', `/product/dossiers/${dossierId}/contragents/${contragentId}/save`, { data }),

  sendTask: (processInstanceId: string, decision: SendTaskDecision = 'sended') =>
    api('POST', `/product/events/application/${processInstanceId}/submit`, { data: { decision, comment: '' } }),

  getAdjustmentDocumentById: (processInstanceId: string, fileId: string) => api<string>('GET', `/product/dossiers/${processInstanceId}/documents/${fileId}`),
};
