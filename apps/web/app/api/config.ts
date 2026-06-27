import axios from 'axios';

import { createApi } from './createApi';

let axiosController = new AbortController();

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage['token']}`,
  },
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage['token'];
  const source = localStorage['source'] || 'mobile';
  const language = localStorage['language'] || 'KAZ';

  if (token) config.headers.Authorization = `Bearer ${token}`;

  config.signal = axiosController.signal;
  config.headers.Language = language;
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
