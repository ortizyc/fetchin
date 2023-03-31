import type { AxiosInstance } from 'axios'

import type { FetchinRequestInterceptor } from '../types'

export function useRequestInterceptor(
  axios: AxiosInstance,
  interceptor: FetchinRequestInterceptor,
): number {
  return axios.interceptors.request.use(
    interceptor.onFulfilled as any,
    interceptor.onRejected,
    interceptor.options,
  )
}

export function ejectRequestInterceptor(axios: AxiosInstance, id: number): void {
  axios.interceptors.request.eject(id)
}

export const bearerAuthInterceptor: FetchinRequestInterceptor = {
  onFulfilled: async (config) => {
    if (config.getBearerToken) {
      const token = await config.getBearerToken()
      if (token) {
        !config.headers && (config.headers = {})
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
}
