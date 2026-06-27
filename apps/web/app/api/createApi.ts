import type { AxiosInstance, AxiosRequestConfig } from 'axios'
type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
export function createApi(instance: AxiosInstance) {
  return async function api<T = any>(method: Method, url: string, config: AxiosRequestConfig = {}): Promise<T> {
    const res = await instance.request<T>({ method, url, ...config })
    return res.data
  }
}
