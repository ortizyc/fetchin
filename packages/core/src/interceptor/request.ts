import type { AxiosInstance } from 'axios'
import type {
  FetchinInterceptorOptions,
  FetchinInterceptorRejected,
  FetchinRequestInterceptorFulfilled,
} from '../types'

export function useRequestInterceptor(
  axios: AxiosInstance,
  onFulfilled?: FetchinRequestInterceptorFulfilled,
  onRejected?: FetchinInterceptorRejected,
  options?: FetchinInterceptorOptions,
): number {
  return axios.interceptors.request.use(onFulfilled as any, onRejected, options)
}

export function ejectRequestInterceptor(axios: AxiosInstance, id: number): void {
  axios.interceptors.request.eject(id)
}

export const bearerAuthInterceptor: FetchinRequestInterceptorFulfilled = async (config) => {
  if (config.getBearerToken) {
    const token = await config.getBearerToken()
    if (token) {
      !config.headers && (config.headers = {})
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
}
