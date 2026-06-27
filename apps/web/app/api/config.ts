import axios from 'axios';

import { createApi } from './createApi';

let axiosController = new AbortController();

// Запросы идут через серверный прокси /api/gw (тот же origin → без CORS),
// Nitro форвардит их на шлюз agent-service с пробросом Authorization/Accept-Language.
const axiosInstance = axios.create({
  baseURL: '/api/gw',
});

axiosInstance.interceptors.request.use(config => {
  const ls = typeof window !== 'undefined' ? window.localStorage : undefined;
  const token = ls?.getItem('token');
  const source = ls?.getItem('source') || 'web';
  const language = ls?.getItem('language') || 'RUS';

  if (token) config.headers.Authorization = `Bearer ${token}`;

  config.signal = axiosController.signal;
  config.headers.Language = language;
  config.headers['Accept-Language'] = language === 'KAZ' ? 'kk' : 'ru';
  // Default the app-wide `source`, but let a call set its own — e.g.
  // `downloadJobFile` needs `source=report|subrep`, and `searchAgent` passes its
  // own channel. Spreading config.params last lets an explicit value win.
  config.params = { source, ...config.params };
  return config;
});

export const abortRequest = () => {
  axiosController.abort();
  axiosController = new AbortController();
};

export const api = createApi(axiosInstance);
