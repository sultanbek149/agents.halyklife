import { api } from '../config';

import type * as types from './types';

export const paymentApi = {
  getUserCardList: () => api<types.CardItem[]>('GET', '/payment/cards'),

  addNewCard: (backLink: string) =>
    api<types.AddCardResponse>('POST', '/payment/cards', {
      params: { backLink },
    }),

  setDefaultCard: (cardId: string) => api('PUT', `/payment/cards/${cardId}`),

  deleteCard: (cardId: string) => api('DELETE', `/payment/cards/${cardId}`),
};
