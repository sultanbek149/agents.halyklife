import { api } from '../config';

import type * as types from './types';

export const productApi = {
  getProductList: (business: boolean = false) => api<types.ProductList>('GET', '/product/products', { ...(business && { params: { productType: 'juridical' } }) }),

  getProductOverview: (productCode: string) => api<types.ProductOverview>('GET', `/product/products/${productCode}`),

  handleExistingApplication: () => api<types.ProductStatement>('GET', `/product/products/mycar/application`),

  startApplication: (externalID: string) => api<{ processInstanceId: string }>('POST', `/product/products/mycar/application/start`, { params: { externalID } }),

  getFilials: () => api<types.CompanyFilialType[]>('GET', '/product/products/branches'),

  getEgovQr: () =>
    api<types.GetEgovQrResponse>('GET', '/account/auth/egov/link/mobile', {
      params: { source: 'mobile' },
    }),

  sendOtp: (phone: string, iin: string) =>
    api<{ code: string }>('GET', '/auth/otps', {
      params: { iin, phone },
    }),

  checkOtp: (code: string, phoneNumber: string, otpCode: string, tokenId: string) =>
    api<{ accessToken: string }>('POST', '/auth/otps', {
      data: { code, phoneNumber, otpCode, tokenId },
    }),

  getDocumentById: (url: string) => api<{ bytes: string }>('GET', url),
};
